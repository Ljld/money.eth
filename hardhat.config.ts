import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const config: HardhatUserConfig = {
  solidity: '0.8.19',
  paths: {
    artifacts: './src/artifacts'
  },
  networks: {
    hardhat: {
      chainId: 1337,
      from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
    }
  }
};

export default config;
