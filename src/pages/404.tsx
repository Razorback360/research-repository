import { RocketLaunchIcon } from '@heroicons/react/24/outline';
import type { FC } from 'react';

import Button from '@app/components/Button';

const NotFound: FC = () => {
  return (
    <main className="flex flex-col w-full items-center">
      <RocketLaunchIcon width={96} height={96} className="text-gray-300 my-20" />
      <h1 className="erorr text-6xl font-bold">
        404
        <br />
        Page Not Found
      </h1>
      <p className="not-found-description mt-10 text-lg">
        We are disappointed to inform you that the page you are trying to access
        does not actually exist! Head back to home down below!
      </p>
      <Button className="home-button bg-white text-blue-500 hover:shadow-lg shadow-md">Home Page</Button>
    </main>
  );
};

export default NotFound;
