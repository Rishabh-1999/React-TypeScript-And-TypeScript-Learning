import React from "react";

/* Styles */
import Styles from "./hangman_word.module.css";

type HangManWordProps = {
    guessedLetters: string[];
    wordsToGuess: string;
    reveal?: boolean;
};

function HangManWord({
    guessedLetters,
    wordsToGuess,
    reveal,
}: HangManWordProps) {
    return (
        <div className={Styles.hangman_word}>
            {wordsToGuess.split("").map((letter, index) => {
                return (
                    <span key={index}>
                        <span
                            style={{
                                visibility:
                                    guessedLetters.includes(letter) || reveal
                                        ? "visible"
                                        : "hidden",
                                color:
                                    !guessedLetters.includes(letter) && reveal
                                        ? "red"
                                        : "black",
                            }}
                        >
                            {letter}
                        </span>
                    </span>
                );
            })}
        </div>
    );
}

export default React.memo(HangManWord);
