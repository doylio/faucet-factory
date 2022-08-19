// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FaucetToken is ERC20 {    
    event ClaimDroplet (
        address from,
        uint256 amount
    );

    uint256 public dropletAmount;
    uint256 public claimInterval;
    uint8 private decimals_;
    address public owner;
    mapping(address => uint256) public lastClaimedAt;

    constructor(
        string memory _name, 
        string memory _symbol,
        uint8 _decimals,
        uint256 _dropletAmount,
        uint256 _claimInterval,
        address _owner
    ) ERC20(_name, _symbol) {
        dropletAmount = _dropletAmount;
        claimInterval = _claimInterval;
        decimals_ = _decimals;
        owner = _owner;
    }

    function setParams(uint256 _dropletAmount, uint256 _claimInterval) external onlyOwner {
        dropletAmount = _dropletAmount;
        claimInterval = _claimInterval;
    }

    function mint(address _to, uint256 _amount) external onlyOwner {
        require(_to != address(0));
        require(_amount > 0);
        _mint(_to, _amount);
    }

    function claimDroplet() external {
        require(lastClaimedAt[msg.sender] + claimInterval < block.timestamp, "Too soon to claim again");
        _mint(msg.sender, dropletAmount);
        lastClaimedAt[msg.sender] = block.timestamp;
        emit ClaimDroplet(msg.sender, dropletAmount);
    }

    function decimals() public view override returns (uint8) {
        return decimals_;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

}
