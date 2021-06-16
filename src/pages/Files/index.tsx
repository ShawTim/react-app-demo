import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { ListGroup, Card } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import { useAppDispatch, useAppSelector } from '@base/app/hooks';
import { clearError } from '@features/error/slice';
import { fetchRepoFiles, fetchReadme } from '@features/github/slice';
import Nav from '@base/components/Nav';
import DataList from '@base/components/DataList';

import './style.scss';

const Files = () => {
  const dispatch = useAppDispatch();
  const { username, repo } = useParams<{ username: string, repo: string }>();
  const fullName = `${username}/${repo}`;
  const files = useAppSelector((state) => state.github.files[fullName] ?? []);
  const readmeFile = files.find((file) => file.path === "README.md");
  const readme = useAppSelector((state) => state.github.readmes?.[readmeFile?.download_url ?? ""] ?? "");
  const hasFilesCache = !!files.length;
  const hasReadmeCache = !!readme;

  // clear error when leave the page
  useEffect(() => () => {
    dispatch(clearError());
  }, [dispatch]);

  // query repo files when enter the page if it's not cached
  useEffect(() => {
    !hasFilesCache && dispatch(fetchRepoFiles(fullName));
  }, [fullName, hasFilesCache, dispatch]);

  // query readme content when README.md exists if it's not cached
  useEffect(() => {
    readmeFile?.download_url && !hasReadmeCache && dispatch(fetchReadme(readmeFile?.download_url));
  }, [readmeFile, hasReadmeCache, dispatch]);

  const sortedFiles = useMemo(() => files.filter((file) => file.type === "dir").concat(files.filter((file) => file.type !== "dir")), [files]);

  return (
    <>
      <Nav username={username} repo={repo} />
      <DataList>
        {sortedFiles.map((file) =>
          <ListGroup.Item key={file.path}>
            <i className={`bi bi-${file.type === "dir" ? "folder-fill" : "file-earmark"}`}></i>
            <span>&nbsp;</span>
            <label className="file-name">{file.type === "dir" ? `${file.name}/` : file.name}</label>
          </ListGroup.Item>
        )}
      </DataList>
      {readmeFile?.download_url && (
        <Card>
          <Card.Header>README.md</Card.Header>
          <Card.Body>
            <ReactMarkdown children={readme} />
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Files;