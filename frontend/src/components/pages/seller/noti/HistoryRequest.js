import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CardRequestHistory from '../../../cards/CardRequestHistory';

//function
import { getRequestOther, getRequestWithdraw } from '../../../functions/request';

//antd
import { Select, Button, Radio, Input, Image, Card, Empty } from 'antd';

const HistoryRequest = () => {
    // const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [selectRequest, setSelectRequest] = useState('Other');
    const [requestStatus, setRequestStatus] = useState('Waiting for confirmation');
    const typeRequest = [
        {
            value: 'Other',
            label: 'Other'

        },
        {
            value: 'Withdraw money',
            label: 'Withdraw money'

        }
    ]

    const handleSelectChange = (value) => {
        console.log(`selected ${value}`);
        setSelectRequest(value)

    }
    const onChangeRequestStatus = (e) => {
        console.log('radio checked', e.target.value);
        setRequestStatus(e.target.value);
    };

    const loadData = () => {
        if (selectRequest === 'Other') {
            getRequestOther(user.token, requestStatus)
                .then((res) => {
                    setRequests(res.data);
                }).catch((err) => {
                    console.log(err.response.data);
                });

        }
        if (selectRequest === 'Withdraw money') {
            getRequestWithdraw(user.token, requestStatus)
                .then((res) => {
                    setRequests(res.data);
                }).catch((err) => {
                    console.log(err.response.data);
                });

        }

    }
    console.log('order::', requests)
    useEffect(() => {
        loadData();

    }, [selectRequest, requestStatus])
    return (
        <div className="container max-w-[100%] min-h-screen bg-[#f9fafb] pb-[150px]">
            <div className="flex flex-col justify-items-center content-center w-[100%]">
                <div className='flex flex-col place-self-center h-[80px] mt-10'>
                    <h1 className='flex justify-center text-4xl'>History Request</h1>
                </div>
                <div className='flex flex-row justify-end w-[95%]'>

                    <Button
                        type="primary"
                        className="rounded-full bg-[#fcd34d] justify-self-center mr-3"
                        onClick={() => navigate('/seller/request')}
                        htmlType="submit"
                    >
                        <i className="fa-solid fa-file-pen"></i>
                        <i className="fa-solid text-md ml-2">Request</i>

                    </Button>
                    <Select
                        defaultValue="Other"
                        size="large"
                        style={{ width: 150 }}
                        onChange={handleSelectChange}
                        options={typeRequest}
                    />
                </div>
                <div className='flex justify-end w-[95%] mt-3'>
                    <Radio.Group
                        defaultValue={'Waiting for confirmation'}
                        onChange={onChangeRequestStatus}
                    // value={requestStatus}
                    >
                        <Radio value={'Waiting for confirmation'}>Waiting for confirmation</Radio>
                        <Radio value={'Request success'}>Request success</Radio>
                        <Radio value={'Request error'}>Request error</Radio>
                    </Radio.Group>
                </div>

                <div className="flex justify-center mt-5">
                    <div className="container col-span-6 bg-white w-[90%] min-h-[450px] h-fit rounded-lg shadow-md p-10">

                        <div className={`grid ${selectRequest === 'Other' || selectRequest === 'Withdraw money' ? 'grid-cols-3 gap-8' : 'grid-cols-2 gap-4'} my-10 justify-items-center`}>
                            {requests && requests.map((request) => (
                                <div className='col-span-1' key={request._id}>
                                    <CardRequestHistory
                                        requests={request}
                                        setRequests={setRequests}
                                        loadData={loadData}
                                        setSelectRequest={setSelectRequest}
                                        selectRequest={selectRequest}
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

export default HistoryRequest