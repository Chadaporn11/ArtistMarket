import React from 'react'
import WalletCardSeller from '../cards/WalletCardSeller';

const MenubarSeller = () => {
    return (
        <>
            <WalletCardSeller />
            <ul className="nav flex-column">
                <li className="nav-item">
                    <a className="nav-link" href="/seller/index">Dashboard</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/seller/product">Product</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/seller/payment">Payment</a>
                </li>
            </ul>
        </>

    )
}

export default MenubarSeller;