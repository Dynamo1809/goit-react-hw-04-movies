import { NavLink} from "react-router-dom";
import {createUseStyles} from 'react-jss';
import styles from './Navigation.module.scss';

const useStyles = createUseStyles({
  myNavLinkActive:{
    color: 'blue',
    fontWeight: 'bold',
  },
});

const Navigation = () => {
  const classes = useStyles();  
  return (
    <header>
      <nav>
        <ul className={styles.Nav__list}>
          <li className={styles.Nav__item}>
            <NavLink 
              to={"/"} 
              exact 
              className={styles.Nav__link} 
              activeClassName={classes.myNavLinkActive}
            >
            Home
            </NavLink>
          </li>
          
          <li className={styles.Nav__item}>
            <NavLink 
              to={"/movies"}
              className={styles.Nav__link} 
              activeClassName={classes.myNavLinkActive}
            >
            Movies
            </NavLink>
          </li>
        </ul>
        
      </nav>
      <hr />
    </header>
  )
};

export default Navigation;