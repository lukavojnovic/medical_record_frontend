import React from "react";
import axios from "../axios";
import moment from 'moment';
import {notification, Table} from 'antd';
import {queryClient} from '../App';
import {DeleteTwoTone, EditTwoTone} from '@ant-design/icons';
import {useQuery} from "react-query";
import { useHistory } from "react-router-dom"

const getAllDoctors = () => axios.get('doctors');


const AllDoctors = () => {
    const history = useHistory();

    const doctors = useQuery('doctors', () => getAllDoctors());

    const handleDelete = async (id) => {
        console.log(id)
        await axios.delete(`doctor/${id}`)
        await queryClient.invalidateQueries('doctors')
    }


    const columns = [
        {
            title: '',
            render: (text, record) => (
                <>
                    <a onClick={() => {
                        history.push(`doctor/${record.id}`)
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
            title: 'Speciality',
            dataIndex: 'speciality',
            key: 'speciality'
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
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Operation',
            render: (text, record) => (
                <>
                    <a onClick={() => {
                        history.push(`/doctors/editdoc/${record.id}`)
                    }}><EditTwoTone style={{fontSize: "16px", paddingRight: "1rem"}}/></a>

                    <a onClick={() => {
                        if (window.confirm("Are you sure you want to delete this doctor?")) {
                            handleDelete(record.id)
                                .then((res) => {
                                    openNotification()
                                })
                                .catch((error) => console.log(error))
                        }
                    }}><DeleteTwoTone style={{fontSize: "16px"}} twoToneColor="#B22222"/></a>
                </>
            )
        }

    ];

    const openNotification = () => {
        notification.success({
            message: `Success`,
            description:
                'Successfully deleted doctor!',
            placement: "bottomRight"
        });
    };

    return (
        <div className="block sm:flex w-full min-h-screen mt-0 text-blue-900">
            <div className='pl-2 w-full bg-gray-100'>
                <h1 className='pl-4 pt-3 text-gray-700 text-xl'>List of Doctors</h1>
                <button type="button"
                        onClick={() => history.push('doctors/newdoc')}
                        className="py-2 px-4 mx-4 my-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-auto transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                    Add doctor
                </button>
                <div className='mx-4 '>
                    <Table dataSource={doctors.data?.data}
                           columns={columns}
                           rowKey={"id"}
                    />
                </div>
            </div>
        </div>

    );
};

export default AllDoctors;
