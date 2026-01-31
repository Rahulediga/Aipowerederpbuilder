import { createBrowserRouter } from 'react-router';
import { Landing } from '@/app/components/landing';
import { Generating } from '@/app/components/generating';
import { Preview } from '@/app/components/preview';
import { NotFound } from '@/app/components/not-found';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Landing,
  },
  {
    path: '/generate',
    Component: Generating,
  },
  {
    path: '/preview',
    Component: Preview,
  },
  {
    path: '*',
    Component: NotFound,
  },
]);