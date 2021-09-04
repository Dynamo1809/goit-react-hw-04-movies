import PropTypes from 'prop-types';
import {useState, useEffect} from 'react';
import * as moviesAPI from 'services/movies-api';
import styles from './Cast.module.scss';

const Cast = ({ id }) => {
  const [castInfo, setCastInfo] = useState([]);

  useEffect(() => {
    moviesAPI
      .fetchMoviesCast(id)
      .then(({data}) => setCastInfo(data.cast))
      .catch(console.log)
  }, [id]);

  return(
    <ul className={styles.Cast__list}>
      {castInfo && castInfo.map(({ name, profile_path, credit_id, character }) => {
        let imageUrl = '';
        if(!profile_path) {
          imageUrl = 'https://static-s.aa-cdn.net/img/gp/20600008127017/dtGf4WBc6yrzR6aUMcwhfYnmoTUYu7XEw9zwLFw_XB9AWoMLhIvNi51XrXSma9L9s3o=s300?v=1';
        };

        return (
          <li key={credit_id} className={styles.Cast__item}>
            <img src={imageUrl || `https://image.tmdb.org/t/p/w400/${profile_path}`} alt={name} className={styles.Cast__img} />
            <h3 className={styles.Cast__name}>{name}</h3>
            <p className={styles.Cast__text}>Character: {character}</p>
          </li>
        )
      })}
    </ul>
  )
};

export default Cast;

Cast.propTypes = {
  castInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    profile_path: PropTypes.string.isRequired,
    credit_id: PropTypes.number.isRequired,
    character: PropTypes.string.isRequired,
  }),
  id: PropTypes.string.isRequired,
}