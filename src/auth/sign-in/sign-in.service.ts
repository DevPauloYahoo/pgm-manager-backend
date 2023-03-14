import axios from 'axios';

const BASE_URL = process.env.URL_CONNECT || '';

export const signInService = async (username: string, password: string) => {
  return await axios.post(
    BASE_URL,
    new URLSearchParams({
      client_id: process.env.CLIENT_ID || '' ,
      client_secret: process.env.CLIENT_SECRET || '',
      grant_type: process.env.GRANT_TYPE || '',
      username,
      password
    }),
  );
};
