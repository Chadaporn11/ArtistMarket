import React from 'react'
import WalletCardAdmin from "../cards/WalletCardAdmin";

const MenubarAdmin = () => {
    return (
        <>
            <WalletCardAdmin />
            <br/>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <a className="nav-link" href="/admin/index"><i class="fa-solid fa-table-columns" /> Dashboard</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/admin/manage-admin"><i class="fa-solid fa-list-check" /> Management User</a>
                </li>
                <li className="nav-item">
                    <a className='nav-link' href="/admin/category"><i class="fa-solid fa-circle-check" /> Category</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/admin/payment"><i class="fa-solid fa-money-check-dollar" /> Payment</a>
                </li>

            </ul>
        </>


    )
}

export default MenubarAdmin;