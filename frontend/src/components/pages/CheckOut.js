import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

//function
import {
    getUserCart,
    saveAddressOrder,
    deleteAddressOrder,
    getAddressOrder,
    saveOrder,
    emptyCart,
} from '../functions/users';

//antd
import { Input, Button, Select, Card, Empty } from 'antd';
const { TextArea } = Input;
const { Option } = Select;


const initialstate = [{
    id: '',
    sendOrder: '',
    orderBy: '',
},];

const CheckOut = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cartId, setCartId] = useState('')
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [sendOrder, setSendOrder] = useState();
    const [select, setSelect] = useState(initialstate);
    const [choose, setChoose] = useState();

    const [statusSaveAddress, setStatusSaveAddress] = useState(false);
    const [statusCheckout, setStatusCheckout] = useState(false);

    const handleSelectChange = (value) => {
        console.log('value', value)
        setStatusCheckout(false)
        for (var i = 0; i <= select.length; i++) {
            console.log('check', value, select[i]._id)

            if (select[i]._id === value) {
                setName(select[i].sendOrder.name)
                setAddress(select[i].sendOrder.address)
                setPhone(select[i].sendOrder.phone)
                setChoose(select[i])
                setStatusCheckout(true)
            } else if (value === null) {
                setName()
                setAddress()
                setPhone()
                setChoose()
                setStatusCheckout(false)
            }
        }
    }
    console.log("Setting choose", choose)
    const handleNameChange = (e) => {
        setName(e.target.value);
        console.log(name.length)
        if ((name !== undefined && name.length > 1) && (phone !== undefined && phone.length > 1) && (address !== undefined && address.length > 1)) {
            setStatusSaveAddress(true)
        } else {
            setStatusSaveAddress(false)

        }
    }
    const handlePhoneChange = (e) => {
        setPhone(e.target.value);

        if ((name !== undefined && name.length > 1) && (phone !== undefined && phone.length > 1) && (address !== undefined && address.length > 1)) {
            setStatusSaveAddress(true)
        } else {
            setStatusSaveAddress(false)

        }
    }
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
        if ((name !== undefined && name.length > 1) && (phone !== undefined && phone.length > 1) && (address !== undefined && address.length > 1)) {
            setStatusSaveAddress(true)
        } else {
            setStatusSaveAddress(false)

        }

    }
    const RemoveAddress = (id) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            console.log('remove', id);
            deleteAddressOrder(user.token, id)
                .then((res) => {
                    console.log(res.data);
                    // toast.success('Remove Address Success!');
                    window.location.reload();

                }).catch((err) => {
                    toast.error('Remove Address Failed!');
                });

        }


    }
    const handleSaveAddress = () => {

        let data = {
            name: name,
            phone: phone,
            address: address
        }
        console.log('save', data);
        saveAddressOrder(user.token, data)
            .then((res) => {
                console.log(res.data);
                setStatusCheckout(true)
                toast.success('Save Address Order Success!')
                setSendOrder(res.data)
                loadData()

            }).catch((err) => {
                toast.error('Save Address Order Error!')
                console.log(err.response.data);
            });

    }

    const handleCheckOut = () => {
        console.log('Check Out=>', sendOrder)
        console.log('Check Out02=>', choose)
        if (total < user.walletUser.pocketmoney && choose !== undefined) {
            let data = {
                id: cartId,
                sendOrder: choose,
            };
            saveOrder(user.token, data)
                .then((res) => {
                    emptyCart(user.token)
                        .then((res) => {
                            console.log(res.data);

                        }).catch((err) => {
                            console.log(err.response.data);
                            toast.error('Save Order Error!');
                        });
                    console.log(res.data);
                    toast.success('Create Order Success!')
                    dispatch({
                        type: 'ADD_TO_CART',
                        payload: [],
                    })
                    //loacalStorage
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem('cart');
                    }
                    navigate('/user/history-order')

                }).catch((err) => {
                    toast.error('Create Order Error!')
                    console.log(err.response.data);
                });


        } else if (choose === undefined) {
            toast.error('Please Delivery Address')
        } else if (total > user.walletUser.pocketmoney) {
            window.alert('You do not have enough balance. Go to top up page!')
            navigate('/')

        }
    }

    const loadData = () => {
        getUserCart(user.token)
            .then((res) => {
                console.log(res.data);
                setCartId(res.data._id)
                setProducts(res.data.products);
                setTotal(res.data.cartTotal);
            }).catch((err) => {
                console.log(err.response.data);
            });
        getAddressOrder(user.token)
            .then((res) => {
                // console.log('address', res.data);
                setSelect(res.data)
            }).catch((err) => {
                console.log(err.response.data);
            });

    }
    console.log('product', products);


    useEffect(() => {
        loadData()

    }, []);


    return (
        // <div className='container-fluid'>
        //     <div className='row'>
        //         <div className='col-md-6'>
        //             <h4>Address</h4>
        //             <br />
        //             text area
        //         </div>
        // <div className='col-md-6'>
        //     <h4>Order Summary</h4>
        //     <hr />
        //     <p>Product {products.length}</p>
        //     <hr />
        //     <p>List of Product</p>
        //     {products.map((item, index) =>
        //         <div key={index}>
        //             <p>
        //                 {item.productName.title} x {item.count} = {item.price * item.count}
        //             </p>
        //         </div>

        //     )}
        //     <hr />
        //     Total : <b>{total}</b>
        // </div>
        //     </div>
        // </div>
        <div className="container max-w-[100%] min-h-screen bg-[#f9fafb] mb-10">
            <div className="flex flex-col justify-items-center content-center max-w-[100%] min-h-[680px]">
                <div className='flex flex-row place-self-center mt-10'>
                    <div className='flex flex-col'>
                        <div className='container bg-[#e0f2fe] w-[700px] h-[120px] rounded-md shadow-md ml-5 mr-10 p-8 mb-5'>
                            <div className='flex flex-col w-full'>
                                <div className='flex mb-3 w-full'>
                                    <div className='flex justify-star'>
                                        <i className="fa-solid fa-wallet text-xl text-[#78716c]"></i>
                                        <i className="fa-solid text-md ml-2 text-[#075985]"> Wallet:</i>
                                    </div>
                                    <div className='flex justify-end w-full'>
                                        <i className='fa-solid text-xl text-[#facc15]'>{user.walletUser.pocketmoney}</i>
                                        <i className="fa-solid text-xl text-[#78716c] ml-2"> ฿</i>

                                    </div>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm text-[#c7d2fe] bg-white/50 py-1 px-2 rounded-xl'><b>ID : </b>
                                        {user.walletUser._id}</p>

                                </div>


                            </div>
                        </div>
                        <div className='container bg-white w-[700px] h-[500px] rounded-md shadow-md ml-5 mr-10'>
                            <div className='flex flex-col m-10'>
                                <div className='flex mb-10 justify-center'>
                                    <i className="fa-solid fa-map-location-dot text-xl text-[#f87171]"></i>
                                    <i className="fa-solid text-lg text-[#075985] mx-2"> Create Address</i>

                                </div>
                                {/* <div className='flex mb-2 mr-2 justify-end'>
                                <Select
                                    name="nameaddress"
                                    id="nameaddress"
                                    className={`w-[30%] !text-md px-2 !rounded-[10px] justify-self-center`}
                                    onChange={handleSelectChange}
                                    placeholder="Select Address..."
                                >
                                    <Option>Select Address...</Option>
                                    {
                                        select.length > 0 &&
                                        select.map((item) =>
                                            <Option
                                                key={item._id}
                                                value={item._id}
                                                className="truncate"
                                            >{item.sendOrder.address}</Option>
                                        )}
                                </Select>

                            </div> */}
                                <div className='flex justify-start mb-1'>
                                    <p className='text-md text-[#57534e] w-full ml-2'><i className="fa-solid fa-user" /> Name :</p>
                                    <p className='text-md text-[#57534e] w-full ml-2'><i className="fa-solid fa-phone" /> Phone :</p>

                                </div>
                                <div className='flex justify-center'>
                                    <Input
                                        name="name"
                                        // value={name}
                                        className={`w-full !text-md px-2 mx-2 !rounded-[10px] justify-self-center`}
                                        onChange={handleNameChange}
                                        placeholder="Please input your name!"
                                    />
                                    <Input
                                        name="phone"
                                        // value={phone}
                                        className={`w-full !text-md px-2 mx-2 !rounded-[10px] justify-self-center`}
                                        onChange={handlePhoneChange}
                                        placeholder="Please input your phone!"
                                    />

                                </div>
                                <div className='flex justify-start mb-1 mt-3'>

                                    <p className='text-md text-[#57534e] w-full ml-2'><i className="fa-solid fa-map-location-dot" /> Address :</p>

                                </div>
                                <div className='flex justify-center'>
                                    <TextArea
                                        name='address'
                                        // value={address}
                                        onChange={handleAddressChange}
                                        rows={8}
                                        placeholder="Please input your address!"
                                        className={`w-full !text-md px-2 mx-2 !rounded-[10px] justify-self-center `}
                                    />
                                </div>
                                <div className='flex justify-end mt-8'>
                                    <Button
                                        type="primary"
                                        className="rounded-full bg-[#0ea5e9] ml-2 hover:-translate-y-2"
                                        onClick={handleSaveAddress}
                                        disabled={!statusSaveAddress}
                                        htmlType="submit"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </div >

                    </div>

                    {/* <div className='container bg-white w-[700px] h-[600px] rounded-md shadow-md ml-5 mr-10'>
                        <div className='flex flex-col m-10'>
                            <div className='flex mb-10 justify-center'>
                                <i className="fa-solid fa-location-dot text-lg text-[#f87171]"></i>
                                <i className="fa-solid text-lg text-[#075985] mx-2"> Delivery Address</i>

                            </div>
                            <div className='flex mb-2 mr-2 justify-end'>
                                <Select
                                    name="nameaddress"
                                    id="nameaddress"
                                    className={`w-[30%] !text-md px-2 !rounded-[10px] justify-self-center`}
                                    onChange={handleSelectChange}
                                    placeholder="Select Address..."
                                >
                                    <Option>Select Address...</Option>
                                    {
                                        select.length > 0 &&
                                        select.map((item) =>
                                            <Option
                                                key={item._id}
                                                value={item._id}
                                                className="truncate"
                                            >{item.sendOrder.address}</Option>
                                        )}
                                </Select>

                            </div>
                            <div className='flex justify-start mb-1'>
                                <p className='text-md text-[#57534e] w-full ml-2'><i className="fa-solid fa-user" /> Name :</p>
                                <p className='text-md text-[#57534e] w-full ml-2'><i className="fa-solid fa-phone" /> Phone :</p>

                            </div>
                            <div className='flex justify-center'>
                                <Input
                                    name="name"
                                    value={name}
                                    className={`w-full !text-md px-2 mx-2 !rounded-[10px] justify-self-center`}
                                    onChange={handleNameChange}
                                    placeholder="Please input your name!"
                                />
                                <Input
                                    name="phone"
                                    value={phone}
                                    className={`w-full !text-md px-2 mx-2 !rounded-[10px] justify-self-center`}
                                    onChange={handlePhoneChange}
                                    placeholder="Please input your phone!"
                                />

                            </div>
                            <div className='flex justify-start mb-1 mt-3'>

                                <p className='text-md text-[#57534e] w-full ml-2'><i className="fa-solid fa-map-location-dot" /> Address :</p>

                            </div>
                            <div className='flex justify-center'>
                                <TextArea
                                    name='address'
                                    value={address}
                                    onChange={handleAddressChange}
                                    rows={8}
                                    placeholder="Please input your address!"
                                    className={`w-full !text-md px-2 mx-2 !rounded-[10px] justify-self-center `}
                                />
                            </div>
                            <div className='flex justify-end mt-8'>
                                <Button
                                    type="primary"
                                    className="rounded-full bg-[#0ea5e9] ml-2 hover:-translate-y-2"
                                    onClick={handleSaveAddress}
                                    disabled={!statusSaveAddress}
                                    htmlType="submit"
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div > */}

                    <div className='flex flex-col'>
                        {/* <div className='container bg-[#e0f2fe] w-[450px] h-[120px] rounded-md shadow-md mr-5 mb-5 p-8'>
                            <div className='flex flex-col w-full'>
                                <div className='flex mb-3 w-full'>
                                    <div className='flex justify-star'>
                                        <i className="fa-solid fa-wallet text-xl text-[#78716c]"></i>
                                        <i className="fa-solid text-md ml-2 text-[#075985]"> Wallet:</i>
                                    </div>
                                    <div className='flex justify-end w-full'>
                                        <i className='fa-solid text-xl text-[#facc15]'>{user.walletUser.pocketmoney}</i>
                                        <i className="fa-solid text-xl text-[#78716c] ml-2"> ฿</i>

                                    </div>
                                </div>
                                <div className='flex'>
                                    <p className='text-sm text-[#c7d2fe] bg-white/50 py-1 px-2 rounded-xl'><b>ID : </b>
                                        {user.walletUser._id}</p>

                                </div>


                            </div>
                        </div> */}
                        <div className='container bg-white w-[450px] h-[300px] rounded-md shadow-md mr-5 mb-5 p-8'>
                            <div className='flex mb-5 justify-center'>
                                <i className="fa-solid fa-location-dot text-lg text-[#f87171]"></i>
                                <i className="fa-solid text-lg text-[#075985] mx-2"> Derivery Address</i>
                                <i className="fa-solid fa-truck-fast text-lg text-[#fbbf24]"></i>


                            </div>
                            <Select
                                name="nameaddress"
                                id="nameaddress"
                                size="large"
                                className={`w-[100%] !text-md !rounded-[10px] justify-self-center`}
                                onChange={handleSelectChange}
                                placeholder={<div>Select Address...</div>}
                            >
                                <Option className="truncate w-[100%] h-[110px]">Select Address...</Option>
                                {
                                    select.length > 0 &&
                                    select.map((item) =>
                                        <Option
                                            key={item._id}
                                            value={item._id}
                                            className="w-[100%] h-auto"
                                        >
                                            {/* {item.sendOrder.address} */}
                                            <div className='relative bg-white w-[100%] h-[100%] rounded-md mb-3 mt-1'>
                                                <div className='absolute top-10 right-2 rounded-xl bg-[#ef4444] opacity-90 shadow-md w-[30px] h-[30px]'>
                                                    <i
                                                        className='fa-solid fa-trash-can text-sm text-white ml-2 mt-2'
                                                        onClick={() => RemoveAddress(item._id)}></i>
                                                </div>
                                                <div className='flex flex-col px-3 w-[85%]'>
                                                    <div className='flex flex-row'>
                                                        {/* <i className="fa-solid fa-user text-lg text-[#0891b2]"></i> */}
                                                        <p className='text-md mx-2 mb-2'>{item.sendOrder.name}</p>

                                                    </div>
                                                    <div className='flex flex-row '>
                                                        <i className="fa-solid fa-square-phone text-lg text-[#0891b2]"></i>
                                                        <p className='text-md mx-2'>Phone : {item.sendOrder.phone}</p>

                                                    </div>
                                                    <div className='flex flex-row w-[100%]'>
                                                        <i className="fa-solid fa-map-location-dot text-lg text-[#0891b2]"></i>
                                                        <div className='text-md mx-2 whitespace-normal'>Address : {item.sendOrder.address}</div>

                                                    </div>


                                                </div>
                                            </div>
                                        </Option>
                                    )}
                            </Select>
                            {(choose === undefined || choose === null) && (<Empty className='w-[100%] h-[60%] rounded-md mt-3' />)}
                            {choose !== undefined && (
                                <Card className='relative container bg-[#eef2ff] w-[100%] h-auto rounded-md mt-5'>
                                    {/* <div className='absolute top-2 right-2 rounded-xl bg-[#ef4444] opacity-90 shadow-md w-[30px] h-[30px]'>
                                        <i className='fa-solid fa-trash-can text-sm text-white ml-2 mt-2'></i>
                                    </div> */}
                                    <div className='flex flex-col p-0 w-[100%]'>
                                        {/* <div className='absolute top-0 right-0 rounded-l-md bg-[#fbbf24] opacity-90 shadow-md w-[100px] h-[28px]'>
                                            <p className='font-semibold text-md text-white ml-2'>Price:฿</p>
                                        </div> */}
                                        <div className='flex flex-row '>
                                            <i className="fa-solid fa-user text-lg text-[#0891b2]"></i>
                                            <p className='text-md ml-2'>: {choose.sendOrder.name}</p>

                                        </div>
                                        <div className='flex flex-row '>
                                            <i className="fa-solid fa-square-phone text-lg text-[#0891b2]"></i>
                                            <p className='text-md ml-2'>: {choose.sendOrder.phone}</p>

                                        </div>
                                        <div className='flex flex-row w-[100%]'>
                                            <i className="fa-solid fa-map-location-dot text-lg text-[#0891b2]"></i>
                                            <p className='text-md ml-2 whitespace-normal'>: {choose.sendOrder.address}</p>

                                        </div>
                                    </div>

                                </Card>
                            )}

                        </div>
                        <div className='container bg-white w-[450px] h-fit rounded-md shadow-md mr-5'>
                            <div className='flex flex-col m-10'>
                                <div className='flex justify-start'>
                                    <i className="fa-solid fa-box-open text-xl text-[#fcd34d]"></i>
                                    <i className="fa-solid mx-2 text-md text-[#075985]">: Order Summary</i>

                                </div>
                                <div className='flex mb-5 w-full'>
                                    <div className='flex flex-col w-[100%]'>
                                        {/* <p className='flex text-md text-[#57534e] w-[100%]'>Product {products.length}</p> */}
                                        <hr className='my-3' />
                                        {/* <b><p className='flex text-md text-[#57534e] w-[100%]'>List of Product :</p></b> */}
                                        {products.map((item, index) =>
                                            <div key={index} className='flex justify-start w-[100%]'>
                                                <p className='text-md text-[#57534e]'>
                                                    {item.product.productName} x {item.count} = {item.price * item.count}
                                                </p>
                                            </div>

                                        )}
                                        <hr className='my-3' />
                                        <i className='fa-solid text-sm mt-2'>Total : <b className='text-[#ef4444]'>{total}</b> ฿</i>

                                    </div>
                                    {/* <p className='text-md text-[#57534e] w-full ml-2'><i className="fa-solid fa-map-location-dot" /> Address :</p> */}

                                </div>
                                <div className='flex justify-end'>
                                    <Button
                                        type="primary"
                                        className="rounded-full bg-[#34d399] ml-2 hover:-translate-y-1"
                                        onClick={handleCheckOut}
                                        disabled={!statusCheckout}
                                        htmlType="submit"
                                    >
                                        Check Out
                                    </Button>

                                </div>
                            </div>


                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default CheckOut