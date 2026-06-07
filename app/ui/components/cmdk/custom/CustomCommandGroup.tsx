import { Command } from 'cmdk';

interface CustomCommandGroupProps {
  heading: string;
  children: React.ReactNode;
}

export const CustomCommandGroup: React.FC<CustomCommandGroupProps> = ({
  heading,
  children,
}) => {
  return (
    <Command.Group
      heading={heading}
      className='overflow-hidden p-1 text-xs font-medium'
    >
      <div className='mt-1 space-y-0.5'>{children}</div>
    </Command.Group>
  );
};
