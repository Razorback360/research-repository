import ProfileSidebar from '@app/components/ProfileSidebar';

export default function Mobile() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex flex-col px-2 py-8 bg-white my-8 mx-4 rounded-lg overflow-hidden w-full">
        <header className="flex justify-center items-center border-b pb-4 mb-8">
          <h2 className="text-3xl font-bold md:hidden flex text-center items-center justify-center">
            Profile Navigation
          </h2>
        </header>
        <section className="flex items-center mb-8 overflow-x-auto">
          <ProfileSidebar />
        </section>
      </main>
    </div>
  );
}
