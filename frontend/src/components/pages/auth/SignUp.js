import React, { useState } from "react";
// functions
import { register } from "../../functions/auth";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
//antd
import { Button, Form, Input } from 'antd';


const SignUp = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState({
        username: "",
        phone: "",
        email: "",
        password: "",
        confirmpassword: "",
    });

    const onSubmit = (values) => {
        // e.preventDefault();
        if (values.password !== values.confirmpassword) {
            toast.error("Password not match");
        } else {
            //code
            register(values)
                .then((res) => {
                    console.log(res.data);
                    toast.success(res.data);
                    clearform();
                    navigate('/login');
                })
                .catch((err) => {
                    console.log(err.response.data);
                    toast.error(err.response.data);
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
                    <h1 className='text-3xl'>SIGN UP</h1>
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
                                    whitespace: true,

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
                                {
                                    pattern: /^06\d{8}|09\d{8}|08\d{8}/g,
                                    message: 'Invalid phone number format start must 09,08,06 and must have 10 numbers',
                                }

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
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: 'Please input your email!',
                            //     },
                            // ]}
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
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
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: 'Please input your password!',
                            //     },
                            // ]}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,10}$/,
                                    message: 'Password must be a minimum of 6 and maximum 10 characters including number, Upper, Lower And one special characterd'
                                }
                            ]}
                            hasFeedback
                        >
                            <Input.Password
                                placeholder="password"
                                className={`w-full !text-lg px-2 !rounded-[10px] justify-self-center`}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Confirmpassword"
                            name={"confirmpassword"}
                            dependencies={['password']}
                            hasFeedback
                            // rules={[

                            //     {
                            //         required: true,
                            //         message: 'Please input your confirmpassword!',
                            //     },
                            // ]}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
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
                                className="rounded-full bg-[#1BA8E7] justify-self-center"
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

export default SignUp;