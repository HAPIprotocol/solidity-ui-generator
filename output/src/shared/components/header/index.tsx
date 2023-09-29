import { getAccount } from '@wagmi/core';
import { useWeb3Modal } from '@web3modal/react';
import React from 'react';

import { useContractContext } from 'shared/providers/contract';
import { sliceString } from 'shared/utils/formatString';

const Header: React.FC = () => {
  const { open } = useWeb3Modal();
  const { address } = getAccount();

  const connectWallet = async () => await open();

  const { selectedContract } = useContractContext();

  return (
    <header className='bg-black'>
      <nav
        className='
        flex
        items-center
        justify-between
        p-6
        '
        aria-label='Global'>
        <div className='flex'>
          <a
            href='#'
            className='-m-1.5 p-1.5'>
            <img
              className='h-8 w-auto'
              src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
              alt=''
            />
          </a>
        </div>
        <div className=''>
          {selectedContract && (
            <a
              onClick={connectWallet}
              href='#'
              className='
            rounded
            h-screen
            font-semibold
            leading-6
            text-white
            border
            p-3
            '>
              {address ? sliceString(address) : ' Connect Wallet'}
            </a>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
