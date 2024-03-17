import React from 'react'
import { EMPTY_MESSAGE } from '../../../utils/strings'
import emptyimage from "../../../../assets/unavailable.svg";
import { Oval } from 'react-loader-spinner';

const MessageBox = ({ message = "", type = 0, isLoading = false }) => {
  return (
    <div className='flex flex-col text-gray-500 gap-5 items-center'>
        {
            type === 0 ? <img className={`w-[150px] h-[150px] opacity-60`} src={emptyimage} /> : <Spinner isVisible={isLoading} />
        }
        <p className='font-bold text-xl'>{message}</p>
    </div>
  )
}


const Spinner = ({ isVisible }) => {
    return(
        <Oval
            visible={isVisible}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    )
}
export default MessageBox