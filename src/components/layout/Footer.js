import classes from "./Footer.module.css";

function Footer(props) {
  return (
    <footer>
      <p className={classes.footerText}>
        About | Privacy Policy | © <a href="https://gjzim.com"> Gul Jamal Zim </a>, 2018
      </p>
    </footer>
  );
}

export default Footer;
