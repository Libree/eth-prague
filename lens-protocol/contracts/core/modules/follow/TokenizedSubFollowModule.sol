// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import {ModuleBase} from '../ModuleBase.sol';
import {IFollowModule} from '../../../interfaces/IFollowModule.sol';
import {FollowValidatorFollowModuleBase} from './FollowValidatorFollowModuleBase.sol';
import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import {SafeERC20} from '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';
import {TokenizedSub} from './TokenizedSub.sol';

struct ProfileData {
    address currency;
    uint256 amount;
    address recipient;
}

contract TokenizedSubFollowModule is IFollowModule, FollowValidatorFollowModuleBase {
    using SafeERC20 for IERC20;

    mapping(uint256 => ProfileData) internal _dataByProfile;

    event Subscription(
        uint256 indexed profileId,
        address indexed follower,
        uint256 indexed amount,
        address tokenAddress
    );

    constructor(address hub) ModuleBase(hub) {}

    function initializeFollowModule(
        uint256 profileId,
        bytes calldata data
    ) external override onlyHub returns (bytes memory) {
        (
            uint256 initialSupply,
            string memory name,
            string memory symbol,
            address minter,
            uint256 amount,
            address currency
        ) = abi.decode(data, (uint256, string, string, address, uint256, address));

        TokenizedSub tokenizedSub = new TokenizedSub(initialSupply, name, symbol, minter, currency);

        _dataByProfile[profileId].amount = amount;
        _dataByProfile[profileId].currency = currency;
        _dataByProfile[profileId].recipient = address(tokenizedSub);
    }

    function processFollow(
        address follower,
        uint256 profileId,
        bytes calldata data
    ) external override onlyHub {
        uint256 amount = _dataByProfile[profileId].amount;
        address currency = _dataByProfile[profileId].currency;
        address recipient = _dataByProfile[profileId].recipient;

        IERC20(currency).safeTransferFrom(follower, recipient, amount);
        TokenizedSub(recipient).paySubscription(amount);

        emit Subscription(profileId, follower, amount, recipient);
    }

    function followModuleTransferHook(
        uint256 profileId,
        address from,
        address to,
        uint256 followNFTTokenId
    ) external override {}

    function getProfileData(uint256 profileId) external view returns (ProfileData memory) {
        return _dataByProfile[profileId];
    }
}
