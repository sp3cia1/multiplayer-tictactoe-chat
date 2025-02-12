# Real-time Multiplayer Tic Tac Toe with WebSocket Chat

## Overview

This project is a **real-time, browser-based Multiplayer Tic Tac Toe game** that allows two players to compete against each other interactively over the internet.  A key feature of this application is its **real-time communication** powered by **WebSockets**, enabling seamless and instantaneous gameplay updates and in-game chat.

Built as a **full-stack application**, the project comprises:

*   **React Front-End:**  Provides a dynamic and responsive user interface for the game, handling user interactions and displaying the game state in real-time.
*   **Node.js WebSocket Server:**  Acts as the central communication hub, managing game rooms, handling player connections, enforcing game logic, and broadcasting real-time updates to connected clients.

This project showcases skills in real-time web development, client-server architecture, WebSocket implementation, front-end development with React, and back-end logic with Node.js.

## Features

*   **Real-time Multiplayer Gameplay:**  Two players can join a game room and play Tic Tac Toe against each other in real-time within the browser.
*   **WebSocket-Based Communication:**  Utilizes WebSockets for bidirectional, low-latency communication between the server and clients, ensuring immediate game updates.
*   **In-Game Chat Feature:**  Integrated chat functionality allows players to communicate with each other within the game room in real-time.
*   **Game Room Management:**  The Node.js server manages game rooms, ensuring that only two players can join a room and facilitating matchmaking (basic room joining by roomId).
*   **Real-time Game State Updates:**  Game board state, player turns, and win/draw conditions are updated and broadcasted to both players in real-time via WebSockets.
*   **Client-Side Input Validation:**  Client-side validation (in React) prevents invalid moves and ensures adherence to game rules, enhancing user experience and preventing cheating.
*   **Clear Separation of Concerns:**  Well-structured server-side code with separate functions for handling connections, messages, broadcasting, and room management, promoting maintainability.
*   **Responsive React Front-End:**  Designed with React components for a modular and maintainable front-end structure.

## Gameplay

1.  **Joining a Game:** Players can join a game by entering a unique Room ID in the React front-end.
2.  **Real-time Interaction:** Once two players are in the same room, the game begins. Players take turns clicking on cells on the Tic Tac Toe board.
3.  **Real-time Updates:** Moves made by one player are instantly reflected on the other player's game board via WebSocket communication.
4.  **Win/Draw Detection:** The server-side logic detects win conditions and draw games, broadcasting the game result to both players in real-time.
5.  **In-Game Chat:** Players can use the chat interface to communicate with each other during the game, enhancing the interactive experience.

## Technologies Used

*   **Front-End:**
    *   React
    *   JavaScript (ES6+)
    *   HTML
    *   CSS
    *   `react-use-websocket` (React Hook for WebSocket management)
*   **Back-End:**
    *   Node.js
    *   `ws` (WebSocket library for Node.js) 
*   **Communication Protocol:** WebSockets

