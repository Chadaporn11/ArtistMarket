import React, { useState, useEffect } from "react";
import Menubar from "../../../layouts/Menubar";
import { useSelector } from "react-redux";

import { toast } from 'react-toastify';
import { useParams, useNavigate } from "react-router-dom";
import FileUpload from "./FileUpload";


//function
import {
    readProduct,
    updateProduct,
} from '../../../functions/product';
import {
    listCategory,
} from '../../../functions/category';

//antd
import { Select, Button, Form, Input, Spin } from 'antd';
const { Option } = Select;

const initialstate = {
    id: '',
    productName: "",
    description: "",
    categories: [],
    category: "",
    price: "",
    quantity: "",
    productImages: [],
};

const initialstateImage = {
    images: [],
};

const UpdateProduct = () => {

    const params = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));

    const [value, setValue] = useState(initialstate);
    const [categorys, setCategorys] = useState([]);
    const [image, setImage] = useState(initialstateImage);
    // const [value, setValue] = useState(initialstate);
    const [selected, setSelected] = useState('')
    const [loading, setLoading] = useState(false);
    const onSelectChange = (values) => {
        setSelected(values)
        console.log('selected=>', selected)
    }


    const handleChange = (event) => {
        const name = event.target.id;
        const values = event.target.value;
        setValue({
            ...value,
            [name]: values,
        });
        console.log('Changed', value)
    }

    const loadData = () => {
        readProduct(params.id)
            .then((res) => {
                setValue({
                    id: res.data.id,
                    productName: res.data.productName,
                    description: res.data.description,
                    category: res.data.category.name,
                    price: res.data.price,
                    quantity: res.data.quantity,
                    productImages: res.data.productImages,
                });
                setImage({
                    images: res.data.productImages
                })
                setSelected(res.data.category._id)
                // setImage({
                //     images: res.data.productImages
                // })
                // setSelected(res.data.category.name)
            }).catch((err) => {
                console.log(err);
            });

        listCategory()
            .then((res) => {
                setCategorys(res.data);
            }).catch((err) => {
                console.log(err);
            });
    }
    console.log("value:", value)
    console.log("image:", image)
    console.log("category:", categorys)

    const onSubmit = () => {
        setLoading(true);
        // e.preventDefault();
        let id = params.id;
        let data = {
            productName: value.productName,
            description: value.description,
            category: selected,
            price: Number(value.price),
            quantity: Number(value.quantity),
            productImages: image.images,
        }
        if (image.images.length > 0) {
            updateProduct(user.token, id, data)
                .then((res) => {
                    console.log(res);
                    setLoading(false);
                    toast.success('Update Product ' + res.data.productName + " Success!");
                    // navigate(`/seller/update-product/${res.data._id}`);
                    // window.location.reload();
                    navigate('/seller/product')

                }).catch((err) => {
                    console.log(err);
                    setLoading(false);
                    toast.error('Error update product!')

                });

        } else {
            setLoading(false);
            toast.error('You must add an image.')

        }

    }



    useEffect(() => {
        loadData();

    }, []);
    // const onfill = () => {
    //     setValue({
    //         productName: value.productName,
    //         description: value.description,
    //         category: value.category,
    //         price: value.price
    //     });
    //     setImage({
    //         images: value.productImages
    //     })
    //     setSelected(value.category)
    //     form.setFieldValue({
    //         productName: value.productName,
    //         description: value.description,
    //         category: value.category,
    //         price: value.price,
    //     })
    // }


    return (
        <div className="container max-w-[100%] max-h-[100%] bg-[#f9fafb]">
            <div className="grid grid-rows-6 grid-flow-col gap-2 justify-items-center content-center w-[100%]">
                <div className="row-span-1 place-self-center">
                    {loading
                        ? <h1 className="text-3xl text-center mb-2">Loading...<Spin /></h1>
                        : <h1 className="text-3xl text-center mb-2">Update Product</h1>
                    }
                </div>
                <div className="row-span-5 justify-center">
                    <div className='grid grid-cols-6 grap-2 justify-items-center w-[1300px]'>
                        <div className="container col-span-6 bg-white w-[80%] rounded-lg shadow-md p-20 mb-10">
                            {/* {loading
                                ? <h1 className="text-xl text-center mb-2">Loading...<Spin /></h1>
                                : <h1 className="text-xl text-center mb-2">Create Payment</h1>
                            } */}
                            <FileUpload
                                values={image}
                                setValues={setImage}
                                loadind={loading}
                                setLoading={setLoading}
                            />
                            <Form
                                layout="vertical"
                                form={form}
                                name="control-ref"
                            >
                                <Form.Item
                                    label="Product Name"
                                    name="productName"
                                >
                                    < Input
                                        name="productName"
                                        id="productName"
                                        size="small"
                                        value={value.productName}
                                        onChange={handleChange}
                                        placeholder={`${value.productName}`}
                                        className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                                    />

                                </Form.Item>
                                <Form.Item
                                    label="Description"
                                    name="description"
                                >
                                    < Input
                                        name="description"
                                        id="description"
                                        size="small"
                                        value={value.description}
                                        onChange={handleChange}
                                        placeholder={`${value.description}`}
                                        className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                                    />

                                </Form.Item>
                                <Form.Item
                                    label="Price"
                                    name="price"
                                    rules={[
                                        {
                                            pattern: /^[1-9]|[1-9][0-9]{1,5}$/,
                                            message: 'Price must be greater than 0.',
                                        }
                                    ]}

                                >
                                    < Input
                                        name="price"
                                        id="price"
                                        size="small"
                                        value={value.price}
                                        onChange={handleChange}
                                        placeholder={`${value.price}`}
                                        className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                                    />

                                </Form.Item>
                                <Form.Item
                                    label="Quantity"
                                    name="quantity"
                                    rules={[
                                        {
                                            pattern: /^[1-9]|[1-9][0-9]{1,3}$/,
                                            message: 'Quantity must be greater than 0.',
                                        }
                                    ]}
                                >
                                    < Input
                                        name="quantity"
                                        id="quantity"
                                        size="small"
                                        value={value.quantity}
                                        onChange={handleChange}
                                        placeholder={`${value.quantity}`}
                                        className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                                    />

                                </Form.Item>
                                <Form.Item
                                    label="Category"
                                    name="category"
                                >
                                    <Select
                                        name="category"
                                        id="category"
                                        onChange={onSelectChange}
                                        placeholder={`${value.category}`}
                                    >
                                        <Option>Please Select</Option>
                                        {
                                            categorys.length > 0 &&
                                            categorys.map((item) =>
                                                <Option
                                                    key={item._id}
                                                    value={item._id}
                                                >{item.name}</Option>
                                            )}
                                    </Select>
                                    {/* <Select.Option key="Kasikorn Bank" value="Kasikorn Bank" label="Kasikorn Bank" />
                                        <Select.Option key="Bank Krungthai" value="Bank Krungthai" label="Bank Krungthai" />
                                        <Select.Option key="Siam Commercial Bank" value="Siam Commercial Bank" label="Siam Commercial Bank" />

                                    </Select> */}
                                </Form.Item>
                                <Form.Item
                                >
                                    <Button
                                        type="primary"
                                        className="rounded-full bg-[#1BA8E7] justify-self-center"
                                        htmlType="submit"
                                        onClick={onSubmit}
                                    >

                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default UpdateProduct;