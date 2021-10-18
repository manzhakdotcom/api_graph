import React from 'react';
import { Table } from 'react-bootstrap';
import Note from './Note';

const NoteFeed = ({ notes }) => {
  return (
    <Table striped bordered hover variant='dark'>
      <thead>
        <tr>
          <th>#</th>
          <th>Author</th>
          <th>Content</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>
        {notes.map((note, index) => (
          <Note key={note.id} index={index} note={note} />
        ))}
      </tbody>
    </Table>
  );
};

export default NoteFeed;
