---
layout: post
title: AP CSA 1.3 and 1.4 Game
description: Test your knowledge of the lessons with this fun interactive game!
comments: true
permalink: /unitgame
---

<div id="quiz-container" style="font-family: Arial, sans-serif; padding: 15px; background: transparent; color: white; max-width: 700px; margin:auto;">
    <h2 id="quiz-title" style="color:#1abc9c;"></h2>

    <div id="progress-bar" style="height:10px; background:#333; border-radius:5px; overflow:hidden; margin-bottom:15px;">
        <div id="progress" style="height:10px; background:#1abc9c; width:0%;"></div>
    </div>

    <div id="level-info" style="margin-bottom:10px; font-size:14px; color:#f1c40f;"></div>

    <div id="quiz"></div>

    <div id="feedback" style="margin-top:10px; font-style:italic;"></div>
    <div id="score" style="margin-top:10px; font-weight:bold;"></div>
    <div id="timer" style="margin-top:5px; color:#f39c12;"></div>
</div>

<style>
    .question { font-weight: bold; margin: 10px 0; color: white; font-size: 1.2em; }
    button {
        margin: 4px; padding: 10px 16px; border: none;
        background: #1abc9c; color: white;
        cursor: pointer; border-radius: 5px; font-size: 1em;
    }
    button:hover { background: #16a085; }
    .feedback { font-style: italic; font-size: 0.95em; }
    .score { font-weight: bold; font-size: 1.1em; color: white; }
    .timer { font-weight: bold; font-size: 0.95em; }
</style>

<script>
class QuizGame {
    constructor(questions, quizTitle) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.quizTitle = quizTitle;
        this.quizContainer = document.getElementById("quiz");
        this.feedbackContainer = document.getElementById("feedback");
        this.scoreContainer = document.getElementById("score");
        this.timerContainer = document.getElementById("timer");
        this.progressBar = document.getElementById("progress");
        this.levelInfo = document.getElementById("level-info");
        this.timePerQuestion = 20;
        this.startTime = null;
        this.levels = ["Beginner", "Intermediate", "Advanced"];
        this.level = this.levels[0];
        document.getElementById("quiz-title").innerText = quizTitle;
        this.showQuestion();
    }

    showQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.showFinalScore();
            return;
        }

        const question = this.questions[this.currentQuestionIndex];
        this.level = this.getLevel(this.currentQuestionIndex);

        this.levelInfo.innerText = `Level: ${this.level}`;

        this.quizContainer.innerHTML = `
            <div class="question">${question.text}</div>
            <div class="options">
                ${question.options.map((opt, index) => `
                    <button onclick="game.checkAnswer(${index})">${opt}</button>
                `).join("")}
            </div>
        `;

        this.feedbackContainer.innerHTML = "";
        this.updateProgress();
        this.startTimer();
    }

    getLevel(index) {
        if (index < Math.floor(this.questions.length / 3)) return this.levels[0];
        if (index < Math.floor(2 * this.questions.length / 3)) return this.levels[1];
        return this.levels[2];
    }

    startTimer() {
        let timeLeft = this.timePerQuestion;
        this.timerContainer.innerHTML = `⏱ Time left: ${timeLeft}s`;
        this.startTime = setInterval(() => {
            timeLeft--;
            this.timerContainer.innerHTML = `⏱ Time left: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(this.startTime);
                this.feedbackContainer.innerHTML = "⏳ Time's up! Moving to next question.";
                this.feedbackContainer.style.color = "orange";
                this.currentQuestionIndex++;
                setTimeout(() => this.showQuestion(), 2000);
            }
        }, 1000);
    }

    checkAnswer(selectedIndex) {
        clearInterval(this.startTime);
        const question = this.questions[this.currentQuestionIndex];

        if (selectedIndex === question.correct) {
            this.score++;
            this.feedbackContainer.innerHTML = "✅ Correct! " + question.explanation;
            this.feedbackContainer.style.color = "lightgreen";
        } else {
            this.feedbackContainer.innerHTML = `❌ Wrong! ${question.explanation}`;
            this.feedbackContainer.style.color = "red";
        }

        this.currentQuestionIndex++;
        setTimeout(() => this.showQuestion(), 2500);
    }

    updateProgress() {
        const progressPercent = ((this.currentQuestionIndex) / this.questions.length) * 100;
        this.progressBar.style.width = `${progressPercent}%`;
        this.scoreContainer.innerHTML = `Score: ${this.score} / ${this.questions.length} (${Math.round(progressPercent)}%)`;
    }

    showFinalScore() {
        this.quizContainer.innerHTML = `
            <h2>🎉 Quiz Complete!</h2>
            <div class="score">Your Score: ${this.score} / ${this.questions.length} (${Math.round(this.score/this.questions.length*100)}%)</div>
            <div style="margin-top:10px;">Thank you for playing this ${this.quizTitle} quiz! 💡 Keep practicing!</div>
            <button onclick="restartGame()">Restart Quiz</button>
        `;
        this.timerContainer.innerHTML = "";
        this.levelInfo.innerHTML = "";
    }
}

function restartGame() {
    game = new QuizGame(questions, game.quizTitle);
}

// Example question sets for Unit 1.3 (detailed)
const questions1_3 = [
    { text: "What does System.out.println do?", options: ["Print with newline", "Print without newline", "Assign values"], correct: 0, explanation: "println outputs text and moves to a new line." },
    { text: "What is 7 / 3 in Java (int division)?", options: ["2", "2.33", "3"], correct: 0, explanation: "Integer division truncates decimals, so the result is 2." },
    { text: "What does % do?", options: ["Remainder", "Divide", "Multiply"], correct: 0, explanation: "The modulus operator returns the remainder of a division." },
    { text: "What is a literal?", options: ["Fixed value", "Variable", "Method"], correct: 0, explanation: "A literal is a fixed value written in code like 5 or \"Hello\"." },
    { text: "Which is a valid string literal?", options: ["\"Hello\"", "'Hello'", "Hello"], correct: 0, explanation: "String literals are enclosed in double quotes." },
    { text: "What does escape sequence \\n do?", options: ["New line", "Tab", "Backslash"], correct: 0, explanation: "It moves the cursor to a new line." }
];

// Example question sets for Unit 1.4 (detailed)
const questions1_4 = [
    { text: "Which operator assigns a value?", options: ["==", "=", "+="], correct: 1, explanation: "`=` is the assignment operator." },
    { text: "x = x + 3; — What is x if x=4?", options: ["4", "7", "3"], correct: 1, explanation: "x becomes 7 after adding 3." },
    { text: "Which Scanner method reads a whole line?", options: ["next()", "nextLine()", "nextInt()"], correct: 1, explanation: "nextLine() reads the entire line of text." },
    { text: "What does null mean?", options: ["Points to nothing", "Integer", "String literal"], correct: 0, explanation: "null means the variable points to nothing." },
    { text: "Which is a correct String declaration?", options: ["String s = 5;", "String s = null;", "String s = \"Hello\";"], correct: 2, explanation: "Strings require quotes and correct syntax." },
    { text: "Purpose of InputLesson in Menu.java?", options: ["User input practice", "Output handling", "Variable declaration"], correct: 0, explanation: "It teaches how to capture and handle user input." }
];

// Start game with one set
let questions = questions1_3;
let game = new QuizGame(questions, "Unit 1.3 — Expressions and Output");





