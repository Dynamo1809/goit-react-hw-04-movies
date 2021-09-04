import {useState, useEffect} from 'react';
import * as moviesAPI from 'services/movies-api';
import styles from './Review.module.scss';
import PropTypes from 'prop-types';

const Review = ({id}) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    moviesAPI
      .fetchMoviesRewiews(id)
      .then( ({data}) => setReviews(data.results))
      .catch(console.log)
  }, [id]);

  return (
    <>
      <ul className={styles.Reviews__list}>
        {reviews.length > 0 ? reviews.map( ({author, content, id}) => (
          <li className={styles.Reviews__item} key={id}>
            <h3 className={styles.Reviews__title}>Author: {author}</h3>
            <p className={styles.Reviews__text}>{content}</p>
          </li>
        )): (
          <p>Don`t have reviews for this movie</p>
        )}
      </ul>
    </>
    
  )
};

export default Review;

Review.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }))
}