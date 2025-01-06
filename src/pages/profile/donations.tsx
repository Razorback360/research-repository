import { ArrowLeftIcon } from '@heroicons/react/24/outline';

import Badge from '@app/components/Badge';
import ProfileSidebar from '@app/components/ProfileSidebar';
import './donation.css';

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
          <table className="table-auto">
            <thead>
              <tr>
                <th>Hospital</th>
                <th>Donation Location</th>
                <th>Donation Date</th>
                <th>Donation Amount</th>
                <th>Donation ID</th>
                <th>Severity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Jane Doe</td>
                <td>Cell Text</td>
                <td>Cell Text</td>
                <td>Cell Text</td>
                <td>Cell Text</td>
                <td>
                  <Badge badgeType="high">High</Badge>
                </td>
              </tr>
              <tr>
                <td>Jane Doe</td>
                <td>Cell Text</td>
                <td>Cell Text</td>
                <td>Cell Text</td>
                <td>Cell Text</td>
                <td>
                  <Badge badgeType="medium">Medium</Badge>
                </td>
              </tr>
              <tr>
                <td>Jane Doe</td>
                <td>Cell Text</td>
                <td>Cell Text</td>
                <td>Cell Text</td>
                <td>Cell Text</td>
                <td>
                  <Badge badgeType="low">Low</Badge>
                </td>
              </tr>
              <tr>
                <td>Jane Doe</td>
                <td>Cell Text</td>
                <td>Cell Text</td>
                <td>Cell Text</td>
                <td>Cell Text</td>
                <td>
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
