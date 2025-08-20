import Gamemap from "./gamemap.jsx";
import {useState} from "react";

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

    function Makemove(field) {
        if (!value[field]) {
            setValue(prev => ({
                ...prev,
                [field]: turn
            }));
            setTurn(prev => (prev === "X" ? "O" : "X"));
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
    }

    return (
        <>
            <div>
                <Gamemap onClick={() => Makemove("a")} value={value.a}/>
                <Gamemap onClick={() => Makemove("b")} value={value.b}/>
                <Gamemap onClick={() => Makemove("c")} value={value.c}/>
                <p></p>
                <Gamemap onClick={() => Makemove("d")} value={value.d}/>
                <Gamemap onClick={() => Makemove("e")} value={value.e}/>
                <Gamemap onClick={() => Makemove("f")} value={value.f}/>
                <p></p>
                <Gamemap onClick={() => Makemove("g")} value={value.g}/>
                <Gamemap onClick={() => Makemove("h")} value={value.h}/>
                <Gamemap onClick={() => Makemove("i")} value={value.i}/>
            </div>
            <p></p>
            <div>
                <button onClick={Reset}>Reset</button>
            </div>
        </>
    )
}