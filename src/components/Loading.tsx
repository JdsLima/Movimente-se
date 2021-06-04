import styles from '../styles/components/Loading.module.css';

export function Loading() {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.ldsRing}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <p>Carregando</p>
            </div>
        </div>
    )
}