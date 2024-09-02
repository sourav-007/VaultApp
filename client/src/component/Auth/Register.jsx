import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaRegArrowAltCircleRight, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
// import { useAuth } from '../../context/AuthContext';


function Register() {

    const [regData, setRegData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: ''
    })



    const navigate = useNavigate()

    const handleInputs = (e) => {
        console.log(e);
        const { name, value } = e.target;
        setRegData({ ...regData, [name]: value });
    }

    const [errors, setErrors] = useState({})

    const formValidate = (regData) => {

        const errors = {}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

        if (!regData.fullName) errors.fullName = '*Fullname is required'

        if (!regData.username) errors.username = '*Username is required'

        if (!regData.email) {
            errors.email = '*Email is required'
        }
        else if (!regex.test(regData.email)) {
            errors.email = '*Invalid email format'
        }

        if (!regData.password) {
            errors.password = '*Password is required'
        }
        else if (regData.password.length < 6) {
            errors.password = '*Password must be at least 6 characters'
        }
        else if (regData.password.length > 12) {
            errors.password = '*Password must be less than 12 characters'
        }

        setErrors(errors)
        return Object.keys(errors).length === 0;
    }

    const handleRegister = async (e) => {

        e.preventDefault();

        if (!formValidate(regData)) return;

        const { fullName, username, email, password } = regData

        try {
            const response = await axios.post('http://localhost:5001/vault/users/register', {
                fullName, username, email, password
            })

            console.log(response);

            toast.success('Successfully registered!')
            if (response.status === 201) {
                setRegData(response.data)
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            }


        } catch (error) {
            toast.error("Registration failed")
            console.error("Error :", error?.response?.data?.message)
        }

    }

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
                        <form onSubmit={handleRegister}>
                            <div className="mb-5 flex flex-col">
                                <label
                                    className="mb-1 text-xs tracking-wide text-gray-600"
                                    htmlFor="fullName"
                                >
                                    Fullname:
                                </label>
                                <div className="relative">
                                    <div className="absolute left-0 top-0 inline-flex h-full w-10 items-center justify-center text-gray-400">
                                        <FaUser className="fas fa-user text-blue-700" />
                                    </div>
                                    <input
                                        className="w-full rounded-2xl border border-gray-400 py-2 pl-10 pr-4 text-sm placeholder-gray-500 focus:border-blue-400 focus:outline-none"
                                        id="fullName"
                                        name="fullName"
                                        value={regData.fullName}
                                        onChange={handleInputs}
                                        placeholder="Enter your full name"
                                        type="text"
                                    />
                                </div>
                                {errors.fullName && <span className="text-xs text-red-800 tracking-wide ml-2">{errors.fullName}</span>}
                            </div>
                            <div className="mb-5 flex flex-col">
                                <label
                                    className="mb-1 text-xs tracking-wide text-gray-600"
                                    htmlFor="username"
                                >
                                    Username:
                                </label>
                                <div className="relative">
                                    <div className="absolute left-0 top-0 inline-flex h-full w-10 items-center justify-center text-gray-400">
                                        <FaUser className="fas fa-user text-blue-700" />
                                    </div>
                                    <input
                                        className="w-full rounded-2xl border border-gray-400 py-2 pl-10 pr-4 text-sm placeholder-gray-500 focus:border-blue-400 focus:outline-none"
                                        id="username"
                                        name="username"
                                        value={regData.username}
                                        onChange={handleInputs}
                                        placeholder="Enter your username"
                                        type="text"
                                    />
                                </div>
                                {errors.username && <span className="text-xs text-red-800 tracking-wide ml-2">{errors.username}</span>}
                            </div>
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
                                        value={regData.email}
                                        onChange={handleInputs}
                                        placeholder="Enter your email"
                                        type="email"
                                    />
                                </div>
                                {errors.email && <span className="text-xs text-red-800 tracking-wide ml-2">{errors.email}</span>}
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
                                        value={regData.password}
                                        onChange={handleInputs}
                                        placeholder="Enter your password"
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
                                {errors.password && <span className="text-xs text-red-800 tracking-wide ml-2">{errors.password}</span>}
                            </div>
                            <div className="flex w-full">
                                <button className="mt-2 flex w-full items-center justify-center rounded-2xl
                                     bg-blue-600 py-2 text-sm text-white transition duration-150 ease-in 
                                     hover:bg-blue-800 focus:outline-none sm:text-base"
                                    type="submit"
                                >
                                    <span className="mr-2 uppercase">
                                        Sign Up
                                    </span>
                                    <span>
                                        <FaRegArrowAltCircleRight className="h-[1.2rem] w-[1.2rem]" />
                                    </span>
                                </button>
                            </div>
                        </form>
                        <div className="mt-6 flex items-center justify-center">
                            <p
                                className="inline-flex items-center text-center text-xs font-medium text-gray-700"
                            >
                                <span className="ml-2">
                                    You have an account?{' '}
                                </span>
                            </p>
                            <Link
                                className="ml-2 text-sm font-bold text-blue-700"
                                to="/login"
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register