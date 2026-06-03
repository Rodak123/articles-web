import { useResponsive } from '../../../libs/hooks/useResponsive';
import { cm } from '../../../libs/utils/cm';

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const { isMobile } = useResponsive();

  return <div className={cm(isMobile ? 'p-2' : 'p-12')}>{children}</div>;
};
