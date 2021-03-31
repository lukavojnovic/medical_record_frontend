import React, {useState} from "react";
import axios from "../axios";
import moment from 'moment';
import doctorM from "../images/doctor-M.png";
import doctorF from "../images/doctor-F.png";
import {Table} from 'antd';
import {queryClient} from '../App';
import {DeleteTwoTone, EditTwoTone} from '@ant-design/icons';
import {useQuery} from "react-query";
import { useHistory } from "react-router-dom"

const getPatients = () => axios.get('patients/7eced9d4-21ba-4915-af8d-701027f62329');
const getDoctor = () => axios.get('doctor/7eced9d4-21ba-4915-af8d-701027f62329');

const Doctor = () => {
    const history = useHistory();

    const [showModal, setShowModal] = useState(false)
    // const [patients, setPatients] = useState([])
    const doctor = useQuery('doctor', () => getDoctor());
    const patients = useQuery('patients', () => getPatients());

    const handleDelete = async (id) => {
        await axios.delete(`patient/${id}`)
        await queryClient.invalidateQueries('patients')
    }

    const handleNewPatient = (id) => {
        history.push(`doctors/newpat?id=${id}`)
    }

    // const modal = () => {
    //     return (
    //         <div
    //             className={`${showModal ? 'block' : 'hidden'} z-50`}>
    //             <div
    //                 className="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
    //                 <div className="bg-white rounded shadow-lg w-10/12 md:w-1/3">
    //                     <div className="border-b px-4 py-2 flex justify-between items-center">
    //                         <h3 className="font-semibold text-lg">Modal Title</h3>
    //                         <button className="text-black close-modal">&cross;</button>
    //                     </div>
    //
    //                     <div className="p-3">
    //                         <div
    //                             className="bg-white rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden">
    //                             <div className="px-4 py-8 sm:px-10">
    //                                 <div className="relative mt-6">
    //                                     <div className="absolute inset-0 flex items-center">
    //                                         <div className="w-full border-t border-gray-300">
    //                                         </div>
    //                                     </div>
    //                                     <div className="relative flex justify-center text-sm leading-5">
    //                                         <span className="px-2 text-gray-500 bg-white">
    //                                             Search criteria
    //                                         </span>
    //                                     </div>
    //                                 </div>
    //                                 <div className="mt-6">
    //                                     <div className="w-full space-y-6">
    //                                         <div className="w-full">
    //                                             <div className=" relative ">
    //                                                 <input type="text" id="search-form-price"
    //                                                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
    //                                                        placeholder="Your price"/>
    //                                             </div>
    //                                         </div>
    //                                         <div className="w-full">
    //                                             <div className=" relative ">
    //                                                 <input type="text" id="search-form-location"
    //                                                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
    //                                                        placeholder="Your location"/>
    //                                             </div>
    //                                         </div>
    //                                         <div className="w-full">
    //                                             <div className=" relative ">
    //                                                 <input type="text" id="search-form-name"
    //                                                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
    //                                                        placeholder="Your name"/>
    //                                             </div>
    //                                         </div>
    //                                         <div>
    //                             <span className="block w-full rounded-md shadow-sm">
    //                                 <button type="button"
    //                                         className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
    //                                     Search
    //                                 </button>
    //                             </span>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                             <div className="px-4 py-6 border-t-2 border-gray-200 bg-gray-50 sm:px-10">
    //                                 <p className="text-xs leading-5 text-gray-500">
    //                                     This data are display for information and can change
    //                                 </p>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     <div className="flex justify-end items-center w-100 border-t p-3">
    //                         <button
    //                             className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white mr-1 close-modal">Cancel
    //                         </button>
    //                     </div>
    //                 </div>
    //             </div>
    //
    //         </div>
    //     );
    // }

    const columns = [
        {
            title: '',
            render: (text, record) => (
                <>
                    <a onClick={() => {
                        history.push(`patient/${record.id}`)
                    }}><p className='m-0'>Details</p></a>
                </>
            )
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'SSN',
            dataIndex: 'ssn',
            key: 'ssn'
        },
        {
            title: 'DOB',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
            render: (text, record) => (
                <>{moment(record.dateOfBirth).format('MM/DD/YYYY')}</>
            ),
        },
        {
            title: 'Blood Group',
            dataIndex: 'bloodGroup',
            key: 'bloodGroup'
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'Weight (kg)',
            dataIndex: 'weight',
            key: 'weight'
        },
        {
            title: 'Height (cm)',
            dataIndex: 'height',
            key: 'height'
        },
        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber'
        },
        {
            title: 'Operation',
            render: (text, record) => (
                <>
                    <a onClick={() => {
                        alert(JSON.stringify(record))
                    }}><EditTwoTone style={{fontSize: "16px", paddingRight: "1rem"}}/></a>

                    <a onClick={() => {
                        if (window.confirm("Are you sure you want to delete this patient?")) {
                            handleDelete(record.id)
                                .then((res) => {
                                    console.log("succesful delete")
                                })
                                .catch((error) => console.log(error))
                        }
                    }}><DeleteTwoTone style={{fontSize: "16px"}} twoToneColor="#B22222"/></a>
                </>
            )
        }

    ];

    return (
        <div className="block sm:flex w-full mt-0 text-blue-900">
            <div className='min-h-screen justify-around xs:block p-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5 bg-blue-100 '>
                <div className='flex xs:flex sm:block border-b-2 border-dotted border-blue-300 sm:border-0'>
                    <div className='w-1/2 sm:w-auto text-center sm:border-b-2 border-dotted border-blue-300'>
                        <img src={doctor.data?.data.gender === 'M' ? doctorM : doctorF}
                             className='w-full xs:w-48 mx-1 px-1 xs:mx-auto mb-2' alt='doctor icon'/>
                        <h2 className='sm:text-center mx-1 text-xl text-blue-900'>Dr. {doctor.data?.data.firstName} {doctor.data?.data.middleName?.substring(0, 1).concat('.')} {doctor.data?.data.lastName}</h2>
                    </div>
                    <div className='pt-6 sm:pt-0 mt-2 text-justify sm:border-b-2 border-dotted border-blue-300'>
                        <p className='text-lg m-0 pl-2'>Basic Info</p>
                        <ul className='pl-2'>
                            <li><span className='font-medium'>Speciality:</span> {doctor.data?.data.speciality}</li>
                            <li><span
                                className='font-medium'>DOB:</span> {doctor.data?.data.dateOfBirth?.substring(0, 10)}
                            </li>
                            <li><span className='font-medium'>Number of patients:</span> {patients.data?.data.length}</li>
                        </ul>
                    </div>
                </div>

                <div className='mt-2 text-justify border-b-2 border-dotted border-blue-300'>
                    <p className='text-lg m-0 pl-2'>Address</p>
                    <ul className='pl-2'>
                        <li><span className='font-medium'>Country:</span> {doctor.data?.data.country}</li>
                        <li><span className='font-medium'>State:</span> {doctor.data?.data.state}</li>
                        <li><span className='font-medium'>City:</span> {doctor.data?.data.city}</li>
                        <li><span className='font-medium'>Street:</span> {doctor.data?.data.address}</li>
                    </ul>
                </div>
                <div>
                    <div className='mt-2 text-justify border-b-2 border-dotted border-blue-300'>
                        <p className='text-lg m-0 pl-2'>Contact</p>
                        <ul className='pl-2'>
                            <li><span className='font-medium'>Email: </span>{doctor.data?.data.email}</li>
                            <li><span className='font-medium'>Phone: </span>{doctor.data?.data.phoneNumber}</li>
                        </ul>
                    </div>
                    <div className=' mt-2 text-justify border-b-2 border-dotted	border-blue-300'>
                        <p className='text-lg m-0 pl-2'>Contact</p>
                        <ul className='pl-2'>
                            <li><span className='font-medium'>Email: </span>{doctor.data?.data.email}</li>
                            <li><span className='font-medium'>Phone: </span>{doctor.data?.data.phoneNumber}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='pl-2 w-full bg-gray-100'>
                <h1 className='pl-4 pt-3 text-gray-700 text-xl'>List of patients</h1>
                <button type="button"
                        onClick={() => handleNewPatient(doctor.data?.data.id)}
                        className="py-2 px-4 mx-4 my-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-auto transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                    Add patient
                </button>
                {/*{modal()}*/}
                <div className='mx-4 '>
                    <Table dataSource={patients.data?.data}
                           columns={columns}
                    />
                </div>
            </div>
        </div>

    );
};

export default Doctor;
