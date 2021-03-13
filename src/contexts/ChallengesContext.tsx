import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    user: string;
    currentExperience: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ??
        Number(localStorage.getItem('mylevel')));
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ??
        Number(localStorage.getItem('currentExperience')));
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ??
        Number(localStorage.getItem('challengesCompleted')));

    const [activeChallenge, setActiveChallenge] = useState(null);
    const experienceToNextLevel = Math.pow((level + 1) * 5, 2);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const [user, setUser] = useState('');

    useEffect(() => {
        let myUser = localStorage.getItem("User");
        setUser(myUser);
    }, [user]);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set('level',
            String(localStorage.getItem('mylevel')));
        Cookies.set('currentExperience',
            String(localStorage.getItem('currentExperience')));
        Cookies.set('challengesCompleted',
            String(localStorage.getItem('challengesCompleted')));
    }, [level, currentExperience, challengesCompleted]);

    function levelUp() {
        setLevel(level + 1);
        localStorage.setItem('mylevel', String(level + 1));
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification("Novo desafio 🎉", {
                body: `Valendo ${challenge.amount} xp`,
            });
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience -= experienceToNextLevel;
            levelUp();
        }
        setCurrentExperience(finalExperience);
        localStorage.setItem('currentExperience', String(finalExperience));
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
        localStorage.setItem('challengesCompleted', String(challengesCompleted + 1));
    }

    return (
        <ChallengesContext.Provider value={
            {
                level, currentExperience, challengesCompleted,
                levelUp, startNewChallenge, activeChallenge, resetChallenge,
                experienceToNextLevel, completeChallenge, closeLevelUpModal, user
            }}>
            {children}

            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    );
}
