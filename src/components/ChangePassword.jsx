import { Dialog } from '@headlessui/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import Button from './Button'
import Loading from './Loader'
import ModalWrapper from './ModelWrapper'
import Textbox from './Textbox'
import toast from 'react-hot-toast'
import { useChangePasswordMutation } from '../redux/slices/api/userApiSlice'


const ChangePassword = ({ open, setOpen }) => {
    const {
        register, handleSubmit, formState: { errors }
    } = useForm()

    const [changeUserPassword, { isLoading }] = useChangePasswordMutation()

    const handleOnSubmit = async (data) => {
        if (data.password !== data.cpass) {
            toast.error("Password doesn't match")
            return
        }
        try {
            const res = await changeUserPassword(data).unwrap()
            toast.success("Password Changed Successfully")
            setTimeout(() => {
                setOpen(false)
            }, 1000)

        } catch (error) {
            toast.error("Something Went Wrong")
        }
    }
    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen} >
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <Dialog.Title as="h2" className="text-base font-bold leading-6 text-gray-900 mb-4">
                        Change Password
                    </Dialog.Title>
                    <div className='mt-2 flex flex-col gap-6'>
                        <Textbox
                            placeholder="New Password"
                            type="password"
                            name="password"
                            label="New Password"
                            className="w-full rounded"
                            register={register("password", { required: "New Password is required" })}
                            error={errors.password ? errors.password.message : ""}

                        />
                        <Textbox
                            placeholder="Confirm New Password"
                            type="password"
                            name="cpass"
                            label="Confirm New Password"
                            className="w-full rounded"
                            register={register("cpass", { required: "Confirm New Password is required" })}
                            error={errors.password ? errors.password.message : ""}

                        />


                    </div>

                    {isLoading ? (<div className='py-5'><Loading /></div>) : (
                        
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

export default ChangePassword