import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CardOrderHistoryseller from '../../cards/CardOrderHistorySeller';


//function
import {
    getOrderSeller,
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
            value: 'Waiting for the pack',
            label: 'Waiting for the pack'

        },
        {
            value: 'Waiting for delivery',
            label: 'Waiting for delivery'

        },
        {
            value: 'Waiting for confirmed',
            label: 'Waiting for confirmed'
        },
        {
            value: 'Confirm received',
            label: 'Confirm received'
        }

    ]
    const handleSelectChange = (value) => {
        // console.log(`selected ${value}`);
        setSelectedStatus(value)

    }

    const loadData = () => {
        let orderStatus = selectedStatus

        getOrderSeller(user.token, orderStatus)
            .then((res) => {
                setOrders(res.data);
            }).catch((err) => {
                console.log(err);
            });

    }
    // console.log('order=>', orders)
    useEffect(() => {
        loadData();

    }, [selectedStatus])

    return (
        <div className="container max-w-[100%] min-h-screen bg-[#f9fafb] pb-[150px]">
            <div className="flex flex-col justify-items-center content-center w-[100%]">
                <div className='flex flex-col place-self-center h-[80px] mt-10'>
                    <h1 className='flex justify-center text-4xl'>History Order</h1>
                </div>
                <div className='flex flex-row justify-end w-[95%]'>
                    <Select
                        defaultValue="Waiting for the pack"
                        size="large"
                        style={{ width: 200 }}
                        onChange={handleSelectChange}
                        options={statusOrder}
                    />
                </div>

                <div className="flex justify-center mt-5">
                    <div className="container col-span-6 bg-white w-screen min-h-[450px] h-fit rounded-lg shadow-md p-10">

                        <div className='grid grid-cols-3 gap-8 my-10 justify-items-center'>
                            {/* <div className="container col-span-6 bg-white w-screen h-[800px] rounded-lg shadow-md"> */}
                            {orders && orders.map((order) => (
                                <div className='col-span-1' key={order._id}>
                                    <CardOrderHistoryseller
                                        orders={order}
                                        setOrders={setOrders}
                                        loadData={loadData}
                                        setSelectedStatus={setSelectedStatus}
                                        selectedStatus={selectedStatus}
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