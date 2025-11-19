export default function Footer() {
  return (
    <footer className="bg-white text-black py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
        {/* Copyright */}
        <p className="text-xs sm:text-sm text-center md:text-left">
          © {new Date().getFullYear()} Martins Automotive. Tous droits réservés.
        </p>

        {/* Liens réseaux sociaux */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
          <a
            href="https://www.facebook.com/profile.php?id=100050345177861"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-500 transition flex items-center gap-1"
          >
            <i className="fab fa-facebook-f"></i> Facebook
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-500 transition flex items-center gap-1"
          >
            <i className="fab fa-instagram"></i> Instagram
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-500 transition flex items-center gap-1"
          >
            <i className="fab fa-linkedin-in"></i> LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
