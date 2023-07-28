import { userActions } from './user-slice';

// ==================================================

export const getUser = () => {
  const token = sessionStorage.getItem('token');

  return async (dispatch) => {
    const response = await fetch(
      'https://booking-server-6rik.onrender.com/user',
      {
        method: 'GET',
        headers: {
          Authorization: `Bear ${token}`,
        },
      }
    );

    const resData = await response.json();

    if (!response.ok) {
      return { error: true, message: resData.message };
    }

    return Object.keys(resData).map((key) =>
      dispatch(userActions.replaceUserState({ name: key, value: resData[key] }))
    );
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://booking-server-6rik.onrender.com/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const resData = await response.json();

    if (!response.ok) {
      return { error: true, message: resData.message };
    }

    if (resData.isAdmin) {
      return { message: 'This email is for admin only!' };
    }

    sessionStorage.setItem('token', resData.token);

    return Object.keys(resData).map((key) =>
      dispatch(userActions.replaceUserState({ name: key, value: resData[key] }))
    );
  };
};

export const register = async (username, email, password) => {
  const response = await fetch(
    'https://booking-server-6rik.onrender.com/register',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        isAdmin: false,
      }),
    }
  );

  const resData = await response.json();

  if (!response.ok) {
    return resData.message;
  }
};
