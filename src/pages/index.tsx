import { Login } from '../components/Login';
import styles from '../styles/pages/Main.module.css';

export default function main() {
  return (
    <div className={styles.container}>
      <section>
        <div>
          <img className={styles.officeLogo} src="office.png" alt="icone" />
        </div>
        <div>
          <Login />
        </div>
      </section>
    </div>
  );
}