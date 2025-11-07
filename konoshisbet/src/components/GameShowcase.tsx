type GameShowcaseProps = {
  onSelectGame: (gameName: string) => void;
  selectedGame: string | null;
};

export default function GameShowcase({ onSelectGame, selectedGame }: GameShowcaseProps) {
  const games = [
    {
      name: "Slot Machine",
      img: "https://png.pngtree.com/png-clipart/20241115/original/pngtree-luck-in-a-lever-traditional-slot-machine-design-png-image_17089875.png",
    },
    {
      name: "Golden Dice",
      img: "https://www.pngall.com/wp-content/uploads/2016/04/Dice-PNG.png",
    },
    {
      name: "Roulette Royale",
      img: "https://images.vexels.com/media/users/3/151205/isolated/preview/8857efb275fbf2435db40a222d05b1e6-icone-da-roda-de-roleta.png",
    },
    {
      name: "Mines",
      img: "https://em-content.zobj.net/source/emojidex/112/bomb_1f4a3.png",
    },
  ];

  return (
    <section id="games" className="game-showcase">
      <h3>Jogos Populares</h3>
      <div className="games-grid">
        {games.map((g) => (
          <div
            key={g.name}
            className={`game-card ${selectedGame === g.name ? "active" : ""}`}
            onClick={() => onSelectGame(g.name)}
            style={{
              cursor: "pointer",
              border: selectedGame === g.name ? "2px solid gold" : "2px solid transparent",
              transition: "border 0.3s",
              padding: "1rem",
              borderRadius: 10,
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <img
              src={g.img}
              alt={g.name}
              style={{
                width: 80, // 👈 tamanho reduzido
                height: 80,
                objectFit: "contain",
                marginBottom: 8,
              }}
            />
            <h4 style={{ fontSize: 16 }}>{g.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}

