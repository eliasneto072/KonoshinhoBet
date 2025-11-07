import React, { useEffect, useRef, useState } from "react";

// SlotMachine.tsx
// Componente funcional de um caça-níqueis simples (React + TypeScript)
// Salvá-lo em src/components/SlotMachine.tsx e importe em App.tsx

const SYMBOLS = ["🍒", "7️⃣", "💎", "🍋", "🔔", "⭐", "🍀"];

export default function SlotMachine() {
  const [reels, setReels] = useState<string[]>(["🍒", "🍒", "🍒"]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [credits, setCredits] = useState(1000);
  const [bet, setBet] = useState(10);
  const [message, setMessage] = useState("");
  const spinInterval = useRef<number | null>(null);

  // Gera símbolo aleatório
  function randSymbol() {
    return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
  }

  // Anima os rolos trocando símbolos rapidamente
  function startSpinAnimation() {
    if (spinInterval.current) window.clearInterval(spinInterval.current);
    spinInterval.current = window.setInterval(() => {
      setReels([randSymbol(), randSymbol(), randSymbol()]);
    }, 80);
  }

  // Para animação e calcula resultado
  function stopSpinAndResolve() {
    if (spinInterval.current) {
      window.clearInterval(spinInterval.current);
      spinInterval.current = null;
    }

    // Resultado final (mais justo usando RNG aqui)
    const final = [randSymbol(), randSymbol(), randSymbol()];
    setReels(final);

    // Calcula premiação
    const [a, b, c] = final;
    let payout = 0;
    if (a === b && b === c) {
      // triplo
      if (a === "7️⃣") payout = bet * 50; // jackpot 7
      else if (a === "💎") payout = bet * 20; // gem boost
      else payout = bet * 10;
      setMessage("TRIPLO! Ganhou 👑");
    } else if (a === b || a === c || b === c) {
      payout = bet * 2; // dois iguais
      setMessage("Dois iguais — venceu!");
    } else {
      payout = 0;
      setMessage("Perdeu — tente de novo!");
    }

    if (payout > 0) setCredits((s) => s + payout);
  }

  // Ação do botão Spin
  function handleSpin() {
    if (isSpinning) return;
    if (bet <= 0) {
      setMessage("Aposta inválida");
      return;
    }
    if (bet > credits) {
      setMessage("Créditos insuficientes");
      return;
    }

    // debita aposta
    setCredits((c) => c - bet);
    setMessage("");
    setIsSpinning(true);
    startSpinAnimation();

    // Após 1.6s parar (simula duração do giro) — pode-se ajustar
    setTimeout(() => {
      stopSpinAndResolve();
      setIsSpinning(false);
    }, 1600);
  }

  useEffect(() => {
    // limpa intervalo em unmount
    return () => {
      if (spinInterval.current) window.clearInterval(spinInterval.current);
    };
  }, []);

  // Estilinho simples inline para facilitar inclusão direta
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

  const reelStyle: React.CSSProperties = {
    display: "inline-block",
    width: 120,
    height: 120,
    lineHeight: "120px",
    fontSize: 48,
    margin: "0 10px",
    background: "rgba(0,0,0,0.45)",
    borderRadius: 10,
    border: "1px solid rgba(255,200,50,0.18)",
    transition: "transform 200ms",
  };

  const btnStyle: React.CSSProperties = {
    marginTop: 18,
    padding: "0.8rem 1.6rem",
    fontSize: 16,
    borderRadius: 10,
    border: "none",
    cursor: isSpinning ? "not-allowed" : "pointer",
    background: isSpinning ? "#777" : "gold",
    color: isSpinning ? "#222" : "#000",
    fontWeight: 700,
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: 6 }}>🎰 Slot Machine</h2>
      <p style={{ color: "#ffd" }}>Créditos: <strong>{credits}</strong> — Aposta: <strong>{bet}</strong></p>

      <div style={{ marginTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ ...reelStyle, transform: isSpinning ? "translateY(-4px) scale(1.02)" : "none" }}>{reels[0]}</div>
          <div style={{ ...reelStyle, transform: isSpinning ? "translateY(-2px) scale(1.03)" : "none" }}>{reels[1]}</div>
          <div style={{ ...reelStyle, transform: isSpinning ? "translateY(-6px) scale(1.01)" : "none" }}>{reels[2]}</div>
        </div>
      </div>

      <div style={{ marginTop: 14, display: "flex", justifyContent: "center", gap: 12, alignItems: "center" }}>
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

        <button style={btnStyle} onClick={handleSpin} disabled={isSpinning}>
          {isSpinning ? "Girando..." : "Girar"}
        </button>

        <button
          style={{ ...btnStyle, background: "#444", color: "#fff", fontWeight: 600 }}
          onClick={() => {
            // pequena função de sacar/encerrar — aqui apenas reseta créditos pra demo
            setCredits(1000);
            setMessage("Créditos resetados para 1000");
          }}
        >
          Reset
        </button>
      </div>

      <p style={{ marginTop: 12, color: "#ffd" }}>{message}</p>

      <small style={{ display: "block", marginTop: 8, color: "#bdb" }}>
        Regras: 3 iguais = prêmio grande. 2 iguais = prêmio pequeno. 7️⃣ triplo é jackpot.
      </small>
    </div>
  );
}
