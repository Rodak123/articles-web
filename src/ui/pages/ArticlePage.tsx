import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { DefaultLayout } from './layouts/DefaultLayout';

const articleLoaders = import.meta.glob('../../data/articles/*/index.html', {
  query: '?raw',
  import: 'default',
});

export const ArticlePage: React.FC = () => {
  const { articleSlug } = useParams();
  const [html, setHtml] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      if (!articleSlug) return;

      const fileKey = Object.keys(articleLoaders).find((path) =>
        path.includes(`/${articleSlug}/index.html`),
      );

      if (fileKey) {
        try {
          const loader = articleLoaders[fileKey] as () => Promise<string>;
          const content = await loader();
          setHtml(content);
          setError(false);
        } catch {
          setError(true);
        }
      } else {
        setError(true);
      }
    };

    loadContent();
  }, [articleSlug]);

  return (
    <DefaultLayout>
      {error ? (
        <div>Article not found.</div>
      ) : html ? (
        <div
          className='article-content'
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <div>Loading article...</div>
      )}
    </DefaultLayout>
  );
};
