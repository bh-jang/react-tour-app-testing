import { setupServer } from 'msw/node';
import { handlers } from './handler';

// mocking server
export const server = setupServer(...handlers);