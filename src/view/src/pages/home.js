import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_NOTES = gql`
  query noteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
      notes {
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
  }
`;
const Home = () => {
  const { data, loading, error } = useQuery(GET_NOTES);
  if (error) return <p>Error!</p>;
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        data.noteFeed.notes.map((note) => (
          <div key={note.id}>{note.author.username}</div>
        ))
      )}
      <p>This is home page</p>
    </div>
  );
};
export default Home;
