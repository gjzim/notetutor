import styles from "./Footer.module.css";

function Footer(props) {
  return (
    <footer>
      <p className={styles.footerText}>
        Designed & Developed by <a href="http://gjzim.com" target="_blank" rel="noreferrer" >Gul Jamal Zim</a>
      </p>
    </footer>
  );
}

export default Footer;
