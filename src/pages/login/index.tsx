const login = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome Back!</h1>
        <p className="text-gray-600 mb-6">Please log in to continue</p>
        <form className="flex flex-col items-center w-full max-w-md">
          <label className="w-full text-left font-medium text-gray-700 mt-4">Email Address</label>
          <input
            type="email"
            placeholder="Placeholder"
            className="w-full p-3 bg-gray-200 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <label className="w-full text-left font-medium text-gray-700 mt-4">Password</label>
          <input
            type="password"
            placeholder="Placeholder"
            className="w-full p-3 bg-gray-200 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <p className="text-sm text-gray-500 text-left w-full mt-2">
            It must be a combination of minimum 8 letters, numbers, and symbols.
          </p>
          <div className="flex justify-between items-center w-full mt-4">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <label className="text-sm text-gray-700">Remember me</label>
            </div>
            <div className="text-sm text-blue-500">
              <a href="#" className="hover:underline">Forgot password?</a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg mt-4 hover:bg-blue-600"
            onClick={(e) => {
              e.preventDefault();
              location.href = "/profile";
            }}
          >
            Log In
          </button>
          <p className="text-sm text-gray-600 mt-4">
            No account yet? <a href="/signup" className="text-blue-500 hover:underline">Sign Up!</a>
          </p>
          <hr className="text-black w-full mt-3"/>
          <p className="text-sm text-gray-600 mt-2">
            Or
          </p>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg mt-4 hover:bg-blue-600"
            onClick={(e) => {
              e.preventDefault();
              location.href = "/profile";
            }}
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default login;
