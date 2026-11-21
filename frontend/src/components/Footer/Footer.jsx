import './Footer.css'

// Bottom section with contact details and general information.
function Footer({ cinemaName, contact }) {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" id="contact">
      <div className="footer__inner container">
        <div>
          <h3 className="footer__title">{cinemaName}</h3>
          <p className="footer__text">
            Las mejores películas de la semana, en salas 2D y 3D.
          </p>
        </div>

        <div>
          <h3 className="footer__title">Contacto</h3>
          <ul className="footer__list">
            <li>📍 {contact.address}</li>
            <li>📞 {contact.phone}</li>
            <li>✉️ {contact.email}</li>
          </ul>
        </div>

        <div>
          <h3 className="footer__title">Horario de atención</h3>
          <p className="footer__text">{contact.schedule}</p>
        </div>
      </div>

      <p className="footer__copy">
        © {year} {cinemaName}. Todos los derechos reservados.
      </p>
    </footer>
  )
}

export default Footer
