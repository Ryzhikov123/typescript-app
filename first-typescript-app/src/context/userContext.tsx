import React from 'react';
import { createContext } from 'react';

interface IProps {
  children: JSX.Element;
}

interface IUser {
  _id: string;
  accessToken: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  roles: string[];
  address: {
    city: string;
    country: string;
    addressLine1: string;
    addressLine2: string;
  };
}

interface IUserContext {
  user: IUser | null;
}

export const UserContext = createContext<IUserContext>({
  user: null,
});

export const UserContextProvider = (props: IProps) => {
  const userInfo = localStorage.getItem('user');
  const user = userInfo !== null ? JSON.parse(userInfo) : null;
  return (
    <UserContext.Provider value={{ user: user }}>
      {props.children}
    </UserContext.Provider>
  );
};
