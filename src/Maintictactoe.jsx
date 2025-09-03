import Gamemap from "./gamemap.jsx";
import {useEffect, useState} from "react";

export default function Maintictactoe() {
    const size = 5;
    const [board, setBoard] = useState(Array(size * size).fill(null))
    const [turn, setTurn] = useState("X");
    const [gameOver, setGamover] = useState(false)
    const [text, setText] = useState("")

// Mache Zug
    function Makemove(index) {
        if(gameOver === false) {
            if (board[index]) return;

            const newBoard = [...board];
            newBoard[index] = turn;
            setBoard(newBoard);

            const nextTurn = turn === "X" ? "O" : "X";
            setTurn(nextTurn);
            setText(`Spieler ${nextTurn} ist dran`);
        }
    }

// Neustart
    function Reset() {
        setBoard(Array(size * size).fill(null))
        setTurn("X");
        setGamover(false);
        setText("");
    }

// Gewinnenfunktion
    function CheckWinner(allLines, Board) {
        for (let line of allLines) {
            const [a, b, c, d] = line; //Destructuring Assignment
            if (
                Board[a] !== null &&
                Board[a] === Board[b] &&
                Board[b] === Board[c] &&
                Board[c] === Board[d]
            ) {
                return Board[a];
            }
        }
        return null;
    }

// Alle Linien hinzufügen
    function Getlines() {
        const winLength = 4;
        const horizontalLines = [];
        const verticalLines = [];
        const diagonal1Lines = [];
        const diagonal2Lines = [];
// Reihen
        for (let row = 0; row < size; row++) {
            for (let col = 0; col <= size - winLength; col++) {
                const line = [];
                for (let i = 0; i < winLength; i++) {
                    line.push(row * size + (col + i));
                }
                horizontalLines.push(line);
            }
        }
// Spalten
        for (let col = 0; col < size; col++) {
            for (let row = 0; row <= size - winLength; row++) {
                const line = [];
                for (let i = 0; i < winLength; i++) {
                    line.push((row + i) * size + col);
                }
                verticalLines.push(line);
            }
        }
// Diagonale
        for (let row = 0; row <= size - winLength; row++) {
            for (let col = 0; col <= size - winLength; col++) {
                const line = [];
                for (let i = 0; i < winLength; i++) {
                    line.push((row + i) * size + (col + i));
                }
                diagonal1Lines.push(line);
            }
        }

// Diagonale
        for (let row = 0; row <= size - winLength; row++) {
            for (let col = winLength - 1; col < size; col++) {
                const line = [];
                for (let i = 0; i < winLength; i++) {
                    line.push((row + i) * size + (col - i));
                }
                diagonal2Lines.push(line);
            }
        }


        const allLines = [
            ...horizontalLines,
            ...verticalLines,
            ...diagonal1Lines,
            ...diagonal2Lines];
        return allLines

       // console.log(allLines)
    }

// Checke auf Sieg
    useEffect(() => {
    const winner = CheckWinner(Getlines(), board);
    if (winner) {
        setGamover(true);
        setText(`Spieler ${winner} hat gewonnen`);
    }
}, [board]);

        return (
            <>
                <div className="board">
                    {board.map((cell, index) => (
                        <Gamemap
                            key={index}
                            value={cell}
                            onClick={() => Makemove(index)}
                        />
                    ))}
                </div>

                <div>
                    <button className="reset-button" onClick={Reset}>Reset</button>
                </div>
                <div>
                    {text}
                </div>
            </>
        )
    }
