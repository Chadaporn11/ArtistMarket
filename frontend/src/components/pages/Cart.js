import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
                console.log(err);
            });
    }

    const ContainerHeight = 450;
    const onScroll = (e) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
        }
    }

    const onChangeCount = (item, value) => {
        const count = value < 1 ? 1 : value;
        if (count > item.quantity) {
            window.alert('Max avialable Quantity' + item.quantity);
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
                <div className="row-span-6 justify-center mt-10">
                    <div className='grid grid-cols-6 grap-2 justify-items-center w-[1300px]'>
                        <div className="container col-span-6 bg-white w-[100%] rounded-lg shadow-md p-10 mb-10">
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
                                </div>
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
                                                </div>
                                                <div className="col-span-2 place-self-center">
                                                    <p className='font-semibold text-lg'>{item.productName}</p>
                                                </div>
                                                <div className="col-span-2 place-self-center">
                                                    <p className='text-lg'>{item.price}  x</p>

                                                </div>
                                                <div className="col-span-2 place-self-center">
                                                    <InputNumber
                                                        min={1}
                                                        max={item.quantity}
                                                        // value={item.quantity}
                                                        defaultValue={item.count}
                                                        onChange={(value) => onChangeCount(item, value)} />

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
    )
}

export default Cart