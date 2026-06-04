interface HrefProps {
  href: string;
  children: React.ReactNode;
}

export const Href: React.FC<HrefProps> = ({ href, children }) => {
  return (
    <a href={href} className='pretty-link group'>
      {children}
    </a>
  );
};
