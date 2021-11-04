import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_CURRENT_USER } from '../../graphql/profile/queries';
import { Profile } from '../../graphql/profile/types';

interface IAuthContext {
  currentUser: Profile | null;
}

export const AuthContext = React.createContext<IAuthContext>({
  currentUser: null,
});

const AuthProvider: React.FC = ({ children }) => {
  const currentUserQuery = useQuery(GET_CURRENT_USER);
  return (
    <AuthContext.Provider
      value={{ currentUser: currentUserQuery?.data?.currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
