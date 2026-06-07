import { Typography } from '../../Typography';
import { CustomCommandItem } from '../custom/CustomCommandItem';
import { useTheme } from '../../../../libs/hooks/useTheme';
import { ThemeModes, type ThemeMode } from '../../../../libs/types/theme';
import { CustomCommandGroup } from '../custom/CustomCommandGroup';

interface ChangeThemeCommandGroupProps {
  closeMenu: () => void;
}

export const ChangeThemeCommandGroup: React.FC<
  ChangeThemeCommandGroupProps
> = ({ closeMenu }) => {
  const { changeThemeMode } = useTheme();

  const handleChangeThemeMode = (themeMode: ThemeMode) => {
    changeThemeMode(themeMode);
    closeMenu();
  };

  return (
    <CustomCommandGroup heading='Theme'>
      {Object.values(ThemeModes).map((themeMode) => {
        return (
          <CustomCommandItem
            title={`Change color theme to ${themeMode}`}
            handleOnSelected={() => handleChangeThemeMode(themeMode)}
          >
            <Typography>Change theme to {themeMode}</Typography>
          </CustomCommandItem>
        );
      })}
    </CustomCommandGroup>
  );
};
