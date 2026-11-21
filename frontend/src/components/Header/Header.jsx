import './Header.css'

const NAV_LINKS = [
  { label: 'Cartelera', href: '#billboard' },
  { label: 'Estrenos', href: '#premieres' },
  { label: 'Contacto', href: '#contact' },
]

// Top bar with the cinema name, the main navigation and the favorites counter.
function Header({ cinemaName, favoritesCount }) {
  return (
    <header className="header">
      <div className="header__inner container">
        <a href="#" className="header__brand">
          <span className="header__logo" aria-hidden="true">🎬</span>
          {cinemaName}
        </a>
        <nav aria-label="Navegación principal">
          <ul className="header__nav">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="header__link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <span className="header__favorites" aria-live="polite">
          ♥ {favoritesCount} {favoritesCount === 1 ? 'favorita' : 'favoritas'}
        </span>
      </div>
    </header>
  )
}

export default Header
