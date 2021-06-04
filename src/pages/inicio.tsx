import { useContext, useEffect, useState } from 'react';
import api from '../services/api';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { setCookie, parseCookies } from 'nookies';
import { ThemeProvider } from "styled-components";
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

import { Header } from '../components/Header';
import { ExperinceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";

import { MyThemeContext } from '../contexts/ThemeContext';
import Switch from 'react-switch';
import GlobalStyle from "../styles/global";
import styles from '../styles/pages/Home.module.css';
import light from "../styles/themes/light";
import dark from "../styles/themes/dark";

interface theme {
    title: string;
}

interface HomeProps {
    theme: theme;
    userName: string;
    imgUrl: string;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export default function Home(props: HomeProps) {
    const { setTheme } = useContext(MyThemeContext);
    const [myTheme, setMyTheme] = useState(props.theme);

    useEffect(() => {
        setTheme(myTheme);
    }, [myTheme]);

    const toggleTheme = () => {
        const theme = myTheme.title === "light" ? dark : light
        setMyTheme(theme);
        setCookie(undefined, "theme", JSON.stringify(theme), {
            maxAge: 86400 * 7,
            path: '/',
        })
    }

    return (
        <ThemeProvider theme={myTheme}>
            <ChallengesProvider
                userName={props.userName}
                level={props.level}
                currentExperience={props.currentExperience}
                challengesCompleted={props.challengesCompleted}
            >
                <GlobalStyle />
                <div className={styles.container}>
                    <Head>
                        <title>Início | Movimente-se</title>
                    </Head>
                    <Header />
                    <ExperinceBar />
                    <CountdownProvider>
                        <section>
                            <div>
                                <div className={styles.profile}>
                                    <Profile imgUrl={props.imgUrl} />
                                    <div className={styles.switch}>
                                        <p>{myTheme.title === "dark" ? "Tema escuro" : "Tema claro"}</p>
                                        <Switch
                                            onChange={toggleTheme}
                                            checked={myTheme.title === "dark" ? true : false}
                                            checkedIcon={false}
                                            uncheckedIcon={false}
                                            handleDiameter={16}
                                            height={20}
                                            width={40}
                                            onColor="#202031"
                                            onHandleColor="#89a2d6"
                                        />
                                    </div>
                                </div>
                                <CompletedChallenges />
                                <Countdown />
                            </div>

                            <div>
                                <ChallengeBox />
                            </div>
                        </section>
                    </CountdownProvider>
                </div>
            </ChallengesProvider>
        </ThemeProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getSession(ctx);

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    let userExists = false;

    if (!userExists) {
        const { data } = await api.get(`getUser/email_${session.user.email}`);
        const { theme } = parseCookies(ctx);

        if (!data[0]) {
            const { data } = await api.get(`getUser/name_${session.user.name}`);

            if (!data[0]) {
                const modifiedUrl = session.user.image.replace(/[/]+/g, "!");
                const { data } = await api.post(`addUser/${session.user.email ?? "undefined"}_${session.user.name}_${modifiedUrl}`);

                return {
                    props: {
                        theme: (!theme) ? dark : JSON.parse(theme),
                        userName: data.userName,
                        imgUrl: session.user.image,
                        level: data.level,
                        currentExperience: data.currentExperience,
                        challengesCompleted: data.challengesCompleted
                    }
                }
            }
        }

        userExists = true;
    }

    if (session.user.email && userExists) {
        const req = await api.get(`getUser/email_${session.user.email}`);
        const res = await req.data[0];
        const { theme } = parseCookies(ctx);

        return {
            props: {
                theme: (!theme) ? dark : JSON.parse(theme),
                userName: res.userName,
                imgUrl: session.user.image,
                level: res.level,
                currentExperience: res.currentExperience,
                challengesCompleted: res.challengesCompleted
            }
        }
    }

    if (!session.user.email && userExists) {
        const req = await api.get(`getUser/name_${session.user.name}`);
        const res = await req.data[0];
        const { theme } = parseCookies(ctx);

        return {
            props: {
                theme: (!theme) ? dark : JSON.parse(theme),
                userName: res.userName,
                imgUrl: session.user.image,
                level: res.level,
                currentExperience: res.currentExperience,
                challengesCompleted: res.challengesCompleted
            }
        }
    }
}
