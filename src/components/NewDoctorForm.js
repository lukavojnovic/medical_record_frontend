import React, {useState} from 'react';
import {Field, Form, Formik} from "formik"
import axios from "../axios";
import {useHistory} from "react-router-dom"
import sha256 from "sha256";
import {notification} from "antd";

const NewDoctorForm = () => {

    const [state, setState] = useState({})
    const history = useHistory();

    const onSubmit = async (values) => {

        try{
            if(values.password !== ""){
                values.password = sha256(values.password)
            }
            const res = await axios.post('doctor', {...values});
            // console.log(res)
            if (res.data.formError) {
                setState(res.data.formError)
                // console.log(state)
            } else {
                openNotification()
                history.push(`/doctors`)
            }
        }catch (e){
            console.log(e)
        }

    }

    const openNotification = () => {
        notification.success({
            message: `Success`,
            description:
                'Successfully added doctor!',
            placement: "bottomRight"
        });
    };
    return (
        <>
            <Formik initialValues={{
                firstName: "",
                lastName: "",
                address: "",
                city: "",
                password: "",
                state: "",
                country: "",
                dateOfBirth: "",
                speciality: "",
                gender: "",
                email: "",
                phoneNumber: ""
            }}

            onSubmit={onSubmit}>

                {({handleChange}) => (
                    <Form>
                        <div className=" sm:max-w-lg sm:w-full sm:mx-auto sm:overflow-hidden">
                            <div className="px-4 py-8 sm:px-10">
                                <div className="relative mt-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300">
                                        </div>
                                    </div>
                                    <div className="relative flex justify-center text-sm leading-5">
                                        <span className="px-2 text-gray-500 bg-white">
                                            Adding new doctor
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <div className="w-full space-y-6">
                                        <div className="w-full">
                                            <div className=" relative ">
                                                <h2 className='text-sm text-gray-600'>First name</h2>
                                                <Field type="text"
                                                       className="border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                       placeholder="First name"
                                                       name='firstName'
                                                       onChange={handleChange}
                                                />
                                                {state.firstName? <small className='italic text-red-600'>{state.firstName}</small> : <></>}
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className=" relative ">
                                                <h2 className='text-sm text-gray-600'>Last name</h2>
                                                <Field type="text"
                                                       className="border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                       placeholder="Last name"
                                                       name='lastName'
                                                       onChange={handleChange}
                                                />
                                                {state.lastName? <small className='italic text-red-600'>{state.lastName}</small> : <></>}
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className=" relative ">
                                                <h2 className='text-sm text-gray-600'>Speciality</h2>
                                                <Field type="text"
                                                       className="border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                       placeholder="Speciality"
                                                       name='speciality'
                                                       onChange={handleChange}
                                                />
                                                {state.speciality? <small className='italic text-red-600'>{state.speciality}</small> : <></>}
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className=" relative ">
                                                <h2 className='text-sm text-gray-600'>Gender</h2>
                                                <div className='flex' role="group" aria-labelledby="my-radio-group">
                                                    <label className='mr-3'>
                                                        <Field className='mr-1' type="radio" name="gender" value="M"/>
                                                        Male
                                                    </label>
                                                    <label>
                                                        <Field className='mr-1' type="radio" name="gender" value="F"/>
                                                        Female
                                                    </label>

                                                </div>

                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className=" relative ">
                                                <h2 className='text-sm text-gray-600'>Address</h2>
                                                <Field type="text"
                                                       className="border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                       placeholder="Address"
                                                       name='address'
                                                       onChange={handleChange}
                                                />
                                                {state.address? <small className='italic text-red-600'>{state.address}</small> : <></>}
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className=" relative ">
                                                <h2 className='text-sm text-gray-600'>City</h2>
                                                <Field type="text"
                                                       className="border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                       placeholder="City"
                                                       name='city'
                                                       onChange={handleChange}
                                                />
                                                {state.city? <small className='italic text-red-600'>{state.city}</small> : <></>}
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className=" relative ">
                                                <h2 className='text-sm text-gray-600'>State</h2>
                                                <Field type="text"
                                                       className="border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                       placeholder="State"
                                                       name='state'
                                                       onChange={handleChange}
                                                />
                                                {state.city? <small className='italic text-red-600'>{state.city}</small> : <></>}
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className=" relative ">
                                                <h2 className='text-sm text-gray-600'>Country</h2>
                                                <Field type="text"
                                                       className="border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                       placeholder="Country"
                                                       name='country'
                                                       onChange={handleChange}
                                                />
                                                {state.country? <small className='italic text-red-600'>{state.country}</small> : <></>}
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className=" relative ">
                                                <h2 className='text-sm text-gray-600'>Date of birth</h2>
                                                <Field type="date"
                                                       className="border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                       placeholder="DOB"
                                                       name='dateOfBirth'
                                                       onChange={handleChange}
                                                />
                                                {state.dateOfBirth? <small className='italic text-red-600'>{state.dateOfBirth}</small> : <></>}
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className=" relative ">
                                                <h2 className='text-sm text-gray-600'>Phone number</h2>
                                                <Field type="tel"
                                                       className="border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                       placeholder="Phone number"
                                                       name='phoneNumber'
                                                       onChange={handleChange}
                                                />
                                                {state.phoneNumber? <small className='italic text-red-600'>{state.phoneNumber}</small> : <></>}
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className=" relative ">
                                                <h2 className='text-sm text-gray-600'>Email</h2>
                                                <Field type="email"
                                                       className="border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                       placeholder="Email"
                                                       name='email'
                                                       onChange={handleChange}
                                                />
                                                {state.email? <small className='italic text-red-600'>{state.email}</small> : <></>}
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className=" relative ">
                                                <h2 className='text-sm text-gray-600'>Password</h2>
                                                <Field type="text"
                                                       className="border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                       placeholder="Password"
                                                       name='password'
                                                       onChange={handleChange}
                                                />
                                                {state.password? <small className='italic text-red-600'>{state.password}</small> : <></>}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="block w-full rounded-md ">
                                                <input type="submit"
                                                       className="py-2 px-4 my-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-auto transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                                                       value='Save'
                                                />

                                            </span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </Form>
                )}
            </Formik>
        </>
    )
}

export default NewDoctorForm;