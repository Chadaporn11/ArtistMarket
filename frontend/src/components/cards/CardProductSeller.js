import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

//functions
import {
    removeProduct,
} from '../functions/product';

//antd
import { Select, Button, Form, Input, Spin, Image } from 'antd';

function CardProductSeller({ product, loadData, setLoading }) {
    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));

    const { _id, productName, description, category, price, quantity, productStatus, productImages } = product;

    const contentStyle = {
        height: '270px',
        // width: '600px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',

    };

    const handleRemove = (id) => {
        setLoading(true);
        if (window.confirm("Are youe sure Delete!")) {
            removeProduct(user.token, id)
                .then((res) => {
                    // console.log(res.data);
                    toast.success(`Delete ${res.data.username} Success!`);
                    setLoading(false);
                    loadData();
                }).catch((err) => {
                    console.log(err);
                    toast.error(`Delete Error!`);
                });
        }


    }

    return (
        <div className='container bg-white w-[300px] h-[480px] rounded-md shadow-md'>
            <div className='flex flex-col w-[280] h-[450px]'>
                <div className='flex justify-end mt-5 mx-5'>
                    <Button
                        type="primary"
                        className="rounded-full bg-[#fcd34d]"
                        onClick={() => navigate(`/seller/update-product/${_id}`)}
                        htmlType="submit"
                    >
                        <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                    <Button
                        type="primary"
                        className="rounded-full bg-[#dc2626] ml-2"
                        onClick={() => handleRemove(_id)}
                        htmlType="submit"
                    >
                        <i className="fa-solid fa-trash"></i>
                    </Button>
                </div>
                <div className='flex flex-col justify-center h-[270px] max-w-[300px] max-h-[270px] mt-2 mx-5'>
                    <div className='relative flex justify-center w-auto h-auto'>
                        <Image
                            className='object-cover object-center justify-center rounded-md'
                            // src='https://pbs.twimg.com/media/FlxxsCqaUAEf9gP?format=jpg&name=large'
                            style={contentStyle}
                            width="100%"
                            src={productImages && productImages.length
                                ? productImages[0].url
                                : ""
                            }
                        />
                        <div className='absolute bottom-3 right-0 rounded-l-md bg-[#d4d4d8] opacity-80 shadow-md w-[100px] h-[28px]'>
                            <p className='font-semibold text-md ml-2'>Price: {price} ฿</p>
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
                        <p className='text-sm text-[#334155]'>{description}</p>
                    </div>

                    {/* <p className='flex font-semibold text-md'>Category : {category.name}</p>
                    <p className='flex font-semibold text-md'>Description : {description}</p> */}
                </div>
            </div>
        </div>
        // <div className='container bg-white w-[300px] h-[450px] rounded-md shadow-md'>
        //     <div className='grid grid-rows-6 grid-flow-col gap-2 justify-items-center content-center w-[280] h-[450px]'>
        //         <div className='row-span-1 justify-self-end mt-5 mx-5'>
        //             <Button
        //                 type="primary"
        //                 className="rounded-full bg-[#fcd34d]"
        //                 onClick={() => navigate(`/seller/update-product/${_id}`)}
        //                 htmlType="submit"
        //             >
        //                 <i className="fa-solid fa-pen-to-square"></i>
        //             </Button>
        //             <Button
        //                 type="primary"
        //                 className="rounded-full bg-[#dc2626] ml-2"
        //                 onClick={() => handleRemove(_id)}
        //                 htmlType="submit"
        //             >
        //                 <i className="fa-solid fa-trash"></i>
        //             </Button>
        //         </div>
        //         <div className='row-span-3 justify-self-center h-[230px] max-w-[230px] max-h-[230px]'>
        //             <div className='relative w-[100%] h-auto'>
        //                 <Image
        //                     className='object-cover object-center rounded-md max-h-[230px]'
        //                     // src='https://pbs.twimg.com/media/FlxxsCqaUAEf9gP?format=jpg&name=large'
        //                     src={productImages && productImages.length
        //                         ? productImages[0].url
        //                         : ""
        //                     }
        //                 />
        //                 <div className='absolute bottom-3 right-0 rounded-l-md bg-[#d4d4d8] opacity-80 shadow-md w-[100px] h-[28px]'>
        //                     <p className='font-semibold text-md ml-2'>Price: {price} ฿</p>
        //                 </div>
        //             </div>
        //             {/* <div className='relative w-[100%] h-[100%]'>
        //                 <div className='absolute bottom-3 right-0 rounded-l-md bg-[#d4d4d8] opacity-80 shadow-md w-[100px] h-[28px]'>
        //                     <p className='font-semibold text-md ml-2'>Price: {price} ฿</p>
        //                 </div>
        //             </div> */}
        //         </div>
        //         <div className='row-span-2 justify-self-start place-self-center ml-8 mb-3'>
        //             <p className='font-semibold text-sm'>Product Name : {productName}</p>
        //             <p className='font-semibold text-sm'>Category : {category.name}</p>
        //             <p className='font-semibold text-sm'>Description : {description}</p>
        //         </div>
        //     </div>
        // </div>
    )
}

export default CardProductSeller