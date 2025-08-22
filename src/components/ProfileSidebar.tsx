import { 
  HiOutlineHome,
  HiOutlineDocument,
  HiOutlineFolder,
  HiOutlineUser
} from "react-icons/hi2";
import { cn } from '@app/utils/cn';
import { useRouter } from "next/router";

const ProfileSidebar = () => {
  const location = useRouter();
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
            <HiOutlineUser className="w-[24px] h-[24px] me-2" /> Profile
          </a>
        </li>
        <li>
          <a
            className={cn(
              location.pathname == '/profile/paper-uploads'
                ? 'bg-gray-200 hover:cursor-default'
                : '',
              'w-full text-left py-2 px-3 text-gray-600 rounded-md hover:bg-gray-200 flex flex-row hover:cursor-pointer',
            )}
            href="/profile/paper-uploads"
          >
            <HiOutlineDocument className="w-[24px] h-[24px] me-2" />{' '}
            Paper Uploads
          </a>
        </li>
        <li>
          <a
            className={cn(
              location.pathname == '/profile/dataset-uploads'
                ? 'bg-gray-200 hover:cursor-default'
                : '',
              'w-full text-left py-2 px-3 text-gray-600 rounded-md hover:bg-gray-200 flex flex-row hover:cursor-pointer',
            )}
            href="/profile/dataset-uploads"
          >
            <HiOutlineFolder className="w-[24px] h-[24px] me-2" />{' '}
            Dataset Uploads
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default ProfileSidebar;
