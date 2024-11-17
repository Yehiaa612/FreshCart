import FooterCss from '../Footer/Footer.module.css';
export default function Footer() {
  return (
    <>
      <footer className= "   end-0">
        <div className={FooterCss.footerBg}>
        <div className=" container  mx-auto text-center">
          <div className=" flex justify-center space-x-6  p-4">
            <a
              href="https://facebook.com"
              className="text-xl hover:text-blue-500"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://twitter.com"
              className="text-xl hover:text-blue-400"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              className="text-xl hover:text-pink-500"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <p className="text-sm mb-2">&copy; 2024 Fresh Cart. All rights reserved.</p>
          <p className="text-sm pb-4">
            Made by{' '}
            <a
              href="https://www.linkedin.com/in/yehia-ashraf-8a090525a/" 
              className="text-green-650 hover:underline text-green-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={FooterCss.myName}>Yehia Ashraf</span>
            </a>
          </p>
        </div>
        </div>

      </footer>
    </>
  );
}
