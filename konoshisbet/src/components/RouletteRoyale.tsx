import React, { useState } from "react";

export default function RouletteRoyale() {
  const [credits, setCredits] = useState(1000);
  const [bet, setBet] = useState(10);
  const [result, setResult] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [message, setMessage] = useState("");

  function spin() {
    if (isSpinning) return;
    if (bet <= 0 || bet > credits) {
      setMessage("Aposta inválida ou créditos insuficientes!");
      return;
    }

    setCredits((c) => c - bet);
    setIsSpinning(true);
    setMessage("🎡 Girando a roleta...");

    setTimeout(() => {
      const number = Math.floor(Math.random() * 36);
      setResult(number);

      let payout = 0;
      if (number === 0) {
        payout = bet * 15;
        setMessage("💚 Zero! Jackpot real!");
      } else if (number % 2 === 0) {
        payout = bet * 2;
        setMessage("🔴 Número par — vitória!");
      } else {
        setMessage("⚫ Número ímpar — perdeu!");
      }

      if (payout > 0) setCredits((c) => c + payout);
      setIsSpinning(false);
    }, 1800);
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

  const wheelStyle: React.CSSProperties = {
    margin: "20px auto",
    width: 200,
    height: 200,
    borderRadius: "50%",
    border: "8px solid gold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 40,
    color: "gold",
    transform: isSpinning ? "rotate(1440deg)" : "none",
    transition: "transform 1.8s cubic-bezier(.23,1.32,.48,1.01)",
  };

  const btnStyle: React.CSSProperties = {
    padding: "0.8rem 1.6rem",
    fontSize: 16,
    borderRadius: 10,
    border: "none",
    cursor: isSpinning ? "not-allowed" : "pointer",
    background: isSpinning ? "#777" : "gold",
    color: isSpinning ? "#222" : "#000",
    fontWeight: 700,
    marginLeft: 8,
  };

  return (
    <div style={containerStyle}>
      <h2>🎡 Roulette Royale</h2>
      <p style={{ color: "#ffd" }}>
        Créditos: <strong>{credits}</strong> — Aposta: <strong>{bet}</strong>
      </p>

      <div style={wheelStyle}>{result !== null ? result : "🎡"}</div>

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
        <button style={btnStyle} onClick={spin} disabled={isSpinning}>
          {isSpinning ? "Girando..." : "Girar"}
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
        Regras: 0 = Jackpot (x15). Números pares ganham (x2).
      </small>
    </div>
  );
}
