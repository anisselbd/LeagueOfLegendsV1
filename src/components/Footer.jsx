import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="brand">
          
          <span className="brand-text">Anisselbd</span>
        </div>

        <nav className="links">
          <a href="https://github.com/anisselbd" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/anisse-lebadi/" target="_blank" rel="noreferrer">LinkedIn</a>
        </nav>

        <div className="copyright">© {year} Anisse Lebadi</div>
      </div>
    </footer>
  );
}