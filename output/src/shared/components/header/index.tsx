import React from 'react';

const Header: React.FC = () => {
  return (
    <header className='bg-black'>
      <nav
        className='flex  items-center justify-between p-6'
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
          <a
            href='#'
            className='text-sm font-semibold leading-6 text-white'>
            Connect Wallet
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
