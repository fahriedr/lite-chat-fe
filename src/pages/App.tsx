import { Link } from 'react-router-dom'
import '../App.css'
import ChatSvg from '../../public/images/chat.svg'
import { useState } from 'react';
function App() {

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Get Started",
      description: "Start with signing up or sign in.",
      icon: <img src={ChatSvg} alt="Login image" />
    }
  ];


  return (
    <>
       <head>
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
        <title>
          Lite Chat | Auth
        </title>
      </head>
      <main className="fixed inset-0 m-4">
        <div className="app-container">
          <div className="min-h-screen bg-main-color flex flex-col items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-xl">
              {/* Main content */}
              <div className="px-8 py-10 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {slides[currentSlide].title}
                </h1>
                <p className="text-gray-600 mb-10">
                  {slides[currentSlide].description}
                </p>

                {/* Illustration */}
                <div className="mb-12">
                  {slides[currentSlide].icon}
                </div>

                {/* Action buttons */}
                <div className="space-y-3">
                  <Link
                    to="/signup"
                    className="block w-full py-3 px-4 bg-purple-600 text-white font-medium rounded-full transition duration-200 text-center"
                  >
                    Sign up
                  </Link>

                  <Link
                    to="/login"
                    className="block w-full py-3 px-4 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-full transition duration-200 text-center border border-gray-200"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
