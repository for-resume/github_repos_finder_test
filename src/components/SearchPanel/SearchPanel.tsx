import React, { useState } from 'react';
import { connect } from 'react-redux';

import { showOrganization, showRepos, load } from '../../store/actions/repoAction';

import styles from './SearchPanel.module.css';

import { AppStateType } from '../../store/reducers/rootReducer';

type MapStatePropsType = {
  page: number;
};

type MapDispatchPropsType = {
  showRepos: (org: string, page: number) => void;
  showOrganization: (org: string) => void;
  load: () => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

const SearchPanel: React.FC<PropsType> = ({ page, showRepos, load, showOrganization }) => {
  const [value, setValue] = useState('');

  const onSearchRepos = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (value) {
      load();
      showOrganization(value);
      showRepos(value, page);
    }
  };

  return (
    <form onSubmit={onSearchRepos} className={styles.searchPanel}>
      <input
        onChange={e => {
          setValue(e.target.value);
        }}
        value={value}
        className="form-control"
        type="text"
        placeholder="Название компании"
      />
      <button type="submit" className="btn btn-primary">
        Найти
      </button>
    </form>
  );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    page: state.repo.currentPage,
  };
};

// ANY?
const mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
  return {
    showRepos: (org: string, page: number) => dispatch(showRepos(org, page)),
    showOrganization: (org: string) => dispatch(showOrganization(org)),
    load: () => dispatch(load()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
