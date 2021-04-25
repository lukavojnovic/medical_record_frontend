import React, {  useState } from 'react';
import { Form, Input, DatePicker, Button, Space } from 'antd'
import { setRecord, splitForCards, updateData } from '../../utils/utils';
import './form.styles.scss'


export const Forms = ({ type, id }) => {
    const [date, setDate] = useState("");
    const [recordType, setRecordType] = useState('');
    const [prescription, setPrescription] = useState('');

    function onChange(date, dateString) {
        setDate(dateString);

    }



    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    return (

        <div className="forms">
            <Form
                {...layout}
                name="basic"

            //onFinish={onFinish}
            //onFinishFailed={onFinishFailed}
            >
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
                    <Input onChange={(e) => setRecordType(e.target.value)} />

                </Form.Item>
                {type === "medication" ?
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
                {type === "diagnosis" || type === "medication" || type === "immunization" ?
                    <Form.Item>
                        <DatePicker className="datePicker" onChange={onChange} />
                    </Form.Item>
                    : null
                }
                 <Button onClick={() => setRecord(id, type, { date: date, recordType: recordType }).then(()=>setData(updateData (data,{ date: date, recordType: recordType },type)))} className="addButton">Add</Button> 
            </Form>
        </div>
    )

}

//...el,name:recordType,date:date