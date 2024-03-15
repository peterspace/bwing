import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FiSearch } from 'react-icons/fi';

import CloseIcon from '../assets/icons/close.svg';
import { IoIosClose } from 'react-icons/io';

// const customStyles = {
//   overlay: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.40)',
//   },
//   content: {
//     width: '412px',
//     height: '538px',
//     borderRadius: '1.25rem',
//     border: 'none',
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     overflow: 'hidden',
//   },
// };

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

function CountriesModal(props) {
  const {
    filteredTokens,
    isTokenModalOpen,
    setIsTokenModalOpen,
    title,
    paymentMethod,
    cities,
    setCountry,
    setCity,
    country,
    cityData,
    city,
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
      // style={customStyles}
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
        {paymentMethod === 'cash' ? (
          <div className="flex flex-col  mt-[32px] gap-[8px]">
            <div className="flex flex-row bg-chizzySnow dark:bg-background-dark rounded h-[62px] justify-between">
              <div className="w-full">
                <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200 dark:text-gray-600">
                  Country of residence
                </div>
                <div className="ml-2 flex flex-row gap-[8px] items-center w-full mt-[13px]">
                  <div className="mr-4 w-full">
                    <select
                      name="country"
                      className={`cursor-pointer [border:none] outline-none w-full text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 dark:text-gray-100 inline-block bg-[transparent]`}
                      value={country}
                      onChange={(ev) => setCountry(ev.target.value)}
                    >
                      {cities &&
                        cities.map((country, index) => (
                          <option key={index} value={country?.country}>
                            {country?.country}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row bg-chizzySnow dark:bg-background-dark rounded h-[62px] justify-between">
              <div className="w-full">
                <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200 dark:text-gray-600">
                  City
                </div>
                <div className="ml-2 flex flex-row gap-[8px] items-center w-full mt-[13px]">
                  <div className="mr-4 w-full">
                    <select
                      name="city"
                      className={`cursor-pointer [border:none] outline-none w-full text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 dark:text-gray-100 inline-block bg-[transparent]`}
                      value={city}
                      onChange={(ev) => setCity(ev.target.value)}
                    >
                      {cityData &&
                        cityData.map((city, index) => (
                          <option key={index} value={city}>
                            {city}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col mt-[32px] gap-[8px]">
            <div className="flex flex-row bg-chizzySnow dark:bg-background-dark rounded h-[62px] justify-between">
              <div className="w-full">
                <div className="ml-2 mt-2 text-xs leading-[18px] text-darkslategray-200 dark:text-gray-600">
                  Country of residence
                </div>
                <div className="ml-2 flex flex-row gap-[8px] items-center mt-[13px]">
                  <div className="mr-4 w-full">
                    <select
                      name="country"
                      className={`cursor-pointer [border:none] outline-none w-full text-[12px] md:text-[16px] leading-[24px] text-darkslategray-200 dark:text-gray-100 inline-block bg-[transparent]`}
                      value={country}
                      onChange={(ev) => setCountry(ev.target.value)}
                    >
                      {cities &&
                        cities.map((country, index) => (
                          <option key={index} value={country?.country}>
                            {country?.country}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default CountriesModal;
