import React from 'react';

import styles from './SearchSpinner.module.css';

const SearchSpinner = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className={`spinner-border text-primary ${styles.searchSpinner}`} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default SearchSpinner;
