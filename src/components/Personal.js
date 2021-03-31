import React, {useEffect, useState} from "react";
import axios from "../axios";
import moment from 'moment';
import male from '../images/male.png'
import female from '../images/female.png'
import {useQuery} from "react-query";

const getPatient = (id) => axios.get(`patient/${id}`);

const Personal = () => {

    const [lastParam, setLastParam] = useState('')

    useEffect(()=>{
        const parts = window.location.href.split('/');
        const last = parts.pop() || parts.pop();
        setLastParam(last)
        // console.log(last ? last : "empty")
    },[])

    console.log(lastParam)
    const patient = useQuery('patient', () => getPatient(window.location.href.split('/').pop()));
    // console.log(patient.data?.data)
    return (
        <div className="block sm:flex w-full mt-0 text-blue-900">
            <div className='min-h-screen justify-around xs:block p-2 w-full sm:w-1/3 md:w-1/4 lg:w-1/5 bg-blue-100 '>
                <div className='flex xs:flex sm:block border-b-2 border-dotted border-blue-300 sm:border-0'>
                    <div className='w-1/2 sm:w-auto text-center sm:border-b-2 border-dotted border-blue-300'>
                        <img src={patient.data?.data.gender === 'M' ? male : female} className='w-full xs:w-48 mx-1 px-1 xs:mx-auto mb-2' alt='person icon'/>
                        <h2 className='sm:text-center mx-1 text-xl text-blue-900'>{patient.data?.data.firstName} {patient.data?.data.middleName?.substring(0,1).concat('.')} {patient.data?.data.lastName}</h2>
                    </div>
                    <div className='pt-6 sm:pt-0 mt-2 text-justify sm:border-b-2 border-dotted border-blue-300'>
                        <p className='text-lg m-0 pl-2'>Basic Info</p>
                        <ul className='pl-2'>
                            <li><span className='font-medium'>SSN:</span> {patient.data?.data.ssn}</li>
                            <li><span className='font-medium'>DOB:</span> {moment(patient.data?.data.dateOfBirth).format('MM-DD-YYYY')}</li>
                            <li><span className='font-medium'>Blood Group:</span> {patient.data?.data.bloodGroup}</li>
                        </ul>
                    </div>
                </div>

                    <div className='mt-2 text-justify border-b-2 border-dotted border-blue-300'>
                        <p className='text-lg m-0 pl-2'>Address</p>
                        <ul className='pl-2'>
                            <li><span className='font-medium'>Country:</span> {patient.data?.data.country}</li>
                            <li><span className='font-medium'>State:</span> {patient.data?.data.state}</li>
                            <li><span className='font-medium'>City:</span> {patient.data?.data.city}</li>
                            <li><span className='font-medium'>Street:</span> {patient.data?.data.address}</li>
                        </ul>
                    </div>
                <div>
                <div className='mt-2 text-justify border-b-2 border-dotted border-blue-300'>
                    <p className='text-lg m-0 pl-2'>Contact</p>
                    <ul className='pl-2'>
                        <li><span className='font-medium'>Email: </span>{patient.data?.data.email}</li>
                        <li><span className='font-medium'>Phone: </span>{patient.data?.data.phoneNumber}</li>
                    </ul>
                </div>
                <div className=' mt-2 text-justify border-b-2 border-dotted	border-blue-300'>
                    <p className='text-lg m-0 pl-2'>Weight & height</p>
                    <ul className='pl-2'>
                        <li><span className='font-medium'>Weight: </span>{patient.data?.data.weight} kg</li>
                        <li><span className='font-medium'>Height: </span>{patient.data?.data.height} cm</li>
                    </ul>
                </div>
            </div>
            </div>
            <div className='pl-2 w-full bg-gray-50'>
                urekov dio ide ovdje
            </div>
        </div>

    );
};

export default Personal;
