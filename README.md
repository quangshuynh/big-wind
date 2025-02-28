# Fart Factory Tycoon

## Overview

Fart Factory Tycoon is a humorous incremental (clicker) game built with React, Redux, Node.js, Express, and SQLite. The game revolves around the absurd premise of collecting, refining, and selling farts. This README outlines the project structure, setup instructions, core gameplay mechanics, and future development plans.

## MVP Features

This Minimum Viable Product (MVP) focuses on the core gameplay loop:

*   **User Authentication:**
    *   Simple username/password login and registration.
    *   Secure password storage using bcrypt.
    *   JWT (JSON Web Token) authentication for API requests.
*   **Click-to-Fart:**
    *   A prominent "fart button" (currently a 🍑💨 emoji, but ideally an image) generates "Pffts" (the base currency) on each click.
    *   Visual and auditory feedback (simple animation and a fart sound effect using Howler.js).
*   **Basic Jars:**
    *   Players start with a single type of jar (Mason Jar).
    *   Jars passively collect Pffts over time (a slow, constant rate).
    *   Jars have a limited capacity (initially 10 Pffts).
    *   A visual representation of the jar's fill level (a simple progress bar).
*   **Simple Store:**
    *   Players can "buy" more Mason Jars using Pffts.
    *   Jars have a fixed price in the MVP.
*   **Basic Selling:**
    *   Players can "sell" full jars for a fixed amount of Pffts.
    *   A "sell" button appears when a jar is full.
*   **Persistence:**
    *   User data (Pffts, jars, username) is saved to a local SQLite database.
    *   Data is loaded automatically on login.
    *   Data is saved when clicking the "Save Game" button.
* **Upgrades**:
    *   **Spicier Diet:** Increases Pffts per click.
    *   **Improved Digestion:**  Adds a small passive Pfft generation per second.
    *   **Butt Muscle Training:** Increases click speed (adds another fart per click)

## Project Structure
```
big-wind/
├── backend/ # Node.js/Express backend
│ ├── models/ # Sequelize database models
│ │ └── user.js (User model)
│ ├── routes/ # API routes
│ │ ├── auth.js (Authentication routes)
│ │ └── user.js (User data routes)
│ ├── config/ # Configuration files
│ │ └── database.js (Database connection setup)
│ ├── server.js (Main backend file)
│ ├── package.json (Backend dependencies)
│ └── .env (environment variables, JWT_SECRET)
├── frontend/ # React frontend
│ ├── public/ # Static assets (images, sounds)
│ │ └── sounds/ # Sound files (fart.mp3)
│ ├── src/ # React source code
│ │ ├── components/ # React components
│ │ │ ├── Auth/ # Authentication components
│ │ │ │ ├── Login.js
│ │ │ │ └── Register.js
│ │ │ ├── Game/ # Game components
│ │ │ │ ├── FartButton.js
│ │ │ │ ├── Inventory.js
│ │ │ │ ├── Jar.js
│ │ │ │ ├── Store.js
│ │ │ │ ├── UpgradePanel.js
│ │ │ │ └── StoreItem.js
│ │ │ └── UI/ #Reusable UI
│ │ │ └── Notifications.js
│ │ ├── store/ # Redux store
│ │ │ ├── authSlice.js (Authentication slice)
│ │ │ ├── gameSlice.js (Game state slice)
│ │ │ └── index.js (Redux store setup)
│ │ ├── services/ # API interaction
│ │ │ └── api.js (API request functions)
│ │ ├── App.js
│ │ ├── index.js
│ │ └── index.css
│ ├── package.json (Frontend dependencies)
│ └── .env (environment variables, API url)
└── README.md
```

## Setup Instructions

1.  **Prerequisites:**

    *   Node.js (version 16 or higher recommended) and npm (Node Package Manager) installed.

2.  **Clone the Repository (if you have it on GitHub/GitLab):**

    ```bash
    git clone <your-repository-url>
    cd fart-factory-tycoon
    ```
     If you *don't* have a repository yet, create the `fart-factory-tycoon` directory manually, and then follow the backend and frontend setup instructions below. You can initialize a Git repository later with `git init`.

3.  **Backend Setup:**

    *   Navigate to the `backend` directory:

        ```bash
        cd backend
        ```

    *   Install backend dependencies:

        ```bash
        npm install
        ```

    *   Create a `.env` file in the `backend` directory and add the following:

        ```
        JWT_SECRET=your-super-secret-key
        ```

        Replace `your-super-secret-key` with a strong, randomly generated secret key.  This is *crucial* for security.  You can generate a strong key using a tool like `openssl rand -base64 32`.

4.  **Frontend Setup:**

    *   Navigate to the `frontend` directory:

        ```bash
        cd ../frontend
        ```

    *   Install frontend dependencies:

        ```bash
        npm install
        ```
    *   Create a `.env` file in the `frontend` directory and add:
        ```
        REACT_APP_API_URL=http://localhost:5000/api
        ```
5. **Get a Fart sound**
    * Place a sound file called 'fart.mp3' in `frontend/public/sounds`

## Running the Application

1.  **Start the Backend Server:**

    *   In the `backend` directory, run:

        ```bash
        node server.js
        ```

    *   You should see messages indicating that the database connection is successful and the server is running on port 5000.

2.  **Start the Frontend Development Server:**

    *   In the `frontend` directory, run:

        ```bash
        npm start
        ```

    *   This will open the application in your default web browser (usually at `http://localhost:3000`).

## Gameplay (MVP)

1.  **Register/Login:** Create a new user account or log in with existing credentials.
2.  **Click the Butt:** Click the "🍑💨" button to generate Pffts.
3.  **Fill Jars:** Jars will passively fill with Pffts over time.  The rate is very slow initially.
4.  **Buy Jars:** Use your accumulated Pffts to buy more jars from the store.
5.  **Sell Jars:** When a jar is full, click the "Sell" button to sell it for Pffts.
6. **Buy upgrades**: Use your Pffts to level up skills and gain more income.
7.  **Save:** Click "Save Game" to save your progress.
8. **Logout:** Click "Logout" to end the session.

## Future Development

This MVP is just the beginning! Here are some planned features for future development:

*   **Expanded Diet System:** Introduce different food items with varying effects on fart production, quality, and risk.
*   **Advanced Jars and Containment:** Add different types of jars and larger storage units (tanks, silos).
*   **Fart Quality and Blending:** Implement a system for classifying farts by quality and allowing players to blend different types.
*   **Farming and Automation:** Allow players to grow crops and raise animals to produce fart-inducing ingredients, with automation options inspired by Minecraft's Create mod.
*   **Research and Inventions:** Introduce a research tree to unlock new technologies and inventions.
*   **Market Fluctuations and Trading:** Create a dynamic market where fart prices fluctuate, and (potentially) allow players to trade farts.
*   **Multiplayer Features:** Explore options for social interaction, such as trading, competitions, or guilds.
*   **Prestige System:** Implement a "Great Release" prestige mechanic.
* **More upgrades:** Add more skills and things to do.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

## License

This project is currently unlicensed (meaning all rights are reserved).  You'll need to decide on a license (e.g., MIT, GPL, etc.) if you want to allow others to use or modify your code.