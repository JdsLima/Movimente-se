import { GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import { ThemeProvider } from "styled-components";
import { formatListUsers } from "../../utils/format";
import { Loading } from "../components/Loading";
import { MyThemeContext } from "../contexts/ThemeContext";
import api from "../services/api";
import GlobalStyle from "../styles/global";
import styles from '../styles/pages/Classification.module.css';
import dark from "../styles/themes/dark"

interface user {
    _id: string;
    userName: string;
    imgUrl: string;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    friendsName: string[];
}

interface userProps {
    users: user[]
}

export default function Classification({ users }: userProps) {
    const [session, loading] = useSession();
    const { myTheme } = useContext(MyThemeContext);

    return (
        <>
            {loading && <Loading />}
            {session &&
                <ThemeProvider theme={myTheme ? myTheme : dark}>
                    <GlobalStyle />
                    <div className={styles.container}>
                        <Head>
                            <title>Classificação | Movimente-se</title>
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
                        <h1>Classificação</h1>
                        <div className={styles.leaderboard}>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Posição</th>
                                        <th>Usuário</th>
                                        <th>Desafios</th>
                                        <th>Experiência</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => {
                                        return (
                                            <tr key={user._id}>
                                                <td style={{ width: "5%" }} id={styles.position}>
                                                    {
                                                        (index + 1) == 1 &&
                                                        <img
                                                            draggable='false'
                                                            className={styles.classificationImg}
                                                            src="icons/first.svg"
                                                            alt="first"
                                                        /> ||
                                                        (index + 1) == 2 &&
                                                        <img
                                                            draggable='false'
                                                            className={styles.classificationImg}
                                                            src="icons/second.svg"
                                                            alt="second"
                                                        /> ||
                                                        (index + 1) == 3 &&
                                                        <img
                                                            draggable='false'
                                                            className={styles.classificationImg}
                                                            src="icons/third.svg"
                                                            alt="third"
                                                        /> ||
                                                        index + 1
                                                    }
                                                </td>
                                                <td className={styles.profileData}>
                                                    <img
                                                        draggable='false'
                                                        src={user.imgUrl.replace(/[!]+/g, "/")}
                                                        alt="user"
                                                    />
                                                    <div>
                                                        <strong>{user.userName}</strong>
                                                        <p>
                                                            <img src="icons/level.svg" alt="Level" />
                                                    level {user.level}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td style={{ width: "20%" }}>
                                                    {user.challengesCompleted} completados
                                        </td>
                                                <td style={{ width: "15%" }}>
                                                    {user.currentExperience} xp
                                        </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <div className={styles.msg}>
                                <p>A classificação é atualizada a cada 10 minutos.</p>
                            </div>
                        </div>
                    </div>
                </ThemeProvider>
            }
            {!session &&
                <div className={styles.noSectionContainer}>
                    <div className={styles.wrapper}>
                        <div className={styles.presentation}>
                            <img draggable="false" src="/favicon.png" alt="logo" />
                            <p>Movimente-se</p>
                        </div>
                        <h1>Você precisa estar logado em uma conta para visualizar essa página.</h1>
                        <h3>Click no botão abaixo para ser redirecionado para tela de login.</h3>
                        <button className={styles.btn}>
                            <Link href="/">
                                <a>Ir para tela de login</a>
                            </Link>
                        </button>
                    </div>
                </div>
            }
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const { data } = await api.get("users");
    const users = formatListUsers(data, 10);

    return {
        props: {
            users
        },
        revalidate: 60 * 10,
    }
}