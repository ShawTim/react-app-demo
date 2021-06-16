import React from 'react';
import { Alert } from 'react-bootstrap';

import { useAppSelector } from '@base/app/hooks';

const ErrorBar = () => {
  const message = useAppSelector((state) => state.error.message);

  return message ? <Alert variant="danger"><i className="bi bi-exclamation-triangle-fill"></i> {message}</Alert> : null;
};

export default ErrorBar;