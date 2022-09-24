import { FC } from "react";
import styles from './Header.module.css';

const Header: FC = () => {
    return (
        <header className={styles.backgroundStyle}>
            <h1>Next Wars</h1>
        </header>
    )
}

export default Header;