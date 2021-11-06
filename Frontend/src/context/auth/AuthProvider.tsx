import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { GET_CURRENT_USER } from '../../graphql/profile/queries';
import { Profile } from '../../graphql/profile/types';
import { LOGIN, LOGOUT } from '../../graphql/user/mutations';

interface IAuthContext {
  currentUser: Profile | null;
  authLoading: boolean;
  authenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = React.createContext<IAuthContext>({
  currentUser: null,
  authLoading: false,
  authenticated: false,
  login: () => undefined,
  logout: () => undefined,
});

const AuthProvider: React.FC = ({ children }) => {
  const { data, loading, refetch } = useQuery(GET_CURRENT_USER, {
    onCompleted: (user) => setCurrentUser(user),
  });
  const [loginMutation] = useMutation(LOGIN);
  const [logoutMutation] = useMutation(LOGOUT);

  const [currentUser, setCurrentUser] = React.useState(null);
  const authLoading = loading;
  const authenticated = !!currentUser; // check it later

  const login = (email: string, password: string) => {
    return loginMutation({
      variables: { email, password },
      onCompleted: (data) => {console.log('completed');refetch()},
    });
  };

  const logout = () => {
    setCurrentUser(null);
    return logoutMutation();
  };

  const values = {
    currentUser,
    authLoading,
    authenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
