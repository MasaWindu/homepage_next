type HeaderProps = {
  logoUrl: string;
};

export function Header({ logoUrl }: HeaderProps) {
  return (
    <header className="header">
      <img src={logoUrl} alt="icon" className="header-logo" />
      <nav className="header-nav">
        <a href="#Awards">Awards</a>
        <a href="#Publications">Publication</a>
        <a href="#Biography">Biography</a>
      </nav>
    </header>
  );
}
