import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import FileUpload from './FileUpload';
import FileUploadImageUser from './FileUploadImageUser';
import FileUploadImageCard from './FileUploadImageCard';

import { toast } from 'react-toastify';


import { Link, useNavigate } from 'react-router-dom';

import {
    listRequestType,
    createRequestOther,
    createRequestTopup,
    createRequestSignupSeller
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
const initialstateImageUser = {
    images: [],
};
const initialstateImageCard = {
    images: [],
};

const RequestNotification = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [formTopup] = Form.useForm();
    const [formOther] = Form.useForm();

    const navigate = useNavigate();
    const [selectRequest, setSelectRequest] = useState('Other')
    const [loading, setLoading] = useState(false);
    const [loadingCard, setLoadingCard] = useState(false);
    const [loadingUser, setLoadingUser] = useState(false);

    const [paymentMethod, setPaymentMethod] = useState();
    const [image, setImage] = useState(initialstateImage);
    const [cardImage, setCardImage] = useState(initialstateImageCard);
    const [userImage, setUserImage] = useState(initialstateImageUser);



    const typeRequest = [
        {
            value: 'Top up money',
            label: 'Top up money'

        },
        {
            value: 'Other',
            label: 'Other'

        },
        {
            value: 'SignUp Seller',
            label: 'SignUp Seller'

        }

    ]

    const onSubmitOther = (values) => {
        let data = {
            title: values.title,
            description: values.description,
            requestType: selectRequest
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
            requestType: selectRequest,
        }
        createRequestTopup(user.token, data)
            .then((res) => {
                toast.success('Create Request Success')
                formTopup.resetFields()
                setImage({
                    images: []
                })

            }).catch((err) => {
                toast.error('Create Request error!')
            })
        console.log('onSubmit', data)
    }
    const handleSelectChange = (values) => {
        setSelectRequest(values)
    }

    const onSubmitSignupSeller = () => {
        let data = {
            ImageCard: cardImage.images,
            ImageUser: userImage.images,
            requestType: selectRequest
        }
        createRequestSignupSeller(user.token, data)
            .then((res) => {
                toast.success('Create Request Success')
                setCardImage({
                    images: []
                })
                setUserImage({
                    images: []
                })

            }).catch((err) => {
                toast.error('Create Request error!')
            })

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
                        <h1 className='flex justify-center text-4xl'>Request {selectRequest}</h1>
                    </div>

                    <div className={`flex w-screen mb-3 px-20 ${selectRequest === "Top up money" ? 'justify-between' : 'justify-end'}`}>
                        {selectRequest === "Top up money" && (
                            <div className='flex container bg-[#e0f2fe] w-[450px] h-[120px] rounded-md shadow-md p-8'>
                                <div className='flex flex-col w-full'>
                                    <div className='flex mb-3 w-full'>
                                        <div className='flex justify-star'>
                                            <i className="fa-solid fa-wallet text-xl text-[#78716c]"></i>
                                            <i className="fa-solid text-md ml-2 text-[#075985]"> Wallet:</i>
                                        </div>
                                        <div className='flex justify-end w-full'>
                                            <i className='fa-solid text-xl text-[#facc15]'>{user.walletUser.pocketmoney}</i>
                                            <i className="fa-solid text-xl text-[#78716c] ml-2"> ฿</i>

                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <p className='text-sm text-[#c7d2fe] bg-white/50 py-1 px-2 rounded-xl'><b>ID : </b>
                                            {user.walletUser._id}</p>

                                    </div>


                                </div>
                            </div>
                        )}

                        <div className='flex place-self-end'>
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
                </div>
                <div className="row-span-4 justify-center my-5">
                    {selectRequest === "Other" && (

                        <div className='grid grid-cols-6 grap-2 justify-items-center w-screen'>
                            <div className="container col-span-6 bg-white w-[90%] rounded-lg shadow-md p-20">
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
                    {(selectRequest === "Top up money") && (
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
                    {(selectRequest === "SignUp Seller") && (
                        <div className='grid grid-cols-6 grap-2 justify-items-center w-screen'>
                            <div className="container col-span-6 bg-white w-[90%] rounded-lg shadow-md p-10">
                                <div className='flex flex-row w-[100%] divide-x-2 '>
                                    <div className='flex justify-center w-[60%] px-3'>
                                        <div className='flex flex-col'>
                                            <div className='flex justify-center mb-5 bg-[#60a5fa]/60 p-2 rounded-xl'>
                                                <i className="fa-solid fa-credit-card text-xl text-[#0284c7] mr-4"></i>
                                                <i className="fa-solid text-md text-white">identity card</i>
                                            </div>
                                            <div className='flex flex-row justify-center w-[100%] mb-2'>
                                                <div className='flex flex-col justify-center w-[50%]'>
                                                    <div className='flex justify-center p-2'>
                                                        <Image
                                                            src='https://i.pinimg.com/564x/3b/21/5f/3b215fb245ba90b4fa129a50efaab0c2.jpg'                                                            // className='object-fill max-h-[500px]'

                                                            width='100%'
                                                            className="object-cover rounded-xl"

                                                        />
                                                    </div>

                                                    <i className='text-center fa-solid text-[10px] text-[#78716c]'>( example image )</i>



                                                </div>

                                                <div className='flex justify-center w-[50%]'>
                                                    <div className='flex flex-col'>
                                                        {loadingCard && (<Spin />)}

                                                        <FileUploadImageCard
                                                            values={cardImage}
                                                            setValues={setCardImage}
                                                            loadind={loadingCard}
                                                            setLoading={setLoadingCard}
                                                        />

                                                    </div>


                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='flex justify-center w-[40%] px-3'>
                                        <div className='flex flex-col'>
                                            <div className='flex justify-center mb-5 bg-[#60a5fa]/60 p-2 rounded-xl'>
                                                <i className="fa-solid fa-images text-xl text-[#0284c7] mr-4"></i>
                                                <i className="fa-solid text-md text-white">identity verification picture</i>
                                            </div>
                                            <div className='flex flex-row justify-center w-[100%] mb-2'>
                                                <div className='flex flex-col justify-center w-[45%]'>
                                                    <div className='flex justify-center p-2'>
                                                        <Image
                                                            src='https://i.pinimg.com/564x/db/ee/1d/dbee1dee8ddfa865a2abb54ffaa22872.jpg'
                                                            // className='object-fill max-h-[500px]'

                                                            width='100%'
                                                            className="object-cover rounded-xl"

                                                        />
                                                    </div>

                                                    <i className='text-center fa-solid text-[10px] text-[#78716c]'>( example  image )</i>



                                                </div>

                                                <div className='flex justify-center w-[55%]'>
                                                    <div className='flex flex-col'>
                                                        {loadingUser && (<Spin />)}
                                                        <FileUploadImageUser
                                                            values={userImage}
                                                            setValues={setUserImage}
                                                            loadind={loadingUser}
                                                            setLoading={setLoadingUser}
                                                        />

                                                    </div>


                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-end mt-6'>
                                    <Button
                                        disabled={cardImage.images.length <= 0 || userImage.images.length <= 0}
                                        type="primary"
                                        className="rounded-full bg-[#06b6d4] ml-2 hover:-translate-y-1"
                                        onClick={onSubmitSignupSeller}
                                        // disabled={!statusCheckout}
                                        htmlType="submit"
                                    >
                                        Submit
                                    </Button>

                                </div>


                            </div>

                        </div>
                    )}
                </div>
                <div></div>

            </div>
        </div >


    )
}

export default RequestNotification