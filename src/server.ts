import 'dotenv/config';

import app from './app';

const main = async () => {
  try {
    app.listen(3000, () => console.log('Server running in the port', 300));
  } catch (err) {
    console.error('Erro connected database or running server');
    console.error(err);
  }
};

main().then();
