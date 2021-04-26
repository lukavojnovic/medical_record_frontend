import React from "react";
import axios from "../axios";
import moment from 'moment';
import doctorM from "../images/doctor-M.png";
import doctorF from "../images/doctor-F.png";
import {notification, Table} from 'antd';
import {queryClient} from '../App';
import {DeleteTwoTone, EditTwoTone} from '@ant-design/icons';
import {useQuery} from "react-query";
import { useHistory } from "react-router-dom"

const getPatients = (id) => axios.get(`patients/${id}`);
const getDoctor = (id) => axios.get(`doctor/${id}`);

const Doctor = () => {

    const history = useHistory();
    const doctor = useQuery('doctor', () => getDoctor(window.location.href.split('/').pop()));
    const patients = useQuery('patients', () => getPatients(window.location.href.split('/').pop()));

    const handleDelete = async (id) => {
        await axios.delete(`patient/${id}`)
        await queryClient.invalidateQueries('patients')
    }

    const handleNewPatient = () => {
        history.push(`${window.location.href.split('/').pop()}/newpat`)
    }

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
                        history.push(`/doctor/${window.location.href.split('/').pop()}/editpat/${record.id}`)
                    }}><EditTwoTone style={{fontSize: "16px", paddingRight: "1rem"}}/></a>
                    {JSON.parse(localStorage.getItem('user')).role === "ADMINISTRATOR" ? <a onClick={() => {
                        if (window.confirm("Are you sure you want to delete this patient?")) {
                            handleDelete(record.id)
                                .then((res) => {
                                    openNotification()
                                })
                                .catch((error) => console.log(error))
                        }
                    }}><DeleteTwoTone style={{fontSize: "16px"}} twoToneColor="#B22222"/></a> :  <> </>}

                </>
            )
        }

    ];

    const openNotification = () => {
        notification.success({
            message: `Success`,
            description:
                'Successfully deleted patient',
            placement: "bottomRight"
        });
    };

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
                </div>
            </div>
            <div className='pl-2 w-full bg-gray-100'>
                <h1 className='pl-4 pt-3 text-gray-700 text-xl'>List of patients</h1>
                <button type="button"
                        onClick={() => handleNewPatient(doctor.data?.data.id)}
                        className="py-2 px-4 mx-4 my-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-auto transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                    Add patient
                </button>
                <div className='mx-4 '>
                    <Table dataSource={patients.data?.data}
                           columns={columns}
                           rowKey={"id"}
                    />
                </div>
            </div>
        </div>

    );
};

export default Doctor;
