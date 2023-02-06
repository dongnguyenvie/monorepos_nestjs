import { dev } from '$app/environment';

export const isDevEnv = () => (import.meta.env.NODE_ENV = 'development');
export const getApiEndPoint = () => (dev ? 'http://localhost:7001/api' : 'https://api.noinghe.com/api');
