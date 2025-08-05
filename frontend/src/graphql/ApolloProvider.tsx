import { MockedProvider } from '@apollo/client/testing';
import { ReactNode } from 'react';
import { mocks } from '../entities/user/mock';

export const ApolloProvider = ({ children }: { children: ReactNode }) => {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  );
};
