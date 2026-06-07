import { Typography } from '../../Typography';
import { useNavigate } from 'react-router';
import { ROUTE_PATHS } from '../../../../config';
import { CustomCommandItem } from '../custom/CustomCommandItem';
import { CustomCommandGroup } from '../custom/CustomCommandGroup';

interface PageCommandGroupProps {
  closeMenu: () => void;
}

export const PageCommandGroup: React.FC<PageCommandGroupProps> = ({
  closeMenu,
}) => {
  const navigate = useNavigate();

  const handleOpenHomePage = () => {
    navigate(ROUTE_PATHS.HOME());
    closeMenu();
  };

  return (
    <CustomCommandGroup heading='Page'>
      <CustomCommandItem
        title='Go to article home page'
        handleOnSelected={handleOpenHomePage}
      >
        <Typography>Go home</Typography>
      </CustomCommandItem>
      );
    </CustomCommandGroup>
  );
};
