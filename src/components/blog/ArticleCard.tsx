import './ArticleCard.css';

interface ArticleCardProps {
  article: {
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
  };
}

export function ArticleCard({ article }: ArticleCardProps) {
  const handleClick = () => {
    window.history.pushState({}, '', `/blog/${article.slug}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className="article-card" onClick={handleClick}>
      {article.featured_image && (
        <div className="article-card__image">
          <img
            src={article.featured_image}
            alt={article.title}
            loading="lazy"
          />
        </div>
      )}
      
      <div className="article-card__content">
        <h3 className="article-card__title">{article.title}</h3>
        
        <p className="article-card__excerpt">{article.excerpt}</p>
        
        <div className="article-card__meta">
          <div className="article-card__author">
            {article.avatar_url ? (
              <img
                src={article.avatar_url}
                alt={`${article.first_name} ${article.last_name}`}
                className="article-card__avatar"
              />
            ) : (
              <div className="article-card__avatar article-card__avatar--placeholder">
                {article.first_name?.[0]}{article.last_name?.[0]}
              </div>
            )}
            <span className="article-card__author-name">
              {article.first_name} {article.last_name}
            </span>
          </div>
          
          <div className="article-card__info">
            <span className="article-card__date">
              {formatDate(article.published_at)}
            </span>
            <span className="article-card__separator">•</span>
            <span className="article-card__reading-time">
              {article.reading_time} min de lecture
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
