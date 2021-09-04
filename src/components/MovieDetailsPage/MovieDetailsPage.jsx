import { useState, useEffect, useMemo, lazy, Suspense} from 'react';
import { Route ,Link, useParams, useRouteMatch, useLocation, useHistory } from 'react-router-dom'
// import MovieCard from 'components/MovieCard';
import * as moviesAPI from 'services/movies-api';
import styles from './MovieDetailsPage.module.scss';
import PropTypes from 'prop-types';
const MovieCard = lazy(() => import('components/MovieCard' /* webpackChunkName: "movie-card" */));
const Cast = lazy(() => import('components/Cast' /* webpackChunkName: "cast" */ ));
const Review = lazy(() => import('components/Review' /* webpackChunkName: "review" */ ));


const MovieDetailsPage = () => {
  const {url , path} = useRouteMatch();
  const { state } = useLocation();
  const { moviesID } = useParams();
  const history = useHistory();
  const [movie, setMovie] = useState('');
  const navigationState = useMemo(() => {
    return state
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(() => {
    moviesAPI
      .fetchMoviesInfo(moviesID)
      .then(({data}) => setMovie(data))
      .catch(console.log)
  }, [moviesID]);

  const handleGoBack = () => { 
    if(navigationState?.searchName) {
      history.push({
        pathname: navigationState?.backUrl || '/',
        search: `query=${navigationState?.searchName}` || '/movies',
      });
      return;
    };
    
    history.push({
      pathname: state?.backUrl || '/',
    })

  };
  
  return (
    movie && <section className={styles.MovieDetailsPage__section}>  
      <button className={styles.MovieDetailsPage__btn} onClick={handleGoBack}>Go back</button>
      <MovieCard movie={movie} />
      <h2 className={styles.MovieDetailsPage__title}>Additional information</h2>   
      <ul className={styles.MovieDetailsPage__detailsList}>
        <li className={styles.MovieDetailsPage__detailsItem}>
          <Link 
            to={`${url}/cast`} 
            className={styles.MovieDetailsPage__link}
          >
          Cast
          </Link>
        </li>
        <li className={styles.MovieDetailsPage__detailsItem}>
          <Link 
            to={`${url}/reviews`} 
            className={styles.MovieDetailsPage__link}
          >
          Reviews
          </Link>
        </li>
      </ul>
      <hr/>
    
      <Suspense fallback={ <h1>Loading...</h1>}>
        <Route path={`${path}/cast`} exact>
          <Cast id={moviesID}/>
        </Route>
        <Route path={`${path}/reviews`} exact>
          <Review id={moviesID} />
        </Route>
      </Suspense>
    </section> 
  )   
};

export default MovieDetailsPage;

MovieDetailsPage.propTypes = {
  movie: PropTypes.array,
  moviesID: PropTypes.number
};

// key={id} id={id} title={title} overview={overview} genres={genres} img={poster_path}