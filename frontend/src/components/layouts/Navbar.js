import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//antd
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Tooltip, Badge } from 'antd';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, cart } = useSelector((state) => ({ ...state }))

    const logout = () => {
        dispatch({
            type: 'LOGOUT',
            payload: null,
        });
        dispatch({
            type: 'LOGOUT_WALLET',
            payload: null,
        });
        dispatch({
            type: 'ADD_TO_WISHLIST',
            payload: null,
        })
        navigate('/');
    };

    const checkUser = () => {
        let items = [];
        if (!user) {
            return items = [
                {
                    label: 'User',
                    key: '1',
                    icon: <i className="fa-solid fa-chalkboard-user" />,
                    onClick: () => navigate('/register')
                },
                {
                    label: 'Seller',
                    key: '2',
                    icon: <i className="fa-solid fa-chalkboard" />,
                    onClick: () => navigate('/register-seller')

                },
            ];
        } else if (user && user.role === 'admin') {
            return items = [
                {
                    label: 'Dashboard',
                    key: '1',
                    icon: <i className="fa-solid fa-chalkboard" />,
                    onClick: () => navigate('/admin/index')
                },
                {
                    label: 'Management User',
                    key: '2',
                    icon: <i className="fa-solid fa-list-check" />,
                    onClick: () => navigate('/admin/manage-admin')
                },
                {
                    label: 'Category',
                    key: '3',
                    icon: <i className="fa-solid fa-circle-check" />,
                    onClick: () => navigate('/admin/category')
                },
                {
                    label: 'Request Type',
                    key: '4',
                    icon: <i className="fa-solid fa-note-sticky" />,
                    onClick: () => navigate('/admin/requestType')
                },
                {
                    label: 'Payment',
                    key: '5',
                    icon: <i className="fa-solid fa-money-check-dollar" />,
                    onClick: () => navigate('/admin/payment')
                },
                {
                    label: 'Request Orders',
                    key: '6',
                    icon: <i className="fa-solid fa-money-check-dollar" />,
                    onClick: () => navigate('/admin/request-orders')
                },
                {
                    label: 'Logout',
                    key: '7',
                    icon: <i className="fa-solid fa-arrow-right-from-bracket" />,
                    onClick: () => logout()
                },
            ];
        } else if (user && user.role === 'seller') {
            return items = [
                {
                    label: 'Dashboard',
                    key: '1',
                    icon: <i className="fa-solid fa-chalkboard" />,
                    onClick: () => navigate('/seller/index')
                },
                {
                    label: 'Product',
                    key: '2',
                    icon: <i className="fa-solid fa-store"></i>,
                    onClick: () => navigate('/seller/product')
                },
                {
                    label: 'Payment',
                    key: '3',
                    icon: <i className="fa-solid fa-money-check-dollar" />,
                    onClick: () => navigate('/seller/payment')
                },
                {
                    label: 'History Order',
                    key: '4',
                    icon: <i className="fa-solid fa-clone"></i>,
                    onClick: () => navigate('/seller/history-order')
                },
                {
                    label: 'Request Notifications',
                    key: '5',
                    icon: <i className="fa-solid fa-money-check-dollar" />,
                    onClick: () => navigate('/seller/request')
                },

                {
                    label: 'Logout',
                    key: '6',
                    icon: <i className="fa-solid fa-arrow-right-from-bracket" />,
                    onClick: () => logout()
                },
            ];
        } else {
            return items = [
                {
                    label: 'Wishlist',
                    key: '1',
                    icon: <i className="fa-brands fa-gratipay"></i>,
                    onClick: () => navigate('/user/wishlist')
                },
                {
                    label: 'History Order',
                    key: '2',
                    icon: <i className="fa-solid fa-clone"></i>,
                    onClick: () => navigate('/user/history-order')
                },
                {
                    label: 'Request Notifications',
                    key: '3',
                    icon: <i className="fa-solid fa-money-check-dollar" />,
                    onClick: () => navigate('/user/request')
                },
                {
                    label: 'Logout',
                    key: '4',
                    icon: <i className="fa-solid fa-arrow-right-from-bracket" />,
                    onClick: () => logout()
                },
            ];
        }
    }

    const CartCheck = () => {
        if (user === null) {
            navigate('/login')
        } else if (user.role !== 'user') {
            window.alert('You must login role "User"!')
            logout()
            navigate('/login')
        }
    }

    const items = checkUser();
    const menuProps = {
        items,
    };

    return (
        <div className="grid grid-cols-3 gap-2 bg-sky-900 h-[60px] content-center justify-items-stretch">
            <div className="col-span-2 ml-5 ">
                <a a className="navbar-brand text-white" href="/" >
                    <i className="fa-solid fa-bars-staggered"></i><b className='text-white text-lg'>{" "}ARTIST MARKET</b>
                </a >

            </div >
            <div className="col-span-1">
                <div className='flex justify-end'>
                    <div class="flex mr-8">
                        <a className='nav-link active text-white' href="/">
                            <i className="fa-solid fa-house" /> Home
                        </a>
                    </div>
                    <div class="relative flex mr-8">
                        {user && user.role === 'user' && (
                            <a className='nav-link active text-white' href='/cart'>
                                <i className="fa-solid fa-cart-shopping" /> Cart
                            </a>
                        )}
                        {(user === null || user.role !== 'user') && (
                            <div className='nav-link active text-white' onClick={CartCheck}>
                                <i className="fa-solid fa-cart-shopping" /> Cart
                            </div>
                        )}
                        {/* <a className='nav-link active text-white' href='/login'>
                            <i className="fa-solid fa-cart-shopping" /> Cart
                        </a> */}
                        {cart.length > 0 && (
                            <Badge
                                className='absolute -top-1 -right-5 bg-[#fbbf24] rounded-full w-[20px] h-[20px] hover:-translate-y-1'
                            // style={{ cursor: 'pointer' }}
                            // count={cart.length} offset={[9, 0]}
                            >
                                <p className='text-white text-md text-center mt-0.5 mr-0.5'>{cart.length}</p>
                                {/* <a className='nav-link active text-white' href='/user/wallet'>
                                <i className="fa-solid fa-cart-shopping" /> Cart
                            </a> */}
                            </Badge>
                        )}

                    </div>
                    {user && (
                        <>
                            {/* {user.role === 'user' && (
                                <div class="flex mr-8">
                                    <a className='nav-link active text-white' href='/user/wallet'>
                                        <i className="fa-solid fa-cart-shopping" /> Cart
                                    </a>

                                </div>
                            )} */}
                            <div class="flex mr-8">
                                <Dropdown menu={menuProps}>
                                    <Button className='text-white'>
                                        <Space>
                                            <i className="fa-solid fa-lock"></i> {user.username}
                                        </Space>
                                    </Button>
                                </Dropdown>

                            </div>
                        </>
                    )}
                    {!user && (
                        <>
                            <div className="flex mr-8">
                                <a className='nav-link active text-white' href="/login"><i className="fa-solid fa-lock-open"></i> Login</a>
                            </div>
                            <div className="flex mr-8">
                                <Dropdown menu={menuProps}>
                                    <Button className='text-white'>
                                        <Space>
                                            <i className="fa-solid fa-lock"></i>Register
                                        </Space>
                                    </Button>
                                </Dropdown>
                            </div>
                        </>
                    )}

                </div>
            </div>

        </div >
        // <>
        //     <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        //         <div className="container-fluid">
        //             <div className='navbar-brand'>
        //                 <a className="btn btn-light" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
        //                     <i class="fa-solid fa-bars-staggered"></i>
        //                 </a><b> </b>
        //                 <a className="navbar-brand" href="/">
        //                     <b>ARTIST MARKET</b>
        //                 </a>
        //             </div>
        //             <div className='navbar-menu justify-content-end'>
        // <ul className="nav">
        //     <li className="nav-item">
        //         <a className='nav-link active' href="/"><i class="fa-solid fa-house" /> Home</a>
        //     </li>
        //     <li className="nav-item">
        //         <a className='nav-link active' href='/user/wallet'>
        //             <i class="fa-solid fa-cart-shopping" /> Cart
        //             <span className='top-0 start-160 translate-middle badge rounded-pill bg-danger'>99</span>
        //         </a>
        //     </li>

        //     {user && (
        //         <>
        //             <div className='dropdown'>
        //                 <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
        //                     <i class="fa-solid fa-lock"></i> {user.username}
        //                 </button>
        //                 <ul className="dropdown-menu dropdown-menu-light dropdown-menu-end" aria-labelledby="dropdownMenuButton2">
        //                     {user.role === 'admin'
        //                         ? <li><Link className="dropdown-item" to='/admin/index'><i class="fa-solid fa-chalkboard" /> Dashboard</Link></li>
        //                         : (user.role === "seller"
        //                             ? <li><Link className="dropdown-item" to='/seller/index'><i class="fa-solid fa-chalkboard-user" /> Dashboard</Link></li>
        //                             : <li><Link className="dropdown-item" to='/user/index'><i class="fa-solid fa-chalkboard-user" /> Dashboard</Link></li>
        //                         )
        //                     }
        //                     <li><a className="dropdown-item" onClick={logout}><i class="fa-solid fa-arrow-right-from-bracket"></i> Logout</a></li>
        //                 </ul>
        //             </div>
        //         </>

        //     )}

        //     {!user && (
        //         <>
        //             <li className="nav-item">
        //                 <a className='nav-link active' href="/login"><i class="fa-solid fa-lock-open"></i> Login</a>
        //             </li>
        //             <div className='dropdown'>
        //                 <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
        //                     <i class="fa-solid fa-lock"></i> Register
        //                 </button>
        //                 <ul className="dropdown-menu dropdown-menu-light dropdown-menu-end" aria-labelledby="dropdownMenuButton2">

        //                     <li><Link className="dropdown-item" to='/register-seller'><i class="fa-solid fa-chalkboard" /> Seller</Link></li>
        //                     <li><Link className="dropdown-item" to='/register'><i class="fa-solid fa-chalkboard-user" /> User</Link></li>


        //                 </ul>
        //             </div>

        //         </>

        //     )}

        // </ul>

        //             </div>

        //         </div >
        //     </nav >

        // </>
    )
}

export default Navbar;