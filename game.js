// Global State to track current user
let currentUser = null;
let gameData = {
    managerName: "",
    team: "",
    hasStarted: false
};

// 1. Navigation Controller
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
}

// 2. Login Logic
function login() {
    const username = document.getElementById('login-username').value;
    if (!username) return alert("Please enter a username");

    currentUser = username;
    const saved = localStorage.getItem(`cricket_save_${currentUser}`);
    
    if (saved) {
        gameData = JSON.parse(saved);
        document.getElementById('continue-btn').style.opacity = "1";
    } else {
        document.getElementById('continue-btn').style.opacity = "0.5";
    }
    
    showScreen('menu-screen');
}

// 3. New Game Logic
function showNewGame() {
    showScreen('new-game-screen');
}

function startNewGame() {
    const name = document.getElementById('mgr-name').value;
    const team = document.getElementById('team-select').value;

    if (!name) return alert("Please enter your name");

    gameData = { managerName: name, team: team, hasStarted: true };
    saveToStorage();
    alert(`Welcome Coach ${name}! Your career with ${team} has begun.`);
    showScreen('menu-screen');
}

// 4. Continue/Settings Logic
function continueGame() {
    if (gameData.hasStarted) {
        alert(`Loading Career: Coach ${gameData.managerName} of ${gameData.team}`);
        // Here we would eventually go to the Dashboard
    } else {
        alert("No save found. Start a New Game!");
    }
}

function showSettings() {
    document.getElementById('edit-name').value = gameData.managerName;
    document.getElementById('edit-team').value = gameData.team;
    showScreen('settings-screen');
}

function saveSettings() {
    gameData.managerName = document.getElementById('edit-name').value;
    gameData.team = document.getElementById('edit-team').value;
    saveToStorage();
    alert("Settings Updated!");
    showScreen('menu-screen');
}

// 5. System Functions
function saveToStorage() {
    localStorage.setItem(`cricket_save_${currentUser}`, JSON.stringify(gameData));
}

function logout() {
    currentUser = null;
    gameData = { managerName: "", team: "", hasStarted: false };
    document.getElementById('login-username').value = "";
    showScreen('landing-screen');
}
