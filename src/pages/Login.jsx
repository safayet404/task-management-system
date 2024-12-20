import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Textbox from "../components/Textbox";
import { Button } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../redux/slices/api/authApiSlice";
import { toast } from 'sonner';
import { setCredentials } from "../redux/slices/authSlice";
import Loading from "../components/Loader";
const Login = () => {
    const {user} = useSelector((state) => state.auth)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [login,{isLoading}] = useLoginMutation()
    useEffect(() => {
        user && navigate("/dashboard");
    }, [user]);

    const submitHandler = async (data) => {
        // try {
        //     const response = await fetch('https://project-pulse-backend.onrender.com/api/user/login', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             email: data.email,  // Use the form data for username and password
        //             password: data.password,
        //         }),
        //         credentials: 'include', // Include credentials (cookies or authentication tokens)
        //     });
            
        //     if (response.ok) {
        //         const result = await response.json();
        //         dispatch(setCredentials(result)); // Store credentials in Redux
        //         navigate("/"); // Navigate on successful login
        //     } else {
        //         throw new Error('Login failed');
        //     }
        // } catch (error) {
        //     console.error('Error:', error);
        //     toast.error(error.message); // Handle errors
        // }

        try {
            const result = await login(data).unwrap(); // Call the mutation
            dispatch(setCredentials(result)); // Store credentials in Redux
            navigate("/"); // Navigate on successful login
        } catch (error) {
            console.log(error);
            toast.error(error?.data?.message || error.message); // Handle errors
        }
    };
    

  
    if (user) {
        return null;
    }
    
   

    return (
        <div className='w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-[#f3f4f6]'>
            <div className='w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center'>

                
                <div className='h-full w-full lg:w-2/3 flex flex-col items-center justify-center'>
                    <div className='w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20'>
                        <span className='flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600'>
                        Keep track of all your tasks in one place!
                        </span>
                        <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700">
                            <span>Cloud Based</span>
                            <span>Project Manager</span>
                        </p>

                        {/* <div className="cell">
                            <div className="circle rotate-in-up-left">

                            </div>
                        </div> */}

                    </div>
                </div>

                

                <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
                    <form onSubmit={handleSubmit(submitHandler)} className="form-container w-full md:w-[400px] items-center flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14">
                        <div>
                            <p className="text-blue-600 text-3xl font-bold text-center">Welcome back!</p>
                            <span className="text-center text-base text-gray-500">Keep all your credentials safe</span>
                        </div>

                        <div className="flex flex-col gap-y-5 w-full">
                            <Textbox placeholder="john_doe@gmail.com"
                            type="email"
                            name="email"
                            label="Email Address"
                            className="w-full rounded-full"
                            register={register("email",{required:"Email Address is required !"})}
                            error={errors.email ? errors.email.message : ""}
                            />
                            <Textbox placeholder="Password"
                            type="password"
                            name="password"
                            label="Password"
                            className="w-full rounded-full"
                            register={register("password",{required:"Password Address is required !"})}
                            error={errors.email ? errors.email.message : ""}
                            />
                            <span className="text-sm text-gray-500 hover:text-blue-500 hover:underline cursor-pointer">Forget Password</span>

                            { isLoading ? <Loading/> : <Button  type='submit' label="Submit" className='w-full rounded-full h-10 bg-blue-700 text-white'>
                                Submit
                                </Button>}


                        </div>

                </form>
                </div>


            </div>
        </div>
    );
};

export default Login;