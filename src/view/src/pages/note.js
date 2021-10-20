import React from 'react';
import { useQuery } from '@apollo/client';
import Note from '../components/Note';
import { GET_NOTE } from '../gql/query';

const NotePage = ({ match }) => {
  const id = match.params.id;

  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

  if (error) return <p>Error! Note not found</p>;
  return <div>{loading ? <p></p> : <Note note={data.note} />}</div>;
};

export default NotePage;
