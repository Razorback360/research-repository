import ProfileSidebar from '@app/components/ProfileSidebar';
import './donation.css';

export default function Mobile() {
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
          <h2 className="text-3xl font-bold md:hidden flex text-center items-center justify-center">
            Profile Settings
          </h2>
        </header>
        <section className="flex items-center mb-8 overflow-x-auto">
          <ProfileSidebar />
        </section>
      </main>
    </div>
  );
}
