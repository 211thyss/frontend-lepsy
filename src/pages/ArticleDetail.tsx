import { useState, useEffect } from 'react';
import { ArticleCard } from '../components/blog/ArticleCard';
import './ArticleDetail.css';

interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  featured_image?: string;
  reading_time: number;
  published_at: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  author_title?: string;
}

export function ArticleDetail() {
  const [article, setArticle] = useState<Article | null>(null);
  const [similarArticles, setSimilarArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const slug = window.location.pathname.split('/blog/')[1];
    if (slug) {
      fetchArticle(slug);
    }
  }, []);

  const fetchArticle = async (slug: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/articles/${slug}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Article non trouvé');
        }
        throw new Error('Erreur lors du chargement de l\'article');
      }

      const data = await response.json();
      setArticle(data.article);
      setSimilarArticles(data.similarArticles || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${article?.title} - ${url}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const goBack = () => {
    window.history.pushState({}, '', '/blog');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  if (loading) {
    return (
      <div className="article-detail-page">
        <div className="article-detail-loading">
          <p>Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="article-detail-page">
        <div className="article-detail-error">
          <h2>{error || 'Article non trouvé'}</h2>
          <button onClick={goBack} className="back-button">
            Retour au blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="article-detail-page">
      <article className="article-detail">
        <div className="article-detail__header">
          <button onClick={goBack} className="back-button">
            ← Retour au blog
          </button>
          
          <h1 className="article-detail__title">{article.title}</h1>
          
          <div className="article-detail__meta">
            <div className="article-detail__author">
              {article.avatar_url ? (
                <img
                  src={article.avatar_url}
                  alt={`${article.first_name} ${article.last_name}`}
                  className="article-detail__avatar"
                />
              ) : (
                <div className="article-detail__avatar article-detail__avatar--placeholder">
                  {article.first_name?.[0]}{article.last_name?.[0]}
                </div>
              )}
              <div>
                <div className="article-detail__author-name">
                  {article.first_name} {article.last_name}
                </div>
                {article.author_title && (
                  <div className="article-detail__author-title">{article.author_title}</div>
                )}
              </div>
            </div>
            
            <div className="article-detail__info">
              <span>{formatDate(article.published_at)}</span>
              <span>•</span>
              <span>{article.reading_time} min de lecture</span>
            </div>
          </div>
        </div>

        {article.featured_image && (
          <div className="article-detail__image">
            <img src={article.featured_image} alt={article.title} />
          </div>
        )}

        <div 
          className="article-detail__content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div className="article-detail__share">
          <h3>Partager cet article</h3>
          <div className="article-detail__share-buttons">
            <button onClick={shareOnLinkedIn} className="share-btn share-btn--linkedin">
              LinkedIn
            </button>
            <button onClick={shareOnWhatsApp} className="share-btn share-btn--whatsapp">
              WhatsApp
            </button>
          </div>
        </div>
      </article>

      {similarArticles.length > 0 && (
        <section className="similar-articles">
          <h2>Articles similaires</h2>
          <div className="similar-articles__grid">
            {similarArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
