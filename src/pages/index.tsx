import { getSession, signIn, useSession } from 'next-auth/client';
import styles from '../styles/pages/Main.module.css';
import { Loading } from '../components/Loading';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

export default function main() {
  const [session, loading] = useSession();

  function moveToSignUp() {
    document.getElementById("container").classList.add(styles.signUpMode);
  }

  function moveToSignIn() {
    document.getElementById("container").classList.remove(styles.signUpMode);
  }

  return (
    <>
      {loading && <Loading />}
      {!session &&
        <div id="container" className={styles.container}>
          <Head>
            <title>Movimente-se</title>
          </Head>
          <div className={styles.formsContainer}>
            <div className={styles.signinSignup}>
              <form action="" className={styles.signInForm}>
                <img className={styles.imgLogo} src="/new-logo.svg" alt="" />
                <h1 className={styles.title}>Bem vindo!</h1>
                <h2 className={styles.title}>Entrar</h2>
                <div
                  onClick={() => signIn("google", { callbackUrl: 'http://movimente-se.vercel.app/inicio' })}
                  className={styles.inputField}
                  style={{ backgroundColor: "#2aa9e0" }}>
                  <i className="fa fa-google"></i>
                  <a>Entrar com o Google</a>

                </div>
                <div
                  onClick={() => signIn("github", { callbackUrl: 'http://movimente-se.vercel.app/inicio' })}
                  className={styles.inputField}
                  style={{ backgroundColor: "#56496e" }}>
                  <i className="fab fa-github"></i>
                  <a>Entrar com o GitHub</a>
                </div>
              </form>
              <form action="" className={styles.signUpForm}>
                <img className={styles.imgLogo} src="/new-logo.svg" alt="" />
                <h2 className={styles.title}>Cadastrar-se</h2>
                <div
                  onClick={() => signIn("google", { callbackUrl: 'http://movimente-se.vercel.app/inicio' })}
                  className={styles.inputField}
                  style={{ backgroundColor: "#2aa9e0" }}>
                  <i className="fa fa-google"></i>
                  <a>Cadastar com o Google</a>

                </div>
                <div
                  onClick={() => signIn("github", { callbackUrl: 'http://movimente-se.vercel.app/inicio' })}
                  className={styles.inputField}
                  style={{ backgroundColor: "#56496e" }}>
                  <i className="fab fa-github"></i>
                  <a>Cadastar com o GitHub</a>
                </div>
              </form>
            </div>
          </div>
          <div className={styles.panelsContainer}>
            <div className={`${styles.panel} ${styles.leftPanel}`}>
              <div className={styles.content}>
                <h3>Ainda não possui uma conta?</h3>
                <p>
                  Cadastre-se agora mesmo
                </p>
                <button
                  className={`${styles.btn} ${styles.transparent}`}
                  id="sign-up-btn"
                  onClick={moveToSignUp}>
                  Cadastrar-se
                </button>
              </div>
              <img src="/exercicios-sem-fundo.png" className={styles.image} alt="" />
            </div>
            <div className={`${styles.panel} ${styles.rightPanel}`}>
              <div className={styles.content}>
                <h3>Já possui uma conta?</h3>
                <p>Entre com o e-mail e senha ou conecte-se com o GitHub.</p>
                <button
                  className={`${styles.btn} ${styles.transparent}`}
                  id="sign-in-btn"
                  onClick={moveToSignIn}>
                  Entrar
                </button>
              </div>
              <img src="/login.svg" className={styles.image} alt="" />
            </div>
          </div>
        </div>
      }
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: '/inicio',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}