import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenubarAdmin from './MenubarAdmin';
import MenubarSeller from './MenubarSeller';

const Menubar = () => {
    const { user } = useSelector((state) => ({ ...state }))

    return (
        <>

            <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h4>ARTIST MARKET</h4>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    {user.role === 'admin'
                        ? (<MenubarAdmin />)
                        : user.role === 'seller'
                            ? (<MenubarSeller />)
                            : (<></>)
                    }
                </div>
            </div>
        </>

    )
}

export default Menubar