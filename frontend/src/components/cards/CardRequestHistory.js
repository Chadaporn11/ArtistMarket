import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

//functions
import { deleteRequestOther, deleteRequestTopup, deleteRequestWithdraw } from '../functions/request';

//antd
import { Badge, Image, Avatar } from 'antd';

const CardRequestHistory = ({ requests, setRequests, loadData, setSelectRequest, selectRequest }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const { _id, checkStatus, description, requestBy, requestType, title, paymentImage, paymentname, amount, topupAmount, topupTime } = requests;

    const removeRequestOther = () => {
        if (window.confirm('Are you sure you want to delete this Request?')) {
            deleteRequestOther(user.token, _id)
                .then((res) => {
                    toast.success('Delete Request Other success!')
                    loadData()

                }).catch((err) => {
                    toast.error('Error delete Request Other!')
                })
        }


    }

    const removeRequestTopup = () => {
        if (window.confirm('Are you sure you want to delete this Request?')) {
            deleteRequestTopup(user.token, _id)
                .then((res) => {
                    toast.success('Delete Request Topup success!')
                    loadData()
                }).catch((err) => {
                    toast.error('Error delete Request Topup!')
                })
        }


    }

    const removeRequestWithdraw = () => {
        if (window.confirm('Are you sure you want to delete this Request?')) {
            deleteRequestWithdraw(user.token, _id)
                .then((res) => {
                    toast.success('Delete Request Withdraw success!')
                    loadData()
                }).catch((err) => {
                    toast.error('Error delete Request Withdraw!')
                })
        }


    }

    return (
        <>
            {requestType.name === 'Other' && (
                <>
                    {checkStatus === 'Waiting for confirmation' && (

                        <Badge
                            className='relative flex justify-center w-auto h-auto'
                            onClick={removeRequestOther}
                        >
                            <div className='flex justify-center absolute -top-3 -right-2 p-1 rounded-full bg-[#f87171] opacity-90 shadow-md w-[30px] h-[30px] hover:-translate-y-2'>
                                {/* <p className='font-semibold text-md text-white ml-2'></p> */}
                                <i className="fa-solid fa-circle-xmark text-white text-md  pt-1"></i>
                            </div>
                        </Badge>
                    )}
                    <div className='container bg-[#fecaca] w-[350px] h-[200px] rounded-md hover:shadow-xl p-5'>
                        <div className='flex flex-col w-full'>
                            <div className='flex mb-3 w-full justify-between'>
                                <div className='flex justify-start w-[65%]'>
                                    <i className="fa-solid fa-comment-dots text-xl text-[#fb923c]"></i>
                                    {/* <i className="fa-solid fa-wallet text-xl text-[#78716c]"></i> */}
                                    <i className="fa-solid text-sm ml-2 text-white"> Request {requestType.name}:</i>
                                </div>
                                <div className='flex justify-end w-[35%]'>
                                    {/* <i className='fa-solid text-[12px] text-[#facc15]'>{ }</i> */}
                                    <b className="text-[12px] text-[#a8a29e] ml-2">{checkStatus}</b>

                                </div>
                            </div>
                            <div className='flex'>
                                <p className='text-[12px] text-white bg-white/40 py-1 px-2 rounded-xl'><b>ID : </b>
                                    {_id}</p>

                            </div>
                            <div className='flex flex-col w-[100%] overflow-y-auto h-[85px] my-2'>
                                <p className='text-sm text-white'><b>Title : </b>
                                    {title}</p>
                                <p className='text-sm text-white whitespace-normal'><b>Descriptions : </b>
                                    {description}</p>

                            </div>


                        </div>
                    </div>
                </>

            )}
            {requestType.name === 'Top up money' && (
                <>
                    {checkStatus === 'Waiting for confirmation' && (

                        <Badge
                            className='relative flex justify-center w-auto h-auto'
                            onClick={removeRequestTopup}
                        >
                            <div className='flex justify-center absolute -top-3 -right-2 p-1 rounded-full bg-[#f87171] opacity-90 shadow-md w-[30px] h-[30px] hover:-translate-y-2'>
                                {/* <p className='font-semibold text-md text-white ml-2'></p> */}
                                <i className="fa-solid fa-circle-xmark text-white text-md  pt-1"></i>
                            </div>
                        </Badge>
                    )}
                    <div className='container bg-[#d1fae5] w-[450px] h-[250px] rounded-md hover:shadow-xl p-5'>
                        <div className='flex flex-col w-[100%]'>
                            <div className='flex mb-3 justify-between'>
                                <div className='flex justify-start w-[60%]'>
                                    <i className="fa-solid fa-comment-dollar text-xl text-[#4ade80]"></i>
                                    {/* <i className="fa-solid fa-wallet text-xl text-[#78716c]"></i> */}
                                    <i className="fa-solid text-sm ml-2 text-[#075985]"> Request {requestType.name}:</i>
                                </div>
                                <div className='flex justify-end w-[40%]'>
                                    {/* <i className='fa-solid text-[12px] text-[#facc15]'>{ }</i> */}
                                    <b className="text-[12px] text-[#a8a29e] ml-2">{checkStatus}</b>

                                </div>
                            </div>
                            <div className='flex'>
                                <p className='text-[12px] text-white bg-[#7dd3fc]/40 py-1 px-2 rounded-xl'><b>ID : </b>
                                    {_id}</p>
                            </div>
                            <div className='flex flex-row mt-2 w-[100%]'>
                                <div className='flex flex-col mt-2 w-[60%]'>
                                    <p className='text-sm text-[#075985]/60 py-1 px-2 rounded-xl'><b>Payment Name : </b>
                                        {paymentname}</p>
                                    <p className='text-sm text-[#075985]/60 py-1 px-2 rounded-xl'><b>Amount : </b>
                                        {topupAmount} ฿</p>
                                    <p className='text-sm text-[#075985]/60 py-1 px-2 rounded-xl'><b>Payment Time : </b>
                                        {topupTime}</p>

                                </div>
                                <div className='flex justify-end w-[40%]'>
                                    <Image
                                        className='object-cover object-center justify-center rounded-md'
                                        shape="square"
                                        height={'150px'}
                                        src={paymentImage[0].images[0].url}
                                    />

                                </div>
                            </div>
                        </div>

                    </div>

                </>
            )}
            {requestType.name === 'Withdraw money' && (

                <>
                    {checkStatus === 'Waiting for confirmation' && (
                        <Badge
                            className='relative flex justify-center w-auto h-auto'
                            onClick={removeRequestWithdraw}
                        >
                            <div className='flex justify-center absolute -top-3 -right-2 p-1 rounded-full bg-[#f87171] opacity-90 shadow-md w-[30px] h-[30px] hover:-translate-y-2'>
                                {/* <p className='font-semibold text-md text-white ml-2'></p> */}
                                <i className="fa-solid fa-circle-xmark text-white text-md  pt-1"></i>
                            </div>
                        </Badge>
                    )}

                    <div className={`container bg-[#d1fae5] ${paymentImage.length <= 0 ? 'h-[130px]' : 'h-[430px]'} w-[350px]  rounded-md hover:shadow-xl p-5`}>
                        <div className='flex flex-col w-[100%]'>
                            <div className='flex justify-between'>
                                <div className='flex justify-start'>
                                    <i className="fa-solid fa-comment-dollar text-xl text-[#4ade80]"></i>
                                    {/* <i className="fa-solid fa-wallet text-xl text-[#78716c]"></i> */}
                                    <i className="fa-solid text-[12px] ml-2 my-1 text-[#075985]"> Request</i>

                                </div>
                                <div className='flex justify-end'>
                                    {/* <i className='fa-solid text-[12px] text-[#facc15]'>{ }</i> */}
                                    <b className="text-[11px] text-[#a8a29e] ml-2">{checkStatus}</b>

                                </div>
                            </div>
                            <div className='flex'>
                                <i className="fa-solid text-[12px] text-[#075985] ml-7 mb-2">{requestType.name}:</i>


                            </div>
                            <div className={`flex justify-between`}>
                                <p className='text-[11px] text-white bg-[#7dd3fc]/40 py-1 px-2 rounded-xl'><b>ID : </b>
                                    {_id}</p>
                                <p className='text-sm text-[#075985]/60 py-1 px-2 rounded-xl'><b>Amount : </b>
                                    {amount} ฿</p>
                            </div>

                            {paymentImage.length > 0 && (

                                <div className={`flex mt-2 justify-center w-[100%]`}>
                                    <div className='flex'>
                                        <Image
                                            className='object-cover object-center justify-center rounded-md'
                                            shape="square"
                                            height={'300px'}
                                            src={paymentImage[0].url}
                                        // src={'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}
                                        />
                                    </div>


                                </div>
                            )}

                        </div>

                    </div>

                </>
            )}

        </>
    )
}

export default CardRequestHistory