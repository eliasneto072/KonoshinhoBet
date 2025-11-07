import React, { useState } from "react";

export default function GoldenDice() {
  const [credits, setCredits] = useState(1000);
  const [bet, setBet] = useState(10);
  const [dice, setDice] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [message, setMessage] = useState("");

  function rollDice() {
    if (isRolling) return;
    if (bet <= 0 || bet > credits) {
      setMessage("Aposta inválida ou créditos insuficientes!");
      return;
    }

    setCredits((c) => c - bet);
    setIsRolling(true);
    setMessage("🎲 Rolando os dados...");

    setTimeout(() => {
      const result = Math.floor(Math.random() * 6) + 1;
      setDice(result);

      let payout = 0;
      if (result === 6) {
        payout = bet * 8;
        setMessage("✨ Número 6! Jackpot dourado!");
      } else if (result >= 4) {
        payout = bet * 3;
        setMessage("🎉 Boa jogada!");
      } else {
        setMessage("💀 Nada feito...");
      }

      if (payout > 0) setCredits((c) => c + payout);
      setIsRolling(false);
    }, 1200);
  }

  const containerStyle: React.CSSProperties = {
    maxWidth: 720,
    margin: "2rem auto",
    padding: "1.5rem",
    background: "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.25))",
    border: "1px solid rgba(255,200,50,0.12)",
    borderRadius: 12,
    color: "#fff",
    textAlign: "center",
    boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
  };

  const diceStyle: React.CSSProperties = {
    fontSize: 80,
    margin: "20px 0",
    transform: isRolling ? "rotate(360deg) scale(1.2)" : "none",
    transition: "transform 0.6s ease",
  };

  const btnStyle: React.CSSProperties = {
    padding: "0.8rem 1.6rem",
    fontSize: 16,
    borderRadius: 10,
    border: "none",
    cursor: isRolling ? "not-allowed" : "pointer",
    background: isRolling ? "#777" : "gold",
    color: isRolling ? "#222" : "#000",
    fontWeight: 700,
    marginLeft: 8,
  };

  return (
    <div style={containerStyle}>
      <h2>🎲 Golden Dice</h2>
      <p style={{ color: "#ffd" }}>
        Créditos: <strong>{credits}</strong> — Aposta: <strong>{bet}</strong>
      </p>

      <div style={diceStyle}>{dice ? `⚅`.repeat(dice) : "🎲"}</div>

      <div style={{ marginTop: 14 }}>
        <label style={{ fontSize: 14 }}>
          Aposta
          <input
            type="number"
            min={1}
            value={bet}
            onChange={(e) => setBet(Number(e.target.value))}
            style={{ marginLeft: 8, width: 100, padding: 8, borderRadius: 6 }}
          />
        </label>
        <button style={btnStyle} onClick={rollDice} disabled={isRolling}>
          {isRolling ? "Rolando..." : "Lançar"}
        </button>
        <button
          style={{ ...btnStyle, background: "#444", color: "#fff" }}
          onClick={() => {
            setCredits(1000);
            setMessage("Créditos resetados");
          }}
        >
          Reset
        </button>
      </div>

      <p style={{ marginTop: 12, color: "#ffd" }}>{message}</p>
      <small style={{ display: "block", marginTop: 8, color: "#bdb" }}>
        Regras: 6 = Jackpot (x8). 4 ou 5 = vitória (x3).
      </small>
    </div>
  );
}
