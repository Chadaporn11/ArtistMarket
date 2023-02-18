import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


//function


//antd
import { Select, Button, Form, Input, Image, Card, Empty } from 'antd';

const HistoryRequest = () => {
    // const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('Waiting for the pack');
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
    const handleSelectChange = (value) => {
        console.log(`selected ${value}`);
        setSelectedStatus(value)

    }

    const loadData = () => {
        if (selectedStatus === 'Top up money') {

        }
        if (selectedStatus === 'Other') {

        }
        // let orderStatus = selectedStatus

        // getOrderSeller(user.token, orderStatus)
        //     .then((res) => {
        //         setOrders(res.data);
        //     }).catch((err) => {
        //         console.log(err.response.data);
        //     });

    }
    console.log('order=>', orders)
    useEffect(() => {
        loadData();

    }, [])
    return (
        <div className="container max-w-[100%] min-h-screen bg-[#f9fafb] pb-[150px]">
            <div className="flex flex-col justify-items-center content-center w-[100%]">
                <div className='flex flex-col place-self-center h-[80px] mt-10'>
                    <h1 className='flex justify-center text-4xl'>History Request</h1>
                </div>
                <div className='flex flex-row justify-end w-[95%]'>
                    <Select
                        defaultValue="Other"
                        size="large"
                        style={{ width: 150 }}
                        onChange={handleSelectChange}
                        options={typeRequest}
                    />
                </div>

                <div className="flex justify-center mt-5">
                    <div className="container col-span-6 bg-white w-[90%] min-h-[450px] h-fit rounded-lg shadow-md p-10">

                        <div className='grid grid-cols-3 gap-8 my-10 justify-items-center'>





                        </div>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default HistoryRequest