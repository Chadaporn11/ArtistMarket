import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';

//function
import { readProduct } from '../functions/product';
import { getWishList } from '../functions/users';

//antd
import SingleProduct from '../cards/SingleProduct';

const initialstate = {
    id: '',
    productName: "",
    description: "",
    categories: [],
    category: "",
    price: "",
    productStatus: "",
    productImages: [],
    owner: "",
};

const Product = () => {
    const { user, wishlist } = useSelector((state) => ({ ...state }));
    const { id } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(initialstate);
    const [loading, setLoading] = useState(false);
    const [statuslike, setStatuslike] = useState(false)
    const [countImg, setCountImg] = useState(0);


    const loadData = () => {
        if (wishlist) {
            wishlist.map((item) => {
                if (item._id === id) {
                    setStatuslike(true)
                }
            })

        }

        readProduct(id)
            .then((res) => {
                // console.log(res.data);
                setProduct(res.data)
                setLoading(false);
                setCountImg(res.data.productImages.length)
            }).catch((err) => {
                console.log(err);

            })
        if (user) {
            getWishList(user.token)
                .then((res) => {
                    dispatch({
                        type: "ADD_TO_WISHLIST",
                        payload: res.data.wishlist
                    });

                }).catch((err) => {
                    console.log(err);
                })
        }
    }

    useEffect(() => {
        loadData()
    }, []);

    return (
        <div className="container max-w-[100%] min-h-screen bg-[#f9fafb]">
            <div className="flex flex-col justify-items-center content-center max-w-[100%] max-h-screen">
                <div className='flex flex-row place-self-center mt-10'>
                    <SingleProduct
                        product={product}
                        countImg={countImg}
                        setStatuslike={setStatuslike}
                        statuslike={statuslike}
                        loadData={loadData}
                    />
                </div>
            </div>

        </div>
    )
}

export default Product