import Game from "./game/Game";
import BoardView from "./components/BoardView";

import './styles.css';
import { useState } from "react";
import { Instructions } from "./components/Instructions";

export default function App() {

    const [game, setGame] = useState<any>(new Game());
    const [context, setContext] = useState<string>('game');

    return (
        <div className="main">
            <div className="header">
                <ul>
                    <li onClick={() => setContext('game')}>32Dice</li>
                    <li onClick={() => setGame(new Game())}>Reset</li>
                    <li onClick={() => setContext('instructions')}>Instructions</li>
                </ul>
            </div>
            <div className="game" style={{display: context=="game" ? "block" : "none"}}>
                <BoardView game={game} />
            </div>
            <div className="instructions" style={{display: context=="instructions" ? "block" : "none"}}>
                <Instructions />
            </div>
        </div>

    );
}