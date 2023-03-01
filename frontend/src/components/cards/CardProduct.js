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

function CardProduct({ product, loadData, setLoading }) {

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
                        console.log(res.data);
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
                        console.log(err.response.data);
                    });
            } else {
                removeWishList(user.token, _id)
                    .then((res) => {
                        console.log(res.data);
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
                        console.log(err.response.data);
                    });

            }

        } else {
            window.alert('You must login role "User" first!')
            navigate('/login')
        }

    }

    return (
        <div className='container bg-white w-[300px] h-[480px] rounded-md shadow-md hover:shadow-xl hover:-translate-y-3'>
            <div className='flex flex-col w-[280] h-[450px]'>
                <div className='flex flex-col justify-center h-[300px] max-w-[300px] max-h-[300px]'>
                    <div className='relative flex justify-center w-auto h-auto'>
                        <Image
                            className='object-cover object-center justify-center rounded-t-md'

                            // src='https://pbs.twimg.com/media/FlxxsCqaUAEf9gP?format=jpg&name=large'
                            style={contentStyle}
                            width="100%"
                            preview={false}
                            src={productImages && productImages.length
                                ? productImages[0].url
                                : ""
                            }
                        />
                        <div className='absolute bottom-3 right-0 rounded-l-md bg-[#fbbf24] opacity-90 shadow-md w-[100px] h-[28px]'>
                            <p className='font-semibold text-md text-white ml-2'>Price: {price} ฿</p>
                        </div>
                    </div>
                    {/* <div className='relative w-[100%] h-[100%]'>
                        <div className='absolute bottom-3 right-0 rounded-l-md bg-[#d4d4d8] opacity-80 shadow-md w-[100px] h-[28px]'>
                            <p className='font-semibold text-md ml-2'>Price: {price} ฿</p>
                        </div>
                    </div> */}
                </div>
                <div className='flex flex-col justify-start mt-3 mx-8 mb-3'>
                    <div className='flex'>
                        <p className='font-semibold text-md text-[#334155] mr-3'>Name : </p>
                        <p className='text-sm text-[#334155]'>{productName}</p>
                    </div>
                    <div className='flex'>
                        <p className='font-semibold text-md text-[#334155] mr-3'>Category : </p>
                        <p className='text-sm text-[#334155]'>{category.name}</p>
                    </div>
                    <div className='flex'>
                        <p className='font-semibold text-md text-[#334155] mr-3'>Quantity : </p>
                        <p className='text-sm text-[#334155]'>{quantity}</p>
                    </div>
                    <div className='flex'>
                        <p className='font-semibold text-md text-[#334155] mr-3'>Description : </p>
                        <p className='text-sm text-[#334155] whitespace-normal'>{description}</p>
                    </div>
                    {/* <p className='flex font-semibold text-md'>Category : {category.name}</p>
                    <p className='flex font-semibold text-md'>Description : {description}</p> */}
                </div>
                <div className='flex ml-8 w-[80%] divide-x divide-gray-300 mt-2'>
                    <Badge
                        className='w-[50%] h-[100%] text-[#52525b] opacity-80 text-2xl text-center align-middle hover:text-[#27272a]'
                        onClick={() => navigate(`/product/${_id}`)}>
                        <i className="fa-solid fa-eye"></i>
                    </Badge>
                    <Badge
                        className='w-[50%] h-[100%] text-[#52525b] opacity-80 text-2xl text-center align-middle hover:text-[#27272a]'
                        onClick={handleAddTOCart}>
                        <i className="fa-solid fa-basket-shopping"></i>
                    </Badge>
                </div>

            </div>
        </div >
        // <div className='container bg-white w-[300px] h-[450px] rounded-md shadow-md'>
        //     <div className='grid grid-rows-6 grid-flow-col gap-2 justify-items-center content-center w-[280] h-[450px]'>
        //         <div className='relative row-span-4 place-self-center w-[100%] mt-3'>
        //             <Image
        //                 className='rounded-md object-contain'
        //                 src={productImages && productImages.length
        //                     ? productImages[0].url
        //                     : ""
        //                 } />
        // <div className='absolute top-3 right-5 rounded-md w-[30px] h-[30px]'>
        //     {!statuslike && (
        //         <Badge
        //             className='w-[100%] h-[100%] text-white text-3xl'
        //             onClick={() => setStatuslike(!statuslike)}>
        //             {/* <i className="fa-regular fa-heart"></i> */}
        //             <i className="fa-solid fa-heart"></i>

        //         </Badge>
        //     )}
        //     {statuslike && (
        //         <Badge
        //             className='w-[100%] h-[100%] text-[#dc2626] text-3xl'
        //             onClick={() => setStatuslike(!statuslike)}>
        //             <i className="fa-solid fa-heart"></i>
        //         </Badge>
        //     )}
        // </div>
        // <div className='absolute bottom-3 right-0 rounded-l-md bg-[#d4d4d8] opacity-80 shadow-md w-[120px] h-[30px]'>
        //     <p className='font-semibold text-md align-middle ml-2'>Price:{price}</p>
        // </div>
        //         </div>
        //         <div className='row-span-1 justify-self-start place-self-center ml-8 mr-8 mt-2'>
        //             <p className='font-semibold text-sm'>Product Name : {productName}</p>
        //             <p className='font-semibold text-sm'>Category : {category.name}</p>
        //             <p className='font-semibold text-sm'>Description : {description}</p>

        //         </div>
        //         <div className='row-span-1 justify-self-start place-self-center ml-8 w-[80%] divide-x divide-gray-300'>
        //             <Badge className='w-[50%] h-[100%] text-[#52525b] opacity-80 text-2xl text-center align-middle'>
        //                 <i className="fa-solid fa-eye"></i>
        //             </Badge>
        //             <Badge className='w-[50%] h-[100%] text-[#52525b] opacity-80 text-2xl text-center align-middle'>
        //                 <i className="fa-solid fa-basket-shopping"></i>
        //             </Badge>
        //         </div>

        //     </div>
        // </div >
    )
}

export default CardProduct

//     <div div className = 'absolute top-3 right-5 rounded-md w-[30px] h-[30px]' >
//         {!statuslike && (
//             <Badge
//                 className='w-[100%] h-[100%] text-white text-3xl'
//                 onClick={handleAddToWishList}>
//                 {/* <i className="fa-regular fa-heart"></i> */}
//                 <i className="fa-solid fa-heart"></i>

//             </Badge>
//         )}
// {
//     statuslike && (
//         <Badge
//             className='w-[100%] h-[100%] text-[#dc2626] text-3xl'
//             onClick={handleAddToWishList}>
//             <i className="fa-solid fa-heart"></i>
//         </Badge>
//     )
// }
//                         </div >