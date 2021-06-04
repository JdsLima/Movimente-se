import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import { ThemeProvider } from "styled-components";
import { MyThemeContext } from "../contexts/ThemeContext";
import GlobalStyle from "../styles/global";
import styles from '../styles/pages/About.module.css';
import dark from "../styles/themes/dark";

export default function About() {
    const { myTheme } = useContext(MyThemeContext);

    return (
        <ThemeProvider theme={myTheme ? myTheme : dark}>
            <GlobalStyle />
            <div className={styles.container}>
                <Head>
                    <title>Sobre | Movimente-se</title>
                </Head>
                <header>
                    <Link href="/inicio">
                        <button type="button">
                            <svg width="16" height="26" viewBox="0 0 16 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.4459 1.38219L1.38169 11.4464C0.618602 12.2095 0.618602 13.4467 1.38169 14.2098L1.40926 14.2374C2.17235 15.0005 3.40955 15.0005 4.17264 14.2374L14.2369 4.17314C15 3.41005 15 2.17285 14.2369 1.40976L14.2093 1.38219C13.4462 0.619103 12.209 0.619103 11.4459 1.38219Z" fill="var(--titlePrimary)" />
                                <path d="M1.40926 11.3808L1.38169 11.4084C0.618602 12.1714 0.618602 13.4086 1.38169 14.1717L11.4459 24.236C12.209 24.9991 13.4462 24.9991 14.2093 24.236L14.2369 24.2084C15 23.4453 15 22.2081 14.2369 21.445L4.17264 11.3808C3.40955 10.6177 2.17235 10.6177 1.40926 11.3808Z" fill="var(--titlePrimary)" />
                            </svg>
                        </button>
                    </Link>
                </header>
                <div className={styles.presentation}>
                    <img draggable="false" src="/favicon.png" alt="logo" />
                    <p>Movimente-se</p>
                </div>
                <div className={styles.acknowledgment}>
                    <h2>Agradecimentos</h2>
                    <p>
                        Obrigado por utilizar minha aplicação! Ela foi criada durante
                        o NLW#4 da rocktseat e mantida por mim até o momento.
                        O Movimente-se tem o intuito de ajudar pessoas que
                        ficam grandes jornadas de tempo em frente ao computador e com isso acabam
                        colaborando para o aparecimento de problemas visuais e motores.
                        Para contornar isso, a cada ciclo de 50 minutos a aplicação te enviará
                        um desafio que poderá ser tanto visual como motor, esse desafio vale xp
                        que pode ser acumulado para atingir o próximo level.
                    </p>
                    <p>
                        Divirta-se com seus amigos ou colegas de trabalho enquanto contribui
                        com a sua saúde. Essa aplicação possui um sistema de classificação que pode
                        ser acessado por todos os usuários.
                        Quanto mais desafios você cumprir, mais próximo ao topo da lista você ficará.
                </p>
                </div>
                <footer>
                    <div className={styles.wrapper}>
                        <div>
                            <p>
                                Dúvidas ou sugestões de melhorias? Por favor entrar em contato.
                        </p>
                        </div>
                        <div className={styles.socialMedia}>
                            <div>
                                <i className="fa fa-envelope-o"></i>
                                <a href="mailto:jadsonmath874@gmail.com">
                                    jadsonmath874@gmail.com
                            </a>
                            </div>
                            <div>
                                <i className="fa fa-linkedin"></i>
                                <a href="https://www.linkedin.com/in/jadson-matheus-bezerra-de-lima/">
                                    jadson-matheus-bezerra-de-lima
                            </a>
                            </div>
                            <div>
                                <i className="fa fa-instagram"></i>
                                <a href="https://www.instagram.com/jadson_mlima/">
                                    @jadson_mlima
                            </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </ThemeProvider>
    )
}