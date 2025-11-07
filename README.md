# Konoshi's Casino – Demo de Jogos de Cassino em React + TypeScript
 

Um **projeto demo interativo** de um cassino online com três jogos totalmente funcionais:

- **Slot Machine** – Caça-níqueis com animações e jackpots
- **Golden Dice** – Dados dourados com multiplicadores (x8 no 6!)
- **Roulette Royale** – Roleta simplificada (pares ganham, zero é jackpot!)

Tudo construído com **React + TypeScript**, estilizado com **CSS puro** e efeitos visuais temáticos de cassino.

---

## Funcionalidades

- Interface responsiva com tema de cassino luxuoso
- Seleção de jogos com destaque visual
- Sistema de créditos compartilhado (inicia com 1000)
- Apostas ajustáveis
- Animações realistas (giro, rolagem, dados)
- Mensagens de feedback em tempo real
- Botão **Reset** para reiniciar créditos
- Totalmente offline – funciona sem backend

---

## Tecnologias Utilizadas

| Tecnologia       | Uso |
|------------------|-----|
| **React**        | Componentes reutilizáveis |
| **TypeScript**   | Tipagem segura |
| **Vite**         | Build rápido (padrão do projeto) |
| **CSS**          | Estilização com gradientes, sombras e transições |
| **React Hooks**  | `useState`, `useEffect`, `useRef` |

---

## Estrutura do Projeto

src/
├── components/
│   ├── Footer.tsx
│   ├── GameShowcase.tsx
│   ├── GolderDice.tsx          
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── RouletteRoyale.tsx
│   └── SlotMachine.tsx
├── App.tsx
├── App.css
├── index.css
└── main.tsx


> **Nota**: O arquivo `GolderDice.tsx` tem um **erro de digitação** no nome. Recomenda-se renomear para `GoldenDice.tsx` e atualizar a importação em `App.tsx`.

---

## Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v18+ recomendado)
- npm, yarn ou pnpm

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/supreme-casino.git
cd supreme-casino

# 2. Instale as dependências
npm install
# ou
yarn
# ou
pnpm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev
# ou
pnpm dev

Acesse em: http://localhost:5173

Jogos Disponíveis
1. Slot Machine

3 rolos com 7 símbolos
Regras:

3 iguais → x10 (ou x20 para 💎, x50 para 7️⃣)
2 iguais → x2

Animação fluida com setInterval

2. Golden Dice

Dado de 1 a 6
Regras:

6 → Jackpot x8
4 ou 5 → x3
1, 2, 3 → perda

Efeito de rolagem com setTimeout

3. Roulette Royale

Roleta de 0 a 36
Regras:

0 → Jackpot x15
Números pares → x2
Ímpares → perda

Animação de giro com cubic-bezier


 

 
