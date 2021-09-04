import { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import * as moviesAPI from 'services/movies-api';
import qs from 'query-string';
import './MoviesPage.scss';
import 'components/HomePage/HomePage.scss';
import PropTypes from 'prop-types';


const MoviesPage = () => {
  const {pathname, search} = useLocation();
  const history = useHistory();
  const [inputValue, setInputValue] = useState('');
  const [searchName, setSearchName] = useState(qs.parse(search).query || '');
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    if(searchName.trim() === '') {
      return;
    };

    moviesAPI
      .fetchMoviesByName(searchName)
      .then(({data}) => setMoviesList(data.results))
      .catch(console.log);

  }, [searchName]);

  const handleChange = ({ target }) => {
    setInputValue(target.value.toLowerCase());

    if(target.value.trim() !== '') {
      history.push({
        pathname,
        search: `?query=${target.value}`,
      });

      return;
    };
    
    if(target.value === '') {
      history.push({
        pathname, 
      });
    };

  };

  const formSubmit = (e) => {
    e.preventDefault();
    setSearchName(inputValue);
  };

  return (
    <section>
      <form onSubmit={formSubmit}>
        <input
            className="MoviesPage__input"
            type="text"
            name="search"
            // autoFocus
            placeholder="Search movies by name:"
            value={inputValue}
            onChange={handleChange}
        />
        <button type="submit" className="MoviesPage__button">Search</button>
      </form>

      <ul className="HomePage__list">
        {moviesList && moviesList.map(({ id, title }) =>(
        <li key={id} className="HomePage__item">
          <Link 
            to={{
              pathname: `./movies/${id}`,
              state: {
                backUrl: pathname,
                searchName,
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

  );
};

export default MoviesPage;

MoviesPage.propTypes = {
  inputValue: PropTypes.string,
  searchName: PropTypes.string,
  moviesList: PropTypes.node
}