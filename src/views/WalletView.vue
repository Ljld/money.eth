<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ethers } from 'ethers';
import Wallet from '../artifacts/contracts/Wallet.sol/Wallet.json';

let userMetamaskBalance = ref(0);
let userContractBalance = ref(0);
let totalContractBalance = ref(0);

let amountToSend = ref('0');
let amountToWithdraw = ref('0');

const contractOwner = ref('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266');
const contractAddress = ref('0x5FbDB2315678afecb367f032d93F642f64180aa3');
const userAddress = ref();

const userIsContractOwner = ref(false);

onMounted(async () => {
  userAddress.value = (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0];
  userIsContractOwner.value = userAddress.value === contractOwner.value;

  await refreshBalances();
});

const checkMetamask = async () => {
  if (window.ethereum == null) {
    alert('Connect to metamask !!');
    return;
  }

  userAddress.value = (await window.ethereum.request({ method: 'eth_requestAccounts' }))[0];
  userIsContractOwner.value = userAddress.value === contractOwner.value;
};

const getUserMetamaskBalance = async (): Promise<number> => {
  await checkMetamask();
  const provider = new ethers.BrowserProvider(window.ethereum);
  const balance = await provider.getBalance(userAddress.value);

  return Number(ethers.formatEther(balance));
};

const getUserContractBalance = async (): Promise<number> => {
  await checkMetamask();
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress.value, Wallet.abi, signer);
  const userContractBalance = await contract.getUserBalance();

  return Number(ethers.formatEther(userContractBalance));
};

const getTotalContractBalance = async () => {
  await checkMetamask();
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress.value, Wallet.abi, signer);
  const totalContractBalance = await contract.getContractBalance();

  return Number(ethers.formatEther(totalContractBalance));
};

const refreshBalances = async () => {
  userMetamaskBalance.value = await getUserMetamaskBalance();
  userContractBalance.value = await getUserContractBalance();
  totalContractBalance.value = userIsContractOwner.value ? await getTotalContractBalance() : 0;
};

const sendToContract = async (amount: string) => {
  await checkMetamask();
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const tx = await signer.sendTransaction({
    to: contractAddress.value,
    value: ethers.parseEther(amount)
  });

  await tx.wait();
  await refreshBalances();
};

const withdrawFromContract = async (amount: string) => {
  await checkMetamask();
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress.value, Wallet.abi, signer);

  const tx = await contract.withdraw(ethers.parseEther(amount), {
    gasLimit: 20000000,
    gasPrice: ethers.parseUnits('100', 'gwei')
  });

  await tx.wait();
  await refreshBalances();
};
</script>

<template>
  <h1>money.eth</h1>
  <div class="container">
    <div class="form send-form">
      <div class="input-group send-input-group">
        <input
          v-model="amountToSend"
          type="text"
          class="money-input"
          name="send-input"
          id="send-input"
        />
        <span>ETH</span>
      </div>
      <button @click="sendToContract(amountToSend)">Send money</button>
    </div>
    <div class="form withdraw-form">
      <div class="input-group withdraw-input-group">
        <input
          v-model="amountToWithdraw"
          type="text"
          class="money-input"
          name="withdraw-input"
          id="withdraw-input"
        />
        <span>ETH</span>
      </div>
      <button @click="withdrawFromContract(amountToWithdraw)">Withdraw</button>
    </div>
  </div>
  <div class="balance-container">
    <span>Current user address : {{ userAddress }}</span>
    <span>My Metamask balance : {{ userMetamaskBalance }} ETH</span>
    <span>My Contract balance : {{ userContractBalance }} ETH</span>
  </div>
  <span v-if="userIsContractOwner">
    (Owner) Total contract balance : {{ totalContractBalance }}
  </span>
</template>

<style scoped>
h1 {
  font-family: 'Zilla Slab', serif;
}

.container {
  display: flex;
  margin-bottom: 3em;
}

.balance-container {
  display: flex;
  flex-direction: column;
}

.form {
  display: flex;
  flex-direction: column;
}

.money-input {
  margin-right: 1em;
}

.input-group {
  padding: 3em;
}

button {
  margin: auto;
}
</style>
