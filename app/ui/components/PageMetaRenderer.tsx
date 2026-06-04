import type { PageMeta } from '../../libs/types/pageMeta';

interface PageMetaRendererProps {
  pageMeta: PageMeta;
}

export const PageMetaRenderer: React.FC<PageMetaRendererProps> = ({
  pageMeta,
}) => {
  return (
    <>
      <title>{pageMeta.title}</title>
      <meta name='author' content={pageMeta.author} />
      <meta name='description' content={pageMeta.description} />
      <meta property='og:type' content='website' />
      <meta property='og:title' content={pageMeta.title} />
      <meta property='og:description' content={pageMeta.description} />
    </>
  );
};
