import React, { useState } from 'react'
import { FaEnvelope, FaLock, FaRegArrowAltCircleRight, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import axios from 'axios';

function Login() {

    const [loginUser, setLoginUser] = useState({
        email: '',
        password: ''
    })

    const handleInputs = (e) => {
        console.log(e);
        const { name, value } = e.target;
        setLoginUser({ ...loginUser, [name]: value });
    }

    const handleLogin = async (e) => {

        e.preventDefault();

        const { email, password } = loginUser

        try {
            const response = await axios.post('http://localhost:5001/vault/users/login', {
                email, password
            }, {
                withCredentials: true,
            })
            console.log(response.data)

            if (response.status === 200) {
                toast.success("Login Successfully!!")

                setLoginUser(response.data)

                console.log(response.data)
                const { data } = response.data
                const { accessToken, role } = data

                //console.log("ROLE", role)

                localStorage.setItem('Token', accessToken)
                localStorage.setItem('Role', role)
                localStorage.setItem('loggedIn', true)

                setTimeout(() => {
                    navigate('/home')
                }, 1000)

            }
        } catch (error) {
            if (error?.response?.data?.message === 'Email is required') return toast.error("Email is required")
            if (error?.response?.data?.message === 'Password is required') return toast.error("Password is required")
            if (error?.response?.data?.message === 'User does not exist') return toast.error("User does not exist")
            if (error?.response?.data?.message === 'Invalid Password') return toast.error("Invalid Password")
            console.error("Error :", error)
            console.error("Error :", error?.response?.data?.message);
        }
    }


    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)

    const passwordToggle = () => {
        setShowPassword((toggle) => !toggle)
    }


    return (
        <>
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
                <div className="w-50 flex max-w-md flex-col rounded-[35px] bg-white px-4 py-8 shadow-md sm:px-6 md:px-8 lg:px-10  border border-solid border-[#F8F8FF]">
                    <div className="self-center text-xl font-mono font-bold text-blue-900 sm:text-3xl mb-1">
                        VaultApp
                    </div>

                    <div className="mt-4 self-center text-xl text-gray-800 sm:text-sm">
                        Enter your credentials to get access account
                    </div>
                    <div className="mt-10">
                        <form onSubmit={handleLogin}>
                            <div className="mb-5 flex flex-col">
                                <label
                                    className="mb-1 text-xs tracking-wide text-gray-600"
                                    htmlFor="email"
                                >
                                    E-Mail Address:
                                </label>
                                <div className="relative">
                                    <div className="absolute left-0 top-0 inline-flex h-full w-10 items-center justify-center text-gray-400">
                                        <FaEnvelope className="fas fa-at text-blue-700" />
                                    </div>
                                    <input
                                        className="w-full rounded-2xl border border-gray-400 py-2 pl-10 pr-4 text-sm placeholder-gray-500 focus:border-blue-400 focus:outline-none"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={loginUser.email}
                                        onChange={handleInputs}
                                        type="email"
                                    />
                                </div>
                            </div>
                            <div className="mb-6 flex flex-col">
                                <label
                                    className="mb-1 text-xs tracking-wide text-gray-600"
                                    htmlFor="password"
                                >
                                    Password:
                                </label>
                                <div className="relative">
                                    <div className="absolute left-0 top-0 inline-flex h-full w-10 items-center justify-center text-gray-400">
                                        <span>
                                            <FaLock className="fas fa-lock text-blue-700" />
                                        </span>
                                    </div>
                                    <input
                                        className="w-full rounded-2xl border border-gray-400 py-2 pl-10 pr-4 text-sm placeholder-gray-500 focus:border-blue-400 focus:outline-none"
                                        id="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={loginUser.password}
                                        onChange={handleInputs}
                                        type={showPassword ? 'text' : 'password'}
                                    />
                                    <div className="absolute right-0 top-0 
                                        inline-flex h-full w-10 items-center 
                                        justify-center text-gray-400"
                                        onClick={passwordToggle}
                                    >
                                        {showPassword ? (
                                            <FaRegEye className="fas fa-lock text-gray-400" />
                                        ) : (
                                            <FaRegEyeSlash className="fas fa-lock text-gray-400" />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full">
                                <button
                                    className="mt-2 flex w-full items-center justify-center rounded-2xl bg-blue-600 py-2 text-sm
                                     text-white transition duration-150 ease-in hover:bg-blue-800 focus:outline-none sm:text-base"
                                    type="submit"
                                >
                                    <span className="mr-2 uppercase">
                                        Login
                                    </span>
                                    <span>
                                        <span>
                                            <FaRegArrowAltCircleRight className="h-[1.2rem] w-[1.2rem]" />
                                        </span>
                                    </span>
                                </button>
                            </div>
                        </form>
                        <div className="mt-6 flex items-center justify-center">
                            <p
                                className="inline-flex items-center text-center text-xs font-medium text-gray-700"
                            >
                                <span className="ml-2">
                                    Don't have an account?{' '}
                                </span>
                            </p>
                            <Link
                                className="ml-2 text-sm font-bold text-blue-700"
                                to="/register"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login