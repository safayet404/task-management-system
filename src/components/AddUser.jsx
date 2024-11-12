import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";
import ModalWrapper from "./ModelWrapper";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import toast from 'react-hot-toast';
import { useGetTeamListQuery, useUpdateUserMutation } from "../redux/slices/api/userApiSlice";
import { setCredentials } from "../redux/slices/authSlice";

const AddUser = ({ open, setOpen, userData }) => {
  let defaultValues = userData ?? {}
  const { user } = useSelector((state) => state.auth)
  //const isLoading = false
  //const isUpdating =false;
  const { refetch } = useGetTeamListQuery()


  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues })

  const [addNewUser, { isLoading }] = useRegisterMutation()
  const [updateUser] = useUpdateUserMutation()
  const dispatch = useDispatch()
  const handleOnSubmit = async (data) => {
    try {
      if (userData) {
        const result = await updateUser(data).unwrap()


        toast.success("Profile Updated Successfully");
        if (userData?._id === user?._id) {
          dispatch(setCredentials({ ...result.user }))

        }
       
      }
      else {
        await addNewUser({ ...data, password: data.email }).unwrap()
        toast.success("New User Added Successfully")
      }
      setTimeout(() => {
        setOpen(false)
      }, 1000)

    } catch (error) {
      console.log(error);

      toast.error("Something Went Wrong here")
    }

    refetch()
  };




  return (
    <>

      <ModalWrapper open={open} setOpen={setOpen} >
        <form onSubmit={handleSubmit(handleOnSubmit)} >
          <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4"> {userData ? "UPDATE PROFILE" : "ADD NEW USER"} </Dialog.Title>
          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Full name'
              type='text'
              name='name'
              label='Full Name'
              className='w-full rounded'
              register={register("name", {
                required: "Full name is required!",
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <Textbox
              placeholder='Title'
              type='text'
              name='title'
              label='Title'
              className='w-full rounded'
              register={register("title", {
                required: "Title is required!",
              })}
              error={errors.title ? errors.title.message : ""}
            />
            <Textbox
              placeholder='Email Address'
              type='email'
              name='email'
              label='Email Address'
              className='w-full rounded'
              register={register("email", {
                required: "Email Address is required!",
              })}
              error={errors.email ? errors.email.message : ""}
            />

            <Textbox
              placeholder='Role'
              type='text'
              name='role'
              label='Role'
              className='w-full rounded'
              register={register("role", {
                required: "User role is required!",
              })}
              error={errors.role ? errors.role.message : ""}
            />
          </div>

          {isLoading ? (<div className='py-5'>
            <Loading />
          </div>) : (
            <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
              <Button
                type='submit'
                className='bg-blue-600 px-8 text-sm rounded font-semibold text-white hover:bg-blue-700  sm:w-auto'
                label='Submit'
              />

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                onClick={() => setOpen(false)}
                label='Cancel'
              />
            </div>
          )}

        </form>
      </ModalWrapper>

    </>
  )
}

export default AddUser