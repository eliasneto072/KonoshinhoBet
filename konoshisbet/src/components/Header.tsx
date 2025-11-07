// src/components/Header.tsx
import { useState } from "react";

type HeaderProps = {
  user: { name: string; balance: number } | null;
  onLoginClick: () => void;
  onLogout: () => void;
};

export default function Header({ user, onLoginClick, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <h1 className="logo">Supreme Casino</h1>
      <button
        className="menu-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? "✕" : "☰"}
      </button>
      <nav className={isMenuOpen ? "active" : ""}>
        <a href="#games" onClick={() => setIsMenuOpen(false)}>Jogos</a>
        <a href="#bonus" onClick={() => setIsMenuOpen(false)}>Bônus</a>
        <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contato</a>

        {user ? (
          <>
            <a href="#balance" onClick={() => setIsMenuOpen(false)}>
              Olá, <strong>{user.name.split(" ")[0]}</strong> | R$ {user.balance.toLocaleString()}
            </a>
            <a href="#logout" onClick={() => { onLogout(); setIsMenuOpen(false); }}>
              Sair
            </a>
          </>
        ) : (
          <>
            <a href="#login" onClick={() => { onLoginClick(); setIsMenuOpen(false); }}>
              Login
            </a>
            <a href="#register" onClick={() => { onLoginClick(); setIsMenuOpen(false); }}>
              Cadastre-se
            </a>
          </>
        )}
      </nav>
    </header>
  );
}