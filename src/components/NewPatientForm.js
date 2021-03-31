import React from 'react';
import {Form, Formik} from "formik"
import axios from "../axios";
import { useHistory } from "react-router-dom"
import {useLocation} from 'react-router-dom';

const NewPatientForm = () => {
    const history = useHistory();
    const search = useLocation().search;
    const doctorId = new URLSearchParams(search).get('id');

    const onSubmit = async (values) => {
        const res = await axios.post('patient', {...values});
        if(res){
            // console.log(res)
            const patientId = res.data.id
            const addDocToPat = await axios.put(`patient/${patientId}/doctor/${doctorId}`, {});
            if(addDocToPat){
                console.log('patient added to doctor')
                history.push('/doctors')
            } else {
                console.log('failed adding doc to pat')
            }

        }else {
            console.log("WENT WRONG")
        }

    }
    return (
        // "firstName": "John",
        // "middleName": "Jack",
        // "lastName": "Doe",
        // "ssn": "000-00-0000",
        // "address": "Highway St.",
        // "city": "Atlanta",
        // "state": "Georgia",
        // "country": "USA",
        // "dateOfBirth": "1995-02-12T00:00:00.000Z",
        // "bloodGroup": "A+",
        // "gender": "M",
        // "phoneNumber": "00385951234567",
        // "email": "johndoe@test.com",
        // "weight": 75.6,
        // "height": 195
        <>
            <Formik initialValues={{}} onSubmit={onSubmit}>

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
                                            Adding new patient
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <div className="w-full space-y-6">
                                        <div className="w-full">
                                            <div className=" relative ">
                                                <input type="text"
                                                       className="border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                       placeholder="First name"
                                                       name='firstName'
                                                       onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className=" relative ">
                                                <input type="text"
                                                       className="border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                       placeholder="Middle name"
                                                       name='middleName'
                                                       onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className=" relative ">
                                                <input type="text"
                                                       className="border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                       placeholder="Last name"
                                                       name='lastName'
                                                       onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className=" relative ">
                                                <input type="text"
                                                       className="border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                       placeholder="SSN"
                                                       name='ssn'
                                                       onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className=" relative ">
                                                <input type="text"
                                                       className="border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                       placeholder="Address"
                                                       name='address'
                                                       onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className=" relative ">
                                                <input type="text"
                                                       className="border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                       placeholder="City"
                                                       name='city'
                                                       onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className=" relative ">
                                                <input type="text"
                                                       className="border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                       placeholder="State"
                                                       name='state'
                                                       onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className=" relative ">
                                                <input type="text"
                                                       className="border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                       placeholder="Country"
                                                       name='country'
                                                       onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className=" relative ">
                                                <input type="text"
                                                       className="border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                       placeholder="Blood Group"
                                                       name='bloodGroup'
                                                       onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className=" relative ">
                                                <input type="date"
                                                       className="border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                                       placeholder="DOB"
                                                       name='dateOfBirth'
                                                       onChange={handleChange}
                                                />
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