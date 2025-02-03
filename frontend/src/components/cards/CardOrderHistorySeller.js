import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

//function
import { updateOrderStatus, updateDeliveryStatus } from '../functions/users';

//antd
import { DatePicker, Button, Form, Input, Image, Card, Empty, Avatar, Badge, Modal } from 'antd';

const CardOrderHistoryseller = ({ orders, setOrders, loadData, setSelectedStatus, selectedStatus }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const { _id, orderStatus, products, cartTotal, addressOrder, delivery } = orders;
    const [form] = Form.useForm();
    const [addressorder, setAddressorder] = useState('');
    const [statusUpdate, setStatusUpdate] = useState(selectedStatus);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
        if (delivery !== undefined || delivery !== null) {
            form.setFieldsValue({
                deliveryName: delivery.deliveryName,
                parcelNumber: delivery.parcelNumber,
                // deliveryTime: delivery.deliveryTime,
            });
        }
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const handleUpdateStatus = (value) => {
        let data = {
            status: value
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

    const handleDeliveryUpdateStatus = (values) => {


        let data = {
            status: 'Waiting for confirmed',
            deliveryName: values.deliveryName,
            parcelNumber: values.parcelNumber,
            deliveryTime: values.deliveryTime.format('YYYY-MM-DD HH:mm:ss')

        }
        // setStatusUpdate(value)
        // console.log('Taxid::', data)
        updateDeliveryStatus(user.token, _id, data)
            .then((res) => {
                toast.success('Update order status success!')
                loadData()
            }).catch((err) => {
                toast.error('Update order status failed!')


            });


    }

    const handlePackUpdateStatus = () => {


        let data = {
            status: 'Waiting for delivery'
        }
        // setStatusUpdate(value)
        updateOrderStatus(user.token, _id, data)
            .then((res) => {
                toast.success('Update order status success!')
                loadData()
            }).catch((err) => {
                toast.error('Update order status failed!')


            });


    }

    const disabledDate = (current) => {
        const day = new Date();
        day.setDate(day.getDate());

        return current && current > day;
    };




    return (
        <div className={`container bg-[#f0f9ff] w-[350px] rounded-md shadow-md hover:shadow-xl hover:-translate-y-3 
        ${orderStatus === "Waiting for confirmed" || orderStatus === "Waiting for delivery" ? 'h-[500px]' : 'h-[500px]'}
        `}>
            {/* <div className='flex flex-col w-[280] h-[400px]'>


            </div> */}
            <div className='flex flex-row justify-center w-[100%] pt-8'>

                <Badge
                    type="primary"
                    className={`flex rounded-full justify-center h-[45px] w-[45px] text-center mr-2 ${orderStatus === "Waiting for the pack" ? 'bg-[#0ea5e9]' : 'bg-[#e0e7ff]'}`}
                    // onClick={() => handleUpdateStatus('Waiting for the pack')}
                    htmlType="submit"
                >
                    <i className="fa-solid fa-box text-[15px] text-white text-center self-center"></i>
                </Badge>
                <div className='border-[1px] border-[#d1d5db] w-[25px] h-0 place-self-center mr-2'></div>
                <Badge
                    type="primary"
                    className={`flex rounded-full justify-center h-[45px] w-[45px] text-center mr-2 ${orderStatus === "Waiting for delivery" ? 'bg-[#0ea5e9]' : 'bg-[#e0e7ff]'}`}
                    // onClick={() => handleUpdateStatus('Waiting for delivery')}
                    htmlType="submit"
                >
                    <i className="fa-solid fa-truck-fast text-[15px] text-white text-center self-center"></i>
                </Badge>
                <div className='border-[1px] border-[#d1d5db] w-[25px] h-0 place-self-center mr-2'></div>
                <Badge
                    type="primary"
                    className={`flex rounded-full justify-center h-[45px] w-[45px] text-center mr-2 ${orderStatus === "Waiting for confirmed" ? 'bg-[#0ea5e9]' : 'bg-[#e0e7ff]'}`}
                    // onClick={() => handleUpdateStatus('Waiting for confirmed')}
                    htmlType="submit"
                >
                    <i className="fa-solid fa-list text-[15px] text-white text-center self-center"></i>
                </Badge>
                <div className='border-[1px] border-[#d1d5db] w-[25px] h-0 place-self-center mr-2'></div>
                <Badge
                    type="primary"
                    className={`flex rounded-full justify-center h-[45px] w-[45px] text-center mr-2 ${orderStatus === "Confirm received" ? 'bg-[#0ea5e9]' : 'bg-[#e0e7ff]'}`}
                    // onClick={() => handleUpdateStatus('Waiting for confirmed')}
                    htmlType="submit"
                >
                    <i className="fa-solid fa-circle-check text-[15px] text-white text-center self-center"></i>
                </Badge>


            </div>

            <div className='flex flex-col px-8'>
                {/* <div className='flex justify-between mb-2'>
                    <div className='mt-4'>
                        <i className="fa-solid fa-box-open text-lg text-[#fcd34d]"></i>
                        <i className="fa-solid mx-2 text-sm text-[#075985]">: Order </i>
                    </div>
                </div>
                <div className='flex'>
                    <p className='text-sm text-[#c7d2fe] bg-white/50 py-1 px-2 rounded-xl'><b>ID : </b>
                        {_id}</p>

                </div> */}
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

                                    {(orderStatus === 'Waiting for confirmed') && (

                                        <Badge className='relative flex justify-center w-auto h-auto'
                                            onClick={showModal}>
                                            <div className='flex justify-center absolute bottom-12 -right-4 p-1 rounded-lg bg-[#fbbf24] opacity-90 shadow-md w-[25px] h-[25px]'>
                                                {/* <p className='font-semibold text-md text-white ml-2'></p> */}
                                                <i className="fa-solid fa-pen-to-square text-white text-md"></i>
                                            </div>
                                        </Badge>
                                    )}



                                </div>
                            )}

                            {(orderStatus === 'Waiting for the pack' || orderStatus === 'Waiting for delivery') && (<div></div>)}
                            <p className='flex justify-end font-semibold text-md mt-2'>Total : <b className='text-[#ef4444]'>{cartTotal}</b> ฿</p>

                        </div>
                        {orderStatus === 'Waiting for the pack' && (
                            <Button
                                type="primary"
                                className="mt-5 rounded-full bg-[#34d399] ml-2 hover:-translate-y-1"
                                onClick={handlePackUpdateStatus}
                                htmlType="submit"
                            >
                                Pack Order Sucess
                            </Button>
                        )}
                        {orderStatus === 'Waiting for delivery' && (
                            <Button
                                type="primary"
                                className="mt-5 rounded-full bg-[#34d399] ml-2 hover:-translate-y-1"
                                onClick={showModal}
                                htmlType="submit"
                            >
                                Delivery confirmation
                            </Button>
                        )}
                        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>
                            <div className='flex mt-3 mb-8 justify-center w-[100%]'>
                                <i className="fa-solid fa-boxes-packing text-2xl mr-2 text-[#0891b2]"> </i>
                                <i className='fa-solid text-xl mr-2'> Delivery</i>
                                <i className='fa-solid text-xl'>confirmation</i>
                            </div>

                            <div className='flex flex-col my-5 mx-5'>
                                <Form
                                    layout="vertical"
                                    form={form}
                                    onFinish={handleDeliveryUpdateStatus}


                                >
                                    <Form.Item
                                        label="Delivery Name"
                                        name={"deliveryName"}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your Delivery Name!',
                                            },
                                        ]}
                                    >
                                        < Input
                                            placeholder="deliveryName"
                                            size='middle'
                                            className={`w-full !text-md px-2 !rounded-[10px] justify-self-center`}
                                        />

                                    </Form.Item>
                                    <Form.Item
                                        label="Parcel Number"
                                        name={"parcelNumber"}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your Parcel Number!',
                                            },
                                        ]}
                                    >
                                        < Input
                                            placeholder="parcelNumber"
                                            size='middle'
                                            className={`w-full !text-md px-2 !rounded-[10px] justify-self-center`}
                                        />

                                    </Form.Item>
                                    <Form.Item
                                        label="Delivery Time"
                                        name={"deliveryTime"}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your Delivery Time!',
                                            },
                                        ]}
                                    >
                                        {/* < Input
                                            placeholder="deliveryTime"
                                            className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                                        /> */}
                                        <DatePicker
                                            size={18}
                                            disabledDate={disabledDate}
                                            showTime={{
                                                defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
                                            }} />



                                    </Form.Item>
                                    <Form.Item
                                    >
                                        <Button
                                            type="primary"
                                            className="rounded-full bg-[#1BA8E7] justify-self-center"
                                            htmlType="submit"
                                        >

                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                                {/* <p className='text-md mb-2'>Delivery Name :</p>
                                <Input
                                    // onChange={(value) => handleChangeWithdraw(value)}
                                    className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                                />
                                <p className='text-md mb-2 mt-2'>TAX ID :</p>
                                <Input
                                    // onChange={(value) => handleChangeWithdraw(value)}
                                    className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                                />
                                <p className='text-md mb-2 mt-2'>Time Delivery :</p>
                                <Input
                                    // onChange={(value) => handleChangeWithdraw(value)}
                                    className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                                /> */}

                            </div>
                        </Modal>

                    </div>


                    {/* <p className='text-md text-[#57534e] w-full ml-2'><i className="fa-solid fa-map-location-dot" /> Address :</p> */}

                </div>
            </div>


        </div >
    )
}

export default CardOrderHistoryseller