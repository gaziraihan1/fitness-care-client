import { Link } from 'react-router';
import { FaBan } from 'react-icons/fa';

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center px-4">
      <FaBan className="text-red-500 text-6xl mb-4" />
      <h1 className="text-3xl font-bold text-red-600 mb-2">Access Denied</h1>
      <p className="text-gray-700 text-lg mb-6">
        You do not have permission to access this page.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Forbidden;
