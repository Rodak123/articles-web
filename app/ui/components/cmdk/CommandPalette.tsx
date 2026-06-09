import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { Command } from 'cmdk';
import { useState } from 'react';
import { Typography } from '../Typography';
import { ArticleLinkCommandGroup } from './commands/ArticleLinkCommandGroup';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { ChangeThemeCommandGroup } from './commands/ChangeThemeCommandGroup';
import { useShortcut } from 'react-keyhub';
import { SHORTCUT_KEYS } from '../../../shortcuts';
import { PageCommandGroup } from './commands/PageCommandGroup';

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);

  useShortcut(SHORTCUT_KEYS.TOGGLE_COMMAND_PALETTE, () => {
    setOpen((prev) => !prev);
  });

  const closeMenu = () => {
    if (open === false) return;
    setOpen(false);
  };

  const commands = (
    <>
      <ArticleLinkCommandGroup closeMenu={closeMenu} />
      <ChangeThemeCommandGroup closeMenu={closeMenu} />
      <PageCommandGroup closeMenu={closeMenu} />
    </>
  );

  return (
    <Command.Dialog
      open={open}
      loop
      onOpenChange={setOpen}
      label='Global Command Menu'
      className='fixed inset-0 z-50 mx-auto max-w-2xl transform p-4 pt-[25vh] transition-all'
    >
      <div className='sr-only'>
        <DialogTitle>Global Command Menu</DialogTitle>
        <DialogDescription>
          Type commands or search for articles
        </DialogDescription>
      </div>

      <div
        className='fixed inset-0 -z-50 backdrop-blur-sm'
        onClick={() => setOpen(false)}
      />

      <div className='relative w-full max-w-2xl overflow-hidden rounded-xl bg-accent-50 border border-accent-400 flex flex-col'>
        <div className='flex items-center gap-3 px-4 py-3 border-b border-accent-400'>
          <MagnifyingGlassIcon size={20} className='shrink-0' />
          <Command.Input
            placeholder='Type a command or search...'
            className='w-full bg-transparent text-sm outline-none'
          />
        </div>

        <Command.List className='max-h-75 overflow-y-auto p-2 scrollbar-none'>
          <Command.Empty className='py-6 text-center text-sm'>
            <Typography>No results found.</Typography>
          </Command.Empty>

          {commands}
        </Command.List>
      </div>
    </Command.Dialog>
  );
};
