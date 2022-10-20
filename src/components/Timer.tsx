import React, { FC, useState, useRef, useEffect } from 'react'
import { Colors, Player } from '../models'

interface TimerProps {
    currentPlayer: Player | null;
    secondsGame: number;
    restart: () => void;
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart, secondsGame }) => {

    const [blackTime, setBlackTime] = useState(secondsGame);
    const [whiteTime, setWhiteTime] = useState(secondsGame);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    useEffect(() => {
        startTimer();
    }, [currentPlayer])

    const startTimer = () => {
        if(timer.current){
            clearInterval(timer.current);
        }

        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
        timer.current = setInterval(callback, 1000);
    }

    const decrementBlackTimer = () => {

        if(blackTime <= 0){
            window.alert('White won')
            handleRestart();
        }else{
            setBlackTime(prev => prev - 1);
        }
        
    }

    const decrementWhiteTimer = () => {

        if(whiteTime <= 0){
            window.alert('Black won');
            handleRestart();
        }else{
            setWhiteTime(prev => prev - 1);
        }
        
    }

    const handleRestart = () => {
        setWhiteTime(secondsGame);
        setBlackTime(secondsGame);
        restart();
    }

    return (
        <div>
            <div>
                <button onClick={handleRestart}>restart game</button>
            </div>
            <h2>Black - {blackTime}</h2>
            <h2>White - {whiteTime}</h2>
        </div>
    )
}

export default Timer;
