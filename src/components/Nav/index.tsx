import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export type NavProps = {
  username: string,
  repo: string,
};

const defaultProps: NavProps = {
  username: "",
  repo: "",
}

const Nav = (props: NavProps) => {
  const { username, repo } = props;

  if (username && repo) {
    return (
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}><i className="bi bi-house"></i> Home</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/repos/${username}` }}><i className="bi bi-github"></i> {username}</Breadcrumb.Item>
        <Breadcrumb.Item active><i className="bi bi-code"></i> {repo}</Breadcrumb.Item>
      </Breadcrumb>
    )
  }

  if (username) {
    return (
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}><i className="bi bi-house"></i> Home</Breadcrumb.Item>
        <Breadcrumb.Item active><i className="bi bi-github"></i> {username}</Breadcrumb.Item>
      </Breadcrumb>
    )
  }

  return (
    <Breadcrumb>
      <Breadcrumb.Item active><i className="bi bi-house"></i> Home</Breadcrumb.Item>
    </Breadcrumb>
  )
};

Nav.defaultProps = defaultProps;

export default Nav;