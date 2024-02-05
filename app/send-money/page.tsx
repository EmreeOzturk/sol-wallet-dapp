"use client";
import React from 'react'
import { useState } from 'react';
import { sendSol } from '../utils';
const SendMoneyPage = () => {
    const [to, setTo] = useState('');
    const [amount, setAmount] = useState(0);






    return (
        <div className="bg-slate-700 h-full  justify-center items-center flex flex-col" >
            <div className="flex flex-col gap-4">
                <input type="text" placeholder="To" className="p-2" value={to} onChange={(e) => setTo(e.target.value)} />
                <input type="number" placeholder="Amount" className="p-2" min={0} max={1} value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} />
                <button className="p-2 bg-indigo-500 text-white" onClick={() => sendSol(to, amount)}>Send</button>
            </div>
        </div >
    )
}

export default SendMoneyPage