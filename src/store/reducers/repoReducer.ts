import { ActionsTypes } from '../actions/repoAction';

export type RepoType = {
  id: string;
  name: string;
  watchers_count: number;
  stargazers_count: number;
  forks_count: number;
  clone_url: string;
};

type InitStateType = {
  repos: Array<RepoType>;
  isLoading: boolean;
  error: string;
  totalCount: number;
  currentPage: number;
  organization: string;
};

const initState: InitStateType = {
  repos: [],
  isLoading: false,
  error: '',
  totalCount: 0,
  currentPage: 0,
  organization: '',
};

const repoReducer = (state = initState, action: ActionsTypes): InitStateType => {
  switch (action.type) {
    case 'CHANGE_PAGE':
      return { ...state, currentPage: action.selected };
    case 'LOAD':
      return { ...state, isLoading: true };
    case 'GET_REPOS':
      return { ...state, repos: action.data, isLoading: false, error: '' };
    case 'GET_REPOS_ERROR':
      return { ...state, error: action.err, isLoading: false };
    case 'GET_ORGANIZATION':
      return {
        ...state,
        totalCount: action.data.public_repos,
        organization: action.org,
        error: '',
        isLoading: false,
        currentPage: 0,
      };
    case 'GET_ORGANIZATION_ERROR':
      return { ...state, error: action.err, organization: '', isLoading: false, currentPage: 0 };
    default:
      return state;
  }
};

export default repoReducer;
