import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";

//card
import CardProduct from '../cards/CardProduct';

//function
import { listProduct } from '../functions/product';
import { getWishList } from '../functions/users';

//antd
import { Empty, Spin } from 'antd';

const initialstate = [{
    id: '',
    productName: "",
    description: "",
    categories: [],
    category: "",
    price: "",
    productStatus: "",
    productImages: [],
    owner: "",
},];

const Home = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    const [product, setProduct] = useState(initialstate);
    const [loading, setLoading] = useState(false);

    const loadData = () => {

        listProduct(12)
            .then((res) => {
                console.log(res.data);
                setProduct(res.data)
                setLoading(false);
            }).catch((err) => {
                console.log(err.response.data);
            })
        if (user) {
            getWishList(user.token)
                .then((res) => {
                    dispatch({
                        type: "ADD_TO_WISHLIST",
                        payload: res.data.wishlist
                    });

                }).catch((err) => {
                    console.log(err.response.data);
                })
        }
    }
    console.log('product=>', product)

    useEffect(() => {
        loadData()
    }, [user]);

    return (
        <div className="container max-w-[100%] max-h-auto bg-[#f9fafb] pb-[150px]">
            <div className="flex flex-col justify-items-center content-center w-[100%]">
                <div className='flex flex-col place-self-center h-[100px] mt-10'>
                    {loading
                        ? <h1 className='flex justify-center text-4xl'>Loading...<Spin /></h1>
                        : <h1 className='flex justify-center text-4xl'>Product</h1>
                    }
                </div>
                <div className="flex justify-center">
                    <div className='grid grid-cols-4 gap-8'>
                        {product.length === 0 && (
                            <div className="col-span-4">
                                <Empty />
                            </div>
                        )}
                        {product.map((item, index) =>
                            <div key={index} className='col-span-1'>
                                <CardProduct
                                    product={item}
                                    loadData={loadData}
                                    setLoading={setLoading}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home;