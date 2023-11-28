// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

contract Wallet {
    address payable private owner;
    mapping(address => uint256) private balances;

    constructor() {
        owner = payable(msg.sender);
    }

    modifier onlyOwner {
        require(
            msg.sender == owner,
            "Only owner can call this function."
        );
        _;
    }

    receive() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint _amount) external {
        require(balances[msg.sender] >= _amount, "You don't have enough credit on the contract.");
        balances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
    }

    function getUserBalance() external view returns (uint) {
        return balances[msg.sender];
    }

    function getContractBalance() external view onlyOwner returns (uint) {
        return address(this).balance;
    }
}