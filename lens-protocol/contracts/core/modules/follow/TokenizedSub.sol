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

    function withdraw(uint256 _amount) external {
        uint256 holderBalance = balanceOf(msg.sender);
        require(holderBalance != 0, 'caller has no shares');

        uint256 claimableAmount = (
            ((dividendPerToken - dividendPerTokenWithdrawn[msg.sender]) * holderBalance)
        );
        claimableAmount += credit[msg.sender];

        require(_amount <= claimableAmount, 'Not enough funds');

        credit[msg.sender] = 0;
        dividendPerTokenWithdrawn[msg.sender] = dividendPerToken;
        IERC20(paymentToken).transfer(msg.sender, _amount);
    }

    function paySubscription(uint256 _amount) external returns (uint256) {
        require(totalSupply() != 0, 'No tokens minted');
        dividendPerToken += _amount / totalSupply();
        return dividendPerToken;
    }

    function getDividendPerToken() external view returns (uint256) {
        return dividendPerToken;
    }

    function getDividendPerTokenWithdrawn(address _to) external view returns (uint256) {
        return dividendPerTokenWithdrawn[_to];
    }

    function _withdrawToCredit(address to_) private {
        uint256 recipientBalance = balanceOf(to_);
        uint256 amount = (dividendPerToken - dividendPerTokenWithdrawn[to_]) * recipientBalance;
        credit[to_] += amount;
        dividendPerTokenWithdrawn[to_] = dividendPerToken;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override {
        if (from == address(0) || to == address(0)) return;
        _withdrawToCredit(to);
        _withdrawToCredit(from);
    }

    function claimableAmount(address to_) external view returns (uint256) {
        uint256 claimable = 0;
        uint256 recipientBalance = balanceOf(to_);
        if (recipientBalance != 0) {
            uint256 amount = (
                ((dividendPerToken - dividendPerTokenWithdrawn[to_]) * recipientBalance)
            );
            claimable = credit[to_] + amount;
        }

        return claimable;
    }
}
