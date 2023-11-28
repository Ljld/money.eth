import { ethers } from 'hardhat';

async function main() {
  const wallet = await ethers.deployContract('Wallet');

  await wallet.waitForDeployment();

  console.log(`Wallet deployed to ${wallet.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
