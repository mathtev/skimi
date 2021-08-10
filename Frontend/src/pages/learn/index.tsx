import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { GET_ALL_LESSONS } from './queries';

const Learn = () => {
  const queryData = useQuery(GET_ALL_LESSONS);

  useEffect(() => {
    console.log(queryData.data);
  }, [queryData.data]);

  return (
    <div>
      QUERY
    </div>
  );
};

export default Learn;
