import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

//function
import {
    getOrderSeller,
    getOrderStatus,
} from '../../functions/users';
import {
    getRequestTopup,
    getRequestWithdraw
} from '../../functions/request';

//antd
import { Badge, Button, Form, Input, Image, Card, Empty } from 'antd';

const Home = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [orderPack, setOrderPack] = useState([]);
    const [orderDelivery, setOrderDelivery] = useState([]);
    const [orderConfirmed, setOrderConfirmed] = useState([]);
    const [orderSuccess, setOrderSuccess] = useState([]);

    const [requestWithdraw, setRequestWithdraw] = useState([]);
    const [requestTopup, setRequestTopup] = useState([]);




    const loadData = async () => {
        //GetData Status Waiting for the pack
        getOrderSeller(user.token, 'Waiting for the pack')
            .then((res) => {
                setOrderPack(res.data);
            }).catch((err) => {
                console.log(err);
            });

        //GetData Status Waiting for delivery
        getOrderSeller(user.token, 'Waiting for delivery')
            .then((res) => {
                setOrderDelivery(res.data);
            }).catch((err) => {
                console.log(err);
            });

        //GetData Status Waiting for confirmed
        getOrderSeller(user.token, 'Waiting for confirmed')
            .then((res) => {
                setOrderConfirmed(res.data);
            }).catch((err) => {
                console.log(err);
            });

        getOrderSeller(user.token, 'Confirm received')
            .then((res) => {
                setOrderSuccess(res.data);
            }).catch((err) => {
                console.log(err);
            });

        // getRequestTopup(user.token, 'Waiting for confirmation')
        //     .then((res) => {
        //         setRequestTopup(res.data);
        //     }).catch((err) => {
        //         console.log(err);
        //     });

        // getRequestWithdraw(user.token, 'Waiting for confirmation')
        //     .then((res) => {
        //         setRequestWithdraw(res.data);
        //     }).catch((err) => {
        //         console.log(err);
        //     });

    }
    // console.log('Pack::', orderPack)
    // console.log('Delivery::', orderDelivery)
    // console.log('Confirmed::', orderConfirmed)



    useEffect(() => {
        loadData();

    }, [])

    return (
        <div className="container max-w-[100%] max-h-[680px] bg-[#f9fafb]">
            <div className="grid grid-rows-6 grid-flow-col gap-4 justify-items-center content-center w-[100%] h-[680px]">
                <div className='row-span-1 place-self-center'>
                    <h1 className='text-3xl'>Dashboard</h1>
                </div>
                <div className="row-span-2 justify-center">
                    <div className='grid grid-cols-4 gap-8 w-screen h-[200px] px-20'>
                        <div className="container col-span-2 bg-[#0c4a6e]/60 w-[100%] rounded-lg shadow-md p-3">
                            <div className='flex flex-col w-[100%] h-[100%] px-10 my-3'>
                                <div className='flex justify-start h-[100%] '>
                                    <i className="fa-solid text-[15px] text-white">Orders waiting for the pack</i>
                                </div>
                                <div className='flex justify-between place-self-end h-[100%] w-[100%] mt-2'>
                                    <div className='flex justify-center'>
                                        <h1 className="fa-solid fa-box  text-white text-[70px]"></h1>
                                    </div>
                                    <Badge
                                        className='flex justify-center w-auto h-auto place-self-center'
                                    >
                                        <div className='flex justify-center p-1 rounded-full bg-white w-[60px] h-[60px]'>
                                            {/* <p className='font-semibold text-md text-white ml-2'></p> */}
                                            <i className="fa-solid text-[#0e7490] text-3xl pt-2">{orderPack.length}</i>
                                        </div>
                                    </Badge>

                                </div>
                                <div className='flex justify-end place-self-end h-[100%]'>
                                </div>

                            </div>

                        </div>
                        <div className="container col-span-2 bg-[#0c4a6e]/60 w-[100%] rounded-lg shadow-md p-3">
                            <div className='flex flex-col w-[100%] h-[100%] px-10 my-3'>
                                <div className='flex justify-start h-[100%] '>
                                    <i className="fa-solid text-[15px] text-white">Orders waiting for delivery</i>
                                </div>
                                <div className='flex justify-between place-self-end h-[100%] w-[100%] mt-2'>
                                    <div className='flex justify-center'>
                                        <h1 className="fa-solid fa-truck-fast text-white text-[70px]"></h1>
                                    </div>
                                    <Badge
                                        className='flex justify-center w-auto h-auto place-self-center'
                                    >
                                        <div className='flex justify-center p-1 rounded-full bg-white w-[60px] h-[60px]'>
                                            {/* <p className='font-semibold text-md text-white ml-2'></p> */}
                                            <i className="fa-solid text-[#0e7490] text-3xl pt-2">{orderDelivery.length}</i>
                                        </div>
                                    </Badge>

                                </div>
                                <div className='flex justify-end place-self-end h-[100%]'>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                <div className="row-span-2 justify-center">
                    <div className='grid grid-cols-4 gap-8 w-screen h-[200px] px-20'>
                        <div className="container col-span-2 bg-[#0c4a6e]/60 w-[100%] rounded-lg shadow-md p-3">
                            <div className='flex flex-col w-[100%] h-[100%] px-10 my-3'>
                                <div className='flex justify-start h-[100%] '>
                                    <i className="fa-solid text-[15px] text-white">Orders Waiting for confirmed</i>
                                </div>
                                <div className='flex justify-between place-self-end h-[100%] w-[100%] mt-2'>
                                    <div className='flex justify-center'>
                                        <h1 className="fa-solid fa-list text-white text-[70px]"></h1>
                                    </div>
                                    <Badge
                                        className='flex justify-center w-auto h-auto place-self-center'
                                    >
                                        <div className='flex justify-center p-1 rounded-full bg-white w-[60px] h-[60px]'>
                                            {/* <p className='font-semibold text-md text-white ml-2'></p> */}
                                            <i className="fa-solid text-[#0e7490] text-3xl pt-2">{orderConfirmed.length}</i>
                                        </div>
                                    </Badge>

                                </div>
                                <div className='flex justify-end place-self-end h-[100%]'>
                                </div>

                            </div>

                        </div>
                        <div className="container col-span-2 bg-[#a7f3d0]/60 w-[100%] rounded-lg shadow-md p-3">
                            <div className='flex flex-col w-[100%] h-[100%] px-10 my-3'>

                                <div className='flex justify-start h-[100%] '>
                                    <i className="fa-solid text-[15px] text-[#0c4a6e]/60">Orders confirmed</i>
                                </div>
                                <div className='flex justify-between place-self-end h-[100%] w-[100%] mt-2'>
                                    <div className='flex justify-center'>
                                        <h1 className="fa-solid fa-circle-check text-[#0c4a6e]/60 text-[70px]"></h1>
                                    </div>
                                    <Badge
                                        className='flex justify-center w-auto h-auto place-self-center'
                                    >
                                        <div className='flex justify-center p-1 rounded-full bg-[#0c4a6e]/60 w-[60px] h-[60px]'>
                                            {/* <p className='font-semibold text-md text-white ml-2'></p> */}
                                            <i className="fa-solid text-white text-3xl pt-2">{orderSuccess.length}</i>
                                        </div>
                                    </Badge>

                                </div>
                                <div className='flex justify-end place-self-end h-[100%]'>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>

        </div>
    )
}

export default Home;