import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Drawer, Image } from 'antd';

const SideDrawer = () => {
    const dispatch = useDispatch();
    const { cart, drawer } = useSelector((state) => ({ ...state }));

    const onCloseDrawer = () => {
        dispatch({
            type: "SET_VISIBLE",
            payload: false
        });
    }

    return (
        <Drawer
            onClose={onCloseDrawer}
            title={"Cart " + cart.length + " product"}
            placement="right"
            open={drawer}>
            {cart.map((item, index) =>
                <div key={index} className='flex flex-row place-self-center items-center'>
                    <div className='flex mr-5 mt-3'>
                        <Image
                            className='object-cover rounded-md'
                            // style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                            preview={false}
                            width='150px'
                            height='150px'
                            src={item.productImages[0].url}
                        // src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                    </div>
                    <div className='flex mt-3'>
                        <p className='text-center bg-secondary text-light'>
                            {item.productName}  x  {item.count}
                        </p>
                    </div>
                </div>
            )}
            <div className='flex justify-end'>
                <Link to="/cart">
                    <Button
                        onClick={onCloseDrawer}
                        type="primary"
                        className="rounded-full bg-[#1BA8E7] justify-self-center mt-5">
                        Go To Cart
                    </Button>
                </Link>

            </div>



        </Drawer>
    )
}

export default SideDrawer;