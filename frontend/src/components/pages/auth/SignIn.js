import React, { useState } from 'react';

// functions
import { login } from "../../functions/auth";

// redux
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { toast } from "react-toastify";

//antd
import { Button, Form, Input } from 'antd';

const SignIn = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loacation = useLocation();
    const [value, setValue] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const roleBaseRedirect = (role) => {
        const intened = loacation.state;
        if (intened) {
            navigate('../' + intened);
        } else {
            if (role === "admin") {
                navigate("/admin/index");
            } else if (role === "seller") {
                navigate("/seller/index");
            } else {
                navigate("/");
            }
        }
    };

    const onSubmit = (values) => {
        setLoading(true);
        // e.preventDefault();
        console.log(values);
        //code
        login(values)
            .then((res) => {
                setLoading(false);
                toast.success(res.data.payload.user.username + " Login Success");
                dispatch({
                    type: "LOGIN",
                    payload: {
                        token: res.data.token,
                        email: res.data.payload.user.email,
                        username: res.data.payload.user.username,
                        role: res.data.payload.user.role,
                        walletUser: res.data.payload.user.walletUser,
                    },
                });

                localStorage.setItem("token", res.data.token);
                roleBaseRedirect(res.data.payload.user.role);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
                toast.error(err.response.data);
            });
    };

    return (
        <div className="container max-w-[100%] max-h-[680px]">
            <div className="grid grid-rows-4 grid-flow-col gap-4 justify-items-center content-center w-[100%] h-[680px]">
                <div className='row-span-1 place-self-center'>
                    <h1 className='text-3xl'>SIGN IN</h1>
                </div>
                <div className="row-span-2 justify-center w-[500px]">
                    <Form
                        layout="vertical"
                        onFinish={onSubmit}
                    >
                        <Form.Item
                            label="Email"
                            name={"email"}
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            < Input
                                placeholder="email"
                                className={`w-full !text-lg px-4 !rounded-[10px] justify-self-center`}
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
                                {
                                    pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{6,10}$/,
                                    message: 'Password must be a minimum of 6 and maximum 10 characters including number, Upper, Lower And one special characterd'
                                }
                            ]}
                        >
                            <Input.Password
                                placeholder="password"
                                className={`w-full !text-lg px-4 !rounded-[10px] justify-self-center`}
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
                            <p className=" text-center text-muted mt-5 mb-0">
                                You haven't account!<a className="text-[#0891b2]" href="/register"> Sign Up</a>
                            </p>
                        </Form.Item>
                    </Form>
                </div>
                <div></div>
            </div>

        </div>


    )
}

export default SignIn;