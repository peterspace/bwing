import React, { useEffect, useState } from 'react';
import {
  Card,
  List,
  ListItem,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';
import { MdInbox } from 'react-icons/md';
import { RiPencilFill } from 'react-icons/ri';
import { FaSackDollar } from 'react-icons/fa6';
import { GiCardExchange } from 'react-icons/gi';
import { FaExchangeAlt } from 'react-icons/fa';
import { FaWallet } from 'react-icons/fa';
import { MdMessage } from 'react-icons/md';
import { FaBitcoin } from 'react-icons/fa';
import { FaCircleDollarToSlot } from 'react-icons/fa6';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { BsCashCoin } from 'react-icons/bs';
import { FaRegCreditCard } from 'react-icons/fa6';
import { MdAlternateEmail } from 'react-icons/md';
import { MdSupportAgent } from 'react-icons/md';

export const DashboardMenuAdmin = (props) => {
  const { setPage, page, mode, user } = props;

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(0);
  const [activePage, setActivePage] = useState('');

  const [name, surname] = user.name.split(' ');

  useEffect(() => {
    if (page.includes('Buy')) {
      setIsSubMenuOpen(1);
    }
    if (page.includes('Sell')) {
      setIsSubMenuOpen(2);
    }

    if (page.includes('Create')) {
      setIsSubMenuOpen(3);
    }
    if (page.includes('Inbox')) {
      setIsSubMenuOpen(3);
    }
    setActivePage(page);
  }, [page]);

  const handleOpen = (value) => {
    setIsSubMenuOpen(isSubMenuOpen === value ? 0 : value);
  };

  return (
    <Card 
    // className="h-[calc(100vh-2rem)] w-[18%] p-10 pr-6 shadow-xl shadow-blue-gray-900/5 box-border rounded-none bg-white dark:bg-app-container-dark text-gray-900 dark:text-gray-100"
    className="h-[calc(100vh-2rem)] w-[300px] p-10 pr-6 shadow-xl shadow-blue-gray-900/5 box-border rounded-none bg-white dark:bg-app-container-dark text-gray-900 dark:text-gray-100"
    >
      <div className="flex mb-14 items-center">
        <div
          style={{
            backgroundImage: `url(${user?.photo})`,
          }}
          className="w-12 h-12 rounded-[24px] bg-cover bg-center"
        ></div>
        <div className="flex flex-col ml-2 text-base text-gray-900 dark:text-gray-100 font-normal">
          <div>{name}</div>
          <div>{surname}</div>
        </div>
      </div>
      <List className="text-gray-900 dark:text-gray-100 w-[92%] p-0 font-normal gap-2">
        <ListItem
          ripple={false}
          className={`cursor-pointer p-2 rounded-lg ${
            activePage === 'Exchange' ? 'bg-[#ECEAFF] text-[#5046E5]' : ''
          }`}
          onClick={() => {
            setIsSubMenuOpen(0);
            setPage('Exchange');
          }}
        >
          <div
            className={`flex flex-row gap-2 items-center mr-auto font-normal text-base ${
              activePage === 'Exchange'
                ? 'text-[#5046E5]'
                : 'text-chizzyblue dark:text-gray-100'
            }`}
          >
            <FaExchangeAlt size={20} />
            <div className=""> Exchange</div>
          </div>
        </ListItem>

        <Accordion
          open={isSubMenuOpen === 1}
          icon={
            isSubMenuOpen === 1 ? (
              <div className={`text-indigo-600 dark:text-indigo-600`}>
                <IoIosArrowDown size={20} />
              </div>
            ) : (
              <div className={`text-chizzyblue dark:text-gray-100`}>
                <IoIosArrowUp size={20} />
              </div>
            )
          }
        >
          <ListItem
            ripple={false}
            className={`p-0 w-full ${
              isSubMenuOpen === 1 ? 'bg-[#ECEAFF]' : ''
            }`}
            selected={isSubMenuOpen === 2}
          >
            <AccordionHeader
              onClick={() => {
                handleOpen(1);
                setPage('Buy (Cash)');
              }}
              className="border-b-0 py-3 px-2 m-0 bg-transparent focus:bg-transparent shadow-none focus:shadow-none text-gray-900 dark:text-gray-100"
            >
              <div
                className={`flex flex-row gap-2 items-center mr-auto font-normal text-base ${
                  isSubMenuOpen === 1
                    ? 'text-[#5046E5]'
                    : 'text-chizzyblue dark:text-gray-100'
                }`}
              >
                <FaBitcoin size={20} />
                <div className="">Buy</div>
              </div>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-2 px-5">
            <List className="p-0">
              <ListItem
                className={`cursor-pointer w-[80%] p-2 rounded-lg ${
                  activePage === 'Buy (Cash)' ? 'text-[#5046E5] font-bold' : ''
                }`}
                ripple={false}
                onClick={() => {
                  setPage('Buy (Cash)');
                }}
              >
                <div
                  className={`flex flex-row gap-2 items-center ${
                    activePage === 'Buy (Cash)'
                      ? 'text-[#5046E5] font-bold'
                      : 'text-chizzyblue dark:text-gray-100'
                  }`}
                >
                  <BsCashCoin size={20} />
                  <div className="">Cash</div>
                </div>
              </ListItem>
              <ListItem
                className={`cursor-pointer w-[80%] p-2 rounded-lg ${
                  activePage === 'Buy (Card)' ? 'text-[#5046E5] font-bold' : ''
                }`}
                ripple={false}
                onClick={() => {
                  setPage('Buy (Card)');
                }}
              >
                <div
                  className={`flex flex-row gap-2 items-center ${
                    activePage === 'Buy (Card)'
                      ? 'text-[#5046E5] font-bold'
                      : 'text-chizzyblue dark:text-gray-100'
                  }`}
                >
                  <FaRegCreditCard size={20} />
                  <div className="">Card</div>
                </div>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>

        <Accordion
          open={isSubMenuOpen === 2}
          icon={
            isSubMenuOpen === 2 ? (
              <div className={`text-indigo-600 dark:text-indigo-600`}>
                <IoIosArrowDown size={20} />
              </div>
            ) : (
              <div className={`text-chizzyblue dark:text-gray-100`}>
                <IoIosArrowUp size={20} />
              </div>
            )
          }
        >
          <ListItem
            ripple={false}
            className={`p-0 ${isSubMenuOpen === 2 ? 'bg-[#ECEAFF]' : ''}`}
            selected={isSubMenuOpen === 2}
          >
            <AccordionHeader
              onClick={() => {
                handleOpen(2);
                setPage('Sell (Cash)');
              }}
              className="border-b-0 py-3 px-2 m-0 bg-transparent focus:bg-transparent shadow-none focus:shadow-none text-gray-900 dark:text-gray-100"
            >
              <div
                className={`flex flex-row gap-2 items-center mr-auto font-normal text-base ${
                  isSubMenuOpen === 2
                    ? 'text-[#5046E5]'
                    : 'text-chizzyblue dark:text-gray-100'
                }`}
              >
                <FaCircleDollarToSlot size={20} />
                <div className="">Sell</div>
              </div>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-2 px-5">
            <List className="p-0">
              <ListItem
                className={`cursor-pointer w-[80%] p-2 rounded-lg ${
                  activePage === 'Sell (Cash)' ? 'text-[#5046E5] font-bold' : ''
                }`}
                ripple={false}
                onClick={() => {
                  setPage('Sell (Cash)');
                }}
              >
                <div
                  className={`flex flex-row gap-2 items-center ${
                    activePage === 'Sell (Cash)'
                      ? 'text-[#5046E5] font-bold'
                      : 'text-chizzyblue dark:text-gray-100'
                  }`}
                >
                  <BsCashCoin size={20} />
                  <div className="">Cash</div>
                </div>
              </ListItem>
              <ListItem
                className={`cursor-pointer w-[80%] p-2 rounded-lg ${
                  activePage === 'Sell (Card)' ? 'text-[#5046E5] font-bold' : ''
                }`}
                ripple={false}
                onClick={() => {
                  setPage('Sell (Card)');
                }}
              >
                <div
                  className={`flex flex-row gap-2 items-center ${
                    activePage === 'Sell (Card)'
                      ? 'text-[#5046E5] font-bold'
                      : 'text-chizzyblue dark:text-gray-100'
                  }`}
                >
                  <FaRegCreditCard size={20} />
                  <div className="">Card</div>
                </div>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>

        <ListItem
          ripple={false}
          className={`cursor-pointer p-2 pl-1.5 rounded-lg ${
            activePage === 'Defi' ? 'bg-[#ECEAFF] text-[#5046E5]' : ''
          }`}
          onClick={() => {
            setIsSubMenuOpen(0);
            setPage('Defi');
          }}
        >
          <div
            className={`flex flex-row gap-2 items-center mr-auto font-normal text-base ${
              activePage === 'Defi'
                ? 'text-[#5046E5]'
                : 'text-chizzyblue dark:text-gray-100'
            }`}
          >
            <GiCardExchange size={20} />
            <div className=""> Defi</div>
          </div>
        </ListItem>

        <ListItem
          ripple={false}
          className={`cursor-pointer p-2 pl-1.5 rounded-lg ${
            activePage === 'Profit' ? 'bg-[#ECEAFF] text-[#5046E5]' : ''
          }`}
          onClick={() => {
            setIsSubMenuOpen(0);
            setPage('Profit');
          }}
        >
          <div
            className={`flex flex-row gap-2 items-center mr-auto font-normal text-base ${
              activePage === 'Profit'
                ? 'text-[#5046E5]'
                : 'text-chizzyblue dark:text-gray-100'
            }`}
          >
            <FaSackDollar size={20} />
            <div className="">Profit</div>
          </div>
        </ListItem>

        <ListItem
          ripple={false}
          className={`cursor-pointer p-2 pl-1.5 rounded-lg ${
            activePage === 'Wallet' ? 'bg-[#ECEAFF] text-[#5046E5]' : ''
          }`}
          onClick={() => {
            setIsSubMenuOpen(0);
            setPage('Wallet');
          }}
        >
          <div
            className={`flex flex-row gap-2 items-center mr-auto font-normal text-base ${
              activePage === 'Wallet'
                ? 'text-[#5046E5]'
                : 'text-chizzyblue dark:text-gray-100'
            }`}
          >
            <FaWallet size={20} />
            <div className="">Wallet</div>
          </div>
        </ListItem>

        <Accordion
          open={isSubMenuOpen === 3}
          icon={
            isSubMenuOpen === 3 ? (
              <div className={`text-indigo-600 dark:text-indigo-600`}>
                <IoIosArrowDown size={20} />
              </div>
            ) : (
              <div className={`text-chizzyblue dark:text-gray-100`}>
                <IoIosArrowUp size={20} />
              </div>
            )
          }
        >
          <ListItem
            ripple={false}
            className={`p-0 w-full ${
              isSubMenuOpen === 3 ? 'bg-[#ECEAFF]' : ''
            }`}
            selected={isSubMenuOpen === 3}
          >
            <AccordionHeader
              onClick={() => {
                handleOpen(3);
                setPage('Create');
              }}
              className="border-b-0 py-3 px-2 m-0 bg-transparent focus:bg-transparent shadow-none focus:shadow-none text-gray-900 dark:text-gray-100"
            >
              <div
                className={`flex flex-row gap-2 items-center mr-auto font-normal text-base ${
                  isSubMenuOpen === 3
                    ? 'text-[#5046E5]'
                    : 'text-chizzyblue dark:text-gray-100'
                }`}
              >
                <MdMessage size={20} />
                <div className="flex flex-row">Messages</div>
                <div
                  className={`flex flex-row rounded px-2 py-1 text-smi ${
                    isSubMenuOpen === 3
                      ? 'bg-indigo-900 dark:bg-indigo-600 text-white dark:text-gray-100'
                      : 'bg-gray-100 dark:bg-indigo-900'
                  }`}
                >
                  7
                </div>
              </div>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-2 px-5">
            <List className="p-0">
              <ListItem
                className={`cursor-pointer w-[80%] p-2 rounded-lg ${
                  activePage === 'Create' ? 'text-[#5046E5] font-bold' : ''
                }`}
                ripple={false}
                onClick={() => {
                  setPage('Create');
                }}
              >
                <div
                  className={`flex flex-row gap-2 items-center ${
                    activePage === 'Create'
                      ? 'text-[#5046E5] font-bold'
                      : 'text-chizzyblue dark:text-gray-100'
                  }`}
                >
                  <RiPencilFill size={20} />
                  <div className="">Create</div>
                </div>
              </ListItem>
              <ListItem
                className={`cursor-pointer w-[80%] p-2 rounded-lg ${
                  activePage === 'Inbox' ? 'text-[#5046E5] font-bold' : ''
                }`}
                ripple={false}
                onClick={() => {
                  setPage('Inbox');
                }}
              >
                <div
                  className={`flex flex-row gap-8 items-center ${
                    activePage === 'Inbox'
                      ? 'text-[#5046E5] font-bold'
                      : 'text-chizzyblue dark:text-gray-100'
                  }`}
                >
                  <div
                    className={`flex flex-row gap-2 items-center ${
                      activePage === 'Inbox'
                        ? 'text-[#5046E5] font-bold'
                        : 'text-chizzyblue dark:text-gray-100'
                    }`}
                  >
                    <MdInbox size={20} />
                    <div className="">Inbox</div>
                  </div>
                  <div className="">7</div>
                </div>
              </ListItem>
            </List>
          </AccordionBody>
        </Accordion>
        <ListItem
          ripple={false}
          className={`cursor-pointer p-2 rounded-lg ${
            activePage === 'Enquiries' ? 'bg-[#ECEAFF] text-[#5046E5]' : ''
          }`}
          onClick={() => {
            setIsSubMenuOpen(0);
            setPage('Enquiries');
          }}
        >
          <div
            className={`flex flex-row gap-2 items-center mr-auto font-normal text-base ${
              activePage === 'Enquiries'
                ? 'text-[#5046E5]'
                : 'text-chizzyblue dark:text-gray-100'
            }`}
          >
            <MdAlternateEmail size={20} />
            <div className="">Enquiries</div>
          </div>
        </ListItem>
        <ListItem
          ripple={false}
          className={`cursor-pointer p-2 rounded-lg ${
            activePage === 'Support' ? 'bg-[#ECEAFF] text-[#5046E5]' : ''
          }`}
          onClick={() => {
            setIsSubMenuOpen(0);
            setPage('Support');
          }}
        >
          <div
            className={`flex flex-row gap-2 items-center mr-auto font-normal text-base ${
              activePage === 'Support'
                ? 'text-[#5046E5]'
                : 'text-chizzyblue dark:text-gray-100'
            }`}
          >
            <MdSupportAgent size={20} />
            <div className="">Support</div>
          </div>
        </ListItem>
      </List>
    </Card>
  );
};

//Support
