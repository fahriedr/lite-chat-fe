'use client';
import React, { useState } from "react";
import { loginApi } from "../../utils/api/authApi";
import { toast } from 'react-hot-toast';
import ProviderLoginButton from "../ProvideLoginButton";
import { GoogleIcon } from "../../icons/Google";
import { GithubIcon } from "lucide-react";
import { setCookies } from "../../lib/helpers"
import { Link, useNavigate } from "react-router-dom"
import { Schema, z } from 'zod'
import Cookies from 'js-cookie'

interface Props {
  error?: string | null

}

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(3, "Password must contain 3 letter(s)"),
});


const LoginCard = ({ error = null }: Props) => {


  const [formData, setFormData] = useState<{[ key: string]: string}>({email: "", password: ""})
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }


  const handleSubmit = async () => {

    setLoading(true)

    const result = schema.safeParse(formData)

    if (!result.success) {
      const errorMap: { [key:string]: string} = {}
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errorMap[err.path[0] as string] = err.message;
        }
      });
      setErrors(errorMap);
      setLoading(false)
      return
    } else {
      setErrors({});
    }

    const res = await loginApi({
      data: result.data
    })


    if (res?.success === false) {
      toast.error(res.message ?? 'Something went wrong')
      setLoading(false)
      return
    }

    await setCookies('token', res?.data.token)
    await setCookies('user', JSON.stringify(res?.data.user))

    setLoading(false)

    navigate('/home')


  }

  return (
    <div className="flex w-full min-h-screen bg-gray-50">

      {/* Right panel with login form */}
      <div className="w-screen flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center lg:hidden mb-6">
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome</h2>
            <p className="mt-2 text-gray-600">Please sign in to your account</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault(); 
              handleSubmit(); 
            }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center">
                <label htmlFor="email" className="block text-md font-semibold text-gray-700 mb-1">
                  Email
                </label>
              </div>
              <div className="flex flex-col items-start">
                <input
                  id="email"
                  type="email"
                  required
                  name="email"
                  className={`w-full px-4 py-3 rounded-lg border text-black ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                <span className="text-red-500 text-sm">{errors.email ?? ''}</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-md font-semibold text-gray-700">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-indigo-500">
                  Forgot password?
                </Link>
              </div>
              <div className="flex flex-col items-start">
                <input
                  id="password"
                  type="password"
                  required
                  name="password"
                  className={`w-full px-4 py-3 rounded-lg border text-black ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
                <span className="text-red-500 text-sm">{errors.password ?? ''}</span>
              </div>
            </div>

            {/* <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div> */}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-vibrant-purple hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center"
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500">Or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex flex-row gap-x-4">
            <ProviderLoginButton
              icon={<GoogleIcon size={6}/>}
              name="Google"
              onClick={() => {}}
            />

            <ProviderLoginButton
              icon={<GithubIcon size={24}/>}
              name="Github"
              onClick={() => {}}
            />
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              {"Dont have an account?"}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-indigo-500">
                {' '}Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
