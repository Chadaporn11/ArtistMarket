import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'
import { currentSeller } from '../functions/auth'

const SellerRoute = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state }))
    const [ok, setOk] = useState(false)

    useEffect(() => {

        if (user && user.token) {
            currentSeller(user.token)
                .then(res => {
                    //res
                    console.log('hello',res)
                    setOk(true)
                }).catch(err => {
                    //err
                    console.log(err)
                    setOk(false)
                })
        }

    }, [user])


    return ok
        ? children
        : <LoadingToRedirect />
}

export default SellerRoute;