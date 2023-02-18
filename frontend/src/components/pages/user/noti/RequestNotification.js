import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import FileUpload from './FileUpload';
import { toast } from 'react-toastify';


import { Link, useNavigate } from 'react-router-dom';

import {
    listRequestType,
    createRequestOther,
    createRequestTopup
} from '../../../functions/request';
import {
    readPayment
} from '../../../functions/payment';

//antd
import { Select, Button, Form, Input, InputNumber, Image, Spin, DatePicker } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;



const initialstateImage = {
    images: [],
};

const RequestNotification = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [formTopup] = Form.useForm();
    const [formOther] = Form.useForm();

    const navigate = useNavigate();
    const [selected, setSelected] = useState('Other')
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState();
    const [image, setImage] = useState(initialstateImage);

    const typeRequest = [
        {
            value: 'Top up money',
            label: 'Top up money'

        },
        {
            value: 'Other',
            label: 'Other'

        }

    ]

    const onSubmitOther = (values) => {
        let data = {
            title: values.title,
            description: values.description,
            requestType: selected
        }

        createRequestOther(user.token, data)
            .then((res) => {
                toast.success('Create Request Success')
                formOther.resetFields()


            }).catch((err) => {
                toast.error('Create Request error!')


            })
    }

    const onSubmitTopUp = (values) => {
        let data = {
            paymenttime: values.paymenttime.format('YYYY/MM/DD HH:mm:ss'),
            amount: Number(values.amount),
            name: values.name,
            lastpaymentnumber: values.lastpaymentnumber,
            paymentImage: image,
            requestType: selected,
        }
        createRequestTopup(user.token, data)
            .then((res) => {
                toast.success('Create Request Success')
                formTopup.resetFields()
                setImage({
                    images: [],
                })

            }).catch((err) => {
                toast.error('Create Request error!')
            })
        console.log('onSubmit', data)
    }
    const handleSelectChange = (values) => {
        setSelected(values)
    }


    const loadData = () => {
        let data = {
            username: 'admin'
        }
        readPayment(user.token, data)
            .then((res) => {
                // console.log(res.data);
                setPaymentMethod({
                    id: res.data._id,
                    paymentmethod: res.data.paymentmethod,
                    accountnumber: res.data.accountnumber,
                    accountname: res.data.accountname,
                    qrcode: res.data.qrcode,
                    owner: res.data.username
                })
            }).catch((err) => {
                // console.log(err.response.data);
                setPaymentMethod()
            })


    }

    useEffect(() => {
        loadData();
    }, []);
    return (
        <div className="container max-w-[100%] min-h-screen bg-[#f9fafb]">
            <div className="grid grid-rows-6 grid-flow-col gap-2 justify-items-center content-center w-[100%]">
                <div className='row-span-1 place-self-center'>
                    <div className='flex flex-col place-self-center h-[80px] mt-10'>
                        {
                            loading && (<Spin></Spin>)
                        }
                        <h1 className='flex justify-center text-4xl'>Request {selected}</h1>
                    </div>
                    <div className='flex justify-end w-[1200px] mb-3'>
                        <Button
                            type="primary"
                            className="rounded-full bg-[#34d399] justify-self-center mr-3"
                            onClick={() => navigate('/user/history-request')}
                            htmlType="submit"
                        >
                            <i className="fa-solid fa-clock-rotate-left"></i>
                            <i className="fa-solid text-md ml-2">History</i>

                        </Button>
                        <Select
                            defaultValue="Other"
                            size="large"
                            style={{ width: 200 }}
                            onChange={handleSelectChange}
                            options={typeRequest}
                        />

                    </div>
                </div>
                <div className="row-span-4 justify-center my-5">
                    {selected === "Other" && (

                        <div className='grid grid-cols-6 grap-2 justify-items-center w-[1300px]'>
                            <div className="container col-span-6 bg-white w-[95%] rounded-lg shadow-md p-20">
                                {/* {loading
                                    ? <h1 className="text-xl text-center mb-2">Loading...<Spin /></h1>
                                    : <h1 className="text-xl text-center mb-2">Create Request Other</h1>
                                } */}
                                {/* <div className='flex bg-blue-200 w-[80px] h-[50px]'>
                                    <Button
                                        type="primary"
                                        className="rounded-full bg-[#fcd34d] justify-self-center">+</Button>
                                </div> */}
                                <Form
                                    layout="vertical"
                                    name="control-hooks"
                                    form={formOther}
                                    onFinish={onSubmitOther}
                                >
                                    <Form.Item
                                        label="title"
                                        name="title"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your Title!',
                                            },
                                        ]}
                                    >
                                        < Input

                                            name="title"
                                            id="title"
                                            // value={value.productName}
                                            // onChange={handleChange}
                                            placeholder="Please input your Title"
                                            className={`w-full !text-md px-2 !rounded-[10px] justify-self-center `}
                                        />

                                    </Form.Item>


                                    <Form.Item
                                        label="Description"
                                        name={"description"}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your description!',
                                            },
                                        ]}
                                    >
                                        <TextArea
                                            name='description'
                                            // value={address}
                                            // onChange={handleAddressChange}
                                            rows={8}
                                            placeholder="Please input your description"
                                            className={`w-full !text-md px-2 mx-2 !rounded-[10px] justify-self-center`} />

                                    </Form.Item>
                                    <Form.Item
                                    >
                                        <Button
                                            type="primary"
                                            className="rounded-full bg-[#1BA8E7] justify-self-center"
                                            htmlType="submit"
                                        // onClick={onSubmitOther}
                                        >

                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>

                            </div>
                        </div>

                    )}
                    {(selected === "Top up money") && (
                        <div className='grid grid-cols-6 grap-2 justify-items-center w-[1200px] h-[600px]'>
                            <div className="container col-span-4 bg-white w-[100%] mr-10 rounded-lg shadow-md p-10">
                                <FileUpload
                                    values={image}
                                    setValues={setImage}
                                    loadind={loading}
                                    setLoading={setLoading}
                                />
                                <Form
                                    layout="vertical"
                                    name="control-hooks"
                                    form={formTopup}
                                    onFinish={onSubmitTopUp}
                                >
                                    <Form.Item
                                        label="Payment Time"
                                        name={"paymenttime"}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your Payment Time!',
                                            },
                                        ]}
                                    >
                                        {/* < Input
                                            placeholder="deliveryTime"
                                            className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                                        /> */}
                                        <DatePicker
                                            size={18}
                                            showTime={{
                                                defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
                                            }} />



                                    </Form.Item>
                                    <Form.Item
                                        label="Amount"
                                        name="amount"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your Amount!',
                                            },
                                        ]}
                                    >
                                        < InputNumber
                                            min={0} max={user.walletUser.pocketmoney}
                                            name="amount"
                                            id="amount"
                                            // value={value.productName}
                                            // onChange={handleChange}
                                            placeholder="Please input your Amount"
                                            className={`w-full !text-md px-2 !rounded-[10px] justify-self-center `}
                                        />

                                    </Form.Item>
                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your Name!',
                                            },
                                        ]}
                                    >
                                        < Input

                                            name="name"
                                            id="name"
                                            // value={value.productName}
                                            // onChange={handleChange}
                                            placeholder="Please input your Name"
                                            className={`w-full !text-md px-2 !rounded-[10px] justify-self-center `}
                                        />

                                    </Form.Item>

                                    <Form.Item
                                        label="Last Payment Number"
                                        name={"lastpaymentnumber"}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your Last Payment Number!',
                                            },
                                        ]}
                                    >
                                        <Input
                                            name='lastpaymentnumber'
                                            // value={address
                                            // onChange={handleAddressChange}
                                            // rows={8}
                                            placeholder="Please input your Last Payment Number"
                                            className={`w-full !text-md px-2 !rounded-[10px] justify-self-center `}
                                        />


                                    </Form.Item>

                                    <Form.Item
                                    >
                                        <Button
                                            type="primary"
                                            className="rounded-full bg-[#1BA8E7] justify-self-center"
                                            htmlType="submit"
                                        // onClick={onSubmitOther}
                                        >

                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>

                            </div>
                            <div className="container col-span-2 bg-white w-[100%] rounded-lg shadow-md px-8 py-10">
                                {paymentMethod.qrcode && paymentMethod.qrcode.map((item) =>

                                    <div className='flex justify-center items-center w-[100%]'>
                                        <div className='self-center'>
                                            <Image
                                                width={300}
                                                src={item.url}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* <div className='flex justify-center items-center w-[100%]'>
                  <div className='self-center'>
                    <Image
                      width={320}
                      src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                    />
                  </div>
                </div> */}
                                <div className='flex justify-start mt-5 ml-8'>
                                    <b><h1 className='mr-2'>ธนาคาร: </h1></b>
                                    <p>{paymentMethod.paymentmethod}</p>
                                    <p>{123456789}</p>

                                </div>
                                <div className='flex justify-start mt-2 ml-8'>
                                    <b><h1 className='mr-2'>เลขที่บัญชี:</h1></b>
                                    <p>{paymentMethod.accountnumber}</p>
                                    <p>{123456789}</p>

                                </div>
                                <div className='flex justify-start mt-2 ml-8'>
                                    <b><h1 className='mr-2'>ชื่อบัญชี: </h1></b>
                                    <p>{paymentMethod.accountname}</p>
                                    <p>{123456789}</p>

                                </div>
                            </div>
                        </div>

                    )}
                </div>
                <div></div>

            </div>
        </div>

        // <div className="container max-w-[100%] max-h-[100%] bg-[#f9fafb]">
        //     <div className="grid grid-rows-6 grid-flow-col gap-2 justify-items-center content-center w-[100%]">
        //         {/* <div className="row-span-1 place-self-center">
        //             {loading
        //                 ? <h1 className="text-3xl text-center mb-2">Loading...<Spin /></h1>
        //                 : <h1 className="text-3xl text-center mb-2">Withdraw Money</h1>
        //             }
        //         </div> */}
        //         <div className="row-span-5 justify-center mt-10">
        //             <div className='grid grid-cols-6 grap-2 justify-items-center w-[1200px] h-[600px]'>
        //                 <div className="container col-span-6 bg-white w-[100%] rounded-lg shadow-md">
        //                     <div className='flex flex-row w-[1200px] h-[100%] bg-red-500'>
        //                         <div className='w-[700px] bg-white p-10'>
        //                             <h1 className="text-3xl text-center mb-10">Withdraw Money</h1>
        //                             <Form
        //                                 layout="vertical"
        //                                 name="control-hooks"
        //                                 form={form}
        //                             >
        //                                 <Form.Item
        //                                     label="Amount"
        //                                     name="amount"
        //                                     rules={[
        //                                         {
        //                                             required: true,
        //                                             message: 'Please input your Amount!',
        //                                         },
        //                                     ]}
        //                                 >
        //                                     < Input

        //                                         name="amount"
        //                                         id="amount"
        //                                         // value={value.productName}
        //                                         // onChange={handleChange}
        //                                         placeholder="amount"
        //                                         className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
        //                                     />

        //                                 </Form.Item>
        //                                 <Form.Item
        //                                     label="notification Type"
        //                                     name="requestType"
        //                                 >
        //                                     <Select
        //                                         name="requestType"
        //                                         id="requestType"
        //                                         onChange={onSelectChange}
        //                                         placeholder="Please Select Category..."
        //                                     >
        //                                         <Option>Plese Select</Option>
        //                                         {
        //                                             value.requestTypes &&
        //                                             value.requestTypes.map((item) =>
        //                                                 <Option
        //                                                     key={item._id}
        //                                                     value={item._id}
        //                                                 >{item.name}</Option>
        //                                             )}
        //                                     </Select>
        //                                     {/* <Select.Option key="Kasikorn Bank" value="Kasikorn Bank" label="Kasikorn Bank" />
        //                                 <Select.Option key="Bank Krungthai" value="Bank Krungthai" label="Bank Krungthai" />
        //                                 <Select.Option key="Siam Commercial Bank" value="Siam Commercial Bank" label="Siam Commercial Bank" />

        //                             </Select> */}
        //                                 </Form.Item>
        //                                 <Form.Item
        //                                 >
        //                                     <Button
        //                                         type="primary"
        //                                         className="rounded-full bg-[#1BA8E7] justify-self-center"
        //                                         htmlType="submit"
        //                                         onClick={onSubmit}
        //                                     >

        //                                         Submit
        //                                     </Button>
        //                                 </Form.Item>
        //                             </Form>
        //                         </div>
        //                         <div>
        //                             <Image
        //                                 className='object-cover object-center justify-center max-h-[600px] w-[500px]'
        //                                 preview={false}
        //                                 height={600}
        //                                 // width={600}
        //                                 src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        //                             />
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>

        //     </div>
        // </div>
    )
}

export default RequestNotification