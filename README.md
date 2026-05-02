# 🎮 React Tic Tac Toe (with Time Travel & Win Animation)

A modern, interactive Tic Tac Toe web application built with React, demonstrating state management, component architecture, and dynamic UI behavior.

🔗 **Live Demo:** https://jiansen02.github.io/react-tic-tac-toe  
---

## ✨ Key Features

- ❌⭕ Turn-based gameplay (X vs O)
- 🧠 **Time Travel (Move History)** — jump to any previous game state
- 🏆 **Winner Detection Algorithm**
- 🐵 **Animated Win Popup** with dynamic UI rendering
- 🚫 Prevents invalid moves (occupied squares / post-win)
- 🎨 Responsive and interactive UI with hover effects
- 🔄 State-driven rendering using React Hooks

---

## 🛠️ Tech Stack

- **Frontend:** React (JavaScript)
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Styling:** CSS
- **Deployment:** GitHub Pages

---

## 🧠 Technical Highlights

### 1. Immutable State Management
- Each move creates a **new board state** (`nextSquares`)
- Enables reliable rendering and undo functionality
- Avoids direct mutation of state

### 2. Time Travel Logic
- Game history stored as an array of board snapshots
- Users can jump to any previous move
- Future states are discarded correctly when branching

### 3. Dynamic UI Rendering
- Conditional rendering for:
  - Game status (Next Player / Winner)
  - Win popup animation
- Popup automatically disappears when navigating history

### 4. Winner Detection Algorithm
- Efficient check across all possible winning combinations
- Prevents further interaction after game completion

---
