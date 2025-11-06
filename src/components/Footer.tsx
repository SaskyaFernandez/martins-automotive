export default function Footer() {
  return (
    <footer className="bg-white text-black py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Copyright */}
        <p className="text-sm">
          © {new Date().getFullYear()} Martins Automotive. Tous droits réservés.
        </p>

        {/* Liens réseaux sociaux */}
        <div className="flex gap-4">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-500 transition"
          >
            <i className="fab fa-facebook-f"></i> Facebook
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-500 transition"
          >
            <i className="fab fa-instagram"></i> Instagram
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-500 transition"
          >
            <i className="fab fa-linkedin-in"></i> LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
