// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract TokenizedSub is ERC20 {
    address public paymentToken;

    uint256 dividendPerToken;
    mapping(address => uint256) dividendPerTokenWithdrawn;
    mapping(address => uint256) credit;

    constructor(
        uint256 _initialSupply,
        string memory _name,
        string memory _symbol,
        address _minter,
        address _paymentToken
    ) ERC20(_name, _symbol) {
        _mint(_minter, _initialSupply * 10 ** decimals());
        paymentToken = _paymentToken;
    }

    function paySubscription(uint256 _amount) external returns (uint256) {
        require(totalSupply() != 0, 'No tokens minted');
        dividendPerToken += _amount / totalSupply();
        return dividendPerToken;
    }
}
