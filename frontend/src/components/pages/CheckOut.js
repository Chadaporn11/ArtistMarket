import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

//function
import {
    getUserCart,
    saveAddressOrder,
    deleteAddressOrder,
    getAddressOrder,
    saveOrder,
    emptyCart,
} from '../functions/users';

//antd
import { Input, Button, Select, Card, Empty, Form } from 'antd';
const { TextArea } = Input;
const { Option } = Select;


const initialstate = [{
    id: '',
    sendOrder: '',
    orderBy: '',
},];

const CheckOut = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cartId, setCartId] = useState('')
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [select, setSelect] = useState(initialstate);
    const [choose, setChoose] = useState();
    const [statusCheckout, setStatusCheckout] = useState(false);

    const handleSelectChange = (value) => {
        setStatusCheckout(false)
        for (var i = 0; i <= select.length; i++) {

            if (select[i]._id === value) {
                setChoose(select[i])
                setStatusCheckout(true)
            } else if (value === null) {
                setChoose()
                setStatusCheckout(false)
            }
        }
    }

    const RemoveAddress = (id) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            console.log('remove', id);
            deleteAddressOrder(user.token, id)
                .then((res) => {
                    console.log(res.data);
                    window.location.reload();

                }).catch((err) => {
                    toast.error('Remove Address Failed!');
                });

        }
    }

    const handleSaveAddress = (values) => {

        let data = {
            name: values.name,
            phone: values.phone,
            address: values.address
        }
        saveAddressOrder(user.token, data)
            .then((res) => {
                form.resetFields();
                toast.success('Save Address Order Success!')
                // setSendOrder(res.data)
                loadData()

            }).catch((err) => {
                toast.error('Save Address Order Error!')
            });

    }

    const handleCheckOut = () => {

        if (total < user.walletUser.pocketmoney && choose !== undefined) {
            let data = {
                id: cartId,
                sendOrder: choose,
            };
            saveOrder(user.token, data)
                .then((res) => {
                    emptyCart(user.token)
                        .then((res) => {
                        }).catch((err) => {
                            toast.error('Save Order Error!');
                        });
                    toast.success('Create Order Success!')
                    dispatch({
                        type: 'ADD_TO_CART',
                        payload: [],
                    })

                    //loacalStorage
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('cart');
                    }
                    navigate('/user/history-order')

                }).catch((err) => {
                    toast.error('Create Order Error!')
                });


        } else if (choose === undefined) {
            toast.error('Please Delivery Address')
        } else if (total > user.walletUser.pocketmoney) {
            window.alert('You do not have enough balance. Go to top up page!')
            navigate('/')

        }
    }

    const loadData = () => {
        getUserCart(user.token)
            .then((res) => {
                setCartId(res.data._id)
                setProducts(res.data.products);
                setTotal(res.data.cartTotal);
            }).catch((err) => {
                console.log(err.response.data);
            });
        getAddressOrder(user.token)
            .then((res) => {
                setSelect(res.data)
            }).catch((err) => {
                console.log(err.response.data);
            });

    }


    useEffect(() => {
        loadData()

    }, []);


    return (
        <div className="container max-w-[100%] min-h-screen bg-[#f9fafb] mb-10">
            <div className="flex flex-col justify-items-center content-center max-w-[100%] min-h-[680px]">
                <div className='flex flex-row place-self-center mt-10'>
                    <div className='flex flex-col'>
                        <div className='container bg-[#e0f2fe] w-[700px] h-[120px] rounded-md shadow-md ml-5 mr-10 p-8 mb-5'>
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
                        <div className='container bg-white w-[700px] h-[550px] rounded-md shadow-md ml-5 mr-10 p-3'>
                            <div className='flex flex-col m-10'>
                                <div className='flex mb-10 justify-center'>
                                    <i className="fa-solid fa-map-location-dot text-xl text-[#f87171]"></i>
                                    <i className="fa-solid text-lg text-[#075985] mx-2"> Create Address</i>

                                </div>
                                <Form

                                    // layout="vertical"
                                    onFinish={handleSaveAddress}
                                    form={form}
                                >
                                    <Form.Item
                                        label={<p className='text-md text-[#57534e] w-full ml-2'><i className="fa-solid fa-user" /> Name</p>}
                                        name={"name"}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your name!',
                                                whitespace: true,

                                            },
                                        ]}
                                    >

                                        <Input
                                            name="name"
                                            className={`w-full !text-md px-2 mx-2 !rounded-[10px] justify-self-center`}
                                            placeholder="Please input your name!"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label={<p className='text-md text-[#57534e] w-full ml-2'><i className="fa-solid fa-phone" /> Phone</p>}
                                        name={"phone"}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your phone!',
                                            },
                                            {
                                                pattern: /^06\d{8}|09\d{8}|08\d{8}/g,
                                                message: 'Invalid phone number format start must 09,08,06 and must have 10 numbers',
                                            }

                                        ]}
                                    >
                                        <Input
                                            name="phone"
                                            required={[

                                                {
                                                    pattern: /^06\d{8}|09\d{8}|08\d{8}/g,
                                                    message: 'Invalid phone number format start must 09,08,06 and must have 10 numbers',
                                                },
                                            ]}
                                            className={`w-full !text-md px-2 mx-2 !rounded-[10px] justify-self-center`}
                                            placeholder="Please input your phone!"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label={<p className='text-md text-[#57534e] w-full'><i className="fa-solid fa-map-location-dot" /> Address</p>
                                        }
                                        name={"address"}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your address!',
                                                whitespace: true,

                                            },
                                        ]}>

                                        <TextArea
                                            name='address'
                                            rows={8}
                                            placeholder="Please input your address!"
                                            className={`w-full !text-md px-2 mx-2 !rounded-[10px] justify-self-center `}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        className='flex justify-end mt-8'>
                                        <div className='flex justify-end mt-8'>
                                            <Button
                                                type="primary"
                                                className="rounded-full bg-[#0ea5e9] ml-2 hover:-translate-y-2"
                                                htmlType="submit"
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    </Form.Item >
                                </Form>
                            </div>
                        </div >
                    </div>
                    <div className='flex flex-col'>
                        <div className='container bg-white w-[450px] h-[300px] rounded-md shadow-md mr-5 mb-5 p-8'>
                            <div className='flex mb-5 justify-center'>
                                <i className="fa-solid fa-location-dot text-lg text-[#f87171]"></i>
                                <i className="fa-solid text-lg text-[#075985] mx-2"> Derivery Address</i>
                                <i className="fa-solid fa-truck-fast text-lg text-[#fbbf24]"></i>
                            </div>
                            <Select
                                name="nameaddress"
                                id="nameaddress"
                                size="large"
                                className={`w-[100%] !text-md !rounded-[10px] justify-self-center`}
                                onChange={handleSelectChange}
                                placeholder={<div>Select Address...</div>}
                            >
                                <Option className="truncate w-[100%] h-[110px]">Select Address...</Option>
                                {
                                    select.length > 0 &&
                                    select.map((item) =>
                                        <Option
                                            key={item._id}
                                            value={item._id}
                                            className="w-[100%] h-auto"
                                        >
                                            <div className='relative bg-white w-[100%] h-[100%] rounded-md mb-3 mt-1'>
                                                <div className='absolute top-10 right-2 rounded-xl bg-[#ef4444] opacity-90 shadow-md w-[30px] h-[30px]'>
                                                    <i
                                                        className='fa-solid fa-trash-can text-sm text-white ml-2 mt-2'
                                                        onClick={() => RemoveAddress(item._id)}></i>
                                                </div>
                                                <div className='flex flex-col px-3 w-[85%]'>
                                                    <div className='flex flex-row'>
                                                        <p className='text-md mx-2 mb-2'>{item.sendOrder.name}</p>
                                                    </div>
                                                    <div className='flex flex-row '>
                                                        <i className="fa-solid fa-square-phone text-lg text-[#0891b2]"></i>
                                                        <p className='text-md mx-2'>Phone : {item.sendOrder.phone}</p>
                                                    </div>
                                                    <div className='flex flex-row w-[100%]'>
                                                        <i className="fa-solid fa-map-location-dot text-lg text-[#0891b2]"></i>
                                                        <div className='text-md mx-2 whitespace-normal'>Address : {item.sendOrder.address}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Option>
                                    )}
                            </Select>
                            {(choose === undefined || choose === null) && (<Empty className='w-[100%] h-[60%] rounded-md mt-3' />)}
                            {choose !== undefined && (
                                <Card className='relative container bg-[#eef2ff] w-[100%] h-auto rounded-md mt-5'>
                                    <div className='flex flex-col p-0 w-[100%]'>
                                        <div className='flex flex-row '>
                                            <i className="fa-solid fa-user text-lg text-[#0891b2]"></i>
                                            <p className='text-md ml-2'>: {choose.sendOrder.name}</p>

                                        </div>
                                        <div className='flex flex-row '>
                                            <i className="fa-solid fa-square-phone text-lg text-[#0891b2]"></i>
                                            <p className='text-md ml-2'>: {choose.sendOrder.phone}</p>

                                        </div>
                                        <div className='flex flex-row w-[100%]'>
                                            <i className="fa-solid fa-map-location-dot text-lg text-[#0891b2]"></i>
                                            <p className='text-md ml-2 whitespace-normal'>: {choose.sendOrder.address}</p>

                                        </div>
                                    </div>

                                </Card>
                            )}

                        </div>
                        <div className='container bg-white w-[450px] h-fit rounded-md shadow-md mr-5'>
                            <div className='flex flex-col m-10'>
                                <div className='flex justify-start'>
                                    <i className="fa-solid fa-box-open text-xl text-[#fcd34d]"></i>
                                    <i className="fa-solid mx-2 text-md text-[#075985]">: Order Summary</i>
                                </div>
                                <div className='flex mb-5 w-full'>
                                    <div className='flex flex-col w-[100%]'>
                                        <hr className='my-3' />
                                        {products.map((item, index) =>
                                            <div key={index} className='flex justify-start w-[100%]'>
                                                <p className='text-md text-[#57534e]'>
                                                    {item.product.productName} x {item.count} = {item.price * item.count}
                                                </p>
                                            </div>

                                        )}
                                        <hr className='my-3' />
                                        <i className='fa-solid text-sm mt-2'>Total : <b className='text-[#ef4444]'>{total}</b> ฿</i>
                                    </div>
                                </div>
                                <div className='flex justify-end'>
                                    <Button
                                        type="primary"
                                        className="rounded-full bg-[#34d399] ml-2 hover:-translate-y-1"
                                        onClick={handleCheckOut}
                                        disabled={!statusCheckout}
                                        htmlType="submit"
                                    >
                                        Check Out
                                    </Button>

                                </div>
                            </div>


                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default CheckOut