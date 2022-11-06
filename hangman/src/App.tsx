import { useCallback, useEffect, useState } from "react";

/* Styles */
import Styles from "./app.module.css";

/* Components */
import HangManDrawing from "./components/HangManDrawing";
import HangManWord from "./components/HangManWord";
import Keyboard from "./components/Keyboard";

/* Data */
import words from "./data/wordsList.json";

function getWord(): string {
    return words[Math.floor(Math.random() * words.length)];
}

function App() {
    const [wordToGuess, setWordToGuess] = useState<string>(getWord);
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

    const incorrectLetters = guessedLetters.filter(
        (letter) => !wordToGuess.includes(letter)
    );

    const isLoser = incorrectLetters.length >= 6;
    const isWinner = wordToGuess
        .split("")
        .every((letter) => guessedLetters.includes(letter));

    const addGuessedLetters = useCallback(
        (letter: string) => {
            if (guessedLetters.includes(letter) || isLoser || isWinner) return;

            setGuessedLetters((guessedLetters) => [...guessedLetters, letter]);
        },
        [guessedLetters, isLoser, isWinner]
    );

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key;

            if (!key.match(/^[a-z]$/)) return;

            e.preventDefault();
            addGuessedLetters(key);
        };

        document.addEventListener("keypress", handler);
        return () => document.removeEventListener("keypress", handler);
    }, []);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const key = e.key;

            if (key !== "Enter") return;

            e.preventDefault();
            setGuessedLetters([]);
            setWordToGuess(getWord());
        };

        document.addEventListener("keypress", handler);
        return () => document.removeEventListener("keypress", handler);
    }, []);

    return (
        <div className={Styles.main_container}>
            <div className={Styles.result}>
                {isWinner && "Winner! - Refresh to try again"}
                {isLoser && "Nice Try! - Refresh to try again"}
            </div>
            <HangManDrawing numberOfGuess={incorrectLetters.length} />
            <HangManWord
                guessedLetters={guessedLetters}
                wordsToGuess={wordToGuess}
                reveal={isLoser}
            />
            <div className={Styles.keyboard_container}>
                <Keyboard
                    disabled={isWinner || isLoser}
                    activeLetters={guessedLetters.filter((letter) =>
                        wordToGuess.includes(letter)
                    )}
                    inActiveLetters={incorrectLetters}
                    addGuessedLetters={addGuessedLetters}
                />
            </div>
        </div>
    );
}

export default App;
