"use server";
import {
  Connection,
  PublicKey,
  Keypair,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import fs from "fs";
export const getBalances = async (publicKeys: any, fileArray: any) => {
  const connection = new Connection("https://api.devnet.solana.com");
  const balances = await Promise.all(
    publicKeys.map(async (publicKey: any) => {
      const walletName = fileArray[publicKeys.indexOf(publicKey)];
      const balance = await connection.getBalance(new PublicKey(publicKey));
      return { walletName, publicKey, balance };
    })
  );
  return balances;
};

export const readDirectoriesAndGetWallets = () => {
  const fileArray: string[] = [];
  const walletArray: any[] = [];
  fs.readdirSync(process.env.SystemDrive + "/.config/solana").forEach(
    (file) => {
      if (file.endsWith(".json")) {
        fileArray.push(file);
        const fileBuffer = fs.readFileSync(
          process.env.SystemDrive + "/.config/solana/" + file
        );
        const keyPair = Keypair.fromSecretKey(
          Uint8Array.from(JSON.parse(fileBuffer.toString()))
        );
        walletArray.push(keyPair);
      }
    }
  );

  fs.readdirSync(
    process.env.SystemDrive + "" + process.env.HOMEPATH + "/.config/solana"
  ).forEach((file) => {
    if (file.endsWith(".json")) {
      fileArray.push(file);
      const fileBuffer = fs.readFileSync(
        process.env.SystemDrive +
          "" +
          process.env.HOMEPATH +
          "/.config/solana/" +
          file
      );
      const keyPair = Keypair.fromSecretKey(
        Uint8Array.from(JSON.parse(fileBuffer.toString()))
      );
      walletArray.push(keyPair);
    }
  });

  return { fileArray, walletArray };
};

export const getPublicKeys = (walletArray: any) => {
  const publicKeys = walletArray.map((wallet: any) =>
    new PublicKey(wallet.publicKey).toBase58()
  );
  return publicKeys;
};

export const sendSol = async (to: string, amount: number) => {
  const { fileArray, walletArray } = readDirectoriesAndGetWallets();
  const Keypair = walletArray[0];
  const connection = new Connection("https://api.devnet.solana.com");
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: Keypair.publicKey,
      toPubkey: to as unknown as PublicKey,
      lamports: amount * LAMPORTS_PER_SOL,
    })
  );
  await sendAndConfirmTransaction(connection, transaction, [Keypair]);
};
