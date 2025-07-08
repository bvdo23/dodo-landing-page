import Link from "next/link";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "./switcher";
import { useState, useEffect } from "react";

export default function Header() {
  const t = useTranslations("header");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="font-bold text-xl">
          <Link href="/" className="flex items-center">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
              Do Bui Van
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center">
          <ul className="flex space-x-8 font-medium">
            <li>
              <Link
                href="#about"
                className="hover:text-blue-600 transition duration-300"
              >
                {t("about")}
              </Link>
            </li>
            <li>
              <Link
                href="#skills"
                className="hover:text-blue-600 transition duration-300"
              >
                {t("skills")}
              </Link>
            </li>
            <li>
              <Link
                href="#experience"
                className="hover:text-blue-600 transition duration-300"
              >
                {t("experience")}
              </Link>
            </li>
            <li>
              <Link
                href="#projects"
                className="hover:text-blue-600 transition duration-300"
              >
                {t("projects")}
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="hover:text-blue-600 transition duration-300"
              >
                {t("contact")}
              </Link>
            </li>
            <li>
              <LocaleSwitcher />
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t py-4 px-6 shadow-lg">
          <ul className="space-y-4">
            <li>
              <Link
                href="#about"
                className="block py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("about")}
              </Link>
            </li>
            <li>
              <Link
                href="#skills"
                className="block py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("skills")}
              </Link>
            </li>
            <li>
              <Link
                href="#experience"
                className="block py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("experience")}
              </Link>
            </li>
            <li>
              <Link
                href="#projects"
                className="block py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("projects")}
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="block py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("contact")}
              </Link>
            </li>
            <li className="pt-2">
              <LocaleSwitcher />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
