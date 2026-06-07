export const KeybindVisual: React.FC = () => {
  return (
    <>
      <kbd className='px-2 py-1.5 text-xs font-semibold text-heading bg-neutral-tertiary border border-default-medium rounded-base'>
        Ctrl
      </kbd>{' '}
      +{' '}
      <kbd className='px-2 py-1.5 text-xs font-semibold text-heading bg-neutral-tertiary border border-default-medium rounded-base'>
        Shift
      </kbd>{' '}
      +{' '}
      <kbd className='px-2 py-1.5 text-xs font-semibold text-heading bg-neutral-tertiary border border-default-medium rounded-base'>
        R
      </kbd>
    </>
  );
};
