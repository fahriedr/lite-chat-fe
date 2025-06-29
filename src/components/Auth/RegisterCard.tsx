'use client';
import { useState } from "react";
import TextInput from "../../components/TextInput";
import { registerApi } from "../../utils/api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { z } from 'zod'
import toast from "react-hot-toast";
import ProviderLoginButton from "../ProvideLoginButton";
import { GoogleIcon } from "../../icons/Google";
import { GithubIcon } from "lucide-react";
import { setCookies } from "../../lib/helpers";

const schema = z.object({
  fullname: z.string().min(6).max(30),
  username: z.string().min(6).max(12).trim(),
  email: z.string().email(),
  password: z.string().min(6).max(30),
  confirmPassword: z.string().max(30)
}).superRefine(({confirmPassword, password}, ctx) => {
    if(confirmPassword !== password) {
        ctx.addIssue({
            code: 'custom',
            message: 'Password not match!'
        })
    }
})

const RegisterCard = () => {

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<any>()

  const handleSubmit = async () => {

    setLoading(true)

    const data = {
      fullname: fullname,
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    } 

    const validate = schema.safeParse(data)

    if(!validate.success){
      toast.error('something error')
      setErrors(validate.error.format())
      return 
    }

    const res = await registerApi({
      data: {
        fullname: fullname,
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      } 
    })
    setLoading(false)

    await setCookies('token', res?.data.data.token)
    await setCookies('user', res?.data.data.user)

    navigate('/home')

  }

   const loginWithGoogle = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/user/auth/google`;
  };

  const loginWithGithub = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/user/auth/github`;
  };
  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <div className="w-full  flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center lg:hidden mb-6">
              {/* <MessageCircle size={40} className="text-blue-600" /> */}
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-gray-600">Please sign in to your account</p>
          </div>

          <div className="space-y-6">
            <TextInput
              id="fullname"
              label="Fullname"
              type="text"
              onChange={setFullname}
              value={fullname}
              placeholder="John Elton"
              error={errors}
            />

            <TextInput
              id="username"
              label="Username"
              type="text"
              onChange={setUsername}
              value={username}
              placeholder="john123"
              error={errors}
            />

            <TextInput
              id="email"
              label="Email"
              type="email"
              onChange={setEmail}
              value={email}
              placeholder="you@example.com"
              error={errors}
            />

            <TextInput
              id="password"
              label="Password"
              type="password"
              onChange={setPassword}
              value={password}
              placeholder="••••••••"
              error={errors}
            />

            <TextInput
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              onChange={setConfirmPassword}
              value={confirmPassword}
              placeholder="••••••••"
              error={errors}
            />

            <button
              onClick={handleSubmit}
              type="button"
              disabled={loading}
              className="w-full py-3 px-4 bg-vibrant-purple hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 flex items-center justify-center"
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500">Or sign in with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex flex-row gap-x-4">
            <ProviderLoginButton
              icon={<GoogleIcon size={6}/>}
              name="Google"
              onClick={loginWithGoogle}
            />

            <ProviderLoginButton
              icon={<GithubIcon size={24}/>}
              name="Github"
              onClick={loginWithGithub}
            />
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-indigo-500">
                Sign In
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default RegisterCard