import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
import api from '../services/api';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    userName: string;
    level: number;
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
    userName: string;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
    const userName = rest.userName;
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const experienceToNextLevel = Math.pow((level + 1) * 5, 2);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    async function updateLevel() {
        await api.put(`update/${userName}_level_${level}`);
    }

    async function updateCurrentExperience() {
        await api.put(`update/${userName}_currentExperience_${currentExperience}`);
    }

    async function updateChallengesCompleted() {
        await api.put(`update/${userName}_challengesCompleted_${challengesCompleted}`);
    }

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        updateLevel();
    }, [level]);

    useEffect(() => {
        updateCurrentExperience();
    }, [currentExperience]);

    useEffect(() => {
        updateChallengesCompleted();
    }, [challengesCompleted]);

    function levelUp() {
        setLevel(level + 1);
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
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider value={
            {
                userName, level, currentExperience, challengesCompleted,
                levelUp, startNewChallenge, activeChallenge, resetChallenge,
                experienceToNextLevel, completeChallenge, closeLevelUpModal
            }}>
            {children}

            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    );
}
