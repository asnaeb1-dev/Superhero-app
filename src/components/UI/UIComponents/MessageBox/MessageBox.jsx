import React from 'react'
import { EMPTY_MESSAGE } from '../../../utils/strings'
import emptyimage from "../../../../assets/unavailable.svg";
const MessageBox = ({ message = "", type = 0 }) => {
  return (
    <div className='flex flex-col text-gray-500 gap-5 items-center'>
        <img className={`w-[150px] h-[150px] opacity-60`} src={emptyimage} />
        <p className='font-bold text-xl'>{message}</p>
    </div>
  )
}

export default MessageBox