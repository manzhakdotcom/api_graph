import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Note = ({ note, index }) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td><Link to={`note/${note.id}`}>{note.author.username}</Link></td>
      <td>{note.content}</td>
      <td>{moment(note.createdAt).format('YYYY-MM-DD')}</td>
    </tr>
  );
};

export default Note;
