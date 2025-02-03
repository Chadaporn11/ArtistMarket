import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

//lodash
import _ from 'lodash';

//function
import {
    addToWishList,
    removeWishList,
} from '../functions/users';

//antd
import { Image, Badge, Carousel } from 'antd';

const SingleProduct = ({ product, countImg, statuslike, setStatuslike, loadData }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));
    const countOfImages = countImg;

    const { _id, productName, description, category, price, quantity, productStatus, productImages, owner } = product;
    const contentStyle = {
        height: '550px',
        // width: '600px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: 'white',

    };
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
    const handleAddToWishList = () => {
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
                        loadData();
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
                        loadData();

                    }).catch((err) => {
                        console.log(err);
                    });

            }

        } else {
            window.alert('You must login role "User" first!')
            navigate('/login')
        }

    }

    // const loadData = () => {
    //     getWishList(user.token)
    //         .then((res) => {
    //             // setWishlist(res.data.wishlist);
    //             dispatch({
    //                 type: "ADD_TO_WISHLIST",
    //                 payload: res.data.wishlist
    //             });

    //         }).catch((err) => {
    //             console.log(err);
    //         })

    // }

    // useEffect(() => {
    //     loadData()


    // }, []);


    return (
        <>
            <div className='container bg-white w-[700px] h-[600px] rounded-md shadow-md ml-5 mr-10'>
                <div className='grid grid-cols-6 grap-2 w-[700px] h-[600px] content-center'>
                    {countOfImages > 1 && (
                        <div className='col-span-6 place-self-center w-[600px]'>
                            <Carousel autoplay
                                className='rounded-xl'
                            // style={contentStyle}
                            >
                                {productImages && productImages.map(item =>
                                    <div>
                                        <Image
                                            src={item.url}
                                            key={item.public_id}
                                            // className='object-fill max-h-[500px]'

                                            width="100%"
                                            style={contentStyle}
                                            className="object-cover rounded-xl"

                                        />
                                    </div>

                                )}
                                {/* <div>
                                    <h3 style={contentStyle}>1</h3>
                                </div>
                                <div>
                                    <h3 style={contentStyle}>2</h3>
                                </div>
                                <div>
                                    <h3 style={contentStyle}>3</h3>
                                </div>
                                <div>
                                    <h3 style={contentStyle}>4</h3>
                                </div> */}

                            </Carousel>
                        </div>
                    )}
                    {countOfImages === 1 && (
                        <div className='col-span-6 place-self-center'>

                            {productImages && productImages.map(item =>
                                <div>
                                    <Image
                                        src={item.url}
                                        key={item.public_id}

                                        className='object-cover object-center justify-center rounded-xl max-h-[550px] max-w-[600px]'
                                    />

                                </div>

                            )}

                        </div>
                    )}


                </div>


            </div >
            <div className='container bg-white w-[450px] h-[400px] rounded-md shadow-md mr-5'>
                <div className='flex justify-start mt-10 mx-10 h-[50px]'>
                    <Badge className='w-fit h-[60%] text-[#52525b] text-2xl text-center align-middle bg-[#fbbf24] rounded-full px-2'>
                        <p className='font-semibold text-xl text-white mr-3'><i className="fa-solid fa-circle-user" /> : {owner.username}</p>
                    </Badge>
                </div>
                <div className='flex flex-col justify-start mx-10 h-[250px]'>
                    <div className='flex mb-2'>
                        <p className='font-semibold text-xl text-[#334155] mr-3'>Product Name : </p>
                        <p className='text-xl text-[#334155]'>{productName}</p>
                    </div>
                    <div className='flex mb-2'>
                        <p className='font-semibold text-xl text-[#334155] mr-3'>Price : </p>
                        <p className='text-xl text-[#334155]'>{price} ฿</p>
                    </div>
                    <div className='flex mb-2'>
                        <p className='font-semibold text-xl text-[#334155] mr-3'>Quantity : </p>
                        <p className='text-xl text-[#334155]'>{quantity}</p>
                    </div>
                    <div className='flex mb-2'>
                        <p className='font-semibold text-xl text-[#334155] mr-3'>Status : </p>
                        <p className='text-xl text-[#dc2626]'>{productStatus}</p>
                    </div>
                    <div className='flex mb-2'>
                        <p className='font-semibold text-xl text-[#334155] mr-3'>Category : </p>
                        <p className='text-xl text-[#334155]'>{category.name}</p>
                    </div>
                    <div className='flex mb-2'>
                        <p className='font-semibold text-xl text-[#334155] mr-3'>Description : </p>
                        <p className='text-xl text-[#334155]'>{description}</p>
                    </div>
                    {/* <p className='flex font-semibold text-xl'>Category : {category.name}</p>
                    <p className='flex font-semibold text-xl'>Description : {description}</p> */}
                </div>
                <div className='flex ml-8 w-[80%] divide-x divide-gray-300'>
                    {/* <Badge
                        className='w-[50%] h-[100%] text-[#52525b] opacity-80 text-2xl text-center align-middle'
                        onClick={handleAddToWishList}
                    >
                        <i className="fa-solid fa-heart"></i>
                    </Badge> */}
                    {!statuslike && (
                        <Badge
                            className='w-[50%] h-[100%] text-[#52525b] opacity-80 text-2xl text-center align-middle hover:text-3xl'
                            onClick={handleAddToWishList}>
                            {/* <i className="fa-regular fa-heart"></i> */}
                            <i className="fa-solid fa-heart"></i>

                        </Badge>
                    )}
                    {statuslike && (
                        <Badge
                            className='w-[50%] h-[100%] text-[#dc2626] opacity-80 text-2xl text-center align-middle hover:text-3xl'
                            onClick={handleAddToWishList}>
                            <i className="fa-solid fa-heart"></i>
                        </Badge>
                    )}
                    <Badge
                        className='w-[50%] h-[100%] text-[#52525b] opacity-80 text-2xl text-center align-middle hover:text-3xl'
                        onClick={handleAddTOCart}
                    >
                        <i className="fa-solid fa-basket-shopping"></i>
                    </Badge>
                </div>

            </div>


        </>
        // <div className='container bg-white w-[300px] h-[450px] rounded-md shadow-md'>
        //     <div className='flex flex-col w-[280] h-[450px]'>
        //         <div className='flex flex-col justify-center h-[300px] max-w-[300px] max-h-[300px] mx-5 mt-2'>
        //             <div className='relative flex justify-center w-auto h-auto'>
        //                 <Image
        //                     className='object-cover object-center justify-center rounded-md max-h-[300px]'
        //                     // src='https://pbs.twimg.com/media/FlxxsCqaUAEf9gP?format=jpg&name=large'
        //                     src={productImages && productImages.length
        //                         ? productImages[0].url
        //                         : ""
        //                     }
        //                 />
        //                 <div className='absolute top-3 right-5 rounded-md w-[30px] h-[30px]'>
        //                     {!statuslike && (
        //                         <Badge
        //                             className='w-[100%] h-[100%] text-white text-3xl'
        //                             onClick={() => setStatuslike(!statuslike)}>
        //                             {/* <i className="fa-regular fa-heart"></i> */}
        //                             <i className="fa-solid fa-heart"></i>

        //                         </Badge>
        //                     )}
        //                     {statuslike && (
        //                         <Badge
        //                             className='w-[100%] h-[100%] text-[#dc2626] text-3xl'
        //                             onClick={() => setStatuslike(!statuslike)}>
        //                             <i className="fa-solid fa-heart"></i>
        //                         </Badge>
        //                     )}
        //                 </div>
        //                 <div className='absolute bottom-3 right-0 rounded-l-md bg-[#fbbf24] opacity-90 shadow-md w-[100px] h-[28px]'>
        //                     <p className='font-semibold text-xl text-white ml-2'>Price: {price} ฿</p>
        //                 </div>
        //             </div>
        //             {/* <div className='relative w-[100%] h-[100%]'>
        //                 <div className='absolute bottom-3 right-0 rounded-l-md bg-[#d4d4d8] opacity-80 shadow-md w-[100px] h-[28px]'>
        //                     <p className='font-semibold text-xl ml-2'>Price: {price} ฿</p>
        //                 </div>
        //             </div> */}
        //         </div>
        //         <div className='flex flex-col justify-start mt-3 mx-8 mb-3'>
        //             <div className='flex'>
        //                 <p className='font-semibold text-xl text-[#334155] mr-3'>Product Name : </p>
        //                 <p className='text-xl text-[#334155]'>{productName}</p>
        //             </div>
        //             <div className='flex'>
        //                 <p className='font-semibold text-xl text-[#334155] mr-3'>Category : </p>
        //                 <p className='text-xl text-[#334155]'>{category.name}</p>
        //             </div>
        //             <div className='flex'>
        //                 <p className='font-semibold text-xl text-[#334155] mr-3'>Description : </p>
        //                 <p className='text-xl text-[#334155]'>{description}</p>
        //             </div>
        //             {/* <p className='flex font-semibold text-xl'>Category : {category.name}</p>
        //             <p className='flex font-semibold text-xl'>Description : {description}</p> */}
        //         </div>
        //         <div className='flex ml-8 w-[80%] divide-x divide-gray-300'>
        //             <Badge
        //                 className='w-[50%] h-[100%] text-[#52525b] opacity-80 text-xl text-center align-middle'
        //                 onClick={() => navigate(`/product/${_id}`)}>
        //                 <i className="fa-solid fa-eye"></i>
        //             </Badge>
        //             <Badge className='w-[50%] h-[100%] text-[#52525b] opacity-80 text-xl text-center align-middle'>
        //                 <i className="fa-solid fa-basket-shopping"></i>
        //             </Badge>
        //         </div>

        //     </div>
        // </div >
    )
}

export default SingleProduct