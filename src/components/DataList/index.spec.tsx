import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import DataList from '.';

const randomString = () => Math.random().toString(36).substring(2);
const generateData = (count: number) => new Array(count).fill(0).map(() => randomString());

describe("render DataList", () => {
  it("without data", () => {
    const result = render(<DataList />);
  
    expect(result.container.children.length).toBe(0);
  });
  
  it("with 5 rows of data", () => {
    const data = generateData(5);
    const children = data.map((row, i) => <span key={`${row}${i}`}>{row}</span>);
    const result = render(<DataList>{children}</DataList>);
  
    const listNode = result.getByText(data[0]).parentNode;
    const paginationNode = listNode?.parentNode?.children[1];
  
    expect(listNode?.children.length).toBe(5);
    data.forEach((row, i) => {
      const rowNode = listNode?.children[i];
      expect(rowNode).toBeVisible();
      expect(rowNode).toHaveTextContent(row);
      expect(rowNode?.tagName).toMatch(/span/i);
    });
  
    expect(paginationNode?.children.length).toBe(1);
    expect(paginationNode?.children[0]).toHaveClass("active");
    expect(paginationNode?.children[0]?.children?.[0]?.tagName).toMatch(/span/i);
  });
  
  it("with 10 rows of data", () => {
    const data = generateData(10);
    const children = data.map((row, i) => <span key={`${row}${i}`}>{row}</span>);
    const result = render(<DataList>{children}</DataList>);
  
    const listNode = result.getByText(data[0]).parentNode;
    const paginationNode = listNode?.parentNode?.children[1];
  
    expect(listNode?.children.length).toBe(10);
    data.forEach((row, i) => {
      const rowNode = listNode?.children[i];
      expect(rowNode).toBeVisible();
      expect(rowNode).toHaveTextContent(row);
      expect(rowNode?.tagName).toMatch(/span/i);
    });
  
    expect(paginationNode?.children.length).toBe(1);
    expect(paginationNode?.children[0]).toHaveClass("active");
    expect(paginationNode?.children[0]).toHaveTextContent("1");
    expect(paginationNode?.children[0]?.children?.[0]?.tagName).toMatch(/span/i);
  });
  
  it("with 25 rows of data", () => {
    const data = generateData(25);
    const children = data.map((row, i) => <span key={`${row}${i}`}>{row}</span>);
    const result = render(<DataList>{children}</DataList>);
  
    const listNode = result.getByText(data[0]).parentNode;
    const paginationNode = listNode?.parentNode?.children[1];
  
    expect(listNode?.children.length).toBe(10);
    data.forEach((row, i) => {
      const rowNode = listNode?.children[i];
      if (i < 10) {
        expect(rowNode).toBeVisible();
        expect(rowNode).toHaveTextContent(row);
        expect(rowNode?.tagName).toMatch(/span/i);
      } else {
        expect(rowNode).toBeUndefined();
      }
    });
  
    expect(paginationNode?.children.length).toBe(3);
    expect(paginationNode?.children[0]).toHaveClass("active");
    expect(paginationNode?.children[0]).toHaveTextContent("1");
    expect(paginationNode?.children[0]?.children?.[0]?.tagName).toMatch(/span/i);
    expect(paginationNode?.children[1]).not.toHaveClass("active");
    expect(paginationNode?.children[1]).toHaveTextContent("2");
    expect(paginationNode?.children[1]?.children?.[0]?.tagName).toMatch(/a/i);
    expect(paginationNode?.children[2]).not.toHaveClass("active");
    expect(paginationNode?.children[2]).toHaveTextContent("3");
    expect(paginationNode?.children[2]?.children?.[0]?.tagName).toMatch(/a/i);
  });
  
  it("with 35 rows of data, and navigate to page 3", async () => {
    const data = generateData(35);
    const children = data.map((row, i) => <span key={`${row}${i}`}>{row}</span>);
    const result = render(<DataList>{children}</DataList>);
  
    const listNode = result.getByText(data[0]).parentNode;
    const paginationNode = listNode?.parentNode?.children[1];
  
    expect(listNode?.children.length).toBe(10);
    data.forEach((row, i) => {
      const rowNode = listNode?.children[i];
      if (i < 10) {
        expect(rowNode).toBeVisible();
        expect(rowNode).toHaveTextContent(row);
        expect(rowNode?.tagName).toMatch(/span/i);
      } else {
        expect(rowNode).toBeUndefined();
      }
    });
  
    expect(paginationNode?.children.length).toBe(4);
    expect(paginationNode?.children[0]).toHaveClass("active");
    expect(paginationNode?.children[0]).toHaveTextContent("1");
    expect(paginationNode?.children[0]?.children?.[0]?.tagName).toMatch(/span/i);
    expect(paginationNode?.children[1]).not.toHaveClass("active");
    expect(paginationNode?.children[1]).toHaveTextContent("2");
    expect(paginationNode?.children[1]?.children?.[0]?.tagName).toMatch(/a/i);
    expect(paginationNode?.children[2]).not.toHaveClass("active");
    expect(paginationNode?.children[2]).toHaveTextContent("3");
    expect(paginationNode?.children[2]?.children?.[0]?.tagName).toMatch(/a/i);
    expect(paginationNode?.children[3]).not.toHaveClass("active");
    expect(paginationNode?.children[3]).toHaveTextContent("4");
    expect(paginationNode?.children[3]?.children?.[0]?.tagName).toMatch(/a/i);
  
    fireEvent.click(paginationNode?.children[2]?.children[0] ?? window);
  
    await screen.findByText(data[20]);
  
    const newListNode = result.getByText(data[20]).parentNode;
    const newPaginationNode = newListNode?.parentNode?.children[1];
  
    expect(newListNode?.children.length).toBe(10);
    data.slice(20, 30).forEach((row, i) => {
      const rowNode = newListNode?.children[i];
      expect(rowNode).toBeVisible();
      expect(rowNode).toHaveTextContent(row);
      expect(rowNode?.tagName).toMatch(/span/i);
    });
  
    expect(newPaginationNode?.children.length).toBe(4);
    expect(newPaginationNode?.children[0]).not.toHaveClass("active");
    expect(newPaginationNode?.children[0]).toHaveTextContent("1");
    expect(newPaginationNode?.children[0]?.children?.[0]?.tagName).toMatch(/a/i);
    expect(newPaginationNode?.children[1]).not.toHaveClass("active");
    expect(newPaginationNode?.children[1]).toHaveTextContent("2");
    expect(newPaginationNode?.children[1]?.children?.[0]?.tagName).toMatch(/a/i);
    expect(newPaginationNode?.children[2]).toHaveClass("active");
    expect(newPaginationNode?.children[2]).toHaveTextContent("3");
    expect(newPaginationNode?.children[2]?.children?.[0]?.tagName).toMatch(/span/i);
    expect(newPaginationNode?.children[3]).not.toHaveClass("active");
    expect(newPaginationNode?.children[3]).toHaveTextContent("4");
    expect(newPaginationNode?.children[3]?.children?.[0]?.tagName).toMatch(/a/i);
  });
});



