import Gamemap from "./gamemap.jsx";
import {useEffect, useState} from "react";

export default function Maintictactoe() {
    const [value, setValue] = useState({
        a: null,
        b: null,
        c: null,
        d: null,
        e: null,
        f: null,
        g: null,
        h: null,
        i: null
    });
    const [turn, setTurn] = useState("X");
    const [gameOver,setGamover] = useState(false)
    const [text,setText] = useState("")

    function Makemove(field) {
        if (!value[field] && gameOver === false) {
            setValue(prev => ({
                ...prev,
                [field]: turn
            }));
            setTurn(prev => (prev === "X" ? "O" : "X"));
            setText(`Spieler ${turn === "X" ? "O" : "X"} ist dran`)
        }
    }
    function Reset(){
        setValue({
            a: null,
            b: null,
            c: null,
            d: null,
            e: null,
            f: null,
            g: null,
            h: null,
            i: null

        })
        setTurn("X");
        setGamover(false);
        setText("");
    }

    function CheckWinner(){
        if (
            // Horizontale Reihen
            (value.a === value.b && value.b === value.c && value.a !== null) ||
            (value.d === value.e && value.e === value.f && value.d !== null) ||
            (value.g === value.h && value.h === value.i && value.g !== null) ||

            // Vertikale Spalten
            (value.a === value.d && value.d === value.g && value.a !== null) ||
            (value.b === value.e && value.e === value.h && value.b !== null) ||
            (value.c === value.f && value.f === value.i && value.c !== null) ||

            // Diagonalen
            (value.a === value.e && value.e === value.i && value.a !== null) ||
            (value.c === value.e && value.e === value.g && value.c !== null)
        )
            return true
        else return false
    }

    useEffect(() => {
        if (CheckWinner()=== true) {
            setGamover(true)
            setText(`Spieler ${turn === "X" ? "O" : "X"} hat gewonnen`);


        }
    }, [value]);

    return (
        <>
            <div className="board">
                <Gamemap onClick={() => Makemove("a")} value={value.a}/>
                <Gamemap onClick={() => Makemove("b")} value={value.b}/>
                <Gamemap onClick={() => Makemove("c")} value={value.c}/>
                <Gamemap onClick={() => Makemove("d")} value={value.d}/>
                <Gamemap onClick={() => Makemove("e")} value={value.e}/>
                <Gamemap onClick={() => Makemove("f")} value={value.f}/>
                <Gamemap onClick={() => Makemove("g")} value={value.g}/>
                <Gamemap onClick={() => Makemove("h")} value={value.h}/>
                <Gamemap onClick={() => Makemove("i")} value={value.i}/>
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