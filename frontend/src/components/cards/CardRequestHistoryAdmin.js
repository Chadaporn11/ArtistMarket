import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

//functions
import {
    UpdateRequestOther,
    UpdateRequestTopup,
    UpdateRequestWithdraw,
    UpdateRequestSignupSeller,
    deleteRequestOther,
    deleteRequestTopup,
    deleteRequestWithdraw
} from '../functions/request';
import {
    readPayment
} from '../functions/payment';
import {
    getWalletUser
} from '../functions/wallet';

import FileUploadConfirmed from '../pages/admin/payment/FileUploadConfirmed';


//antd
import { Button, Image, Modal, Spin, Empty } from 'antd';

const initialstate = {
    images: [],
};

const CardRequestHistoryAdmin = ({ requests, setRequests, loadData, setSelectRequest, selectRequest, paymentMethod }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const { _id, checkStatus, description, requestBy, requestType, CardImage, PersonImage,
        title, paymentImage, paymentname, amount, topupAmount, topupTime, walletRequest } = requests;
    const [isModalOpenTopup, setIsModalOpenTopup] = useState(false);
    const [isModalOpenWithdraw, setIsModalOpenWithdraw] = useState(false);
    const [paymentRequest, setPaymentRequest] = useState();
    const [wallet, setWallet] = useState();
    const [image, setImage] = useState(initialstate);
    const [loading, setLoading] = useState(false);


    const UpdateStatusOther = (statusother) => {

        if (window.confirm('Are you sure you want to Update status this Request?')) {
            let status_other = statusother === 'Success' ? 'Request success' : 'Request error';
            let data = {
                status: status_other
            }
            UpdateRequestOther(user.token, _id, data)
                .then((res) => {
                    toast.success('Update Status Request Other success!')
                    loadData()
                }).catch((err) => {
                    toast.error('Update status Request Other Error!')
                })


        }


    }
    const showModalTopup = () => {
        setIsModalOpenTopup(true);
    };
    const handleCancelTopup = () => {
        setIsModalOpenTopup(false);
    };
    const showModalWithdraw = () => {

        setIsModalOpenWithdraw(true);
        PaymentMethodRequest()


    };

    const handleCancelWithdraw = () => {
        setIsModalOpenWithdraw(false);
        setImage({
            images: []
        })
    };

    const UpdateStatusTopup = (statustopup) => {
        if (window.confirm('Are you sure you want to Update status this Request?')) {
            let status_topup = statustopup === 'Success' ? 'Request success' : 'Request error';
            let data = {
                status: status_topup,
                userId: requestBy._id

            }
            UpdateRequestTopup(user.token, _id, data)
                .then((res) => {
                    toast.success('Update Status Request Topup success!')
                    loadData()
                }).catch((err) => {
                    toast.error('Update status Request Topup Error!')
                })


        }
    }




    console.log('setPaymentRequest::', paymentRequest)
    console.log('setWallet::', wallet)

    const UpdateStatusWithdraw = (statuswithdraw) => {
        let status_withdraw = statuswithdraw === 'Success' ? 'Request success' : 'Request error';
        if (status_withdraw === 'Request success') {
            if (image.images.length > 0) {
                if (window.confirm('Are you sure you want to Update status this Request?')) {

                    let data = {
                        status: status_withdraw,
                        userId: requestBy._id,
                        Image: image.images

                    }
                    UpdateRequestWithdraw(user.token, _id, data)
                        .then((res) => {
                            toast.success('Update Status Request Withdraw success!')
                            loadData()
                        }).catch((err) => {
                            toast.error('Update status Request Withdraw Error!')
                        })
                }
            } else {
                toast.error('You must add an image.!')
            }


        } else {
            if (window.confirm('Are you sure you want to Update status this Request?')) {

                let data = {
                    status: status_withdraw,
                    userId: requestBy._id,
                    Image: image.images

                }
                UpdateRequestWithdraw(user.token, _id, data)
                    .then((res) => {
                        toast.success('Update Status Request Withdraw success!')
                        loadData()
                    }).catch((err) => {
                        toast.error('Update status Request Withdraw Error!')
                    })
            }


        }

    }

    const UpdateStatusSignupSeller = (statussignupseller) => {
        if (window.confirm('Are you sure you want to Update status this Request?')) {
            let status_signup = statussignupseller === 'Success' ? 'Request success' : 'Request error';
            let data = {
                status: status_signup,
                requestBy: requestBy

            }
            UpdateRequestSignupSeller(user.token, _id, data)
                .then((res) => {
                    toast.success('Update Status Request Sign Up Seller success!')
                    loadData()
                }).catch((err) => {
                    toast.error('Update status Request Sign Up Seller Error!')
                })

        }

    }

    const PaymentMethodRequest = () => {
        let data = {
            username: requestBy.username,
        }
        readPayment(user.token, data)
            .then((res) => {
                // console.log(res.data);
                setPaymentRequest({
                    id: res.data._id,
                    paymentmethod: res.data.paymentmethod,
                    accountnumber: res.data.accountnumber,
                    accountname: res.data.accountname,
                    qrcode: res.data.qrcode,
                    owner: res.data.owner
                })
            }).catch((err) => {
                // console.log(err);
                setPaymentRequest()
            })
        getWalletUser(user.token, walletRequest)
            .then((res) => {
                setWallet({
                    id: res.data._id,
                    owner: res.data.owner,
                    pocketmoney: res.data.pocketmoney,
                    walletName: res.data.walletName
                })

            }).catch((err) => {
                setWallet()
            })
    }
    useEffect(() => {
    }, [])


    return (
        <>
            {requestType.name === 'Other' && (
                <div className='container bg-[#d8b4fe]/60 w-[350px] h-[250px] rounded-md hover:shadow-xl p-5'>
                    <div className='flex flex-col w-full'>
                        <div className='flex mb-3 w-full justify-between'>
                            <div className='flex flex-col justify-start w-[65%]'>
                                <div className='flex'>
                                    <i className="fa-solid fa-comment-dots text-2xl text-[#fda4af]"></i>
                                    {/* <i className="fa-solid fa-wallet text-xl text-[#78716c]"></i> */}
                                    <i className="fa-solid text-sm ml-2 text-[#1C82AD] mt-1"> Request {requestType.name}:</i>

                                </div>
                                <div className='flex mt-1'>
                                    <p className='text-[12px] text-white bg-[#f87171]/60 py-1 px-2 rounded-xl'><b>ID : </b>
                                        {_id}</p>

                                </div>


                            </div>
                            <div className='flex justify-end w-[35%]'>
                                {/* <i className='fa-solid text-[12px] text-[#facc15]'>{ }</i> */}
                                <b className="text-[12px] text-black/30 ml-2">{checkStatus}</b>

                            </div>

                        </div>
                        <div className='flex flex-col w-[100%] overflow-y-auto h-[85px] mt-2'>
                            <p className='text-sm text-[#075985]/80'><b>Title : </b>
                                {title}</p>
                            <p className='text-sm text-[#075985]/80 whitespace-normal'><b>Descriptions : </b>
                                {description}</p>

                        </div>
                        <div className='flex justify-end'>
                            <Button
                                type="primary"
                                className="mt-5 rounded-full bg-[#93c5fd] ml-2 hover:-translate-y-1"
                                onClick={() => UpdateStatusOther('Success')}
                                htmlType="submit"
                            >
                                <b>Confirm</b>
                            </Button>
                            <Button
                                type="primary"
                                className="mt-5 rounded-full bg-[#f87171] ml-2 hover:-translate-y-1"
                                onClick={() => UpdateStatusOther('Error')}
                                htmlType="submit"
                            >
                                <b>No confirm</b>
                            </Button>
                        </div>



                    </div>
                </div>

            )}
            {requestType.name === 'Top up money' && (
                <>

                    <div className='container bg-[#e0f2fe] w-[450px] h-[260px] rounded-md hover:shadow-xl p-5'
                        onClick={showModalTopup}>
                        <div className='flex flex-col w-[100%]'>
                            <div className='flex mb-3 justify-between'>
                                <div className='flex justify-start w-[60%]'>
                                    <i className="fa-solid fa-piggy-bank text-2xl text-[#fcd34d]"></i>
                                    {/* <i className="fa-solid fa-wallet text-xl text-[#78716c]"></i> */}
                                    <i className="fa-solid text-sm ml-2 text-[#075985] mt-2"> Request {requestType.name}:</i>
                                </div>
                                <div className='flex justify-end w-[40%]'>
                                    {/* <i className='fa-solid text-[12px] text-[#facc15]'>{ }</i> */}
                                    <b className="text-[12px] text-[#a8a29e] ml-2">{checkStatus}</b>

                                </div>
                            </div>
                            <div className='flex'>
                                <p className='text-[12px] text-white bg-[#93c5fd]/40 py-1 px-2 rounded-xl'><b>ID : </b>
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
                                <div className='flex justify-end w-[40%] mr-3'>
                                    {paymentImage[0].images.length > 0 && (

                                        <Image
                                            className='object-cover object-center justify-center rounded-md'
                                            shape="square"
                                            height={'150px'}
                                            src={paymentImage[0].images[0].url}
                                        />
                                    )}
                                    {paymentImage[0].images.length <= 0 && (

                                        <Empty />
                                    )}
                                    {/* <Image
                                        className='object-cover object-center justify-center rounded-md'
                                        shape="square"
                                        height={'150px'}
                                        src={paymentImage[0].images[0].url}
                                    /> */}

                                </div>
                            </div>
                        </div>

                    </div>
                    <Modal width={950} open={isModalOpenTopup} onCancel={handleCancelTopup} footer={[]}>
                        <div className='flex mt-3 mb-8 justify-center w-[100%]'>
                            <i className="fa-solid fa-piggy-bank text-2xl text-[#fcd34d] mr-2"> </i>
                            <i className='fa-solid text-xl mr-2 mt-1'> Request</i>
                            <i className='fa-solid text-xl mr-2 mt-1'> Top up</i>
                            <i className='fa-solid text-xl mt-1'>Money</i>
                        </div>
                        <div className='grid grid-cols-6 grap-2 justify-items-center w-[100%] p-2'>
                            {paymentMethod && (
                                <div className="col-span-2 w-[95%] bg-[#e0f2fe]/50 rounded-md px-8 py-8">
                                    <div className='flex justify-center'>
                                        <i className='fa-solid text-md text-white mt-2 mb-3 bg-[#60a5fa]/40 px-3 py-2 rounded-xl'> Payment Admin</i>
                                    </div>

                                    {paymentMethod.qrcode && paymentMethod.qrcode.map((item) =>
                                        <div className='flex justify-center items-center w-[100%]'>
                                            <div className='self-center'>
                                                <Image
                                                    width={200}
                                                    src={item.url}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className='flex justify-start mt-5'>
                                        <b><h1 className='mr-2'>ธนาคาร: </h1></b>
                                        <p>{paymentMethod.paymentmethod}</p>
                                    </div>
                                    <div className='flex justify-start mt-2'>
                                        <b><h1 className='mr-2'>เลขที่บัญชี:</h1></b>
                                        <p>{paymentMethod.accountnumber}</p>
                                    </div>
                                    <div className='flex justify-start mt-2'>
                                        <b><h1 className='mr-2'>ชื่อบัญชี: </h1></b>
                                        <p>{paymentMethod.accountname}</p>
                                    </div>
                                </div>
                            )}

                            <div className="col-span-4 w-[95%] bg-[#f4f4f5]/40 rounded-md p-8">
                                <div className='flex flex-col w-[100%] h-[100%]'>
                                    <div className='flex'>
                                        <p className='text-[12px] text-white bg-[#93c5fd]/40 py-1 px-2 rounded-xl'><b>ID : </b>
                                            {_id}</p>
                                    </div>
                                    <div className='flex flex-row mt-2 w-[100%] h-[100%]'>
                                        <div className='flex flex-col mt-2 w-[60%] '>
                                            <p className='text-sm text-[#075985]/60 py-1 px-2 rounded-xl'><b>Payment Name : </b>
                                                {paymentname}</p>
                                            <p className='text-sm text-[#075985]/60 py-1 px-2 rounded-xl'><b>Amount : </b>
                                                {topupAmount} ฿</p>
                                            <p className='text-sm text-[#075985]/60 py-1 px-2 rounded-xl'><b>Payment Time : </b>
                                                {topupTime}</p>
                                            <p className='text-sm text-white bg-[#93c5fd]/40 py-1 px-2 rounded-xl w-fit my-2'><b>Request By </b></p>
                                            <div className='container text-sm text-[#075985]/60 bg-white/80 rounded-md w-[90%] p-2 mt-1' >
                                                <p className='text-sm text-[#075985]/60 py-1 px-2 rounded-xl'><b>UserID : </b>
                                                    {requestBy._id}</p>
                                                <p className='text-sm text-[#075985]/60 py-1 px-2 rounded-xl'><b>Username : </b>
                                                    {requestBy.username}</p>
                                                <p className='text-sm text-[#075985]/60 py-1 px-2 rounded-xl'><b>Phone : </b>
                                                    {requestBy.phone}</p>
                                            </div>


                                        </div>
                                        <div className='flex justify-end w-[40%]'>
                                            <Image
                                                className='object-cover object-center justify-center rounded-md'
                                                shape="square"
                                                width={200}
                                                src={paymentImage[0].images[0].url}
                                            />

                                        </div>
                                    </div>
                                    <div className='flex justify-end self-end my-5'>
                                        <Button
                                            type="primary"
                                            className="rounded-full bg-[#1BA8E7] justify-self-center mr-2"
                                            htmlType="submit"
                                            onClick={() => UpdateStatusTopup('Success')}
                                        >

                                            Confirm
                                        </Button>
                                        <Button
                                            type="primary"
                                            className="rounded-full bg-[#f87171] justify-self-center"
                                            htmlType="submit"
                                            onClick={() => UpdateStatusTopup('Error')}
                                        >

                                            No confirm
                                        </Button>

                                    </div>
                                </div>

                            </div>
                        </div>





                    </Modal>
                </>

            )}
            {requestType.name === 'Withdraw money' && (
                <>
                    <div className='container bg-[#d1fae5] w-[350px] h-[130px] rounded-md hover:shadow-xl p-5'
                        onClick={showModalWithdraw}
                    >
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
                            <div className='flex'>
                                <p className='text-[11px] text-white bg-[#7dd3fc]/40 py-1 px-2 rounded-xl'><b>ID : </b>
                                    {_id}</p>
                            </div>
                            <div className='flex justify-end'>
                                <p className='text-sm text-[#075985]/60 py-1 px-2 rounded-xl'><b>Amount : </b>
                                    {amount} ฿</p>

                            </div>
                        </div>

                    </div>
                    <Modal width={950} open={isModalOpenWithdraw} onCancel={handleCancelWithdraw} footer={[]}>
                        <div className='flex mt-3 mb-8 justify-center w-[100%]'>
                            <i className="fa-solid fa-comment-dollar text-2xl text-[#4ade80] mr-2"> </i>
                            <i className='fa-solid text-xl mr-2 mt-1'> Request</i>
                            <i className='fa-solid text-xl mr-2 mt-1'> Withdraw</i>
                            <i className='fa-solid text-xl mt-1'>Money</i>
                        </div>
                        <div className='grid grid-cols-6 grap-2 justify-items-center w-[100%] p-2'>

                            <div className="col-span-2 w-[95%] bg-[#e0f2fe]/50 rounded-md px-8 py-8">
                                <div className='flex justify-center'>
                                    <i className='fa-solid text-md text-white mt-2 mb-3 bg-[#60a5fa]/40 px-3 py-2 rounded-xl'> Payment Seller</i>
                                </div>


                                {paymentRequest && paymentRequest.qrcode && paymentRequest.qrcode.map((item) =>
                                    <div className='flex justify-center items-center w-[100%]'>
                                        <div className='self-center'>
                                            <Image
                                                width={200}
                                                src={item.url}
                                            />
                                        </div>
                                    </div>
                                )}
                                {paymentRequest && (<>
                                    <div className='flex justify-start mt-5'>
                                        <b><h1 className='mr-2'>ธนาคาร: </h1></b>
                                        <p>{paymentRequest.paymentmethod}</p>
                                    </div>
                                    <div className='flex justify-start mt-2'>
                                        <b><h1 className='mr-2'>เลขที่บัญชี:</h1></b>
                                        <p>{paymentRequest.accountnumber}</p>
                                    </div>
                                    <div className='flex justify-start mt-2'>
                                        <b><h1 className='mr-2'>ชื่อบัญชี: </h1></b>
                                        <p>{paymentRequest.accountname}</p>
                                    </div>
                                </>)}


                            </div>
                            <div className="flex flex-row col-span-4 w-[95%] bg-[#f4f4f5]/40 rounded-md p-8">
                                {/* <div className='flex flex-row w-[100%] h-[100%]'>
                                    
                                </div> */}
                                <div className='flex flex-col w-[100%] h-[100%] p-2'>
                                    {wallet && (
                                        <div className='flex container bg-[#e0f2fe] w-[100%] h-[100px] rounded-md shadow-md p-4 mb-2'>
                                            <div className='flex flex-col w-full'>
                                                <div className='flex mb-3 w-full'>
                                                    <div className='flex justify-star'>
                                                        <i className="fa-solid fa-wallet text-xl text-[#78716c]"></i>
                                                        <i className="fa-solid text-sm ml-2 text-[#075985]"> Wallet:</i>
                                                    </div>
                                                    <div className='flex justify-end w-full'>
                                                        <i className='fa-solid text-xl text-[#facc15]'>{wallet.pocketmoney}</i>
                                                        <i className="fa-solid text-md text-[#78716c] ml-2"> ฿</i>

                                                    </div>
                                                </div>
                                                <div className='flex'>
                                                    <p className='text-[12px] text-[#c7d2fe] bg-white/50 py-1 px-2 rounded-xl'><b>ID : </b>
                                                        {wallet.id}
                                                    </p>

                                                </div>


                                            </div>
                                        </div>

                                    )}
                                    <div className='flex w-[100%] h-[100%]'>
                                        <div className='flex flex-col mt-2 w-[100%]'>
                                            <p className='text-sm text-[#075985]/60 py-1 rounded-xl'><b>Request Withdraw : </b></p>
                                            <div className='flex flex-col bg-white rounded-md w-[100%] h-fit px-2 py-3'>
                                                <p className='text-sm text-[#075985]/60 rounded-xl pt-1'><b>ID : </b>
                                                    {_id}</p>
                                                <p className='text-sm text-[#075985]/60 rounded-xl pt-1'><b>Amount : </b>
                                                    {amount}</p>
                                                <p className='text-sm text-[#075985]/60 pt-1 rounded-xl'><b>Username : </b>
                                                    {requestBy.username}</p>
                                                <p className='text-sm text-[#075985]/60 pt-1 rounded-xl'><b>Phone : </b>
                                                    {requestBy.phone}</p>


                                            </div>

                                            {/* <p className='text-sm text-[#075985]/60 py-1 px-2 rounded-xl'><b>Amount : </b>
                                                {topupAmount} ฿</p>
                                            <p className='text-sm text-[#075985]/60 py-1 px-2 rounded-xl'><b>Payment Time : </b>
                                                {topupTime}</p>
                                            <p className='text-sm text-white bg-[#93c5fd]/40 py-1 px-2 rounded-xl w-fit my-2'><b>Request By </b></p> */}



                                        </div>


                                    </div>
                                </div>


                                <div className='flex flex-col w-[100%] h-[100%] p-2'>
                                    {loading ? <div className='flex self-center text-sm text-[#075985]/60 mb-3 ml-2'><Spin className='mr-2' /><b>Upload Image Payment </b></div>
                                        : <div className='flex self-center text-sm text-[#075985]/60 mb-3 ml-2'><b>Upload Image Payment </b></div>}
                                    {/* {loading === true && (<h1 className="text-md text-center">Loading... <Spin /></h1>)} */}
                                    <div className='flex flex-col self-center my-2 ml-2 h-[90%]'>
                                        <FileUploadConfirmed
                                            values={image}
                                            setValues={setImage}
                                            loadind={loading}
                                            setLoading={setLoading}
                                        />
                                    </div>
                                    {/* <div className='flex self-end h-[80%]'>

                                        <Image
                                            className='object-cover object-center justify-center rounded-md'
                                            shape="square"
                                            width={200}
                                            // src={paymentImage[0].images[0].url}
                                            src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                                        />

                                    </div> */}
                                    <div className='flex self-end my-5'>
                                        <Button
                                            type="primary"
                                            className="rounded-full bg-[#1BA8E7] justify-self-center mr-2"
                                            htmlType="submit"
                                            onClick={() => UpdateStatusWithdraw('Success')}
                                        >

                                            Confirm
                                        </Button>
                                        <Button
                                            type="primary"
                                            className="rounded-full bg-[#f87171] justify-self-center"
                                            htmlType="submit"
                                            onClick={() => UpdateStatusWithdraw('Error')}
                                        >

                                            No confirm
                                        </Button>

                                    </div>

                                </div>

                            </div>
                        </div>





                    </Modal>
                </>

            )}
            {requestType.name === 'SignUp Seller' && (
                <>

                    <div className='container bg-[#e0f2fe] w-[450px] h-[350px] rounded-md hover:shadow-xl p-5'>
                        <div className='flex flex-col w-[100%]'>
                            <div className='flex mb-3 justify-between'>
                                <div className='flex justify-start w-[60%]'>
                                    <i className="fa-solid fa-piggy-bank text-2xl text-[#fcd34d]"></i>
                                    {/* <i className="fa-solid fa-wallet text-xl text-[#78716c]"></i> */}
                                    <i className="fa-solid text-sm ml-2 text-[#075985] mt-2"> Request {requestType.name}:</i>
                                </div>
                                <div className='flex justify-end w-[40%]'>
                                    {/* <i className='fa-solid text-[12px] text-[#facc15]'>{ }</i> */}
                                    <b className="text-[12px] text-[#a8a29e] ml-2">{checkStatus}</b>

                                </div>
                            </div>
                            <div className='flex mb-2'>
                                <p className='text-[12px] text-white bg-[#93c5fd]/40 py-1 px-2 rounded-xl'><b>ID : </b>
                                    {_id}</p>
                            </div>
                            <div className='flex flex-row'>
                                <div className='flex'>
                                    <p className='text-sm text-[#075985] py-1 px-2 rounded-xl'><b>Request By : </b>
                                        {requestBy.username}</p>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm text-[#075985] py-1 px-2 rounded-xl'><b>Email : </b>
                                        {requestBy.email}</p>
                                </div>

                            </div>
                            <div className='flex flex-row mt-2 w-[100%]'>
                                <div className='flex flex-col mt-2 w-[60%]'>
                                    {/* <p className='text-sm text-[#075985]/60 py-1 px-2 rounded-xl'><b>Payment Name : </b>
                                        {paymentname}</p>
                                    <p className='text-sm text-[#075985]/60 py-1 px-2 rounded-xl'><b>Amount : </b>
                                        {topupAmount} ฿</p>
                                    <p className='text-sm text-[#075985]/60 py-1 px-2 rounded-xl'><b>Payment Time : </b>
                                        {topupTime}</p> */}
                                    <Image
                                        className='object-cover object-center justify-center rounded-md'
                                        shape="square"
                                        height={'150px'}
                                        // src={paymentImage[0].images[0].url}
                                        src={CardImage[0].url}

                                    />

                                </div>
                                <div className='flex justify-end w-[40%] mr-3 mt-2'>
                                    <Image
                                        className='object-cover object-center justify-center rounded-md'
                                        shape="square"
                                        height={'150px'}
                                        // src={paymentImage[0].images[0].url}
                                        src={PersonImage[0].url}
                                    />

                                </div>
                            </div>
                            <div className='flex justify-end my-4'>
                                <Button
                                    type="primary"
                                    className="rounded-full bg-[#1BA8E7] justify-self-center mr-2"
                                    htmlType="submit"
                                    onClick={() => UpdateStatusSignupSeller('Success')}
                                >

                                    Confirm
                                </Button>
                                <Button
                                    type="primary"
                                    className="rounded-full bg-[#f87171] justify-self-center"
                                    htmlType="submit"
                                    onClick={() => UpdateStatusSignupSeller('Error')}
                                >

                                    No confirm
                                </Button>

                            </div>
                        </div>

                    </div>

                </>

            )}


        </>
    )
}

export default CardRequestHistoryAdmin