import React from 'react';
import { useSelector } from "react-redux";
import MenubarAdmin from '../../layouts/MenubarAdmin';
import Menubar from '../../layouts/Menubar';

const Home = () => {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div className="container max-w-[100%] max-h-[680px] bg-[#f9fafb]">
      <div className="grid grid-rows-6 grid-flow-col gap-4 justify-items-center content-center w-[100%] h-[680px]">
        <div className='row-span-1 place-self-center'>
          <h1 className='text-3xl'>Dashboard</h1>
        </div>
        <div className="row-span-2 justify-center">
          <div className='grid grid-cols-4 gap-10 w-[1000px] h-[200px]'>
            <div className="container col-span-2 bg-[#fee2e2] w-[100%] rounded-lg shadow-md p-8">
              Noti Payment
            </div>
            <div className="container col-span-2 bg-[#ede9fe] w-[100%] rounded-lg shadow-md p-8">
              Noti Payment
            </div>
          </div>
        </div>
        <div className="row-span-2 justify-center">
          <div className='grid grid-cols-4 gap-10 w-[1000px] h-[200px]'>
            <div className="container col-span-2 bg-[#d1fae5] w-[100%] rounded-lg shadow-md p-8">
              Noti Order
            </div>
            <div className="container col-span-2 bg-[#fef9c3] w-[100%] rounded-lg shadow-md p-8">
              Noti Other
            </div>

          </div>
        </div>
        <div></div>
      </div>

    </div>
  )
}

export default Home;