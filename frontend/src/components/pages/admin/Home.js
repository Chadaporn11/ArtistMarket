import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {
  listRequestTopup,
  listRequestWithdraw,
  listRequestOther,
  listRequestSignupSeller
} from '../../functions/request';

//antd
import { Badge } from 'antd';

const Home = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [requestWithdraw, setRequestWithdraw] = useState([]);
  const [requestTopup, setRequestTopup] = useState([]);
  const [requestOther, setRequestOther] = useState([]);
  const [requestSignup, setRequestSignup] = useState([]);


  const loadData = async () => {
    listRequestOther(user.token, 'Waiting for confirmation')
      .then((res) => {
        setRequestOther(res.data);
      }).catch((err) => {
        console.log(err);
      });

    listRequestTopup(user.token, 'Waiting for confirmation')
      .then((res) => {
        setRequestTopup(res.data);
      }).catch((err) => {
        console.log(err);
      });

    listRequestWithdraw(user.token, 'Waiting for confirmation')
      .then((res) => {
        setRequestWithdraw(res.data);
      }).catch((err) => {
        console.log(err);
      });

    listRequestWithdraw(user.token, 'Waiting for confirmation')
      .then((res) => {
        setRequestWithdraw(res.data);
      }).catch((err) => {
        console.log(err);
      });

    listRequestSignupSeller(user.token, 'Waiting for confirmation')
      .then((res) => {
        setRequestSignup(res.data);
      }).catch((err) => {
        console.log(err);
      });

  }


  useEffect(() => {
    loadData();

  }, [])

  return (
    <div className="container max-w-[100%] max-h-[680px] bg-[#f9fafb]">
      <div className="grid grid-rows-6 grid-flow-col gap-4 justify-items-center content-center w-[100%] h-[680px]">
        <div className='row-span-1 place-self-center'>
          <h1 className='text-3xl'>Dashboard</h1>
        </div>
        <div className="row-span-2 justify-center">
          <div className='grid grid-cols-4 gap-10 w-[1000px] h-[200px]'>
            <div className="container col-span-2 bg-[#fee2e2] w-[100%] rounded-lg shadow-md p-8">
              <div className='flex flex-col w-[100%] h-[100%] px-10 my-3'>
                <div className='flex justify-start h-[100%] '>
                  <i className="fa-solid text-md text-[#374151]/80">Request Topup Payment</i>
                </div>
                <div className='flex justify-between place-self-end h-[100%] w-[100%] mt-2'>
                  <div className='flex justify-center'>
                    <h1 className="fa-solid fa-money-check-dollar  text-[#f87171]/80 text-[80px]"></h1>
                  </div>
                  <Badge
                    className='flex justify-center w-auto h-auto place-self-center'
                  >
                    <div className='flex justify-center p-1 rounded-full bg-[#f87171] w-[60px] h-[60px]'>
                      {/* <p className='font-semibold text-md text-white ml-2'></p> */}
                      <i className="fa-solid text-white text-3xl pt-2">{requestTopup.length}</i>
                    </div>
                  </Badge>

                </div>
                <div className='flex justify-end place-self-end h-[100%]'>
                </div>

              </div>
            </div>
            <div className="container col-span-2 bg-[#d1fae5] w-[100%] rounded-lg shadow-md p-8">
              <div className='flex flex-col w-[100%] h-[100%] px-10 my-3'>
                <div className='flex justify-start h-[100%] '>
                  <i className="fa-solid text-md text-[#374151]/80">Request Withdraw Payment</i>
                </div>
                <div className='flex justify-between place-self-end h-[100%] w-[100%] mt-2'>
                  <div className='flex justify-center'>
                    <h1 className="fa-solid fa-money-bill-transfer  text-[#0f766e]/80 text-[80px] rounded-md"></h1>
                  </div>
                  <Badge
                    className='flex justify-center w-auto h-auto place-self-center'
                  >
                    <div className='flex justify-center p-1 rounded-full bg-[#0f766e] w-[60px] h-[60px]'>
                      {/* <p className='font-semibold text-md text-white ml-2'></p> */}
                      <i className="fa-solid text-white text-3xl pt-2">{requestWithdraw.length}</i>
                    </div>
                  </Badge>

                </div>
                <div className='flex justify-end place-self-end h-[100%]'>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="row-span-2 justify-center">
          <div className='grid grid-cols-4 gap-10 w-[1000px] h-[200px]'>
            <div className="container col-span-2 bg-[#ede9fe] w-[100%] rounded-lg shadow-md p-8">
              <div className='flex flex-col w-[100%] h-[100%] px-10 my-3'>
                <div className='flex justify-start h-[100%] '>
                  <i className="fa-solid text-md text-[#374151]/80">Request Other</i>
                </div>
                <div className='flex justify-between place-self-end h-[100%] w-[100%] mt-2'>
                  <div className='flex justify-center'>
                    <h1 className="fa-solid fa-comment-dots text-[#7c3aed]/80 text-[80px] rounded-md"></h1>
                  </div>
                  <Badge
                    className='flex justify-center w-auto h-auto place-self-center'
                  >
                    <div className='flex justify-center p-1 rounded-full bg-[#7c3aed] w-[60px] h-[60px]'>
                      {/* <p className='font-semibold text-md text-white ml-2'></p> */}
                      <i className="fa-solid text-white text-3xl pt-2">{requestOther.length}</i>
                    </div>
                  </Badge>

                </div>
                <div className='flex justify-end place-self-end h-[100%]'>
                </div>

              </div>
            </div>
            <div className="container col-span-2 bg-[#fef9c3] w-[100%] rounded-lg shadow-md p-8">
              <div className='flex flex-col w-[100%] h-[100%] px-10 my-3'>
                <div className='flex justify-start h-[100%] '>
                  <i className="fa-solid text-md text-[#374151]/80">Request SignUp Seller</i>
                </div>
                <div className='flex justify-between place-self-end h-[100%] w-[100%] mt-2'>
                  <div className='flex justify-center'>
                    <h1 className="fa-solid fa-clipboard-user text-[#fcd34d] text-[80px] rounded-md"></h1>
                  </div>
                  <Badge
                    className='flex justify-center w-auto h-auto place-self-center'
                  >
                    <div className='flex justify-center p-1 rounded-full bg-[#fcd34d] w-[60px] h-[60px]'>
                      {/* <p className='font-semibold text-md text-white ml-2'></p> */}
                      <i className="fa-solid text-white text-3xl pt-2">{requestSignup.length}</i>
                    </div>
                  </Badge>

                </div>
                <div className='flex justify-end place-self-end h-[100%]'>
                </div>

              </div>
            </div>

          </div>
        </div>
        <div></div>
      </div>

    </div>
  )
}

export default Home;