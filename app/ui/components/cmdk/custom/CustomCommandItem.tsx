import { Command } from 'cmdk';
import { cm } from '../../../../libs/utils/cm';

interface CustomCommandItemProps {
  title: string;
  children: React.ReactNode;
  handleOnSelected: (value: string) => void;
}

export const CustomCommandItem: React.FC<CustomCommandItemProps> = ({
  handleOnSelected,
  title,
  children,
}) => {
  return (
    <Command.Item
      title={title}
      onSelect={handleOnSelected}
      className={cm(
        'flex flex-row justify-between cursor-default select-none items-center rounded-lg px-3 py-2 text-sm outline-none',
        'aria-selected:bg-accent-100 aria-selected:font-bold',
      )}
    >
      {children}
    </Command.Item>
  );
};
