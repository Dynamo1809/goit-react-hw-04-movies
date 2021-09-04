import styles from './PageHeader.module.scss';
import PropTypes from 'prop-types';

const PageHeader = ({ text }) => (
  <h1 className={styles.PageHeader__title}>{text}</h1>
);

export default PageHeader;

PageHeader.propTypes = {
  text: PropTypes.string.isRequired
}