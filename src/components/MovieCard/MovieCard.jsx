import PageHeader from 'components/PageHeader';
import styles from './MovieCard.module.scss';
import PropTypes from 'prop-types';

const MovieCard = ({ movie: {title, overview, genres, poster_path, vote_average, release_date}}) => {
  let imageUrl = '';
  if(!poster_path) {
    imageUrl = 'https://cdn.browshot.com/static/images/not-found.png';
  };

  return (
    <>
      <article className={styles.MovieCard}>
        <img
          src={imageUrl || `https://image.tmdb.org/t/p/w400/${poster_path}`}
          alt={title}
          className={styles.MovieCard__image}
        />
        <div className={styles.MovieCard__content}>
          <PageHeader className={styles.MovieCard__name} text={ title + ' (' + release_date.slice(0,4) + ')'} /> 
          <p className={styles.MovieCard__text}><i><b>Rating:</b></i> {vote_average}</p>
          <h2 className={styles.MovieCard__title}><i>Overview</i></h2>
          <p className={styles.MovieCard__text}>{ overview }</p>
          <h2 className={styles.MovieCard__title}><i>Genres</i></h2>
          <ul className={styles.MovieCard__genreslist}>
            {genres.map( ({name, id}) => (
              <li className={styles.MovieCard__genresitem} key={id}>{name}</li>
            ))}
          </ul>  
        </div>    
      </article>
      <hr/>
    </>
  )
};

export default MovieCard;

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    genres: PropTypes.array.isRequired,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number.isRequired,
    release_date: PropTypes.string.isRequired,
  }).isRequired
};