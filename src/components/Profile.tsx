import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css'

interface ProfileProps {
    imgUrl: string
}

export function Profile(props: ProfileProps) {
    const { level, user, userName } = useContext(ChallengesContext);

    return (
        <div className={styles.profileContainer}>
            <img draggable='false' src={props.imgUrl} alt={userName} />
            <div>
                <strong>{userName}</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    level {level}
                </p>
            </div>
        </div>
    );
}