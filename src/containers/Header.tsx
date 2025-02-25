import styles from "./Header.module.css";
import { Link } from "react-router-dom";


const Header = () => {

    return (
        <>
            <header className={styles.header}>
                <h1>
                    <a href="/">
                        Let's Get Quizzical
                    </a>
                </h1>

                <nav>
                    <ul>
                        <Link to="/create"  >Créer un Quiz </Link>
                        <Link to="/login"  >Se connecter </Link>
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;