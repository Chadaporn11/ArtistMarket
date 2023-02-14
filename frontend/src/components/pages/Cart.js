import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// import ProductTableCart from '../cards/ProductTableCart';

//antd
import { List, Button, Badge, Image, InputNumber } from 'antd';
import VirtualList from 'rc-virtual-list';

//functions
import { userCart } from '../functions/users';


const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, cart } = useSelector((state) => ({ ...state }));

    const getTotal = () => {
        return cart.reduce((currenValue, nextValue) => {
            return currenValue + nextValue.count * nextValue.price
        }, 0);
    }

    const handleSaveOrder = () => {
        alert('CheckOut Order');
        userCart(user.token, cart)
            .then((res) => {
                console.log(res.data);
                navigate('/checkout');

            }).catch((err) => {
                console.log(err.response.data);
            });
    }

    // const showCartItem = () => {
    //     return (
    //         // <table className='table table-bordered'>
    //         //     <thead className='thead-light'>
    //         //         <tr>
    //         //             <td>Image</td>
    //         //             <td>Product Name</td>
    //         //             <td>Price</td>
    //         //             <td>Count</td>
    //         //             <td>Remove</td>
    //         //         </tr>
    //         //     </thead>
    //         // {cart.map((item) =>
    //         //     <ProductTableCart key={item._id} item={item} />
    //         // )}


    //         // </table>
    //         <table className="table-auto w-[100%] content-center">
    //             <thead>
    //                 <tr>
    //                     <th className="text-lg text-center mx-2">Images</th>
    //                     <th className="text-lg text-center mx-2">ProductName</th>
    //                     <th className="text-lg text-center mx-2">Price</th>
    //                     <th className="text-lg text-center mx-2">Count</th>
    //                     <th className="text-lg text-center mx-2">Remove</th>
    //                 </tr>
    //             </thead>
    //             {cart.map((item) =>
    //                 <ProductTableCart key={item._id} item={item} />
    //             )}
    //             <tbody>
    //                 <tr>
    //                     <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
    //                     <td>Malcolm Lockyer</td>
    //                     <td>1961</td>
    //                 </tr>
    //                 <tr>
    //                     <td>Witchy Woman</td>
    //                     <td>The Eagles</td>
    //                     <td>1972</td>
    //                 </tr>
    //                 <tr>
    //                     <td>Shining Star</td>
    //                     <td>Earth, Wind, and Fire</td>
    //                     <td>1975</td>
    //                 </tr>
    //             </tbody>
    //         </table>
    //     )
    // }
    const ContainerHeight = 450;
    const onScroll = (e) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
        }
    }
    // const onChange = (value) => {
    //     console('item', value);
    // let cart = [];
    // if (localStorage.getItem('cart')) {
    //     cart = JSON.parse(localStorage.getItem('cart'));
    // }
    // cart.map((product, i) => {
    //     if (product._id === cart._id) {
    //         cart[i].count = value;
    //     }
    // })
    // localStorage.setItem('cart', JSON.stringify(cart));
    // dispatch({
    //     type: 'ADD_TO_CART',
    //     payload: cart
    // })

    // }
    const onChange = (item, value) => {
        console.log('changed', value);
        const count = value < 1 ? 1 : value;
        if (count > item.quantity) {
            toast.error('Max avialable Quantity' + item.quantity);
        }
        let cart = [];
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.map((product, i) => {
            if (product._id === item._id) {
                cart[i].count = count;
            }
        })
        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch({
            type: 'ADD_TO_CART',
            payload: cart
        })
    };
    const handleRemove = (Id) => {
        let cart = [];
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.map((product, i) => {
            if (product._id === Id) {
                cart.splice(i, 1);
            }
        })
        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch({
            type: 'ADD_TO_CART',
            payload: cart
        })

    }

    return (
        <div className="container max-w-[100%] min-h-screen bg-[#f9fafb]">
            <div className="grid grid-rows-6 grid-flow-col gap-2 justify-items-center content-center w-[100%]">
                {/* <div className='row-span-1 place-self-center'>
                    <h1 className='text-3xl'>Cart</h1>
                </div> */}
                <div className="row-span-6 justify-center mt-10">
                    <div className='grid grid-cols-6 grap-2 justify-items-center w-[1300px]'>
                        <div className="container col-span-6 bg-white w-[100%] rounded-lg shadow-md p-10 mb-10">
                            {/* {loading
                                ? <h1 className="text-xl text-center mb-2">Loading...<Spin /></h1>
                                : <h1 className="text-xl text-center mb-2">Create Payment</h1>
                            } */}
                            <div className='grid grid-cols-12 grap-2 justify-items-start content-center w-[100%] mb-5 ml-5'>
                                <div className="col-span-8">
                                    <Badge
                                        className='w-[100%] h-[100%] text-white opacity-80 text-lg text-center align-middle bg-[#0369a1] p-3 rounded-xl'
                                    >
                                        <i className="fa-solid fa-basket-shopping"> Cart / {cart.length} product</i>
                                    </Badge>


                                </div>
                                <div className="col-span-4 justify-self-end mr-20">
                                    <Badge
                                        className='w-[100%] h-[100%] text-lg text-center align-middle'
                                    >
                                        <i className="fa-solid">
                                            <p className='text-lg text-[#52525b]'>Total:
                                                <b className='text-amber-400'> {getTotal()} </b>฿
                                            </p>
                                        </i>

                                    </Badge>
                                    {/* <p className='text-xl'>Total:
                                        <b className='text-amber-400'> {getTotal()} </b>฿
                                    </p> */}
                                </div>
                                {/* <div className="col-span-4">
                                    <p className='text-xl text-center'>Image</p>
                                </div>
                                <div className="col-span-2">Product Name</div>
                                <div className="col-span-2">Price</div>
                                <div className="col-span-2">
                                    Count
                                </div>
                                <div className="col-span-2">Action</div> */}
                            </div>
                            <List>
                                <VirtualList
                                    data={cart}
                                    height={ContainerHeight}
                                    itemHeight={47}
                                    itemKey="email"
                                    onScroll={onScroll}
                                >
                                    {(item) => (
                                        <List.Item key={item._id}>

                                            <div className='grid grid-cols-12 grap-2 justify-items-center content-center w-[100%]'>
                                                <div className="col-span-4 place-self-center">
                                                    <Image
                                                        preview={false}
                                                        src={item.productImages[0].url}
                                                        width="150px"
                                                        className='object-cover rounded-md'
                                                    />
                                                    {/* {item.productImages[0].url} */}
                                                </div>
                                                <div className="col-span-2 place-self-center">
                                                    <p className='font-semibold text-lg'>{item.productName}</p>
                                                </div>
                                                <div className="col-span-2 place-self-center">
                                                    <p className='text-lg'>{item.price}  x</p>

                                                </div>
                                                <div className="col-span-2 place-self-center">
                                                    <InputNumber
                                                        min={1} max={item.quantity}
                                                        // value={item.quantity}
                                                        defaultValue={1}
                                                        onChange={(value) => onChange(item, value)} />

                                                </div>
                                                <div className="col-span-2 place-self-center">
                                                    <Button
                                                        type="primary"
                                                        className="rounded-full bg-[#dc2626] ml-2"
                                                        onClick={() => handleRemove(item._id)}
                                                        htmlType="submit"
                                                    >
                                                        <i className="fa-solid fa-trash"></i>
                                                    </Button>
                                                </div>
                                            </div>

                                        </List.Item>
                                    )}
                                </VirtualList>
                            </List>
                            {/* <div className='flex justify-start mt-5'>
                                <p className='text-xl'>Total:
                                    <b className='text-red-600'> {getTotal()} </b>฿
                                </p>
                            </div> */}
                            <div className='flex justify-end'>
                                {user && user.role === 'user'
                                    ?
                                    <Button
                                        type="primary"
                                        className="rounded-full bg-[#dc2626] ml-2 hover:-translate-y-2"
                                        onClick={handleSaveOrder}
                                        disabled={!cart.length}
                                        htmlType="submit"
                                    >
                                        Check Out
                                    </Button>
                                    : <Link
                                        to="/login"
                                        state="cart">
                                        <Badge
                                            className='w-[100%] h-[100%] text-white opacity-80 text-md text-center align-middle bg-[#fbbf24] p-3 rounded-full hover:-translate-y-2 hover:bg-[#06b6d4]'
                                        >
                                            Login to Check Out
                                        </Badge>
                                    </Link>
                                }
                            </div>
                        </div>
                    </div >
                </div >

            </div >
        </div >
        // <div className='container max-w-[100%] max-h-[100%] bg-[#f9fafb]'>
        //     <div className='grid grid-rows-6 grid-flow-col gap-2 justify-items-center content-center w-[100%]'>
        //         <div className='row-span-1 place-self-center'>
        //             <h4 className="text-3xl text-center mb-2">Cart / {cart.length} product</h4>
        //         </div>

        //         <div className='row-span-4 justify-center'>
        //             <div className='grid grid-cols-6 grap-2 justify-items-center w-[1300px]'>
        //                 <div className="container col-span-6 bg-white w-[100%] rounded-lg shadow-md p-10">
        //                     {!cart
        //                         ? <p className="text-3xl text-center mb-2">No Product in Cart</p>
        //                         : showCartItem()
        //                     }
        //                     <h4>Summary</h4>
        //                     {
        //                         cart.map((item, index) =>
        //                             <p key={index}>
        //                                 {item.title} x {item.count} = {item.price * item.count}
        //                             </p>
        //                         )
        //                     }

        //                     <h4>Total:
        //                         <b> {getTotal()}</b>
        //                     </h4>
        //                     {user
        //                         ?
        //                         <Button
        //                             type="primary"
        //                             className="rounded-full bg-[#06b6d4] ml-2"
        //                             onClick={handleSaveOrder}
        //                             disabled={!cart.length}
        //                             htmlType="submit"
        //                         >
        //                             Check Out
        //                         </Button>
        //                         : <Link
        //                             to="/login"
        //                             state="cart">
        //                             <Button
        //                                 type="primary"
        //                                 className="rounded-full bg-[#06b6d4] ml-2"
        //                             >
        //                                 Login to Check Out
        //                             </Button>
        //                         </Link>
        //                     }
        //                 </div>


        //             </div>

        //         </div>

        //     </div>

        // </div>
    )
}

export default Cart