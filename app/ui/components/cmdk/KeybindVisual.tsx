import { ShortcutType, type ShortcutConfig } from 'react-keyhub';

interface KeyVisualProps {
  keybind: string;
}

const KeyVisual: React.FC<KeyVisualProps> = ({ keybind }) => {
  if (keybind.length === 0) return;
  return (
    <kbd className='px-2 py-1.5 text-xs font-semibold text-heading border border-bg-300 bg-bg-100 rounded'>
      {keybind[0].toUpperCase()}
      {keybind.length > 1 && keybind.substring(1).toLowerCase()}
    </kbd>
  );
};

interface KeybindVisualProps {
  shortcut: ShortcutConfig;
}

export const KeybindVisual: React.FC<KeybindVisualProps> = ({ shortcut }) => {
  if (shortcut.type === ShortcutType.REGULAR) {
    const keyCombo = shortcut.keyCombo;
    const keys: (string | null)[] = keyCombo.split('+');

    for (let i = keys.length - 1; i >= 1; i--) {
      keys.splice(i, 0, null);
    }

    return (
      <span>
        {keys.map((key, index) => {
          if (key === null) {
            return <span key={index}> + </span>;
          } else {
            return <KeyVisual keybind={key} key={index} />;
          }
        })}
      </span>
    );
  } else {
    return <kbd>Ctrl</kbd>;
  }
};
