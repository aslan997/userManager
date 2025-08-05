import {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
} from './graphql';

export const mocks = [
  {
    request: { query: GET_USERS },
    result: {
      data: {
        users: [
          { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
          { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
        ],
      },
    },
  },
  {
    request: {
      query: CREATE_USER,
      variables: {
        input: {
          name: 'New User',
          email: 'new@example.com',
          role: 'User',
          status: 'Active',
        },
      },
    },
    result: {
      data: {
        createUser: {
          id: '3',
          name: 'New User',
          email: 'new@example.com',
          role: 'User',
          status: 'Active',
        },
      },
    },
  },
  {
    request: {
      query: UPDATE_USER,
      variables: {
        id: '1',
        input: {
          name: 'Updated Name',
          email: 'updated@example.com',
          role: 'Admin',
          status: 'Active',
        },
      },
    },
    result: {
      data: {
        updateUser: {
          id: '1',
          name: 'Updated Name',
          email: 'updated@example.com',
          role: 'Admin',
          status: 'Active',
        },
      },
    },
  },
  {
    request: {
      query: DELETE_USER,
      variables: { id: '1' },
    },
    result: {
      data: {
        deleteUser: true,
      },
    },
  },
];
