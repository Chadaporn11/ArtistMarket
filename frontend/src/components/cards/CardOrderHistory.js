import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

//function
import { updateOrderStatus } from '../functions/users';

//antd
import { Select, Button, Form, Input, Image, Card, Empty, Avatar } from 'antd';

const CardOrderHistory = ({ orders, setOrders, loadData, setSelectedStatus, selectedStatus }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const { _id, orderStatus, products, cartTotal, addressOrder, delivery } = orders;
    const [addressorder, setAddressorder] = useState('');
    const [statusUpdate, setStatusUpdate] = useState(selectedStatus);
    console.log('test::', orders)


    const handleUpdateStatus = (value) => {
        let data = {
            status: 'Confirm received'
        }
        setStatusUpdate(value)
        updateOrderStatus(user.token, _id, data)
            .then((res) => {
                toast.success('Update order status success!')
                loadData()
            }).catch((err) => {
                toast.error('Update order status failed!')


            });
    }


    return (
        <div className={`container bg-[#f0f9ff] w-[350px] rounded-md shadow-md hover:shadow-xl hover:-translate-y-3 
        ${orderStatus === "Waiting for confirmed" ? 'h-[500px]' : orderStatus === "Confirm received" ? 'h-[450px]' : 'h-[400px]'}
        `}>
            <div className='flex flex-col px-8 pt-5'>
                <div className='flex justify-between mb-1'>
                    <div className='mt-4'>
                        <i className="fa-solid fa-box-open text-lg text-[#fcd34d]"></i>
                        <i className="fa-solid mx-2 text-[12px] text-[#075985]">: Order </i>
                    </div>
                    <div className='flex mt-4'>
                        <p className='text-[12px] text-[#c7d2fe] bg-white/50 py-1 px-2 rounded-xl'><b>ID : </b>
                            {_id}</p>

                    </div>
                </div>
                {/* <div className='flex'>
                    <p className='text-[12px] text-[#c7d2fe] bg-white/50 py-1 px-2 rounded-xl'><b>ID : </b>
                        {_id}</p>

                </div> */}
                {/* <div className='flex flex-col mt-2 bg-[#fef08a]/50 rounded-xl p-2'>
                    <div className='flex'>
                        <p className='text-sm mr-3'>{addressOrder.sendOrder.name}</p>
                        <p className='text-sm'>{addressOrder.sendOrder.phone}</p>
                    </div>

                    <p className='text-sm'>{addressOrder.sendOrder.address}</p>
                </div> */}
                <div className='container bg-[#eef2ff] w-[100%] h-auto rounded-md p-2 mt-1'>
                    <div className='flex flex-col p-0 w-[100%]'>
                        <div className='flex flex-row '>
                            <i className="fa-solid fa-user text-md text-[#0891b2]"></i>
                            <p className='text-[13px] ml-2'>: {addressOrder.sendOrder.name}</p>

                        </div>
                        <div className='flex flex-row '>
                            <i className="fa-solid fa-square-phone text-md text-[#0891b2]"></i>
                            <p className='text-[13px] ml-2'>: {addressOrder.sendOrder.phone}</p>

                        </div>
                        <div className='flex flex-row w-[100%]'>
                            <i className="fa-solid fa-map-location-dot text-md text-[#0891b2]"></i>
                            <p className='text-[13px] ml-2 whitespace-normal'>: {addressOrder.sendOrder.address}</p>

                        </div>
                    </div>

                </div>
                <div className='flex mb-5 w-full'>
                    <div className='flex flex-col w-[100%]'>
                        {/* <p className='flex text-md text-[#57534e] w-[100%]'>Product {products.length}</p> */}
                        <hr className='my-3' />
                        {/* <b><p className='flex text-md text-[#57534e] w-[100%]'>List of Product :</p></b> */}
                        <div className='flex flex-col overflow-y-auto h-[110px]'>
                            {products.map((item, index) =>
                                <div key={index} className='flex justify-start w-[100%] '>
                                    {/* <Image width={20} src={item.product.productImages.url} /> */}
                                    <Avatar
                                        className='mr-2 mb-2'
                                        shape="square"
                                        size={45}
                                        src={item.product.productImages[0].url}
                                    />
                                    <p className='text-md text-[#57534e] mt-3'>
                                        {item.product.productName} x {item.count} = {item.price * item.count}
                                    </p>
                                </div>

                            )}
                        </div>

                        <hr className='my-3' />
                        <div className='flex flex-row justify-between'>
                            {(orderStatus === 'Waiting for confirmed' || orderStatus === 'Confirm received') && (

                                <div className='container bg-white/50 w-[180px] h-auto rounded-md p-2 mt-1'>

                                    <div className='flex flex-col p-0 w-[100%]'>
                                        <div className='flex flex-row'>
                                            <i className="text-sm text-[#0891b2]">Delivery Name</i>
                                            <p className='text-[13px] ml-2'>: {delivery.deliveryName}</p>

                                        </div>
                                        <div className='flex flex-row '>
                                            <i className="text-sm text-[#0891b2]">Tax ID</i>
                                            <p className='text-[13px] ml-2'>: {delivery.parcelNumber}</p>

                                        </div>
                                        <div className='flex flex-row w-[100%]'>
                                            {/* <i className="text-sm text-[#0891b2]">Date Time</i> */}
                                            <p className='text-[13px]'>( {delivery.deliveryTime} )</p>

                                        </div>
                                    </div>
                                </div>
                            )}

                            <p className='flex justify-end font-semibold text-md mt-2'>Total : <b className='text-[#ef4444]'>{cartTotal}</b> ฿</p>
                        </div>
                        {orderStatus === 'Waiting for confirmed' && (
                            <Button
                                type="primary"
                                className="mt-5 rounded-full bg-[#34d399] ml-2 hover:-translate-y-1"
                                onClick={handleUpdateStatus}
                                htmlType="submit"
                            >
                                Confirmed Order
                            </Button>
                        )}
                    </div>


                    {/* <p className='text-md text-[#57534e] w-full ml-2'><i className="fa-solid fa-map-location-dot" /> Address :</p> */}

                </div>
            </div>


        </div >
    )
}

export default CardOrderHistory