// src/App.tsx
import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import GameShowcase from "./components/GameShowcase";
import Footer from "./components/Footer";
import SlotMachine from "./components/SlotMachine";
import GoldenDice from "./components/GoldenDice";
import RouletteRoyale from "./components/RouletteRoyale";
import LoginModal from "./components/LoginModal";
import Mines from "./components/Mines"; // 👈 novo import

function App() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [user, setUser] = useState<{ name: string; balance: number } | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Carrega usuário do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("casinoUser");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const handleSelectGame = (gameName: string) => {
    setSelectedGame((prev) => (prev === gameName ? null : gameName));
  };

  const handleLogin = (userData: { name: string; balance: number }) => {
    setUser(userData);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("casinoUser");
    setUser(null);
  };

  return (
    <div className="App">
      <Header
        user={user}
        onLoginClick={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
      />
      <Hero />
      <GameShowcase onSelectGame={handleSelectGame} selectedGame={selectedGame} />

      {/* Jogos exibidos conforme a seleção */}
      {selectedGame === "Slot Machine" && <SlotMachine />}
      {selectedGame === "Golden Dice" && <GoldenDice />}
      {selectedGame === "Roulette Royale" && <RouletteRoyale />}
      {selectedGame === "Mines" && <Mines />} {/* 👈 novo jogo adicionado */}

      <Footer />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}

export default App;
