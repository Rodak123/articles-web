import { DEFAULT_PAGE_META } from '../../../config';
import { useResponsive } from '../../../libs/hooks/useResponsive';
import type { PageMeta } from '../../../libs/types/pageMeta';
import { cm } from '../../../libs/utils/cm';
import { PageMetaRenderer } from '../../components/PageMetaRenderer';

interface DefaultLayoutProps {
  children: React.ReactNode;
  customPageMeta?: Partial<PageMeta>;
  pageName?: string;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  customPageMeta = {},
  pageName = '',
}) => {
  const { isMobile } = useResponsive();

  const pageMeta: PageMeta = {
    ...DEFAULT_PAGE_META,
    ...customPageMeta,
  };

  return (
    <>
      <PageMetaRenderer pageMeta={pageMeta} />
      <div
        className={cm(
          isMobile ? 'p-2' : 'p-12',
          pageName,
          'flex flex-col items-center min-h-screen',
        )}
      >
        <div
          className={cm('w-full grow flex flex-col', !isMobile && 'max-w-200')}
        >
          {children}
        </div>
      </div>
    </>
  );
};
