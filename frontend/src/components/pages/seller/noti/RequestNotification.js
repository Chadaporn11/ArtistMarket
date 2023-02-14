import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

import {
    listRequestType
} from '../../../functions/requesttype';

//antd
import { Select, Button, Form, Input, Image } from 'antd';
const { Option } = Select;
const { TextArea } = Input;

const initialstate = [{
    id: '',
    productName: "",
    description: "",
    requestTypes: [],
    requestType: "",
    price: "",
    quantity: "",
    productStatus: "",
    productImages: [],
},];

const RequestNotification = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [value, setValue] = useState(initialstate);
    const [selected, setSelected] = useState('')
    const [datas, setDatas] = useState('')
    const [product, setProduct] = useState(initialstate);
    const [loading, setLoading] = useState(false);
    const typeRequest = [
        {
            value: 'Other',
            label: 'Other'

        },
        {
            value: 'Report User',
            label: 'Report User'

        }

    ]


    const onSubmit = () => {
        let data = {
            amount: Number(value.amount),
            // requestType: datas._id,
        }
        console.log('onSubmit', data)
    }
    const onSelectChange = (values) => {
        setSelected(values)
    }

    const loadData = () => {
        listRequestType()
            .then((res) => {
                console.log(res.data);
                setValue({ ...value, requestTypes: res.data })
            }).catch((err) => {
                console.log(err.response.data);
            })

    }

    useEffect(() => {
        loadData();
    }, []);
    return (
        <div className="container max-w-[100%] min-h-screen bg-[#f9fafb] pb-[150px]">
            <div className="flex flex-col justify-items-center content-center w-[100%]">
                <div className='flex flex-col place-self-center h-[80px] mt-10'>
                    <h1 className='flex justify-center text-4xl'>Request Notifications</h1>
                </div>
                <div className='flex justify-end w-[1200px]'>
                    <Button
                        type="primary"
                        className="rounded-full bg-[#34d399] justify-self-center"
                        onClick={() => navigate('/seller/history-request')}
                        htmlType="submit"
                    >
                        <i className="fa-solid fa-clock-rotate-left"></i>
                        <i className="fa-solid text-md ml-2">History Request</i>

                    </Button>
                </div>
                {/* <div className='flex flex-row justify-end w-screen pr-40 ml-5'>
                    <Select
                        className='w-[200px]'
                        name="requestType"
                        id="requestType"
                        onChange={onSelectChange}
                        placeholder="Please Select Request..."
                    >
                        <Option>Plese Select</Option>
                        {
                            value.requestTypes &&
                            value.requestTypes.map((item) =>
                                <Option
                                    key={item._id}
                                    value={item._id}
                                >{item.name}</Option>
                            )}
                    </Select>
                </div> */}

                <div className="flex justify-center mt-5">
                    <div className="container col-span-6 bg-white w-[80%] min-h-[450px] h-fit rounded-lg shadow-md p-20">

                        <Form
                            layout="vertical"
                            name="control-hooks"
                            form={form}
                        >
                            <Form.Item
                                label="Title"
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
                                    size="small"
                                    placeholder="title"
                                    className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                                />

                            </Form.Item>
                            <Form.Item
                                label="notification Type"
                                name="requestType"
                            >
                                <Select
                                    name="requestType"
                                    id="requestType"
                                    onChange={onSelectChange}
                                    placeholder="Please Select Category..."
                                >
                                    <Option>Plese Select</Option>
                                    {
                                        typeRequest &&
                                        typeRequest.map((item) =>
                                            <Option
                                                key={item.value}
                                                value={item.value}
                                            >{item.value}</Option>
                                        )}
                                </Select>
                                {/* <Select.Option key="Kasikorn Bank" value="Kasikorn Bank" label="Kasikorn Bank" />
                                        <Select.Option key="Bank Krungthai" value="Bank Krungthai" label="Bank Krungthai" />
                                        <Select.Option key="Siam Commercial Bank" value="Siam Commercial Bank" label="Siam Commercial Bank" />

                                    </Select> */}
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
                                {/* < Input
                                    name="description"
                                    id="description"
                                    size="small"
                                    placeholder="description"
                                    className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                                /> */}
                                <TextArea
                                    name='description'
                                    // value={address}
                                    // onChange={handleAddressChange}
                                    rows={8}
                                    placeholder="Please input your description!"
                                    className={`w-full !text-md px-2 mx-2 !rounded-[10px] justify-self-center `}
                                />

                            </Form.Item>
                            <Form.Item
                            >
                                <Button
                                    type="primary"
                                    className="rounded-full bg-[#1BA8E7] justify-self-center"
                                    htmlType="submit"
                                    onClick={onSubmit}
                                >

                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>



                    </div>
                </div>
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