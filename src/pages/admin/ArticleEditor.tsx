import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AdminLayout } from '../../components/AdminLayout';
import './ArticleEditor.css';

export function ArticleEditor() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('article');
  const [tags, setTags] = useState('');
  const [status, setStatus] = useState('draft');
  const [featuredImage, setFeaturedImage] = useState('');
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [plusMenuPosition, setPlusMenuPosition] = useState({ top: 0 });
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const [showMetadata, setShowMetadata] = useState(false);
  const [isContentEmpty, setIsContentEmpty] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const articleId = window.location.pathname.split('/').pop();
  const isEdit = articleId !== 'new';

  useEffect(() => {
    if (isEdit && articleId) {
      fetchArticle(articleId);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  useEffect(() => {
    // Check if content is empty to show/hide plus button
    if (contentRef.current) {
      const text = contentRef.current.innerText.trim();
      setIsContentEmpty(text.length === 0);
    }
  }, [content]);

  const fetchArticle = async (id: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/articles/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTitle(data.article.title);
        setContent(data.article.content);
        setExcerpt(data.article.excerpt);
        setCategory(data.article.category);
        setTags(Array.isArray(data.article.tags) ? data.article.tags.join(', ') : data.article.tags || '');
        setStatus(data.article.status);
        setFeaturedImage(data.article.featured_image || '');
      }
    } catch (error) {
      console.error('Error fetching article:', error);
    }
  };

  const handleSelectionChange = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !contentRef.current?.contains(selection.anchorNode)) {
      setShowToolbar(false);
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    setToolbarPosition({
      top: rect.top - 50,
      left: rect.left + (rect.width / 2),
    });
    setShowToolbar(true);
  };

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    contentRef.current?.focus();
  };

  const insertImage = async () => {
    const url = prompt('Enter image URL:');
    if (url && contentRef.current) {
      const img = `<img src="${url}" alt="Article image" style="max-width: 100%; height: auto; margin: 1.58em 0;" />`;
      document.execCommand('insertHTML', false, img);
      contentRef.current.focus();
    }
    setShowPlusMenu(false);
  };

  const insertUnsplashImage = () => {
    const query = prompt('Search Unsplash (e.g., "nature", "technology"):');
    if (query) {
      alert('Unsplash integration coming soon! For now, use direct image URL.');
    }
    setShowPlusMenu(false);
  };

  const insertVideo = () => {
    const url = prompt('Paste YouTube, Vimeo, or other video link and press Enter:');
    if (url && contentRef.current) {
      let embedUrl = url;
      
      // Convert YouTube watch URLs to embed URLs
      if (url.includes('youtube.com/watch')) {
        const videoId = new URL(url).searchParams.get('v');
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if (url.includes('youtu.be/')) {
        const videoId = url.split('youtu.be/')[1].split('?')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
      } else if (url.includes('vimeo.com/')) {
        const videoId = url.split('vimeo.com/')[1].split('?')[0];
        embedUrl = `https://player.vimeo.com/video/${videoId}`;
      }
      
      const embedHtml = `<div class="video-embed" style="position: relative; padding-bottom: 56.25%; height: 0; margin: 1.58em 0;"><iframe src="${embedUrl}" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>`;
      document.execCommand('insertHTML', false, embedHtml);
      contentRef.current.focus();
    }
    setShowPlusMenu(false);
  };

  const insertEmbed = () => {
    const url = prompt('Paste a link to embed content from another site (e.g., X/Twitter) and press Enter:');
    if (url && contentRef.current) {
      const embedHtml = `<div class="embed-content" style="border-left: 3px solid #2a4538; padding-left: 1em; margin: 1.58em 0;"><a href="${url}" target="_blank" rel="noopener noreferrer" style="color: #2a4538; text-decoration: none;">${url}</a></div>`;
      document.execCommand('insertHTML', false, embedHtml);
      contentRef.current.focus();
    }
    setShowPlusMenu(false);
  };

  const handleSubmit = async (publishNow = false) => {
    setLoading(true);

    try {
      const payload = {
        title,
        excerpt,
        content: contentRef.current?.innerHTML || '',
        category,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        status: publishNow ? 'published' : status,
        featured_image: featuredImage,
      };

      const url = isEdit
        ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/articles/${articleId}`
        : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/articles`;

      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        window.history.pushState({}, '', '/admin/articles');
        window.dispatchEvent(new PopStateEvent('popstate'));
      } else {
        alert('Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    window.history.pushState({}, '', '/admin/articles');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <AdminLayout>
      <div className="medium-editor">
        <div className="medium-header">
          <button className="back-btn" onClick={goBack}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className="header-actions">
            <button className="btn-text" onClick={() => setShowMetadata(!showMetadata)}>
              Settings
            </button>
            <button className="btn-secondary" onClick={() => handleSubmit(false)} disabled={loading}>
              Save draft
            </button>
            <button className="btn-primary" onClick={() => handleSubmit(true)} disabled={loading}>
              Publish
            </button>
          </div>
        </div>

        <div className="medium-content">
          <div className="title-wrapper">
            <button 
              className="plus-btn"
              onClick={() => setShowPlusMenu(!showPlusMenu)}
              title="Add content"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            {showPlusMenu && (
              <div className="plus-menu-horizontal">
                <button onClick={insertImage} title="Add image">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 16L8 11L11 14L16 9M16 9V12M16 9H13M4 17H16C16.5523 17 17 16.5523 17 16V4C17 3.44772 16.5523 3 16 3H4C3.44772 3 3 3.44772 3 4V16C3 16.5523 3.44772 17 4 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button onClick={insertUnsplashImage} title="Add image from Unsplash">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8 3H16V8H8V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 13H21V21H3V13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button onClick={insertVideo} title="Add a video">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14 10L8 6V14L14 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 4H17C17.5523 4 18 4.44772 18 5V15C18 15.5523 17.5523 16 17 16H3C2.44772 16 2 15.5523 2 15V5C2 4.44772 2.44772 4 3 4Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
                <button onClick={insertEmbed} title="Add an embed">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6 14L2 10L6 6M14 6L18 10L14 14M11 3L9 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}

            <input
              type="text"
              className="title-input"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="editor-wrapper">
            <div
              ref={contentRef}
              className="content-editable"
              contentEditable
              suppressContentEditableWarning
              dangerouslySetInnerHTML={{ __html: content }}
              onInput={(e) => {
                const newContent = e.currentTarget.innerHTML;
                setContent(newContent);
                setIsContentEmpty(e.currentTarget.innerText.trim().length === 0);
              }}
              data-placeholder="Tell your story..."
            />
          </div>

          {showToolbar && (
            <div 
              className="format-toolbar"
              style={{
                position: 'fixed',
                top: `${toolbarPosition.top}px`,
                left: `${toolbarPosition.left}px`,
                transform: 'translateX(-50%)',
              }}
            >
              <button onClick={() => formatText('bold')} title="Bold">
                <strong>B</strong>
              </button>
              <button onClick={() => formatText('italic')} title="Italic">
                <em>I</em>
              </button>
              <button onClick={() => formatText('underline')} title="Underline">
                <u>U</u>
              </button>
              <button onClick={() => formatText('formatBlock', '<h2>')} title="Heading">
                <strong>H</strong>
              </button>
              <button onClick={() => formatText('createLink', prompt('Enter URL:') || '')} title="Link">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M10 13C10.4295 13.5741 10.9774 14.0492 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9404 15.7513 14.6898C16.4231 14.4392 17.0331 14.0471 17.54 13.54L19.54 11.54C20.4508 10.5924 20.9548 9.32941 20.9434 8.01666C20.932 6.70391 20.4061 5.44977 19.4791 4.51777C18.5521 3.58578 17.3003 3.05196 15.9875 3.03256C14.6748 3.01316 13.4082 3.50941 12.4533 4.41333L11.2533 5.60666" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 7C9.57045 6.42589 9.02259 5.95083 8.39341 5.60707C7.76422 5.26331 7.06847 5.05889 6.35331 5.00768C5.63815 4.95646 4.92037 5.05961 4.24861 5.31021C3.57685 5.56081 2.96689 5.95289 2.45996 6.45999L0.459961 8.45999C-0.450846 9.40758 -0.954854 10.6706 -0.943454 11.9834C-0.932054 13.2961 -0.406227 14.5503 0.520765 15.4823C1.44776 16.4143 2.69959 16.9481 4.01234 16.9675C5.32509 16.9869 6.59176 16.4906 7.54663 15.5867L8.73996 14.3933" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}

          {showMetadata && (
            <div className="metadata-panel">
              <h3>Article Settings</h3>
              
              <div className="form-group">
                <label>Excerpt</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                  placeholder="Short summary of the article"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="article">Article</option>
                    <option value="resource">Resource</option>
                    <option value="news">News</option>
                    <option value="testimonial">Testimonial</option>
                    <option value="recommended">Recommended</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Tags</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="psychology, wellness, therapy"
                />
              </div>

              <div className="form-group">
                <label>Featured Image URL</label>
                <input
                  type="url"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
