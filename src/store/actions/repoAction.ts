import { githubAPI } from '../../api/api';
import { RepoType } from '../reducers/repoReducer';
import { Dispatch } from 'redux';

type LoadActionType = {
  type: 'LOAD';
};

type ChangePageActionType = {
  type: 'CHANGE_PAGE';
  selected: number;
};

type GetOrganizationType = {
  type: 'GET_ORGANIZATION';
  data: { public_repos: number };
  org: string;
};

type GetOrganizationErrorType = {
  type: 'GET_ORGANIZATION_ERROR';
  err: string;
};

type GetReposType = {
  type: 'GET_REPOS';
  data: Array<RepoType>;
};

type GetReposErrorType = {
  type: 'GET_REPOS_ERROR';
  err: string;
};

export type ActionsTypes =
  | LoadActionType
  | ChangePageActionType
  | GetOrganizationType
  | GetOrganizationErrorType
  | GetReposType
  | GetReposErrorType;

export const load = (): LoadActionType => ({ type: 'LOAD' });

export const changePage = (selected: number): ChangePageActionType => ({
  type: 'CHANGE_PAGE',
  selected,
});

const getOrganization = (data: { public_repos: number }, org: string): GetOrganizationType => ({
  type: 'GET_ORGANIZATION',
  data,
  org,
});

const getOrganizationError = (err: string): GetOrganizationErrorType => ({
  type: 'GET_ORGANIZATION_ERROR',
  err,
});

const getRepos = (data: Array<RepoType>): GetReposType => ({ type: 'GET_REPOS', data });

const getReposError = (err: string): GetReposErrorType => ({ type: 'GET_REPOS_ERROR', err });

export const showOrganization = (org: string) => {
  return (dispatch: Dispatch<ActionsTypes>) => {
    githubAPI
      .getOrganization(org)
      .then(data => dispatch(getOrganization(data, org)))
      .catch(err => {
        dispatch(getOrganizationError(err));
      });
  };
};

export const showRepos = (org: string, page: number) => {
  return (dispatch: Dispatch<ActionsTypes>) => {
    githubAPI
      .getRepos(org, page)
      .then(data => dispatch(getRepos(data)))
      .catch(err => {
        dispatch(getReposError(err));
      });
  };
};
