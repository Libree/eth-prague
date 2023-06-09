// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract TokenizedSub is ERC20 {
    address public paymentToken;

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
}
