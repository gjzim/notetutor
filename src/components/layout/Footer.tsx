import styles from "./Footer.module.css";

function Footer() {
    return (
        <footer>
            <p className={styles.footerText}>
                Designed &amp; Developed by &nbsp;
                <a href="http://gjzim.com" target="_blank" rel="noreferrer" data-cy="personal-site-link">
                    Gul Jamal Zim
                </a>
            </p>
        </footer>
    );
}

export default Footer;
