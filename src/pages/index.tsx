/* eslint-disable react/no-unescaped-entities */
import { UserGroupIcon, UserIcon } from '@heroicons/react/24/outline';
import type { FC } from 'react';

const Home: FC = () => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-12">
        <div className="flex items-center justify-center">
          <img
            className="w-96 rounded-lg"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw_HeSzHfBorKS4muw4IIeVvvRgnhyO8Gn8w&s"
            alt="Donation image"
          />
        </div>
        <div className="flex flex-col space-y-4 text-left">
          <h4 className="text-sm font-semibold text-blue-700 uppercase">
            Donate Blood
          </h4>
          <h2 className="text-2xl font-bold text-gray-800 leading-tight">
            Why Should You Donate Blood?
          </h2>
          <p className="text-[#000000]">
            Blood donation is a life-saving gift that helps people facing
            medical emergencies, surgeries, and chronic conditions. Each
            donation has the power to save up to three lives, providing hope and
            healing to those in need. By donating blood, you support a critical
            supply chain that hospitals and clinics rely on daily to care for
            patients. It's a simple, impactful act of kindness that can make a
            real difference in your community.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="px-4 py-2 text-[#ffffff] bg-[#0F62FE] hover:bg-blue-700 rounded-md font-medium"
            >
              Donate now
            </a>
            <a
              href="#"
              className="px-4 py-2 text-blue-600 border border-blue-600 hover:bg-blue-50 rounded-md font-medium"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>

      <div className="p-6 lg:p-12 space-y-8">
        <h4 className="text-center text-sm font-semibold text-blue-700 uppercase">
          Impact in Numbers
        </h4>
        <h2 className="text-center text-3xl font-bold text-gray-800 leading-snug">
          Every drop counts. Together, we've made a life-saving difference.
          <br />
          Thousands of lives touched, one donation at a time.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <UserIcon className="w-16 h-16 text-[#c1c7cd] " />
            <p className="">
              Over <strong className="text-gray-800">10,000+</strong> people
              have registered to donate blood and save lives.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="0.63em"
              height="1em"
              viewBox="0 0 15 24"
              className="w-16 h-16 fill-current text-[#c1c7cd]"
            >
              <path d="M14.647 13.663a2 2 0 0 0-.104-.239l.005.011c-.146-.341-1.32-2.609-1.516-2.918L7.581-.001l-5.59 10.776c-.19.31-1.232 2.32-1.376 2.66l-.057.126A7.5 7.5 0 0 0 0 16.417a7.582 7.582 0 1 0 15.164 0v-.006l.001-.101c0-.955-.19-1.866-.535-2.696l.017.047zm-7.062 8.355a5.585 5.585 0 0 1-4.899-8.269l-.015.029a6.4 6.4 0 0 0-.11 1.181v.001a6.7 6.7 0 0 0 6.696 6.696c.113 0 .234 0 .346-.006a5.5 5.5 0 0 1-2.003.368h-.023h.001z" />
            </svg>
            <p className="">
              We have successfully collected over{' '}
              <strong className="text-gray-800">25,000 liters</strong> of blood
              to help those in need.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <svg
              width="80"
              height="73"
              viewBox="0 0 80 73"
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 fill-current text-[#c1c7cd]"
            >
              <path
                d="M28.464 43.996L24 8.79199L19.536 43.992H4C1.792 43.992 0 42.244 0 40.088C0.0126603 39.0391 0.440956 38.0381 1.19088 37.3047C1.94081 36.5712 2.9511 36.1653 4 36.176H12.464L16.064 7.83199C16.6 3.54399 20.6 0.503988 24.98 1.03199C28.62 1.47199 31.484 4.27199 31.936 7.83199L35.532 36.176H43.428L48 65.16L52.568 36.18H76C78.208 36.18 80 37.932 80 40.092C80 42.252 78.208 44 76 44H59.432L55.908 66.348C55.6324 68.0067 54.8355 69.5345 53.6329 70.7098C52.4304 71.885 50.8846 72.6466 49.22 72.884C44.852 73.544 40.768 70.616 40.092 66.348L36.572 44H28.46L28.464 43.996Z"
                fill="#C1C7CD"
              />
            </svg>

            <p className="">
              Thanks to generous donors, we've helped{' '}
              <strong className="text-gray-800">15,000+</strong> patients
              receive life-saving blood transfusions.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <UserGroupIcon className="w-16 h-16 text-[#c1c7cd]" />
            <p className="">
              More than <strong className="text-gray-800">200+</strong>{' '}
              hospitals are actively receiving blood donations and providing
              care to patients.
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href="#"
            className="px-6 py-3 text-[#ffffff] bg-[#0F62FE] hover:bg-blue-700 rounded-md font-medium"
          >
            Feedback
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
