import { useLocation } from 'react-router-dom';
import { 
  HiOutlineFolderArrowDown,
  HiOutlineHome,
  HiOutlineInformationCircle
} from "react-icons/hi2";
import { cn } from '@app/utils/cn';

const ProfileSidebar = () => {
  const location = useLocation();
  return (
    <nav className="md:w-auto w-full">
      <ul className="space-y-3">
        <li>
          <a
            className={cn(
              location.pathname == '/profile' ? 'bg-gray-200' : '',
              'w-full text-left py-2 px-3 text-gray-600 rounded-md hover:bg-gray-200 flex flex-row hover:cursor-pointer',
            )}
            href="/profile"
          >
            <HiOutlineHome width={24} height={24} className="mr-2" /> Profile
          </a>
        </li>
        <li>
          <a
            className={cn(
              location.pathname == '/profile/donations'
                ? 'bg-gray-200 hover:cursor-default'
                : '',
              'w-full text-left py-2 px-3 text-gray-600 rounded-md hover:bg-gray-200 flex flex-row hover:cursor-pointer',
            )}
            href="/profile/donations"
          >
            <HiOutlineFolderArrowDown width={24} height={24} className="mr-2" />{' '}
            Previous Donations
          </a>
        </li>
        <li>
          <a
            className={cn(
              location.pathname == '/profile/questionnaires'
                ? 'bg-gray-200 hover:cursor-default'
                : '',
              'w-full text-left py-2 px-3 text-gray-600 rounded-md hover:bg-gray-200 flex flex-row hover:cursor-pointer',
            )}
            href="/profile/donations"
          >
            <HiOutlineInformationCircle width={24} height={24} className="mr-2" />{' '}
            Old Questionnaires
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default ProfileSidebar;
