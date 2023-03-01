import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


//function
import {
    listRequestOther,
    listRequestTopup,
    listRequestWithdraw,
    listRequestSignupSeller,
    listRequestType
} from '../../functions/request';
import {
    createPayment,
    readPayment,
    updatePayment
} from '../../functions/payment';

import CardRequestHistoryAdmin from '../../cards/CardRequestHistoryAdmin';
//antd
import { Select, Button, Radio, Input, Image, Card, Empty } from 'antd';
const { Option } = Select;

const RequestOrder = () => {
    // const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [selectRequest, setSelectRequest] = useState('Top up money');
    const [requestType, setRequestType] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState();

    const handleSelectChange = (value) => {
        setSelectRequest(value)
    }

    const loadData = () => {
        if (selectRequest === 'Top up money') {
            listRequestTopup(user.token, 'Waiting for confirmation')
                .then((res) => {
                    setRequests(res.data);
                }).catch((err) => {
                    console.log(err.response.data);
                });

        }
        if (selectRequest === 'Other') {
            listRequestOther(user.token, 'Waiting for confirmation')
                .then((res) => {
                    setRequests(res.data);
                }).catch((err) => {
                    console.log(err.response.data);
                });

        }
        if (selectRequest === 'Withdraw money') {
            listRequestWithdraw(user.token, 'Waiting for confirmation')
                .then((res) => {
                    setRequests(res.data);
                }).catch((err) => {
                    console.log(err);
                });

        }
        if (selectRequest === 'SignUp Seller') {
            listRequestSignupSeller(user.token, 'Waiting for confirmation')
                .then((res) => {
                    setRequests(res.data);
                }).catch((err) => {
                    console.log(err);
                });

        }
        listRequestType(user.token)
            .then((res) => {
                setRequestType(res.data)
            }).catch((err) => {
                console.log(err);
            })
        let data = {
            id: localStorage.getItem('paymentMethodId'),
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
    console.log('order=>', requestType)
    useEffect(() => {
        loadData();

    }, [selectRequest])
    return (
        <div className="container max-w-[100%] min-h-screen bg-[#f9fafb] pb-[150px]">
            <div className="flex flex-col justify-items-center content-center w-[100%]">
                <div className='flex flex-col place-self-center h-[80px] mt-10'>
                    <h1 className='flex justify-center text-4xl'>Request Orders</h1>
                </div>
                <div className='flex flex-row justify-end w-[95%]'>
                    <Select
                        name="requestType"
                        id="requestType"
                        size="large"
                        className={`w-[200px] !text-md !rounded-[10px] justify-self-center`}
                        onChange={handleSelectChange}
                        placeholder={<div>Top up money</div>}
                    >
                        {
                            requestType.length > 0 &&
                            requestType.map((item) =>
                                <Option
                                    key={item._id}
                                    value={item.name}
                                    className="w-[100%] h-auto"
                                >
                                    {item.name}
                                </Option>

                            )}

                    </Select>
                </div>

                <div className="flex justify-center mt-5">
                    <div className="container col-span-6 bg-white w-[90%] min-h-[450px] h-fit rounded-lg shadow-md p-10">

                        <div className={`grid ${selectRequest === 'Other' || selectRequest === 'Withdraw money' ? 'grid-cols-3 gap-8' : 'grid-cols-2 gap-4'} my-10 justify-items-center`}>
                            {requests && requests.map((request) => (
                                <div className='col-span-1' key={request._id}>
                                    <CardRequestHistoryAdmin
                                        requests={request}
                                        setRequests={setRequests}
                                        loadData={loadData}
                                        setSelectRequest={setSelectRequest}
                                        selectRequest={selectRequest}
                                        paymentMethod={paymentMethod}
                                        setPaymentMethod={setPaymentMethod}

                                    />
                                </div>

                            ))}
                            {requests.length < 1 && (
                                <div className='col-span-3'>
                                    <Empty className='w-[100%] h-[60%] rounded-md mt-20' />
                                </div>

                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RequestOrder