import axios from 'axios';

export const signInService = async (username: string, password: string) => {
  return await axios.post(
    'http://localhost:8080/auth/realms/pgm/protocol/openid-connect/token',
    new URLSearchParams({
      client_id: 'pgm_manager',
      client_secret: 'uImxPyYrFoPJPg6dZHgotbxPHPn57MbY',
      grant_type: 'password',
      username,
      password,
    }),
  );
};
