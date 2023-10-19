import { AptosAccount, AptosClient, HexString, TokenClient } from "aptos";
import random from "lodash/random";
import { delayProgress, readListFromFile } from "./utils";

const KEYS_FILENAME = "keys.txt";
const RPC_URL = "https://rpc.ankr.com/http/aptos/v1";
const DELAY_FROM_SEC = 100;
const DELAY_TO_SEC = 200;

const keys = await readListFromFile(KEYS_FILENAME);
const client = new AptosClient(RPC_URL);

for (const key of keys) {
  const account = new AptosAccount(new HexString(key).toUint8Array());
  const { address } = account.toPrivateKeyObject();

  console.log(`Address: ${address}`);

  const tokenClient = new TokenClient(client);

  try {
    const result = await tokenClient.optInTokenTransfer(account, true);

    console.log(`https://explorer.aptoslabs.com/txn/${result}?network=mainnet`);
  } catch (error) {
    console.error(error.message);
  }

  console.log("-------------");

  const delayTimeout = random(DELAY_FROM_SEC, DELAY_TO_SEC);
  await delayProgress(delayTimeout);
}
