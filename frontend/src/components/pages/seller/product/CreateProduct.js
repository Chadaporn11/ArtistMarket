import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import FileUpload from './FileUpload'

//function
import {
    createProduct,
} from '../../../functions/product';
import {
    listCategory
} from '../../../functions/category';

//antd
import { Select, Button, Form, Input, Spin } from 'antd';
const { Option } = Select;

const initialstate = {
    productName: "",
    description: "",
    categories: [],
    category: "",
    price: '',
    quantity: '',
    images: [],
};

const initialstateImage = {
    images: [],
};

const CreateProduct = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));
    const [image, setImage] = useState(initialstateImage);
    const [value, setValue] = useState(initialstate);
    const [selected, setSelected] = useState('')
    const [loading, setLoading] = useState(false);

    const onSelectChange = (values) => {
        setSelected(values)
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


    const onSubmit = () => {
        setLoading(true);
        let data = {
            productName: value.productName,
            description: value.description,
            category: selected,
            price: Number(value.price),
            quantity: Number(value.quantity),
            images: image.images,
        }
        console.log(`onSubmit`, data);
        createProduct(user.token, data)
            .then((res) => {
                console.log(res);
                setLoading(false);
                setImage(initialstateImage)
                setValue(initialstate)
                setSelected('')
                toast.success('Create Product ' + res.data.productName + " Success!");
                // window.location.reload();
                navigate('/seller/product');
            }).catch((err) => {
                console.log(err);
                setLoading(false);
                toast.error('Error create product!')
            });
    }

    const loadData = () => {
        listCategory()
            .then((res) => {
                console.log(res.data);
                setValue({ ...value, categories: res.data })
                setImage({
                    images: []
                })

            }).catch((err) => {
                console.log(err.response.data);
            })

    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="container max-w-[100%] max-h-[100%] bg-[#f9fafb]">
            <div className="grid grid-rows-6 grid-flow-col gap-2 justify-items-center content-center w-[100%]">
                <div className="row-span-1 place-self-center">
                    {loading
                        ? <h1 className="text-3xl text-center mb-2">Loading...<Spin /></h1>
                        : <h1 className="text-3xl text-center mb-2">Create Product</h1>
                    }
                </div>
                <div className="row-span-4 justify-center">
                    <div className='grid grid-cols-6 grap-2 justify-items-center w-[1300px]'>
                        <div className="container col-span-6 bg-white w-[70%] rounded-lg shadow-md p-20">
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
                                name="control-hooks"
                                form={form}
                            >
                                <Form.Item
                                    label="Product Name"
                                    name="productName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Product Name!',
                                        },
                                    ]}
                                >
                                    < Input

                                        name="productName"
                                        id="productName"
                                        size="small"
                                        value={value.productName}
                                        onChange={handleChange}
                                        placeholder="productName"
                                        className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                                    />

                                </Form.Item>
                                <Form.Item
                                    label="Description"
                                    name={"description"}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your description!',
                                        },
                                    ]}
                                >
                                    < Input
                                        name="description"
                                        id="description"
                                        size="small"
                                        value={value.description}
                                        onChange={handleChange}
                                        placeholder="description"
                                        className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                                    />

                                </Form.Item>
                                <Form.Item
                                    label="Price"
                                    name={"price"}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your price!',
                                        },
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
                                        placeholder="price"
                                        className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                                    />

                                </Form.Item>
                                <Form.Item
                                    label="Quantity"
                                    name={"quantity"}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your quantity!',
                                        },
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
                                        placeholder="quantity"
                                        className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                                    />

                                </Form.Item>
                                <Form.Item
                                    label="Category"
                                    name="category"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select your Category!',
                                        },
                                    ]}
                                >
                                    <Select
                                        style={{
                                            borderRadius: '10px',
                                        }}
                                        name="category"
                                        id="category"
                                        onChange={onSelectChange}
                                        placeholder="Please Select Category..."
                                    >
                                        <Option>Please Select</Option>
                                        {
                                            value.categories.length > 0 &&
                                            value.categories.map((item) =>
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
        </div>
    )
}

export default CreateProduct