import { Link } from "react-router"; 

const ErrorPage = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-blue-50 px-6">
      <div className="text-center max-w-lg">
        <h1 className="text-[8rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 leading-none">
          404
        </h1>
        <h2 className="mt-6 text-3xl md:text-4xl font-bold text-gray-800">
          Oops! Page Not Found
        </h2>
        <p className="mt-4 text-gray-600">
          The page you’re looking for doesn’t exist or has been moved.
          Let’s get you back on track.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 shadow-md hover:shadow-lg transition-all"
          >
            ⬅ Back to Home
          </Link>
          
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
