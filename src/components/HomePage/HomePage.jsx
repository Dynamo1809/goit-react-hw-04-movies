import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PageHeader from 'components/PageHeader';
import * as moviesAPI from 'services/movies-api.js';
import './HomePage.scss';
import PropTypes from 'prop-types';

function HomePage() {
  const { pathname } = useLocation(); 
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    moviesAPI
      .fetchPopularMovies()
      .then(({data}) => setMovies(data.results))
      .catch(console.log)
  }, []);

  return (
    <section>
      <PageHeader text="Trending movies"/>
      <ul className="HomePage__list">
        {movies && movies.map(({ id, title }) =>  (
          
        <li key={id} className="HomePage__item">
          <Link 
            to={{
              pathname: `./movies/${id}`,
              state: {
                backUrl: pathname,
              } 
            }} 
            className="HomePage__link"
          >
          { title }
          </Link>
        </li>
        ))}
      </ul>
    </section>
  )
};

export default HomePage;

HomePage.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }))
};