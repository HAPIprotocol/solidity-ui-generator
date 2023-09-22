// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GenericContract {
    IERC20 public token; // Instance of the ERC20 token
    
    event CalledWithString(string arg);
    event CalledWithUint(uint256 arg);
    event CalledWithAddress(address arg);
    event CalledWithBytes(bytes arg);
    event CalledWithBytes32(bytes32 arg);
    event CalledWithStringArray(string[] args);
    event TokenTransferred(address to, uint256 amount);
    
    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress); // Initialize the token instance with provided address
    }

    function callWithString(string memory arg) public {
        emit CalledWithString(arg);
    }
    
    function callWithUint(uint256 arg) public {
        emit CalledWithUint(arg);
    }
    
    function callWithAddress(address arg) public {
        emit CalledWithAddress(arg);
    }
    
    function callWithBytes(bytes memory arg) public {
        emit CalledWithBytes(arg);
    }
    
    function callWithBytes32(bytes32 arg) public {
        emit CalledWithBytes32(arg);
    }
    
    function callWithStringArray(string[] memory args) public {
        emit CalledWithStringArray(args);
    }

    // Transfer tokens from this contract to another address
    function transferTokens(address to, uint256 amount) public returns (bool) {
        require(token.transfer(to, amount), "Token transfer failed");
        emit TokenTransferred(to, amount);
        return true;
    }
}