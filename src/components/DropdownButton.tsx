import Link from 'next/link';
import { signOut } from 'next-auth/client'
import styles from '../styles/components/dropdownButton.module.css';

type dropDownProps = {
    pathName: string;
};

function toggleMenu() {
    let menu = document.getElementById("menu")
    menu.style.display == "none" ?
        menu.style.display = "inline-block" : menu.style.display = "none"
}

export function DropdownButton(props: dropDownProps) {
    return (
        <div className={styles.container}>
            <button onClick={toggleMenu} type='button'>
                <svg width="25" height="25" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 30H135C143.284 30 150 23.284 150 15C150 6.716 143.284 0 135 0H15C6.716 0 0 6.716 0 15C0 23.284 6.716 30 15 30Z" fill="var(--titlePrimary)" />
                    <path d="M135 60H15C6.716 60 0 66.716 0 75C0 83.284 6.716 90 15 90H135C143.284 90 150 83.284 150 75C150 66.716 143.284 60 135 60Z" fill="var(--titlePrimary)" />
                    <path d="M135 120H15C6.716 120 0 126.716 0 135C0 143.284 6.716 150 15 150H135C143.284 150 150 143.284 150 135C150 126.716 143.284 120 135 120Z" fill="var(--titlePrimary)" />
                </svg>
            </button>
            <ul id="menu" className={styles.list}>
                <li>
                    <Link href="/inicio">
                        <a className={props.pathName === '/inicio' ? styles.active : ""}>
                            <svg width="1.3rem" height="1.3rem" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 12L16 2.66663L28 12V26.6666C28 27.3739 27.719 28.0522 27.219 28.5522C26.7189 29.0523 26.0406 29.3333 25.3333 29.3333H6.66667C5.95942 29.3333 5.28115 29.0523 4.78105 28.5522C4.28095 28.0522 4 27.3739 4 26.6666V12Z" stroke="#2AA9E0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 29.3333V16H20V29.3333" stroke="#2AA9E0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <span>Início</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/classificacao">
                        <a>
                            <svg width="1.3rem" height="1.3rem" viewBox="0 0 22 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.9998 20C16.1545 20 20.3332 15.8214 20.3332 10.6667C20.3332 5.51205 16.1545 1.33337 10.9998 1.33337C5.84518 1.33337 1.6665 5.51205 1.6665 10.6667C1.6665 15.8214 5.84518 20 10.9998 20Z" stroke="var(--titlePrimary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M5.94683 18.52L4.3335 30.6667L11.0002 26.6667L17.6668 30.6667L16.0535 18.5067" stroke="var(--titlePrimary)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <span>Classificação</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/sobre">
                        <a>
                            <svg width="1.3rem" height="1.3rem" viewBox="0 0 256 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M84.635 20.256C103.018 20.256 117.921 35.159 117.921 53.542C117.921 71.925 103.018 86.828 84.635 86.828C66.252 86.828 51.349 71.925 51.349 53.542C51.349 35.159 66.251 20.256 84.635 20.256ZM31.002 145.011C31.002 142.512 32.608 140.817 35.196 140.817C37.784 140.817 39.39 142.423 39.39 145.011V237.997H130.859V145.011C130.859 142.512 132.465 140.817 135.053 140.817C137.552 140.817 139.247 142.423 139.247 145.011V237.997H168.339V136.623C168.339 113.689 149.599 95.038 126.754 95.038H118.366L93.915 133.053L90.97 104.586L94.986 94.948H76.96L80.976 104.586L77.853 133.231L53.401 95.038H43.585C20.651 95.038 2 113.778 2 136.623V237.998H31.092V145.012H31.002V145.011ZM247.13 2H171.87C168.07 2 165 5.07 165 8.87V28.78L141.83 50H165V60.13C165 63.93 168.07 67 171.87 67H247.13C250.93 67 254 63.93 254 60.13V8.87C254 5.07 250.93 2 247.13 2ZM193 40H183V30H193V40ZM215 40H205V30H215V40ZM237 40H227V30H237V40Z" fill="var(--titlePrimary)" />
                            </svg>
                            <span>Sobre</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <a onClick={() => signOut()} >
                        <svg width="1.3rem" height="1.3rem" viewBox="0 0 437 472" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M87.719 446.2H210.619C216.924 446.2 222.119 451.314 222.119 457.7C222.119 464.095 217.014 469.2 210.619 469.2H87.719C40.6221 469.2 2.21899 430.894 2.21899 383.7V87.5C2.21899 40.4031 40.5251 2 87.719 2H212.619C219.014 2 224.119 7.10457 224.119 13.5C224.119 19.8954 219.014 25 212.619 25H87.719C53.3166 25 25.219 52.9933 25.219 87.5V383.7C25.219 418.102 53.2123 446.2 87.719 446.2Z" fill="var(--titlePrimary)" stroke="var(--titlePrimary)" stroke-width="4" />
                            <path d="M431.605 227.514L431.612 227.521L431.618 227.528C436.102 231.927 436.141 239.25 431.505 243.886L345.705 329.686L345.691 329.699L345.678 329.713C343.485 331.99 340.52 333.1 337.619 333.1C334.752 333.1 331.76 331.913 329.533 329.686C325.014 325.167 325.014 317.933 329.533 313.414L392.333 250.614L395.747 247.2H390.919H117.019C110.624 247.2 105.519 242.095 105.519 235.7C105.519 229.305 110.624 224.2 117.019 224.2H390.919H395.747L392.333 220.786L329.533 157.986C325.014 153.467 325.014 146.233 329.533 141.714C334.052 137.195 341.286 137.195 345.805 141.714L431.605 227.514Z" fill="var(--titlePrimary)" stroke="var(--titlePrimary)" stroke-width="4" />
                        </svg>

                        <span>Sair</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}