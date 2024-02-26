import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FiSearch } from 'react-icons/fi';
import { IoIosClose } from 'react-icons/io';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.40)',
  },
  content: {
    width: '320px',
    height: '538px',
    borderRadius: '1.25rem',
    border: 'none',
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
  },
};

const customStyleDark = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.40)',
  },
  content: {
    width: '320px',
    height: '538px',
    borderRadius: '1.25rem',
    border: 'none',
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'hidden',
    backgroundColor: '#161621',
  },
};

Modal.setAppElement('#root');

function TokenModal(props) {
  const {
    filteredTokens,
    setToken,
    allTokens,
    service,
    isTokenModalOpen,
    setIsTokenModalOpen,
    isNotCrypto,
    title,
  } = props;

  const [searchTerm, setSearchTerm] = useState('');
  const [tokensList, setTokensList] = useState([]);

  const modeL = localStorage.getItem('mode')
    ? JSON.parse(localStorage.getItem('mode'))
    : false;

  useEffect(() => {
    if (filteredTokens) {
      setTokensList(filteredTokens);
    }
  }, [filteredTokens]);

  useEffect(() => {
    handleSearchToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const closeModal = () => {
    setIsTokenModalOpen(false);
  };

  const setTokenChainBg = (tokenChain) => {
    switch (tokenChain) {
      case 'Bitcoin':
        return 'bg-[#FFBC6C]';
      case 'Tron':
        return 'bg-[#3EDFAD]';
      case 'Ethereum':
        return 'bg-[#B3C2FF]';
      case 'Binance':
        return 'bg-[#FBD953]';
      case 'Polygon':
        return 'bg-[#D9B9FF]';
      case 'Arbitrum':
        return 'bg-[#C1DAFF]';
      case 'Optimism':
        return 'bg-[#FF9993]';
      default:
        return;
    }
  };

  const handleSearchToken = () => {
    const searchResult = filteredTokens?.filter(
      (token) =>
        token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTokensList(searchResult);
  };

  return (
    <Modal
      isOpen={isTokenModalOpen}
      onRequestClose={closeModal}
      style={modeL ? customStyles : customStyleDark}
      contentLabel="Token Modal"
    >
      <div className="flex flex-col px-4 pt-4 bg-white dark:bg-app-container-dark rounded-3xl">
        <div className="flex h-8 justify-between mb-6">
          <div className="text-5xl leading-8 text-black dark:text-white font-medium">
            {title}
          </div>
          <span
            className="transition-transform duration-300 hover:scale-110 cursor-pointer text-slate-600 hover:text-slate-700 dark:text-gray-100 rounded-lg bg-chizzySnow dark:bg-chizzy ms-auto -mx-1.5 -my-1.5 h-[36px] w-[36px] border border-solid border-lightslategray-300 dark:border-lightslategray-100"
            onClick={closeModal}
          >
            {' '}
            <IoIosClose size={36} />
          </span>
        </div>
        <div className="flex flex-col justify-between">
          <div className="relative flex items-center mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-600">
              <FiSearch color="gray" />
            </div>
            <input
              className="w-full pl-10 pr-2 rounded-lg text-slate-800 dark:text-gray-600 bg-white dark:bg-background-dark border border-solid border-lightslategray-300 dark:border-lightslategray-300 h-[44px] focus:outline-none"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-col h-[400px] w-full overflow-y-scroll">
            {tokensList?.map((token, i) => (
              <div
                key={i}
                className="flex justify-between items-center cursor-pointer p-2 h-12 hover:bg-[#F6F6F6] dark:hover:bg-background-dark rounded-lg transition-all duration-300 ease-in-out"
                onClick={() => {
                  setToken(token);
                  setIsTokenModalOpen(false);
                }}
              >
                <div className="flex">
                  <img
                    className={isNotCrypto ? 'w-16' : 'w-8'}
                    src={token?.image}
                    alt={token?.symbol}
                  />

                  <div className="flex flex-col ml-2">
                    <div className="text-dark dark:text-white text-sm font-medium">
                      {token?.symbol.toUpperCase()}
                    </div>
                    <div className="text-sm text-[#ACACAC]">{token?.name}</div>
                  </div>
                </div>
                <div
                  className={`
                  py-1 px-2 rounded text-[#111111] border border-solid border-lightslategray-300 dark:border-lightslategray-100
                  ${setTokenChainBg(token?.chain)}
                `}
                >
                  {token?.chain}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default TokenModal;
