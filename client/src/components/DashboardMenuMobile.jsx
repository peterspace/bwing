import React, { useEffect, useState } from "react";
import {
  Card,
  List,
  ListItem,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { MdInbox } from "react-icons/md";
import { RiPencilFill } from "react-icons/ri";
import { FaSackDollar } from "react-icons/fa6";
import { GiCardExchange } from "react-icons/gi";
import { FaExchangeAlt } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { FaBitcoin } from "react-icons/fa";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { BsCashCoin } from "react-icons/bs";
import { FaRegCreditCard } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { MdSupportAgent } from "react-icons/md";

export const DashboardMenuMobile = (props) => {
  const { setPage, page, user } = props;

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(0);
  const [activePage, setActivePage] = useState("");
  const [isExpand, setIsExpand] = useState(false);

  const [name, surname] = user.name.split(" ");

  useEffect(() => {
    if (page.includes("Buy")) {
      setIsSubMenuOpen(1);
    }
    if (page.includes("Sell")) {
      setIsSubMenuOpen(2);
    }

    if (page.includes("Create")) {
      setIsSubMenuOpen(3);
    }
    if (page.includes("Inbox")) {
      setIsSubMenuOpen(3);
    }
    setActivePage(page);
  }, [page]);

  const handleOpen = (value) => {
    setIsSubMenuOpen(isSubMenuOpen === value ? 0 : value);
  };

  const handleOpenMenu = () => {
    setIsExpand((prev) => !prev);
  };

  return (
    <>
      {isExpand ? (
        <Card className="h-[calc(100vh-2rem)] w-[200px] p-10 pr-6 shadow-xl shadow-blue-gray-900/5 box-border rounded-none bg-white dark:bg-app-container-dark text-gray-900 dark:text-gray-100">
          <div
            className="cursor-pointer flex flex-col gap-2 mb-4 justify-center items-center"
            onClick={handleOpenMenu}
          >
            <div
              style={{
                backgroundImage: `url(${user?.photo})`,
              }}
              className="w-8 h-8 rounded-full bg-cover bg-center"
            ></div>
            <div className="flex flex-col text-gray-900 dark:text-gray-100 font-normal text-[12px]">
              <div>{name}</div>
              {/* <div>{surname}</div> */}
            </div>
          </div>
          <div className="border-b border-solid border-lightslategray-300 mb-4" />
          <List className="flex flex-col text-gray-900 dark:text-gray-100 w-full p-1 font-normal gap-2 overflow-y-scroll overflow-x-hidden">
            <ListItem
              ripple={false}
              className={`cursor-pointer p-2 rounded-lg w-fit ${
                activePage === "Exchange" ? "bg-[#ECEAFF] text-[#5046E5]" : ""
              }`}
              onClick={() => {
                setIsSubMenuOpen(0);
                setPage("Exchange");
              }}
            >
              <div
                className={`flex flex-row gap-2 items-center mr-auto font-normal text-[12px] ${
                  activePage === "Exchange"
                    ? "text-[#5046E5]"
                    : "text-chizzyblue dark:text-gray-100"
                }`}
              >
                <FaExchangeAlt size={16} />
                <div className="">Exchange</div>
              </div>
            </ListItem>

            <Accordion open={true}>
              <ListItem
                ripple={false}
                className={`p-0 w-fit ${
                  isSubMenuOpen === 1 ? "bg-[#ECEAFF]" : ""
                }`}
                selected={isSubMenuOpen === 2}
              >
                <AccordionHeader
                  onClick={() => {
                    handleOpen(1);
                    setPage("Buy (Cash)");
                  }}
                  className="border-b-0 py-3 px-2 m-0 bg-transparent focus:bg-transparent shadow-none focus:shadow-none text-gray-900 dark:text-gray-100"
                >
                  <div
                    className={`flex flex-row gap-2 items-center mr-auto font-normal text-[12px] ${
                      isSubMenuOpen === 1
                        ? "text-[#5046E5]"
                        : "text-chizzyblue dark:text-gray-100"
                    }`}
                  >
                    <FaBitcoin size={16} />
                    <div className="">Buy</div>
                  </div>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-2 px-5">
                <List className="p-0 w-fit">
                  <ListItem
                    className={`cursor-pointer rounded-lg ${
                      activePage === "Buy (Cash)"
                        ? "text-[#5046E5] font-bold"
                        : ""
                    }`}
                    ripple={false}
                    onClick={() => {
                      setPage("Buy (Cash)");
                    }}
                  >
                    <div
                      className={`flex flex-row gap-2 items-center font-normal text-[12px] ${
                        activePage === "Buy (Cash)"
                          ? "text-[#5046E5] font-bold"
                          : "text-chizzyblue dark:text-gray-100"
                      }`}
                    >
                      <BsCashCoin size={16} />
                      <div className="">Cash</div>
                    </div>
                  </ListItem>
                  <ListItem
                    className={`cursor-pointer rounded-lg ${
                      activePage === "Buy (Card)"
                        ? "text-[#5046E5] font-bold"
                        : ""
                    }`}
                    ripple={false}
                    onClick={() => {
                      setPage("Buy (Card)");
                    }}
                  >
                    <div
                      className={`flex flex-row gap-2 items-center font-normal text-[12px] ${
                        activePage === "Buy (Card)"
                          ? "text-[#5046E5] font-bold"
                          : "text-chizzyblue dark:text-gray-100"
                      }`}
                    >
                      <FaRegCreditCard size={16} />
                      <div className="">Card</div>
                    </div>
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>

            <Accordion open={true}>
              <ListItem
                ripple={false}
                className={`p-0 w-fit ${
                  isSubMenuOpen === 2 ? "bg-[#ECEAFF]" : ""
                }`}
                selected={isSubMenuOpen === 2}
              >
                <AccordionHeader
                  onClick={() => {
                    handleOpen(2);
                    setPage("Sell (Cash)");
                  }}
                  className="border-b-0 py-3 px-2 m-0 bg-transparent focus:bg-transparent shadow-none focus:shadow-none text-gray-900 dark:text-gray-100"
                >
                  <div
                    className={`flex flex-row gap-2 items-center mr-auto font-normal text-[12px] ${
                      isSubMenuOpen === 2
                        ? "text-[#5046E5]"
                        : "text-chizzyblue dark:text-gray-100"
                    }`}
                  >
                    <FaCircleDollarToSlot size={16} />
                    <div className="">Sell</div>
                  </div>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-2 px-5">
                <List className="p-0">
                  <ListItem
                    className={`cursor-pointer rounded-lg font-normal text-[12px] ${
                      activePage === "Sell (Cash)"
                        ? "text-[#5046E5] font-bold"
                        : ""
                    }`}
                    ripple={false}
                    onClick={() => {
                      setPage("Sell (Cash)");
                    }}
                  >
                    <div
                      className={`flex flex-row gap-2 items-center ${
                        activePage === "Sell (Cash)"
                          ? "text-[#5046E5] font-bold"
                          : "text-chizzyblue dark:text-gray-100"
                      }`}
                    >
                      <BsCashCoin size={16} />
                      <div className="">Cash</div>
                    </div>
                  </ListItem>
                  <ListItem
                    className={`cursor-pointer rounded-lg ${
                      activePage === "Sell (Card)"
                        ? "text-[#5046E5] font-bold"
                        : ""
                    }`}
                    ripple={false}
                    onClick={() => {
                      setPage("Sell (Card)");
                    }}
                  >
                    <div
                      className={`flex flex-row gap-2 items-center font-normal text-[12px] ${
                        activePage === "Sell (Card)"
                          ? "text-[#5046E5] font-bold"
                          : "text-chizzyblue dark:text-gray-100"
                      }`}
                    >
                      <FaRegCreditCard size={16} />
                      <div className="">Card</div>
                    </div>
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>

            <ListItem
              ripple={false}
              className={`cursor-pointer p-2 w-fit rounded-lg ${
                activePage === "Defi" ? "bg-[#ECEAFF] text-[#5046E5]" : ""
              }`}
              onClick={() => {
                setIsSubMenuOpen(0);
                setPage("Defi");
              }}
            >
              <div
                className={`flex flex-row gap-2 items-center mr-auto font-normal text-[12px] ${
                  activePage === "Defi"
                    ? "text-[#5046E5]"
                    : "text-chizzyblue dark:text-gray-100"
                }`}
              >
                <GiCardExchange size={16} />
                <div className=""> Defi</div>
              </div>
            </ListItem>

            <Accordion open={true}>
              <ListItem
                ripple={false}
                className={`p-0 w-full ${
                  isSubMenuOpen === 3 ? "bg-[#ECEAFF]" : ""
                }`}
                selected={isSubMenuOpen === 3}
              >
                <AccordionHeader
                  onClick={() => {
                    handleOpen(3);
                    setPage("Create");
                  }}
                  className="border-b-0 py-3 px-2 m-0 bg-transparent focus:bg-transparent shadow-none focus:shadow-none text-gray-900 dark:text-gray-100"
                >
                  <div
                    className={`flex flex-row gap-2 items-center mr-auto font-normal text-[12px] ${
                      isSubMenuOpen === 3
                        ? "text-[#5046E5]"
                        : "text-chizzyblue dark:text-gray-100"
                    }`}
                  >
                    <MdMessage size={16} />
                    <div className="flex flex-row">Messages</div>
                  </div>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-2 px-5">
                <List className="p-0">
                  <ListItem
                    className={`cursor-pointer rounded-lg ${
                      activePage === "Create" ? "text-[#5046E5] font-bold" : ""
                    }`}
                    ripple={false}
                    onClick={() => {
                      setPage("Create");
                    }}
                  >
                    <div
                      className={`flex flex-row gap-2 items-center font-normal text-[12px] ${
                        activePage === "Create"
                          ? "text-[#5046E5] font-bold"
                          : "text-chizzyblue dark:text-gray-100"
                      }`}
                    >
                      <RiPencilFill size={16} />
                      <div className="">Create</div>
                    </div>
                  </ListItem>
                  <ListItem
                    className={`cursor-pointer rounded-lg ${
                      activePage === "Inbox" ? "text-[#5046E5] font-bold" : ""
                    }`}
                    ripple={false}
                    onClick={() => {
                      setPage("Inbox");
                    }}
                  >
                    <div
                      className={`flex flex-row gap-8 items-center font-normal text-[12px] ${
                        activePage === "Inbox"
                          ? "text-[#5046E5] font-bold"
                          : "text-chizzyblue dark:text-gray-100"
                      }`}
                    >
                      <div
                        className={`flex flex-row gap-2 items-center ${
                          activePage === "Inbox"
                            ? "text-[#5046E5] font-bold"
                            : "text-chizzyblue dark:text-gray-100"
                        }`}
                      >
                        <MdInbox size={16} />
                        <div className="">Inbox</div>
                      </div>
                      <div className="">7</div>
                    </div>
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion>
          </List>
        </Card>
      ) : (
        <Card className="h-[calc(100vh-2rem)] w-[50px] p-10 pr-6 shadow-xl shadow-blue-gray-900/5 box-border rounded-none bg-white dark:bg-app-container-dark text-gray-900 dark:text-gray-100">
          <div
            className="cursor-pointer flex flex-col gap-2 mb-4 justify-center items-center"
            onClick={handleOpenMenu}
          >
            <div
              style={{
                backgroundImage: `url(${user?.photo})`,
              }}
              className="w-8 h-8 rounded-full bg-cover bg-center"
            ></div>
            <div className="flex flex-col text-gray-900 dark:text-gray-100 font-normal text-[12px]">
              <div>{"open"}</div>
            </div>
          </div>
          <div className="border-b border-solid border-lightslategray-300 mb-4" />
        </Card>
      )}
    </>
  );
};

//Support
