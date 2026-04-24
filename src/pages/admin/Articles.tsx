import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { AdminLayout } from '../../components/AdminLayout';
import './Articles.css';

interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  views_count: number;
  published_at: string | null;
  created_at: string;
  first_name: string;
  last_name: string;
}

export function Articles() {
  const { token } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'draft' | 'published' | 'archived'>('all');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/articles`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setArticles(data.articles);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteArticle = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/articles/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchArticles();
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const navigateToEdit = (id: string) => {
    window.history.pushState({}, '', `/admin/articles/edit/${id}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const navigateToCreate = () => {
    window.history.pushState({}, '', '/admin/articles/new');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const filteredArticles = articles.filter(article => {
    if (filter === 'all') return true;
    return article.status === filter;
  });

  const getStatusBadge = (status: string) => {
    const badges = {
      draft: { label: 'Brouillon', class: 'status-draft' },
      published: { label: 'Publié', class: 'status-published' },
      archived: { label: 'Archivé', class: 'status-archived' },
    };
    return badges[status as keyof typeof badges] || badges.draft;
  };

  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      article: 'Article',
      resource: 'Ressource',
      news: 'Actualité',
      testimonial: 'Témoignage',
      recommended: 'Recommandation',
    };
    return labels[cat] || cat;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <AdminLayout>
      <div className="articles-page">
        <div className="articles-header">
          <div>
            <h1>Articles</h1>
            <p>Gérez vos articles de blog</p>
          </div>
          <button className="btn-primary" onClick={navigateToCreate}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Nouvel article
          </button>
        </div>

        <div className="articles-filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tous ({articles.length})
          </button>
          <button
            className={`filter-btn ${filter === 'published' ? 'active' : ''}`}
            onClick={() => setFilter('published')}
          >
            Publiés ({articles.filter(a => a.status === 'published').length})
          </button>
          <button
            className={`filter-btn ${filter === 'draft' ? 'active' : ''}`}
            onClick={() => setFilter('draft')}
          >
            Brouillons ({articles.filter(a => a.status === 'draft').length})
          </button>
          <button
            className={`filter-btn ${filter === 'archived' ? 'active' : ''}`}
            onClick={() => setFilter('archived')}
          >
            Archivés ({articles.filter(a => a.status === 'archived').length})
          </button>
        </div>

        {loading ? (
          <div className="articles-loading">Chargement...</div>
        ) : (
          <div className="articles-table-container">
            <table className="articles-table">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Catégorie</th>
                  <th>Statut</th>
                  <th>Auteur</th>
                  <th>Vues</th>
                  <th>Date de publication</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles.map((article) => {
                  const badge = getStatusBadge(article.status);
                  return (
                    <tr key={article.id}>
                      <td className="article-title">{article.title}</td>
                      <td>
                        <span className="category-badge">
                          {getCategoryLabel(article.category)}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${badge.class}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td>{article.first_name} {article.last_name}</td>
                      <td>{article.views_count}</td>
                      <td>{formatDate(article.published_at)}</td>
                      <td>
                        <div className="article-actions">
                          <button
                            className="btn-icon"
                            onClick={() => navigateToEdit(article.id)}
                            title="Modifier"
                          >
                            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                              <path d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L8.82843 14H6V11.1716L13.5858 3.58579Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          <button
                            className="btn-icon btn-danger"
                            onClick={() => deleteArticle(article.id)}
                            title="Supprimer"
                          >
                            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                              <path d="M6 6L14 14M6 14L14 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredArticles.length === 0 && (
              <div className="articles-empty">
                <p>Aucun article trouvé</p>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
