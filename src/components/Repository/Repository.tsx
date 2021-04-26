import React from 'react';

import styles from './Repository.module.css';

type PropsType = {
  name: string;
  watch: number;
  star: number;
  fork: number;
  url: string;
};

const Repository: React.FC<PropsType> = ({ name, watch, star, fork, url }) => {
  return (
    <div className={`${styles.repository} card`}>
      <div className={`${styles.repositoryContainer} card-body`}>
        <div>
          <h5 className="card-title">{name}</h5>
          <p className="card-text">
            <a href={url}>{url}</a>
          </p>
        </div>
        <div>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <img src="icons/watch.png" alt="watch" />
                Watch
              </span>
            </div>
            <input
              value={watch}
              style={{ width: '6rem' }}
              readOnly={true}
              type="text"
              className="form-control"
            />
          </div>
        </div>
        <div>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <img src="icons/star.png" alt="star" />
                Star
              </span>
            </div>
            <input
              value={star}
              style={{ width: '6rem' }}
              readOnly={true}
              type="text"
              className="form-control"
            />
          </div>
        </div>
        <div>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <img src="icons/fork.png" alt="fork" />
                Fork
              </span>
            </div>
            <input
              value={fork}
              style={{ width: '6rem' }}
              readOnly={true}
              type="text"
              className="form-control"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repository;
