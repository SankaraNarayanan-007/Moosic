# MOOSIC | Premium Audio Studio

A high-fidelity music streaming app built with a **Glassmorphism** aesthetic, featuring real-time audio visualization and local persistence.

##  Features
* **Aura UI**: Sophisticated dark theme with electric violet accents and mesh gradients.
* **Live Visualizer**: Interactive frequency waveform using the Web Audio API.
* **Smart Search**: Real-time music discovery via iTunes API integration.
* **Favorites**: Persistent "Liked Songs" library stored via `localStorage`.
* **Secure Auth**: Custom-built registration and login session management.

##  Tech Stack
* **Frontend**: HTML5, CSS3 (Custom Props, Backdrop Filters)
* **Logic**: Vanilla JavaScript (ES6+)
* **Audio**: Web Audio API & Audio Engine
* **Icons/Type**: Font Awesome, Google Fonts (Inter)

##  Structure
* `index.html`: Core layout and Auth overlay.
* `glass-styles.css`: Theme engine and responsive grid.
* `music-engine.js`: Playback logic and audio analysis.
* `ui-engine.js`: Dynamic rendering and tab management.
* `auth-engine.js`: User data and session simulation.

##  Quick Start
1.  Clone the repo: `git clone https://github.com/user/moosic.git`
2.  Open `index.html` in any modern browser.
3.  Register a new account and start searching for tracks.
