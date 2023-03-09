import React, { useState } from "react";
// functions
import { registerSeller } from "../../functions/auth";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from 'antd';

const SignUpSeller = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState({
        username: "",
        phone: "",
        email: "",
        password: "",
        confirmpassword: "",
        role: "seller",
    });

    const onSubmit = (values) => {
        // e.preventDefault();
        if (values.password !== values.confirmpassword) {
            toast.error("Password not match");
        } else {
            //code
            registerSeller(values)
                .then((res) => {
                    console.log(res.data);
                    toast.success(res.data);
                    clearform();
                    navigate('/login');
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err);
                });
        }
    };

    const clearform = () => {
        setValue({
            username: "",
            phone: "",
            email: "",
            password: "",
            confirmpassword: "",
        })
    }

    return (
        <div className="container max-w-[100%] max-h-[680px]">
            <div className="grid grid-rows-6 grid-flow-col gap-4 justify-items-center content-center w-[100%] h-[680px]">
                <div className='row-span-1 place-self-center'>
                    <h1 className='text-3xl'>SIGN UP</h1><p className="text-center bg-[#faad14] rounded-full"> ( seller ) </p>

                </div>
                <div className="row-span-5 justify-center w-[500px] mx-0 my-0">
                    <Form
                        layout="vertical"
                        onFinish={onSubmit}


                    >
                        <Form.Item
                            label="Username"
                            name={"username"}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            < Input
                                placeholder="username"
                                className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                            />

                        </Form.Item>
                        <Form.Item
                            label="Phone"
                            name={"phone"}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone!',
                                },
                            ]}
                        >
                            < Input
                                placeholder="phone"
                                className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                            />

                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name={"email"}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            < Input
                                placeholder="email"
                                className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                            />

                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name={"password"}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password
                                placeholder="password"
                                className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Confirmpassword"
                            name={"confirmpassword"}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your confirmpassword!',
                                },
                            ]}
                        >
                            <Input.Password
                                placeholder="confirmpassword"
                                className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                            />
                        </Form.Item>

                        <Form.Item
                        >
                            <Button
                                type="primary"
                                className="bg-[#1BA8E7] rounded-full justify-self-center"
                                htmlType="submit"
                            >

                                Submit
                            </Button>
                            <p className="text-center text-muted mt-5 mb-10">
                                You have account!<a className="text-[#0891b2]" href="/login"> Sign In</a>
                            </p>
                        </Form.Item>
                    </Form>
                </div>
            </div>

        </div>
    )
}

export default SignUpSeller;