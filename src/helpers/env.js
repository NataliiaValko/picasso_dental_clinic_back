import { config } from 'dotenv';

config();

function env(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Environment variable ${name} is not defined`);
  }

  return value;
}

export default env;
