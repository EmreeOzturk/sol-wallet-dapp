import fs from 'fs';
import {
  Keypair,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { getBalances, readDirectoriesAndGetWallets, getPublicKeys } from './utils';

export default async function Home() {

  async function handleAccountCreation(formData: FormData) {
    "use server"
    const walletName = formData.get('name');
    console.log(walletName)
    if (walletName) {
      const newWallet = Keypair.generate();
      console.log(newWallet.publicKey.toBase58());
      console.log(newWallet.secretKey);
      const newWalletPath = process.env.SystemDrive + '/.config/solana/' + walletName + '.json';
      fs.writeFileSync(newWalletPath, JSON.stringify(Array.from(newWallet.secretKey)));
      console.log(newWallet.publicKey.toBase58());
    }
  }


  const { fileArray, walletArray } = readDirectoriesAndGetWallets();
  const publicKeys = getPublicKeys(walletArray);
  const balances = await getBalances(publicKeys, fileArray);


  return (
    <div className="bg-slate-700 h-full  justify-center items-center flex flex-col" >
      <h1 className="text-4xl bg-gradient-to-bl from-indigo-400 via-slate-400 to-indigo-400 text-transparent bg-clip-text">Welcome to the Solana Wallet</h1>

      <form className='m-4 bg-gradient-to-t from-indigo-500 to-slate-800 rounded-xl' action={handleAccountCreation}
      >
        <input name='name' type="text" placeholder='enter your wallet name'
          className='bg-transparent text-white p-4 rounded-md  focus:outline-none '
        />
        <button
          type='submit'
          className='
          bg-indigo-500 text-white p-4 rounded-r-xl border-2 border-transparent focus:outline-none focus:border-indigo-500 hover:bg-indigo-600 transition duration-300 ease-in-out
          '
        >
          Create Wallet
        </button>
      </form>


      <div className='m-4 bg-gradient-to-t from-indigo-500 to-slate-800 rounded-xl p-6'>
        <h2 className='text-white text-2xl mb-4'>Your Wallets</h2>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='text-left text-white'>Wallet Name</th>
              <th className='text-left text-white'>Public Key</th>
              <th className='text-left text-white'>Balance (SOL)</th>
            </tr>
          </thead>
          <tbody>
            {balances.map((balance) => (
              <tr key={balance.walletName} className='border-b border-indigo-700'>
                <td className='py-2 text-white'>{balance.walletName}</td>
                <td className='py-2 text-white'>{balance.publicKey}</td>
                <td className='py-2 text-white'>{(balance.balance / LAMPORTS_PER_SOL).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
