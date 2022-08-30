// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./FaucetToken.sol";

contract FaucetFactory {
    event NewFaucet(
        uint256 index,
        address faucet,
        address owner
    );

    uint256 public faucetCount;
    mapping(uint256 => address) public faucets;

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
        uint256 index = faucetCount++;
        faucets[index] = address(token);
        emit NewFaucet(index, address(token), msg.sender);
    }
}
