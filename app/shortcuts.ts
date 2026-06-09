import {
  defaultShortcuts,
  ShortcutScope,
  ShortcutStatus,
  ShortcutType,
  type ShortcutSettings,
} from 'react-keyhub';

export const SHORTCUT_KEYS = {
  TOGGLE_COMMAND_PALETTE: 'toggleCommandPalette',
} as const;

export const shortcuts: ShortcutSettings = {
  ...defaultShortcuts,
  [SHORTCUT_KEYS.TOGGLE_COMMAND_PALETTE]: {
    keyCombo: 'ctrl+k',
    name: 'Toggle Command Palette',
    description: 'Opens and closes the Command Palette',
    priority: 100,
    type: ShortcutType.REGULAR,
    scope: ShortcutScope.GLOBAL,
    status: ShortcutStatus.ENABLED,
  },
};
