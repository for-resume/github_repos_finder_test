import React from 'react';

import Repository from '../Repository/Repository';

import { RepoType } from '../../store/reducers/repoReducer';

type PropsType = {
  repos: Array<RepoType>;
};

const RepositoryList: React.FC<PropsType> = ({ repos }) => {
  return (
    <div>
      {repos &&
        repos.map(repo => (
          <Repository
            key={repo.id}
            name={repo.name}
            watch={repo.watchers_count}
            star={repo.stargazers_count}
            fork={repo.forks_count}
            url={repo.clone_url}
          />
        ))}
    </div>
  );
};

export default RepositoryList;
