"use client"

import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react"
const RequestAirdropPage = () => {
    const [publicKey, setPublicKey] = useState<string>('')
    const [txHash, setTxHash] = useState("");
    const [isAirdropped, setIsAirdropped] = useState(false);

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const connection = new Connection("https://api.devnet.solana.com");
        let publicKeyObject;
        try {
            publicKeyObject = new PublicKey(publicKey);
        } catch (err) {
            alert("Invalid Solana address. Please try again.");
            return;
        }
        let hash = await connection.requestAirdrop(publicKeyObject, LAMPORTS_PER_SOL);
        setTxHash(hash);
        setIsAirdropped(true);
    }

    console.log(`Transaction Hash: ${txHash}`);


    return (
        <div className="bg-slate-700 h-full  justify-center items-center flex flex-col" >
            <form onSubmit={onSubmit} className={`m-4 bg-gradient-to-t  to-slate-800 rounded-xl ${isAirdropped ? 'from-green-500' : 'from-indigo-500'}`}>
                <input
                    type="text"
                    name="search"
                    placeholder="Enter Solana address.."
                    id="search"
                    value={publicKey}
                    onChange={(e) => setPublicKey(e.target.value)}
                    className='bg-transparent text-white p-4 rounded-md  focus:outline-none '
                />
                <button disabled={
                    isAirdropped
                } className={` text-white p-4 rounded-r-xl border-2 border-transparent focus:outline-none focus:border-indigo-500 hover:bg-indigo-600 transition duration-300 ease-in-out ${isAirdropped ? 'bg-green-500' : 'bg-indigo-500'}`} type="submit">Airdrop</button>
            </form>
        </div>
    )
}

export default RequestAirdropPage