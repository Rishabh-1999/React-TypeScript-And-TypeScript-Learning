import React from "react";

/* Styles */
import Styles from "./hangman_drawing.module.css";

const HangManHead = <div className={Styles.hangman_head} />;

const HangManBody = <div className={Styles.hangman_body} />;

const HangManRightArm = <div className={Styles.hangman_right_arm} />;

const HangManLeftArm = <div className={Styles.hangman_left_arm} />;

const HangManRightLeg = <div className={Styles.hangman_left_leg} />;

const HangManLeftLeg = <div className={Styles.hangman_right_leg} />;

const HangManBodyParts = [
    HangManHead,
    HangManBody,
    HangManRightArm,
    HangManLeftArm,
    HangManRightLeg,
    HangManLeftLeg,
];

type HangManDrawingProps = {
    numberOfGuess: number;
};

function HangManDrawing({ numberOfGuess }: HangManDrawingProps) {
    return (
        <div className={Styles.hangman_drawing}>
            {HangManBodyParts.slice(0, numberOfGuess)}

            <div className={Styles.hangman_pole_head_hang} />
            <div className={Styles.hangman_pole_head} />
            <div className={Styles.hangman_pole_body} />
            <div className={Styles.hangman_pole_base} />
        </div>
    );
}

export default HangManDrawing;
