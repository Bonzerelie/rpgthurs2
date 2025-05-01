// Define game modes
const modes = {
    mode1: { notes: ['C4', 'D4'], displayText: 'Notes C and D from one octave' },
    mode2: { notes: ['C4', 'D4', 'E4'], displayText: 'Notes C, D and E from one octave' },
    mode3: { notes: ['C4', 'D4', 'E4', 'F4'], displayText: 'Notes C, D, E and F from one octave' },
    mode4: { notes: ['C4', 'D4', 'E4', 'F4', 'G4'], displayText: 'Notes C, D, E, F and G from one octave' },
    mode5: { notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4'], displayText: 'Notes C, D, E, F, G and A from one octave' },
    mode6: { notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'], displayText: 'Notes C, D, E, F, G, A and B from one octave' },
    mode7: { notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'], displayText: 'One Octave (notes C4 to C5)' },  // First 7 notes
    mode8: { notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'], displayText: 'One Octave (notes C4 to C5)' }  // Entire Octave C4 to C5
};

let currentMode;
let currentScore = 0;
let currentNoteIndex = 0;
let currentNote;
let noteOptions = [];
let noteAnswerButtons = [];
let correctAnswer;

// Get elements from HTML
const backButton = document.getElementById('backButton');
const resetScoreButton = document.getElementById('resetScoreButton');
const nextButton = document.getElementById('nextButton');
const noteRangeText = document.getElementById('noteRange');
const noteDisplay = document.getElementById('noteDisplay');
const noteOptionsDiv = document.getElementById('noteOptions');
const currentScoreText = document.getElementById('currentScore');
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const modeButtons = {
    mode1: document.getElementById('mode1'),
    mode2: document.getElementById('mode2'),
    mode3: document.getElementById('mode3'),
    mode4: document.getElementById('mode4'),
    mode5: document.getElementById('mode5'),
    mode6: document.getElementById('mode6'),
    mode7: document.getElementById('mode7'),
    mode8: document.getElementById('mode8')
};

// Function to show the start screen
function showStartScreen() {
    startScreen.style.display = "flex";
    gameScreen.style.display = "none";
}

// Function to show the game screen
function showGameScreen() {
    startScreen.style.display = "none";
    gameScreen.style.display = "flex";
}

// Function to start the game with a specific mode
function startGame(mode) {
    currentMode = mode;
    currentScore = 0;
    currentNoteIndex = 0;
    noteOptions = [...modes[mode].notes];
    correctAnswer = null;
    noteAnswerButtons = [];
    nextButton.disabled = true;
    showGameScreen();
    updateNoteDisplay();
    nextNote();
}

// Update the note display text according to the mode selected
function updateNoteDisplay() {
    noteRangeText.textContent = modes[currentMode].displayText;
}

// Handle logic for next note
function nextNote() {
    if (currentNoteIndex < noteOptions.length) {
        currentNote = noteOptions[currentNoteIndex];
        playNoteAudio(currentNote);  // Assuming playNoteAudio function exists to play the corresponding audio
        generateAnswerOptions();
    }
}

// Generate the possible answer options for the note being played
function generateAnswerOptions() {
    noteAnswerButtons.forEach(button => button.remove());  // Remove previous answer buttons
    noteAnswerButtons = [];
    const randomAnswers = generateRandomAnswers();
    randomAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.onclick = () => checkAnswer(answer);
        noteAnswerButtons.push(button);
        noteOptionsDiv.appendChild(button);
    });
}

// Generate random answers based on the note options
function generateRandomAnswers() {
    const answers = [...noteOptions];
    answers.push(correctAnswer);
    shuffle(answers);
    return answers.slice(0, 4);  // Limit to 4 options
}

// Shuffle the answers array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Check if the answer selected is correct
function checkAnswer(selectedAnswer) {
    if (selectedAnswer === correctAnswer) {
        currentScore++;
        currentScoreText.textContent = `Score: ${currentScore}`;
    }
    nextButton.disabled = false;
}

// Play the note audio (placeholders for now)
function playNoteAudio(note) {
    // Play corresponding audio for the note (assume audio files are named as the note names)
    const audio = new Audio(`audio/${note}.mp3`);
    audio.play();
    correctAnswer = note;  // Set the correct answer to the current note being played
}

// Handle back button click
backButton.addEventListener('click', showStartScreen);

// Handle reset score button click
resetScoreButton.addEventListener('click', () => {
    currentScore = 0;
    currentScoreText.textContent = `Score: ${currentScore}`;
    nextButton.disabled = true;
});

// Handle mode button clicks
Object.keys(modeButtons).forEach(mode => {
    modeButtons[mode].addEventListener('click', () => startGame(mode));
});

// Handle next button click
nextButton.addEventListener('click', () => {
    currentNoteIndex++;
    if (currentNoteIndex < noteOptions.length) {
        nextNote();
    } else {
        alert('Game Over! Your score is ' + currentScore);
        showStartScreen();
    }
});

// Initialize the app
showStartScreen();
