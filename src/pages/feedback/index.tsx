import Button from '@app/components/Button';

const Feedback = () => {
  return (
    <div className="flex flex-col md:flex-row p-8 justify-center items-center w-full min-h-screen">
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <img
          src="/feedback.png"
          alt="Feedback Illustration"
          className="max-w-full h-auto"
        />
      </div>
      <div className="w-full md:w-1/2 p-4">
        <form className="w-full flex flex-col">
          <h1 className="text-3xl font-bold mb-2">Feedback</h1>
          <p className="text-md mt-2 mb-6">Write your detailed feedback.</p>
          <div className="flex flex-col md:flex-row w-full gap-4 mb-4">
            <div className="flex flex-col w-full">
              <label htmlFor="first-name" className="text-lg font-semibold mb-1">First Name</label>
              <input
                type="text"
                id="first-name"
                placeholder="Placeholder"
                required
                className="w-full p-3 bg-gray-100 border border-gray-200 rounded-sm"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="last-name" className="text-lg font-semibold mb-1">Last Name</label>
              <input
                type="text"
                id="last-name"
                placeholder="Placeholder"
                required
                className="w-full p-3 bg-gray-100 border border-gray-200 rounded-sm"
              />
            </div>
          </div>
          <div className="flex flex-col w-full mb-4">
            <label htmlFor="email" className="text-lg font-semibold mb-1">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Placeholder"
              required
              className="w-full p-3 bg-gray-100 border border-gray-200 rounded-sm"
            />
          </div>
          <div className="flex flex-col w-full mb-4">
            <label htmlFor="feedback" className="text-lg font-semibold mb-1">Feedback</label>
            <textarea
              id="feedback"
              placeholder="Placeholder"
              rows={4}
              required
              className="w-full p-3 bg-gray-100 border border-gray-200 rounded-sm"
            />
          </div>
          <Button type="submit" className="bg-primary font-semibold text-white p-3 rounded-sm mt-6">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;