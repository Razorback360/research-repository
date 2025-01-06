import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import Badge from '@app/components/Badge';
import ProfileSidebar from '@app/components/ProfileSidebar';

export default function Donations() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-1/5 bg-white p-5 shadow-md md:flex flex-col hidden">
        <div className="text-gray-600 mb-5">
          <h1 className="text-xl font-bold">Project Title</h1>
        </div>
        <ProfileSidebar />
      </aside>
      <main className="flex-1 p-8 bg-white m-8 rounded-lg overflow-hidden">
        <header className="flex justify-between items-center border-b pb-4 mb-8">
          <h2 className="text-3xl font-bold md:flex hidden">
            Previous Donations
          </h2>
          <h2 className="text-3xl font-bold md:hidden flex text-center items-center justify-center">
            <a href="/profile/mobile">
              <ArrowLeftIcon width={24} height={24} className="mr-5" />
            </a>
            Previous Donations
          </h2>
        </header>
        <section className="flex items-center mb-8 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 text-left border-b bg-gray-200">Hospital</th>
                <th className="p-2 text-left border-b bg-gray-200">Donation Location</th>
                <th className="p-2 text-left border-b bg-gray-200">Donation Date</th>
                <th className="p-2 text-left border-b bg-gray-200">Donation Amount</th>
                <th className="p-2 text-left border-b bg-gray-200">Donation ID</th>
                <th className="p-2 text-left border-b bg-gray-200">Severity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border-b">Jane Doe</td>
                <td className="p-2 border-b">Cell Text</td>
                <td className="p-2 border-b">Cell Text</td>
                <td className="p-2 border-b">Cell Text</td>
                <td className="p-2 border-b">Cell Text</td>
                <td className="p-2 border-b">
                  <Badge badgeType="medium">Medium</Badge>
                </td>
              </tr>
              <tr>
                <td className="p-2 border-b">Jane Doe</td>
                <td className="p-2 border-b">Cell Text</td>
                <td className="p-2 border-b">Cell Text</td>
                <td className="p-2 border-b">Cell Text</td>
                <td className="p-2 border-b">Cell Text</td>
                <td className="p-2 border-b">
                  <Badge badgeType="low">Low</Badge>
                </td>
              </tr>
              <tr>
                <td className="p-2 border-b">Jane Doe</td>
                <td className="p-2 border-b">Cell Text</td>
                <td className="p-2 border-b">Cell Text</td>
                <td className="p-2 border-b">Cell Text</td>
                <td className="p-2 border-b">Cell Text</td>
                <td className="p-2 border-b">
                  <Badge>Badge</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
