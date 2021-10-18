import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Note from '../components/Note';

const GET_NOTE = gql`
  query note($id: ID!) {
    note(id: $id) {
      id
      createdAt
      content
      favoriteCount
      author {
        username
        id
        avatar
      }
    }
  }
`;
const NotePage = ({ match }) => {
  const id = match.params.id;

  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

  if (error) return <p>Error! Note not found</p>;
  return <div>{loading ? <p></p> : <Note note={data.note} />}</div>;
};

export default NotePage;
