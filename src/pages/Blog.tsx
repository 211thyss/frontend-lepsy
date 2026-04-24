import { useState, useEffect } from 'react';
import { ArticleCard } from '../components/blog/ArticleCard';
import './Blog.css';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image?: string;
  reading_time: number;
  published_at: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  category?: string;
  tags?: string[];
}

interface Pagination {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export function Blog() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 12,
    totalCount: 0,
    totalPages: 0,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<{ category: string; count: number }[]>([]);

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, [pagination.page, searchTerm, selectedCategory]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });

      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory) params.append('category', selectedCategory);

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/articles?${params}`);
      
      if (!response.ok) throw new Error('Erreur lors du chargement des articles');

      const data = await response.json();
      setArticles(data.articles);
      setPagination(data.pagination);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/articles/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      article: 'Articles',
      resource: 'Ressources',
      news: 'Actualités',
      testimonial: 'Témoignages',
      recommended: 'Recommandations',
    };
    return labels[cat] || cat;
  };

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1>Blog & Ressources</h1>
        <p>Découvrez nos articles, ressources et actualités sur la psychologie et le bien-être mental</p>
      </div>

      <div className="blog-container">
        <aside className="blog-sidebar">
          <div className="blog-search">
            <h3>Rechercher</h3>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="blog-search__input"
              />
              <button type="submit" className="blog-search__button">
                Rechercher
              </button>
            </form>
          </div>

          {categories.length > 0 && (
            <div className="blog-filters">
              <h3>Catégories</h3>
              <div className="blog-filters__list">
                {categories.map(({ category, count }) => (
                  <button
                    key={category}
                    className={`blog-filter-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {getCategoryLabel(category)} ({count})
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>

        <main className="blog-main">
          {loading && (
            <div className="blog-loading">
              <p>Chargement des articles...</p>
            </div>
          )}

          {error && (
            <div className="blog-error">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && articles.length === 0 && (
            <div className="blog-empty">
              <p>Aucun article trouvé</p>
            </div>
          )}

          {!loading && !error && articles.length > 0 && (
            <>
              <div className="blog-grid">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <div className="blog-pagination">
                  <button
                    className="blog-pagination__btn"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                  >
                    Précédent
                  </button>

                  <div className="blog-pagination__pages">
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        className={`blog-pagination__page ${page === pagination.page ? 'active' : ''}`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    className="blog-pagination__btn"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                  >
                    Suivant
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
