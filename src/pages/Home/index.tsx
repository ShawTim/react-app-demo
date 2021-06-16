import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import Nav from '@components/Nav';

const Home = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");

  const onUsernameChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => setUsername(ev.target.value), [setUsername]);
  const onQueryBtnClick = useCallback(() => history.push(`/repos/${username}`), [username, history]);

  return (
    <>
      <Nav />
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="username-desc">
            <i className="bi bi-github"></i>
          </InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          value={username}
          placeholder="Username"
          aria-label="Username"
          aria-describedby="username-desc"
          onChange={onUsernameChange} />
      </InputGroup>
      <Button variant="primary" onClick={onQueryBtnClick}>Query user repos</Button>
    </>
  );
};

export default Home;