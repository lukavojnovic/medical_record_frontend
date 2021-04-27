import React, { useState } from 'react';
import { Card, Col, Table, Form, Input, DatePicker, Button, Alert, notification } from 'antd';
import { ModalComponent } from '../modal/modal.component'
import { removeItemFromRecord, setRecord, splitForCards, updateData, validate, } from '../../utils/utils';
import { DeleteTwoTone,    RadiusBottomrightOutlined,} from '@ant-design/icons';
import moment from 'moment'
import './card.styles.scss';



const { Meta } = Card;

export const CardComponent = ({ type, value, children, id }) => {

    let ROLE = JSON.parse(localStorage.getItem('user')).role
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [records, setRecords] = useState(value);
    const [form] = Form.useForm();
    const dateFormat = 'YYYY/MM/DD'
    let columns = [];
    const [date, setDate] = useState(moment());
    const [name, setName] = useState('');
    const [prescription, setPrescription] = useState('');
console.log("THIS IS "+ id);
    function onChange(date, dateString) {
        setDate(dateString);

    }

    function resetHooks() {
        setName('');
        setPrescription('');
        setDate(moment());
    }

    const onSubmit = (type) => {
        if (validate(name, "lettersAndNumbers") || validate(prescription,"lettersAndNumbers")) {
            
            if (type === "diagnosis" || type === "immunizations") {
                setRecord(id, type, { date: date, name: name }).then((response) => { setRecords(updateData(records, response, type)); form.resetFields(); })
            } else if (type === "notes") {
                setRecord(id, type, { name: name }).then((response) => { setRecords(updateData(records, response, type)); form.resetFields(); })

            } else if (type === "allergies") {
                setRecord(id, type, { name: name }).then((response) => { setRecords(updateData(records, response, type)); form.resetFields(); })

            } else if (type === "medications") {
                setRecord(id, type, { name: name, date: date, prescription: prescription }).then((response) => { setRecords(updateData(records, response, type)); form.resetFields() })

            }
        } else { openNotification(type,"bottomRight") }
    }

    const openNotification = (name,placement) => {
        notification["error"]( {
          message: 'Error',
          description:
            'Please, fill all fields properly for ' + splitForCards(name)+', only letters, numbers and "-" are allowed. ',
          duration: 4,
          placement
          
        });
        

    };
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 13,
        },
    };



    if (type === "diagnosis" || type === "immunizations") {

        columns = [
            {
                title: { type },
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                render: d => moment(new Date(d)).format("YYYY-MM-DD")
            },

            {
                title: 'Action',
                dataIndex: 'id',
                key: 'x',
                render: (text, record, index) => ROLE === "PATIENT" ? <></>: <DeleteTwoTone onClick={() => removeItemFromRecord(records, type, record.id).then(response => setRecords(response))} className="deleteIcon" />,
            },

        ];
    } else if (type === "notes") {
        columns = [
            {
                title: 'Note',
                dataIndex: 'note',
                key: 'note',
            },
            {
                title: 'Action',
                dataIndex: '',
                key: 'x',
                render: (text, record, index) =>ROLE === "PATIENT" ? <></>: <DeleteTwoTone onClick={() => removeItemFromRecord(records, type, record.id).then(response => setRecords(response))} className="deleteIcon" />,
            },

        ];
    } else if (type === "allergies") {
        columns = [
            {
                title: 'Allergy',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Action',
                dataIndex: '',
                key: 'x',
                render: (text, record, index) => ROLE === "PATIENT" ? <></>: <DeleteTwoTone onClick={() => removeItemFromRecord(records, type, record.id).then(response => setRecords(response))} className="deleteIcon" />,
            },


        ];
    } else if (type === "medications") {
        columns = [
            {
                title: 'Medication',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Prescription',
                dataIndex: 'prescription',
                key: 'prescription',
            },
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                render: d => moment(new Date(d)).format("YYYY-MM-DD")

            },
            ROLE === "PATIENT" ? { title: 'Action' } : {
                title: 'Action',
                dataIndex: '',
                key: 'x',
                render: (text, record, index) => ROLE === "PATIENT" ? <></>: <DeleteTwoTone onClick={() => removeItemFromRecord(records, type, record.id).then(response => setRecords(response))} className="deleteIcon" />,

            },

        ];
    }

    return (
        <div >

            <Col span={6}>

                <div className="card">
                    <Card className="innerCard" hoverable onClick={() => setIsModalVisible(true)}>
                        <Meta className="card-title" title={type} />
                    </Card>
                </div>
            </Col>
            <ModalComponent
                modalVisibility={isModalVisible}
                handleOk={() => setIsModalVisible(false)}
                footer={null}
                type={splitForCards(type)}
                id={id}
            >
                <Table dataSource={records} columns={columns} />

                {ROLE === "PATIENT" ? null :
                    <Form form={form}   {...layout} name="basic">
                        <Form.Item
                            label={`New ${type}`}
                            name={"first"}
                            rules={[
                                {
                                    required: true,
                                    message: `Please, enter valid ${type}`,
                                },
                            ]}
                        >
                            <Input onChange={(e) => setName(e.target.value)} />

                        </Form.Item>
                        {type === "medications" ?
                            <Form.Item
                                label={`prescription`}
                                name={"medication"}
                                rules={[
                                    {
                                        required: true,
                                        message: `Please, enter valid prescription`,
                                    },
                                ]}
                            >
                                <Input onChange={(e) => setPrescription(e.target.value)} />

                            </Form.Item> : null

                        }
                        {type === "diagnosis" || type === "medications" || type === "immunizations" ?

                            <DatePicker defaultValue={date} format={dateFormat} className="datePicker" onChange={onChange} />

                            : null
                        }
                        <Form.Item className="buttons">
                            <Button onClick={() => { onSubmit(type); resetHooks(); }} className="addButton">Add</Button>
                            <Button onClick={() => { form.resetFields(); resetHooks(); }}>Reset</Button>
                        </Form.Item>

                    </Form>
                }

            </ModalComponent>
        </div>
    )
}


