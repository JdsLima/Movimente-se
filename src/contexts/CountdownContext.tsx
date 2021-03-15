import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

let countdownTimeout: NodeJS.Timeout;
let distance: number;

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({ children }: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [isActive, setIsActive] = useState(false);
    const [isFinalized, setIsFinalized] = useState(true);
    const [hasFinished, setHasFinished] = useState(false);
    const [countDownDate, setCountDownData] = useState(0);

    const time = 50.0167; //minutes + 1 second
    const [minutes, setMinutes] = useState(Math.floor(time));
    const [seconds, setSeconds] = useState(0);


    function startCountdown() {
        setIsActive(true);
        setIsFinalized(false);
        setCountDownData(+new Date().getTime() + time * 60000);
    }

    function resetCountdown() {
        clearInterval(countdownTimeout);
        setIsActive(false);
        setIsFinalized(true);
        setHasFinished(false);
    }

    useEffect(() => {
        if (isActive && minutes >= 0) {
            countdownTimeout = setInterval(() => {
                distance = countDownDate - +new Date();
                setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
                setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
                if (distance < 0) {
                    clearInterval(countdownTimeout);
                    setIsFinalized(true);
                    setMinutes(Math.floor(time));
                    setSeconds(0);
                }
            }, 1000);
        } else if (isActive && minutes < 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, !isFinalized])

    return (
        <CountdownContext.Provider value={{
            minutes, seconds, hasFinished, isActive, startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    );
}
