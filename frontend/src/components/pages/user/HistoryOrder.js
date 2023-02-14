import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CardOrderHistory from '../../cards/CardOrderHistory';


//function
import {
    getOrder,
    getOrderStatus,
} from '../../functions/users';

//antd
import { Select, Button, Form, Input, Image, Card, Empty } from 'antd';

const HistoryOrder = () => {
    // const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('Waiting for the pack');
    const statusOrder = [
        {
            orderStatus: 'Waiting for the pack'
        },
        {
            orderStatus: 'Waiting for delivery'
        },
        {
            orderStatus: 'Waiting for confirmed'
        }
    ]

    const loadData = () => {
        getOrderStatus(user.token, selectedStatus)
            .then((res) => {
                setOrders(res.data);
            }).catch((err) => {
                console.log(err.response.data);
            });

    }
    console.log('order=>', orders)
    useEffect(() => {
        loadData();


    }, [selectedStatus])
    return (
        <div className="container max-w-[100%] min-h-screen bg-[#f9fafb] pb-[150px]">
            <div className="flex flex-col justify-items-center content-center w-[100%]">
                <div className='flex flex-col place-self-center h-[80px] mt-10'>
                    <h1 className='flex justify-center text-4xl'>History Order</h1>
                </div>
                <div className='flex flex-row justify-center w-[100%] px-10 ml-5'>
                    <Button
                        type="primary"
                        className={`rounded-full justify-self-center w-[60px] h-[60px] mr-8 ${selectedStatus === "Waiting for the pack" ? 'bg-[#0ea5e9]' : 'bg-[#e0e7ff]'}`}
                        onClick={() => setSelectedStatus('Waiting for the pack')}
                        htmlType="submit"
                    >
                        <i className="fa-solid fa-box text-2xl"></i>
                    </Button>
                    <div className='border-2 border-[#d1d5db] w-[100px] h-0 place-self-center mr-8'></div>
                    <Button
                        type="primary"
                        className={`rounded-full justify-self-center w-[60px] h-[60px] mr-8 ${selectedStatus === "Waiting for delivery" ? 'bg-[#0ea5e9]' : 'bg-[#e0e7ff]'}`}
                        onClick={() => setSelectedStatus('Waiting for delivery')}
                        htmlType="submit"
                    >
                        <i className="fa-solid fa-truck-fast text-2xl"></i>
                    </Button>
                    <div className='border-2 border-[#d1d5db] w-[100px] h-0 place-self-center mr-8'></div>
                    <Button
                        type="primary"
                        className={`rounded-full justify-self-center w-[60px] h-[60px] mr-8 ${selectedStatus === "Waiting for confirmed" ? 'bg-[#0ea5e9]' : 'bg-[#e0e7ff]'}`}
                        onClick={() => setSelectedStatus('Waiting for confirmed')}
                        htmlType="submit"
                    >
                        <i className="fa-solid fa-list text-2xl"></i>
                    </Button>
                    <div className='border-2 border-[#d1d5db] w-[100px] h-0 place-self-center mr-8'></div>
                    <Button
                        type="primary"
                        className={`rounded-full justify-self-center w-[60px] h-[60px] mr-8 ${selectedStatus === "Confirm received" ? 'bg-[#0ea5e9]' : 'bg-[#e0e7ff]'}`}
                        onClick={() => setSelectedStatus('Confirm received')}
                        htmlType="submit"
                    >
                        <i className="fa-solid fa-circle-check text-2xl"></i>
                    </Button>
                </div>
                <div className='flex flex-row justify-center w-[100%] px-10 ml-5'>
                    <p
                        className={`fa-solid text-[12px] justify-self-center w-[180px] mt-3  mr-8 ${selectedStatus === "Waiting for the pack" ? 'text-[#0ea5e9]' : 'text-[#e0e7ff]'}`}
                    >
                        Waiting for the pack
                    </p>
                    <p
                        className={`fa-solid text-[12px] justify-self-center w-[180px] mt-3 mr-8 ${selectedStatus === "Waiting for delivery" ? 'text-[#0ea5e9]' : 'text-[#e0e7ff]'}`}
                    >
                        Waiting for delivery
                    </p>
                    <p
                        className={`fa-solid text-[12px] justify-self-center w-[180px] mt-3 mr-8 ${selectedStatus === "Waiting for confirmed" ? 'text-[#0ea5e9]' : 'text-[#e0e7ff]'}`}
                    >
                        Waiting for confirmed
                    </p>
                    <p
                        className={`fa-solid text-[12px] justify-self-center w-[180px] mt-3 mr-8 pl-10 ${selectedStatus === "Confirm received" ? 'text-[#0ea5e9]' : 'text-[#e0e7ff]'}`}
                    >
                        Confirm received
                    </p>
                </div>
                <div className="flex justify-center mt-5">
                    <div className="container col-span-6 bg-white w-screen min-h-[450px] h-fit rounded-lg shadow-md p-10">

                        <div className='grid grid-cols-3 gap-8 my-10 justify-items-center'>
                            {/* <div className="container col-span-6 bg-white w-screen h-[800px] rounded-lg shadow-md"> */}
                            {orders && orders.map((order) => (
                                <div className='col-span-1' key={order._id}>
                                    <CardOrderHistory
                                        orders={order}
                                        setOrders={setOrders}
                                        loadData={loadData}
                                    />
                                </div>

                            ))}
                            {orders.length < 1 && (
                                <div className='col-span-3'>
                                    <Empty className='w-[100%] h-[60%] rounded-md mt-20' />
                                </div>

                            )}

                            {/* <div className='col-span-1'>
                                <CardOrderHistory
                                    orders={orders}
                                    setOrders={setOrders}
                                    loadData={loadData}
                                />
                            </div> */}
                            {/* <div className='col-span-1'>
                                <CardOrderHistory
                                    orders={orders}
                                    setOrders={setOrders}
                                    loadData={loadData}
                                />
                            </div>
                            <div className='col-span-1'>
                                <CardOrderHistory
                                    orders={orders}
                                    setOrders={setOrders}
                                    loadData={loadData}
                                />
                            </div>
                            <div className='col-span-1'>
                                <CardOrderHistory />
                            </div>
                            <div className='col-span-1'>
                                <CardOrderHistory />
                            </div>
                            <div className='col-span-1'>
                                <CardOrderHistory />
                            </div>
                            <div className='col-span-1'>
                                <CardOrderHistory />
                            </div> */}


                        </div>

                        {/* 
            <div className='col-span-1'>
              <CardProductSeller />
            </div>
            <div className='col-span-1'>
              <CardProductSeller />
            </div>
            <div className='col-span-1'>
              <CardProduct />
            </div> */}
                        {/* <div className='col-span-1'>
                            <CardProduct />
                        </div>
                        <div className='col-span-1'>
                            <CardProduct />
                        </div>
                        <div className='col-span-1'>
                            <CardProduct />
                        </div>
                        <div className='col-span-1'>
                            <CardProduct />
                        </div>
                        <div className='col-span-1'>
                            <CardProduct />
                        </div>
                        <div className='col-span-1'>
                            <CardProduct />
                        </div>
                        <div className='col-span-1'>
                            <CardProduct />
                        </div>
                        <div className='col-span-1'>
                            <CardProduct />
                        </div> */}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HistoryOrder