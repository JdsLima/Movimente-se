import Link from 'next/link';
import Cookies from 'js-cookie';
import styles from '../styles/components/Login.module.css';

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
        <div className={styles.LoginContainer}>
            <div className={styles.logo}>
                <img src="favicon-sem-fundo.png" alt="" />
                <strong>Movimente<span>-</span>se</strong>
            </div>
            <p>Bem-vindo</p>
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
    );
}