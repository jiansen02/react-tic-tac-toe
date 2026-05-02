# 🎮 Real-Time Multiplayer Tic Tac Toe (React + Firebase)

A fully interactive, real-time multiplayer Tic Tac Toe web application built with React and Firebase Realtime Database. This project demonstrates state management, real-time synchronization, and scalable frontend architecture.

🔗 **Live Demo:** https://jiansen02.github.io/react-tic-tac-toe
📂 **Repository:** https://github.com/jiansen02/react-tic-tac-toe

---

## ✨ Key Features

* 🌐 **Real-Time Multiplayer Gameplay**

  * Create and join game rooms via unique room codes
  * Instant synchronization of moves between players
* ❌⭕ Turn-based logic with automatic player assignment (X / O)
* 🧠 **Game State Synchronization via Firebase**
* 🚫 Prevents invalid moves and enforces turn order
* 🏆 Winner detection logic with game state locking
* 🔄 Persistent game state stored in cloud database
* 📱 Responsive UI with smooth interaction

---

## 🛠️ Tech Stack

* **Frontend:** React (JavaScript)
* **State Management:** React Hooks (`useState`, `useEffect`)
* **Backend (Realtime):** Firebase Realtime Database
* **Deployment:** GitHub Pages

---

## 🧠 Technical Highlights

### 1. Real-Time Synchronization (Core Feature)

* Utilized Firebase Realtime Database to maintain shared game state
* Leveraged `onValue()` listeners to instantly update UI across clients
* Ensured consistent state across multiple players without manual refresh

---

### 2. Room-Based Multiplayer Architecture

* Generated unique room IDs for session isolation
* Stored each game under:

```text
rooms/{roomId}
```

* Allowed multiple concurrent games without interference

---

### 3. Immutable State Updates

* Used `slice()` to create new board states instead of mutating arrays
* Prevented UI inconsistencies and ensured predictable rendering

---

### 4. Turn Validation Logic

* Enforced player turns using:

```text
xIsNext + playerSymbol
```

* Prevented cheating or invalid moves from clients

---

### 5. Cloud-Driven UI Rendering

* UI reacts entirely to database changes
* Eliminates need for manual synchronization logic

---

## 🚀 Getting Started

### 1. Clone repository

```bash
git clone https://github.com/jiansen02/react-tic-tac-toe.git
cd react-tic-tac-toe
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Run locally

```bash
npm start
```

Open:

```text
http://localhost:3000
```

---

## 🌐 Multiplayer Usage

```text
1. Player 1 clicks "Create Game"
2. A room code is generated
3. Player 2 enters the room code and clicks "Join Game"
4. Both players are connected in real time
```

---

## 📦 Available Scripts

```bash
npm start        # Run development server
npm run build    # Build production version
npm run deploy   # Deploy to GitHub Pages
```

---

## 🌍 Deployment

This project is deployed using GitHub Pages:

```bash
npm run deploy
```

Live at:

```text
https://jiansen02.github.io/react-tic-tac-toe
```

