import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.github.com/',
});

export const githubAPI = {
  getOrganization(org: string) {
    return instance.get(`/orgs/${org}`).then(response => response.data);
  },
  getRepos(org: string, page: number, per_page: number = 5) {
    return instance
      .get(`/orgs/${org}/repos?page=${page}&per_page=${per_page}`)
      .then(response => response.data);
  },
};
