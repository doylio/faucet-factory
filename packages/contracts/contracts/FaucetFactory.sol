// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./FaucetToken.sol";

contract FaucetFactory {
    event NewFaucet(address faucet);

    mapping(address => uint256) public faucetCount;
    mapping(address => mapping(uint256 => address)) public faucets;

    function createFaucetToken(
        string memory _name,
        string memory _symbol,
        string memory _imageUrl,
        uint8 _decimals,
        uint256 _dropletAmount,
        uint256 _claimInterval
    ) external {
        FaucetToken token = new FaucetToken(
            _name,
            _symbol, 
            _imageUrl,
            _decimals, 
            _dropletAmount, 
            _claimInterval, 
            msg.sender
        );
        uint256 index = faucetCount[msg.sender]++;
        faucets[msg.sender][index] = address(token);
        emit NewFaucet(address(token));
    }
}
