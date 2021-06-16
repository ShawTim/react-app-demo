import React, { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from '@base/app/hooks';
import { clearError } from '@features/error/slice';
import { fetchUserRepos } from '@features/github/slice';
import Nav from '@components/Nav';
import DataList from '@components/DataList';

import './style.scss';

const Repos = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { username } = useParams<{ username: string }>();
  const repos = useAppSelector((state) => state.github.repos[username] ?? []);
  const hasCache = !!repos.length;

  // clear error when leave the page
  useEffect(() => () => {
    dispatch(clearError());
  }, [dispatch]);

  // query user repo when enter the page if it's not cached
  useEffect(() => {
    !hasCache && dispatch(fetchUserRepos(username));
  }, [username, hasCache, dispatch]);

  const onRepoClick = useCallback((full_name: string) => history.push(`/files/${full_name}`), [history]);

  return (
    <>
      <Nav username={username} />
      <DataList>
        {repos.map((repo) =>
          <ListGroup.Item
            key={repo.id}
            action
            onClick={() => onRepoClick(repo.full_name)}>
            <label className="repo-name"><i className="bi bi-code"></i> {repo.name}</label>
            <span className="repo-desc">{repo.description}</span>
          </ListGroup.Item>
        )}
      </DataList>
    </>
  );
};

export default Repos;