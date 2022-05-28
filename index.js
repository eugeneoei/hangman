const words = ["Singapore"];

const chooseWord = () => {
    // TODO: choose a random word from words array
    return words[0].toLowerCase();
};

class Game {
    constructor() {
        this.guessesLeft = 0;
        this.guessedLetters = [];
        this.word = null;
    }

    start() {
        alert("Welcome to The Hangman!");
        this.initialiseGame();
        this.printScore();
        this.promptUser("Guess a letter!");
    }

    initialiseGame() {
        const wordToGuess = chooseWord();
        this.guessesLeft = 10;
        this.word = new Word(wordToGuess);
    }

    printScore() {
        const currentGuess = this.word.letters.map(letter => letter.display());
        const numberOfGuessedLetters = this.guessedLetters.length;
        console.log("");
        console.log(`Guesses left: ${this.guessesLeft}`);
        console.log(
            numberOfGuessedLetters > 0
                ? `You have guessed the following letters: ${this.guessedLetters.join(
                      ", "
                  )}`
                : "You have not made any guesses!"
        );
        console.log(currentGuess.join(" "));
    }

    promptUser(message) {
        const guess = prompt(message);

        this.isGuessValid(guess);

        const lowercaseGuess = guess.toLowerCase();
        this.word.test(lowercaseGuess);
        this.guessedLetters.push(lowercaseGuess);
        this.guessesLeft -= 1;
        this.checkState();
    }

    isGuessValid(guess) {
        if (this.guessedLetters.includes(guess)) {
            this.promptUser(`You have already guessed "${guess}"! Again!`);
        }

        if (!guess) {
            this.promptUser("Did not provide a letter! Again!");
        }

        const doesGuessHaveMorethanOneCharacter = guess?.trim().length > 1;
        if (doesGuessHaveMorethanOneCharacter) {
            this.promptUser("Please provide 1 letter only! Again!");
        }
    }

    checkState() {
        const isWordFound = this.word.isFound();
        if (isWordFound) {
            this.printScore();
            this.end("You Win!");
            return;
        }

        if (this.guessesLeft > 0) {
            this.printScore();
            this.promptUser("Guess a letter!");
            return;
        }

        this.printScore();
        this.end("You Lose!");
        return;
    }

    end(message) {
        console.log(message);
    }
}

class Letter {
    constructor(character) {
        this.value = character;
        this.hidden = true;
    }

    show() {
        this.hidden = false;
    }

    display() {
        return this.hidden ? "_" : this.value;
    }
}

class Word {
    constructor(wordToGuess) {
        this.letters = wordToGuess
            .split("")
            .map(character => new Letter(character));
    }

    isFound() {
        return this.letters.every(letter => !letter.hidden);
    }

    test(userInputCharacter) {
        this.letters.forEach(letter => {
            if (letter.value === userInputCharacter) {
                letter.show();
            }
        });
    }
}

const game = new Game();
game.start();
