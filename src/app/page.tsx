export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-center p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl">
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-5xl font-bold text-white mb-4">
          Content Guardian
        </h1>
        <p className="text-xl text-white/90 mb-2">
          AI-Powered Content Moderation Platform
        </p>
        <p className="text-sm text-white/70">
          Enterprise-grade trust & safety solution
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition">
            Get Started
          </button>
          <button className="px-6 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition backdrop-blur">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}