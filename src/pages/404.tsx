import { RocketLaunchIcon } from '@heroicons/react/24/outline';
import type { FC } from 'react';

import Button from '@app/components/Button';

const NotFound: FC = () => {
  return (
    <main className="flex flex-col items-center p-8 min-h-screen justify-center">
      <RocketLaunchIcon width={96} height={96} className="text-gray-300 mb-4" />
      <h1 className="text-center text-6xl font-bold">
        404
        <br />
        Page Not Found
      </h1>
      <p className="text-center max-w-lg mt-4 text-lg">
        We are disappointed to inform you that the page you are trying to access
        does not actually exist! Head back to home down below!
      </p>
      <Button className="bg-white text-blue-500 border border-blue-500 py-2 px-4 rounded-lg mt-4 hover:shadow-lg shadow-md">
        Home Page
      </Button>
    </main>
  );
};

export default NotFound;
