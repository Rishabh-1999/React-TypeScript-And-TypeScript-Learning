import React from "react";

/* Styles */
import Styles from "./keyboard.module.css";

/* Data */
import KeysData from "../../data/keys.json";

type KeyboardProps = {
    disabled: boolean;
    activeLetters: string[];
    inActiveLetters: string[];
    addGuessedLetters: (letter: string) => void;
};

function Keyboard({
    disabled,
    activeLetters,
    inActiveLetters,
    addGuessedLetters,
}: KeyboardProps) {
    return (
        <div className={Styles.keyboard}>
            {KeysData.KEYS.map((key) => {
                const isActive = activeLetters.includes(key);
                const isInActive = inActiveLetters.includes(key);

                return (
                    <button
                        key={key}
                        className={`${Styles.btn} ${
                            isActive ? Styles.active : ""
                        } ${isInActive ? Styles.inactive : ""} `}
                        onClick={() => addGuessedLetters(key)}
                        disabled={isInActive || isActive || disabled}
                    >
                        {key}
                    </button>
                );
            })}
        </div>
    );
}

export default React.memo(Keyboard);
