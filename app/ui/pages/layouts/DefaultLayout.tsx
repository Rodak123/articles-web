import { DEFAULT_PAGE_META } from '../../../config';
import { useResponsive } from '../../../libs/hooks/useResponsive';
import type { PageMeta } from '../../../libs/types/pageMeta';
import { cm } from '../../../libs/utils/cm';
import { PageMetaRenderer } from '../../components/PageMetaRenderer';

interface DefaultLayoutProps {
  children: React.ReactNode;
  customPageMeta?: Partial<PageMeta>;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  customPageMeta = {},
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
          'flex flex-col items-center min-h-screen',
        )}
      >
        <div className='max-w-200 w-full'>{children}</div>
      </div>
    </>
  );
};
