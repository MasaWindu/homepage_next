"use client";

import { useState } from "react";

type HeaderProps = {
  logoUrl: string;
};

export function Header({ logoUrl }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <img src={logoUrl} alt="icon" className="header-logo" />
      
      {/* Desktop Navigation */}
      <nav className="header-nav">
        <a href="#Awards">Awards</a>
        <a href="#Publications">Publication</a>
        <a href="#Biography">Biography</a>
      </nav>

      {/* Hamburger Button */}
      <button 
        className={`hamburger ${isMenuOpen ? "active" : ""}`} 
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Mobile Navigation Overlay */}
      <nav className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        <a href="#Awards" onClick={closeMenu}>Awards</a>
        <a href="#Publications" onClick={closeMenu}>Publication</a>
        <a href="#Biography" onClick={closeMenu}>Biography</a>
      </nav>
    </header>
  );
}
