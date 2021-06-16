import React, { useState } from 'react';
import { ListGroup, Pagination } from 'react-bootstrap';

export type DataListProps = {
  children: React.ReactNode[],
};

const defaultProps: DataListProps = {
  children: [],
}

export const PAGE_SIZE = 10;

const DataList = (props: DataListProps) => {
  const { children } = props;
  const [page, setPage] = useState(0);
  
  const pageIndexes = new Array(Math.ceil(children.length/PAGE_SIZE)).fill(0).map((_, i) => i);
  const start = page * PAGE_SIZE;

  return children.length ? (
    <>
      <ListGroup className="data-list mb-3">
        {children.slice(start, start + PAGE_SIZE)}
      </ListGroup>
      <Pagination className="data-pagination">
        {pageIndexes.map((p) =>
          <Pagination.Item
            key={`page-${p}`}
            active={page === p}
            activeLabel=""
            onClick={() => setPage(p)}>
            {p + 1}
          </Pagination.Item>
        )}
      </Pagination>
    </>
  ) : null;
};

DataList.defaultProps = defaultProps;

export default DataList;