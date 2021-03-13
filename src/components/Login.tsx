import Link from 'next/link';
import styles from '../styles/components/Login.module.css';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export function Login() {
    const [isDesabled, setIsDesabled] = useState(true);
    const [inputContent, setInputContent] = useState(null);

    function defInputContent() {
        setInputContent(
            (document.getElementById('userName') as HTMLInputElement).value
        );
    }

    useEffect(() => {
        if ((document.getElementById('userName') as HTMLInputElement).value.length > 0) {
            setIsDesabled(false);
        } else {
            setIsDesabled(true);
        }
    }, [inputContent]);

    function getUser() {
        if (localStorage.getItem("User") != inputContent)
            localStorage.setItem('User', String(inputContent));
    }

    return (
        <>
            <Head>
                <title>Movimente-se</title>
            </Head>
            <div className={styles.LoginContainer}>
                <div className={styles.logo}>
                    <img draggable="false" src="favicon.svg" alt="logo" />
                    <strong>Movimente<span>-</span>se</strong>
                </div>
                <h1>Bem-vindo!</h1>
                <div className={styles.welcome}>
                    <p>
                        Nosso objetivo é ajudar pessoas que ficam grandes períodos
                        de tempo em frente ao computador.
                    </p>
                </div>
                <div className={styles.msg}>
                    <img draggable="false" src="/icons/GitHub.png" alt="Github" />
                    <strong>Faça login com seu Github para começar.</strong>
                </div>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        autoComplete="off"
                        onChange={defInputContent}
                        id="userName"
                        placeholder="Username do GitHub"
                    />
                    <Link href="/inicio">
                        <button type='button'
                            id="botaoUser"
                            disabled={isDesabled}
                            onClick={getUser}
                        >
                            <img src="icons/seta-direita.png" alt="avançar" />
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}