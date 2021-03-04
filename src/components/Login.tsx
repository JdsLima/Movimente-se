import Link from 'next/link';
import Cookies from 'js-cookie';
import styles from '../styles/components/Login.module.css';
import Head from 'next/head';

export function Login() {
    function getUser() {
        const user = (document.getElementById('userName') as HTMLInputElement).value;
        if (user == '' || user == null) {
            alert("Usuario vazio");
        } else {
            Cookies.set('User', user.toString());
        }
    }

    return (
        <>
            <Head>
                <title>Movimente-se</title>
            </Head>
            <div className={styles.LoginContainer}>
                <div className={styles.logo}>
                    <img src="favicon-sem-fundo.png" alt="" />
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
                    <img src="/icons/GitHub.png" alt="Github" />
                    <strong>Faça login com seu Github para começar.</strong>
                </div>
                <div className={styles.inputContainer}>
                    <input type="text" id="userName" placeholder="Digite seu username" />
                    <Link href="/inicio">
                        <button type='button' id="botaoUser" onClick={getUser}>
                            <img src="icons/seta-direita.png" alt="avançar" />
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}