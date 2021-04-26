import React from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import styles from './App.module.css';

import SearchPanel from './components/SearchPanel/SearchPanel';
import SearchSpinner from './components/SearchSpinner/SearchSpinner';
import RepositoryList from './components/RepositoryList/RepositoryList';
import { changePage, load, showRepos } from './store/actions/repoAction';
import { RepoType } from './store/reducers/repoReducer';
import { AppStateType } from './store/reducers/rootReducer';

type MapStatePropsType = {
  repos: Array<RepoType>;
  isLoading: boolean;
  error: string;
  totalCount: number;
  currentPage: number;
  organization: string;
};

type MapDispatchPropsType = {
  changePage: (selected: number) => void;
  showRepos: (org: string, page: number) => void;
  load: () => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

const App: React.FC<PropsType> = ({
  repos,
  isLoading,
  error,
  totalCount,
  currentPage,
  organization,
  changePage,
  showRepos,
  load,
}) => {
  const maxVisibleRowsCount = 5;
  const pageCount = Math.ceil(totalCount / maxVisibleRowsCount);

  const onPageChange = ({ selected }: { selected: number }) => {
    changePage(selected);
    load();
    showRepos(organization, selected + 1);
  };

  const data =
    organization && totalCount === 0 ? (
      <p className={`lead ${styles.notFound}`}>У этой компании нет репозиториев</p>
    ) : (
      <React.Fragment>
        <RepositoryList repos={repos} />
        {repos.length ? (
          <div className={`${styles.paginate}`}>
            <ReactPaginate
              pageCount={pageCount}
              marginPagesDisplayed={3}
              pageRangeDisplayed={4}
              previousLabel={'<<'}
              nextLabel={'>>'}
              breakLabel={'...'}
              onPageChange={onPageChange}
              forcePage={currentPage}
              containerClassName={'pagination'}
              activeClassName={'active'}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousLinkClassName="page-link"
              nextLinkClassName="page-link"
              previousClassName="page-item"
              nextClassName="page-item"
            />
          </div>
        ) : null}
      </React.Fragment>
    );

  const content = error ? (
    <p className={`lead text-danger ${styles.notFound}`}>Такой организации не существует</p>
  ) : (
    data
  );

  return (
    <div className="container">
      <h1 className={styles.title}>Github Organizations Info</h1>
      <p className={`lead ${styles.text}`}>
        Отображает список репозиториев и дополнительную информацию по какой-либо компании на Github
      </p>

      <SearchPanel />

      {isLoading ? <SearchSpinner /> : content}
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    repos: state.repo.repos,
    isLoading: state.repo.isLoading,
    error: state.repo.error,
    totalCount: state.repo.totalCount,
    currentPage: state.repo.currentPage,
    organization: state.repo.organization,
  };
};

// ANY?
const mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
  return {
    changePage: selected => dispatch(changePage(selected)),
    showRepos: (org, page) => dispatch(showRepos(org, page)),
    load: () => dispatch(load()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
