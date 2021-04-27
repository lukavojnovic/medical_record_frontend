import React, {useState} from 'react';
import {Field, Form, Formik} from "formik"
import axios from "../axios";
import {useHistory} from "react-router-dom"
import {notification} from "antd";
import sha256 from "sha256";

const NewPatientForm = () => {

    const doctorId = window.location.href.split('/')[4];
    const [state, setState] = useState({});
    const history = useHistory();

    const onSubmit = async (values) => {

        try {
            const res = await axios.post('patient', {...values, password:sha256(values.password)});
            if (res.data.formError) {
                setState(res.data.formError)
            }else if(values.password === "") {
                setState({...state, password: "Please provide valid input"})
            } else {
                const patientId = res.data.id
                const addDocToPat = await axios.put(`patient/${patientId}/doctor/${doctorId}`, {});
                if (addDocToPat) {
                    openNotification()
                    history.push(`/doctor/${doctorId}`)
                } else {
                    alert('failed adding doc to pat')
                }
            }


        } catch (e) {
            console.log(e)
        }

    }

    const openNotification = () => {
        notification.success({
            message: `Success`,
            description:
                'Successfully added patient!',
            placement: "bottomRight"
        });
    };

    return (
        <>
            <Formik
                initialValues={{
                    firstName: "",
                    middleName: "",
                    lastName: "",
                    ssn: "",
                    address: "",
                    city: "",
                    state: "",
                    country: "",
                    dateOfBirth: "",
                    bloodGroup: "",
                    gender: "",
                    phoneNumber: "",
                    email: "",
                    weight: 0,
                    password: "",
                    height: 0
                }}
                onSubmit={onSubmit}
            >

                {({values, handleChange, errors, touched}) => (
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
                                            Adding new patient
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
                                                {state.firstName ? <small
                                                    className='italic text-red-600'>{state.firstName}</small> : <></>}
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className=" relative ">
                                                <h2 className='text-sm text-gray-600'>Middle name</h2>
                                                <Field type="text"
                                                       className="border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                       placeholder="Middle name"
                                                       name='middleName'
                                                       onChange={handleChange}
                                                />

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
                                                {state.lastName ? <small
                                                    className='italic text-red-600'>{state.lastName}</small> : <></>}
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
                                                <h2 className='text-sm text-gray-600'>SSN</h2>
                                                <Field type="text"
                                                       className="border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                       placeholder="SSN"
                                                       name='ssn'
                                                       onChange={handleChange}
                                                />
                                                {state.ssn ?
                                                    <small className='italic text-red-600'>{state.ssn}</small> : <></>}
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
                                                {state.address ? <small
                                                    className='italic text-red-600'>{state.address}</small> : <></>}
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
                                                {state.city ?
                                                    <small className='italic text-red-600'>{state.city}</small> : <></>}
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
                                                {state.state ? <small
                                                    className='italic text-red-600'>{state.state}</small> : <></>}
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
                                                {state.country ? <small
                                                    className='italic text-red-600'>{state.country}</small> : <></>}
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className=" relative ">
                                                <h2 className='text-sm text-gray-600'>Blood group</h2>
                                                <Field onChange={handleChange} name="bloodGroup" component="select"
                                                       className='border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'>
                                                    <option value="">Select Blood Group</option>
                                                    <option value="A-">A-</option>
                                                    <option value="A+">A+</option>
                                                    <option value="B-">B-</option>
                                                    <option value="B+">B+</option>
                                                    <option value="0-">0-</option>
                                                    <option value="0+">0+</option>
                                                    <option value="AB-">AB-</option>
                                                    <option value="AB+">AB+</option>
                                                </Field>
                                                {state.bloodGroup ? <small
                                                    className='italic text-red-600'>{state.bloodGroup}</small> : <></>}
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
                                                {state.dateOfBirth ? <small
                                                    className='italic text-red-600'>{state.dateOfBirth}</small> : <></>}
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
                                                {state.email ? <small
                                                    className='italic text-red-600'>{state.email}</small> : <></>}
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
                                                {state.password ? <small className='italic text-red-600'>{state.password}</small> : <></>}
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className=" relative ">
                                                <h2 className='text-sm text-gray-600'>Weight</h2>
                                                <div className='flex relative'>
                                                    <Field type="number"
                                                           className="border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                           placeholder="Weight"
                                                           name='weight'
                                                           onChange={handleChange}
                                                    />
                                                    <span
                                                        className="font-semibold inline-flex  items-center px-3 border-t bg-white border-r border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                                        kg
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className=" relative ">
                                                <h2 className='text-sm text-gray-600'>Height</h2>
                                                <div className='flex relative'>

                                                    <Field type="number"
                                                           className="border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                                           placeholder="Height"
                                                           name='height'
                                                           onChange={handleChange}
                                                    />
                                                    <span
                                                        className="font-semibold inline-flex  items-center px-3 border-t bg-white border-r border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                                        cm
                                                    </span>
                                                </div>
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

export default NewPatientForm;