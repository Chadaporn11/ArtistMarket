import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

import FileUpload from './FileUpload';

//function
import {
    createPaymentSeller,
    readPayment,
    updatePayment,
} from '../../../functions/payment';
import { createRequestWithdraw } from '../../../functions/request';
import { toast } from "react-toastify";

//antd
import { Select, Button, Form, Input, Spin, Image, Modal, InputNumber } from 'antd';

const initialstate = {
    images: [],
};

const initialstatepayment = {
    accountnumber: '',
    accountname: '',
}




const Payment = () => {
    const [form] = Form.useForm();
    const { user } = useSelector((state) => ({ ...state }));
    const [image, setImage] = useState(initialstate);
    const [value, setValue] = useState(initialstatepayment);
    const [selected, setSelected] = useState('')
    const [paymentMethod, setPaymentMethod] = useState();
    const [loading, setLoading] = useState(false);
    const [statusEdit, setStatusEdit] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [amounts, setAmounts] = useState(0)




    const onSelectChange = (values) => {
        setSelected(values)
    }

    const handleChange = (event) => {
        const name = event.target.id;
        const values = event.target.value;
        setValue({
            ...value,
            [name]: values,
        });
        // console.log('Changed', value)
    }


    const onSubmit = () => {
        let data = {
            paymentmethod: selected,
            accountnumber: value.accountnumber,
            accountname: value.accountname,
            qrcode: image.images,
            owner: user.username,
        }
        console.log(`onSubmit`, data);
        createPaymentSeller(user.token, data)
            .then((res) => {
                // console.log(res);
                localStorage.setItem('paymentMethodId', res.data._id)
                setPaymentMethod(res.data)
                window.location.reload();
                setValue(initialstatepayment)
                setImage(initialstate)
                setSelected('')
                toast.success("Created payment Success!");
                // form.resetFields();
            }).catch((err) => {
                // console.log(err.response.data);
                toast.error('Error created payment!')
            });

    }

    const EditPaymentId = () => {
        setStatusEdit(true);
        setImage({
            images: paymentMethod.qrcode
        })
        setValue({
            accountnumber: paymentMethod.accountnumber,
            accountname: paymentMethod.accountname,
        });
        setSelected(paymentMethod.paymentmethod)
        form.setFieldsValue({
            paymentmethod: paymentMethod.paymentmethod,
            accountnumber: paymentMethod.accountnumber,
            accountname: paymentMethod.accountname
        })
    }

    const onEdit = () => {
        let id = paymentMethod.id;
        let data = {
            paymentmethod: selected,
            accountnumber: value.accountnumber,
            accountname: value.accountname,
            qrcode: image.images,
            owner: user.username,
        }
        // console.log('Data=>', id, data)
        updatePayment(user.token, id, data)
            .then((res) => {
                // console.log(res);
                setPaymentMethod(res.data)
                toast.success("Update payment Success!");
                setValue(initialstatepayment)
                setImage(initialstate)
                setSelected('')
                form.resetFields();
            }).catch((err) => {
                // console.log(err.response.data);
                toast.error('Error update payment!')
            });

    }
    const loadData = () => {
        let data = {
            username: user.username,
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


    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleChangeWithdraw = (value) => {
        setAmounts(value);

        console.log('Changed', value)
    }

    const onSubmitWithdraw = () => {
        if (window.confirm(`Are you sure you want to withdraw ${amounts.amount} amount?`)) {
            let data = {
                amount: amounts,
                requestType: 'Withdraw money',
            }
            createRequestWithdraw(user.token, data)
                .then((res) => {
                    toast.success('Request Withdraw Success')

                }).catch((err) => {
                    toast.error('Error Request Withdraw!')
                })
            console.log('onSubmit', data)
        }
        setIsModalOpen(false);
        setAmounts(0)
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="container max-w-[100%] max-h-[100%] bg-[#f9fafb]">
            <div className="grid grid-rows-6 grid-flow-col gap-2 justify-items-center content-center w-[100%]">
                <div className='row-span-1 place-self-center'>
                    <div className='flex flex-col place-self-center h-[100px] mt-10'>
                        <h1 className='flex justify-center text-4xl'>Payment</h1>
                        {/* <h1 className='flex justify-center text-4xl'>Product</h1> */}
                        <div className='flex justify-end w-[1200px]'>
                            <Button
                                onClick={showModal}
                                type="primary"
                                className="rounded-full bg-[#6ee7b7] justify-self-center"
                                // onClick={() => navigate('/seller/create-product')}
                                htmlType="submit"
                            >
                                <i className="fa-solid fa-money-bill-transfer text-xl mr-2"> </i>
                                <i className='fa-solid'> Withdraw</i>
                            </Button>
                            <Modal open={isModalOpen} onCancel={handleCancel} footer={[]}>
                                <div className='flex mt-3 mb-8 justify-center w-[100%]'>
                                    <i className="fa-solid fa-money-bill-transfer text-2xl mr-2 text-[#0891b2]"> </i>
                                    <i className='fa-solid text-xl mr-4'> Withdraw</i>
                                    <i className='fa-solid text-xl'>Money</i>
                                </div>

                                <div className='container bg-[#e0f2fe] w-[450px] h-[120px] rounded-md shadow-md ml-3 p-8 mb-5'>
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
                                <div className='flex flex-col my-5 mx-5'>
                                    <p className='text-md mb-2'>Amount :</p>
                                    <InputNumber
                                        min={1}
                                        max={user.walletUser.pocketmoney}
                                        onChange={(value) => handleChangeWithdraw(value)}
                                        className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                                    />
                                </div>

                                <Button
                                    type="primary"
                                    className="rounded-full bg-[#1BA8E7] justify-self-center"
                                    htmlType="submit"
                                    onClick={onSubmitWithdraw}
                                >

                                    Submit
                                </Button>

                            </Modal>
                        </div>
                        {/* <h1 className='text-3xl'>Payment</h1> */}

                    </div>
                </div>

                <div className="row-span-4 justify-center">
                    {(paymentMethod === undefined) && (
                        <div className='grid grid-cols-6 grap-2 justify-items-center w-[1300px] h-[550px]'>
                            <div className="container col-span-6 bg-white w-[100%] rounded-lg shadow-md p-8">
                                {loading
                                    ? <h1 className="text-xl text-center mb-2">Loading...<Spin /></h1>
                                    : <h1 className="text-xl text-center mb-2">Create Payment</h1>
                                }
                                {/* <div className='flex bg-blue-200 w-[80px] h-[50px]'>
                                    <Button
                                        type="primary"
                                        className="rounded-full bg-[#fcd34d] justify-self-center">+</Button>
                                </div> */}
                                <FileUpload
                                    values={image}
                                    setValues={setImage}
                                    loadind={loading}
                                    setLoading={setLoading}
                                />
                                <Form
                                    layout="vertical"
                                    name="control-hooks"
                                    form={form}
                                >
                                    <Form.Item
                                        label="Payment Method"
                                        name="paymentmethod"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select your Payment Method!',
                                            },
                                        ]}
                                    >
                                        <Select
                                            name="paymentmethod"
                                            id="paymentmethod"
                                            value={selected.paymentmethod}
                                            onChange={onSelectChange}
                                            placeholder="Please Select Payment Method..."
                                        >
                                            <Select.Option key="Kasikorn Bank" value="Kasikorn Bank" label="Kasikorn Bank" />
                                            <Select.Option key="Bank Krungthai" value="Bank Krungthai" label="Bank Krungthai" />
                                            <Select.Option key="Siam Commercial Bank" value="Siam Commercial Bank" label="Siam Commercial Bank" />

                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label="account Number"
                                        name={"accountnumber"}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your account Number!',
                                            },
                                        ]}
                                    >
                                        < Input
                                            name="accountnumber"
                                            id="accountnumber"
                                            value={value.accountnumber}
                                            onChange={handleChange}
                                            placeholder="accountnumber"
                                            className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                                        />

                                    </Form.Item>
                                    <Form.Item
                                        label="account Name"
                                        name={"accountname"}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your account Name!',
                                            },
                                        ]}
                                    >
                                        < Input
                                            name="accountname"
                                            id="accountname"
                                            value={value.accountname}
                                            onChange={handleChange}
                                            placeholder="accountname"
                                            className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
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
                    )}
                    {(paymentMethod !== undefined) && (
                        <div className='grid grid-cols-6 grap-2 justify-items-center w-[1200px] h-[600px]'>
                            <div className="container col-span-4 bg-white w-[100%] mr-10 rounded-lg shadow-md p-8">
                                {loading
                                    ? <h1 className="text-xl text-center mb-2">Loading...<Spin /></h1>
                                    : <h1 className="text-xl text-center mb-2">Edit Payment</h1>
                                }
                                <FileUpload
                                    values={image}
                                    setValues={setImage}
                                    loadind={loading}
                                    setLoading={setLoading}
                                />
                                <Form
                                    layout="vertical"
                                    form={form}
                                    name="control-ref"
                                >

                                    <Form.Item
                                        label="Payment Method"
                                        name="paymentmethod"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select your Payment Method!',
                                            },
                                        ]}
                                    >
                                        <Select
                                            name="paymentmethod"
                                            id="paymentmethod"
                                            value={selected.paymentmethod}
                                            onChange={onSelectChange}
                                        >
                                            <Select.Option key="Kasikorn Bank" value="Kasikorn Bank" label="Kasikorn Bank" />
                                            <Select.Option key="Bank Krungthai" value="Bank Krungthai" label="Bank Krungthai" />
                                            <Select.Option key="Siam Commercial Bank" value="Siam Commercial Bank" label="Siam Commercial Bank" />

                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        label="account Number"
                                        name="accountnumber"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your account Number!',
                                            },
                                        ]}
                                    >
                                        < Input
                                            name="account Number"
                                            id="accountnumber"
                                            value={value.accountnumber}
                                            onChange={handleChange}
                                            className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                                        />

                                    </Form.Item>
                                    <Form.Item
                                        label="accountname"
                                        name="accountname"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your account Name!',
                                            },
                                        ]}
                                    >
                                        < Input
                                            name="accountname"
                                            id="accountname"
                                            value={value.accountname}
                                            onChange={handleChange}
                                            className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                                        />

                                    </Form.Item>
                                    <Form.Item
                                    >
                                        <Button
                                            type="primary"
                                            className="rounded-full bg-[#1BA8E7] justify-self-center"
                                            htmlType="submit"
                                            onClick={onEdit}
                                        >

                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                            <div className="container col-span-2 bg-white w-[100%] rounded-lg shadow-md px-8 py-8">
                                <div className='flex justify-end mb-5'>
                                    <Button
                                        type="primary"
                                        className="rounded-full bg-[#fcd34d] justify-self-center"
                                        onClick={() => EditPaymentId()}
                                        htmlType="submit"
                                    >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </Button>
                                </div>
                                {paymentMethod.qrcode && paymentMethod.qrcode.map((item) =>
                                    <div className='flex justify-center items-center w-[100%]'>
                                        <div className='self-center'>
                                            <Image
                                                width={320}
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
                                </div>
                                <div className='flex justify-start mt-2 ml-8'>
                                    <b><h1 className='mr-2'>เลขที่บัญชี:</h1></b>
                                    <p>{paymentMethod.accountnumber}</p>
                                </div>
                                <div className='flex justify-start mt-2 ml-8'>
                                    <b><h1 className='mr-2'>ชื่อบัญชี: </h1></b>
                                    <p>{paymentMethod.accountname}</p>
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
export default Payment;
