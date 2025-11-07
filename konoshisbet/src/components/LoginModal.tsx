// src/components/LoginModal.tsx
import React, { useState } from "react";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: { name: string; balance: number }) => void;
};

export default function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email.includes("@") || password.length < 4) {
      setError("Email inválido ou senha muito curta");
      setLoading(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (isRegister) {
      if (!name.trim()) {
        setError("Nome é obrigatório");
        setLoading(false);
        return;
      }
      const newUser = { name: name.trim(), email, balance: 5000 };
      localStorage.setItem("casinoUser", JSON.stringify(newUser));
      onLogin(newUser);
    } else {
      if (email === "demo@supreme.com" && password === "1234") {
        const user = { name: "Demo Player", balance: 10000 };
        localStorage.setItem("casinoUser", JSON.stringify(user));
        onLogin(user);
      } else {
        setError("Credenciais inválidas. Use: demo@supreme.com / 1234");
      }
    }

    setLoading(false);
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    setError("");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isRegister ? "Crie sua conta" : "Entre no Supreme Casino"}</h2>
          <p style={{ fontSize: "0.9rem", color: "#ffd" }}> 
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {isRegister && (
            <input
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error-msg">{error}</p>}

          {/* BOTÃO ÚNICO: Entrar / Cadastrar */}
          <button type="submit" disabled={loading} className="login-btn">
            {loading ? "Carregando..." : isRegister ? "Cadastrar" : "Entrar"}
          </button>
        </form>

        <p className="toggle-mode">
          {isRegister ? "Já tem conta?" : "Não tem conta?"}{" "}
          <button type="button" onClick={toggleMode} className="link-btn">
            {isRegister ? "Faça login" : "Cadastre-se"}
          </button>
        </p>
      </div>
    </div>
  );
}