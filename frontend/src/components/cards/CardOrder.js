import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify";

//lodash
import _ from 'lodash';
//function
import {
    addToWishList,
    removeWishList

} from '../functions/users';

//antd
import { Image, Badge } from 'antd';

const CardOrder = ({ product, loadData, setLoading }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [statuslike, setStatuslike] = useState(false)
    const { user } = useSelector((state) => ({ ...state }));

    const { _id, productName, description, category, price, quantity, productStatus, productImages } = product;

    // const handleStatuslike = () => {
    //     setStatuslike(!statuslike)
    // }
    const handleAddTOCart = () => {
        if (user && user.role === 'user') {
            let cart = [];
            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
            }
            cart.push({
                ...product,
                count: 1
            })
            let unique = _.uniqWith(cart, _.isEqual)
            localStorage.setItem('cart', JSON.stringify(unique));
            dispatch({
                type: "ADD_TO_CART",
                payload: unique
            });
            dispatch({
                type: "SET_VISIBLE",
                payload: true
            });
        } else {
            window.alert('You must login role "User" first!')
            navigate('/login')
        }

    }

    const contentStyle = {
        height: '300px',
        // width: '600px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',

    };

    const handleAddToWishList = () => {
        // wishlist.map((item) => {
        //     if(item._id === _id) {
        //         setStatuslike(true)
        //     }
        // })
        // for (let i; i < wishlist.length; i++) {
        //     if (wishlist[i]._id === _id) {
        //         setStatuslike(true)
        //     }
        // }
        if (user && user.role === 'user') {
            if (!statuslike) {

                addToWishList(user.token, _id)
                    .then((res) => {
                        // console.log(res.data);
                        let wishlist = [];
                        if (localStorage.getItem('wishlist')) {
                            wishlist = JSON.parse(localStorage.getItem('wishlist'));
                        }
                        wishlist.push({
                            ...product,
                            count: 1
                        })
                        let unique = _.uniqWith(wishlist, _.isEqual)
                        localStorage.setItem('wishlist', JSON.stringify(unique));
                        dispatch({
                            type: "ADD_TO_WISHLIST",
                            payload: unique
                        });
                        setStatuslike(!statuslike)
                        toast.success('Add To WishList Success!');
                        // loadData()
                    }).catch((err) => {
                        console.log(err);
                    });
            } else {
                removeWishList(user.token, _id)
                    .then((res) => {
                        // console.log(res.data);
                        let wishlist = [];
                        if (localStorage.getItem('wishlist')) {
                            wishlist = JSON.parse(localStorage.getItem('wishlist'));
                        }
                        wishlist.map((product, i) => {
                            if (product._id === _id) {
                                wishlist.splice(i, 1);
                            }
                        })
                        localStorage.setItem('wishlist', JSON.stringify(wishlist));
                        dispatch({
                            type: 'ADD_TO_WISHLIST',
                            payload: wishlist
                        })
                        setStatuslike(!statuslike)
                        // loadData();

                    }).catch((err) => {
                        console.log(err);
                    });

            }

        } else {
            window.alert('You must login role "User" first!')
            navigate('/login')
        }

    }
    return (
        <div className='container bg-white w-[300px] h-[450px] rounded-md shadow-md hover:shadow-xl hover:-translate-y-3'>

        </div >
    )
}

export default CardOrder