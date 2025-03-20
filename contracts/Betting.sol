// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Betting {
    address payable public immutable owner; // Use immutable for gas savings

    constructor() {
        owner = payable(msg.sender);
    }

    function rewardWinner(address payable winner, uint256 amount) external {
        uint256 payout = amount * 2;
        require(address(this).balance >= payout, "Insufficient balance");

        (bool success,) = winner.call{value: payout}("");
        require(success, "Transfer failed");
    }

    function placeBet() external payable {
        require(msg.value > 0, "Must send some amount");
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getPlayerBalance(address player) external view returns (uint256) {
        return player.balance;
    }

    receive() external payable {}
}

// ContractAddress = 0x31aa6880d8c7ab269c6923114b4981b00723dcf9