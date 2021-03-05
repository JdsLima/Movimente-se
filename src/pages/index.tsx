import { Login } from '../components/Login';
import styles from '../styles/pages/Main.module.css';

export default function main() {
  return (
    <div className={styles.container}>
      <section>
        <div>
          <img draggable="false" className={styles.officeLogo} src="exercicios-sem-fundo.png" alt="icone" />
          <span></span><a href="http://www.freepik.com">Arte por vectorjuice / Freepik</a>
        </div>
        <div>
          <Login />
        </div>
      </section>
    </div>
  );
}