import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import FooterMini from '../../components/FooterMini';

export const AML = () => {
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('prevLocation', JSON.stringify(location?.pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const terms = (
    <div className="rounded-lg bg-white shadow-lg dark:bg-background-dark overflow-hidden flex flex-col items-start justify-start p-[5px] border-[1px] border-solid border-lightslategray-300 text-left text-xs text-gray-500">
      <div className="flex flex-col items-center h-[500px] w-[512px] overflow-y-auto m-4 gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-center items-center text-base font-black h-[24px]">
            AML/KYC POLICY
          </div>

          <div className="flex flex-col justify-start gap-4">
            <div className="flex">
              {`This document gives an overview of the standards of the “Know Your Customer” and “Anti-Money Laundering” policies, thereby setting our practices for the prevention of money-laundering activities while dealing with our users.`}
            </div>
            <div className="flex">
              {`The objective of AML/KYC Policy is to prevent Blendery from being used, intentionally or unintentionally, by criminal elements for money-laundering activities. The Policy also mandates making reasonable efforts to determine the true identity and beneficial ownership of accounts, source of funds, the nature of customer’s business, the reasonableness of operations in the account in relation to the customer’s business, etc., which in turn helps us to manage its risks prudently.`}
            </div>
            <div className="flex">
              {`We strive to protect our customers from fraudulent and scam activities in the crypto assets sphere. Blendery employs a steadfast approach in the implementation of the latest recommendations and revised guidelines by FATF, European Parliament, and regulators of the financial industry by and large. Our in-compliance policy stance is designed to detect funds proven to be involved in illicit activities as well as to protect the funds of our customers who have fallen victims to hacks, ransomware and malware attacks. The toolkit at work committed to fighting money laundering and its implications is comprised of policy regulations in conjunction with recent developments in software aimed at tracking suspicious transactions in real time.`}
            </div>
            <div className="flex">
              {`Our AML/KYC Policy, procedures, and internal controls are designed to ensure compliance with all applicable regulations and rules and will be reviewed and updated on a regular basis to ensure appropriate policies, procedures, and internal controls are in place, to account for both changes in regulations and changes in our business.`}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex">{`Glossary:`}</div>

              <div className="flex flex-col gap-1">
                <span className="">{`AML Anti-Money Laundering`}</span>
                <span className="">{`KYC Know Your Customer`}</span>
                <span className="">{`CIP Customer Identification Program`}</span>
                <span className="">{`PEP Politically Exposed Persons`}</span>
                <span className="">{`STR Suspicious Transaction Reporting`}</span>
                <span className="">{`SAR Suspicious Activity Reporting`}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex">
                {`The Policy covers the following matters:`}
              </div>
              <div className="flex flex-col gap-1">
                <span className="">{`CUSTOMER IDENTIFICATION PROCEDURE (CIP)`}</span>
                <span className="">{`RECORDKEEPING`}</span>
                <span className="">{`AML COMPLIANCE OFFICER`}</span>
                <span className="">{`MONITORING OF TRANSACTIONS`}</span>
                <span className="">{`RISK MANAGEMENT`}</span>
                <span className="">{`COLLABORATION WITH LAW ENFORCEMENT AGENCIES`}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-start gap-2 text-base h-[18px">
            <div className="flex flex-row">{`1.`}</div>
            <div className="flex">{`CUSTOMER IDENTIFICATION PROCEDURE (CIP)`}</div>
          </div>

          <div className="flex flex-row justify-start">
            <div className="flex">
              {`CIP applies to transactions that are spotted by our scoring system as suspicious. We will collect certain customer identification information from each customer who passes CIP; utilize risk-based measures to verify the identity of each customer who passes CIP; record customer identification information and the verification methods and results; provide adequate CIP notice to customers that we will seek identification information from to verify their identities.`}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-start gap-2">
                <div className="flex flex-row">{`a.`}</div>
                <div className="flex">{`Identification`}</div>
              </div>
              <div className="flex">
                {`In case a transaction is spotted by our risk scoring system as suspicious, the transaction will be put on hold, and we will collect the following information from the customers, if applicable, from any person, entity, or organization:`}
              </div>
              <div className="flex flex-col gap-2">
                <div className="ml-4 flex flex-row justify-start gap-2">
                  <div className="flex flex-row">{`1.`}</div>
                  <div className="flex">{`the full name`}</div>
                </div>
                <div className="ml-4 flex flex-row justify-start gap-2">
                  <div className="flex flex-row">{`2.`}</div>
                  <div className="flex">{`date of birth (for an individual);`}</div>
                </div>
                <div className="ml-4 flex flex-row justify-start gap-2">
                  <div className="flex flex-row">{`3.`}</div>
                  <div className="flex">{`the address, which will be residential and business street address (for an individual) or a principal place of business, local office, or other physical location (for a person other than an individual); and`}</div>
                </div>
                <div className="ml-4 flex flex-row justify-start gap-2">
                  <div className="flex flex-row">{`4.`}</div>
                  <div className="flex">{`for an individual, a valid government-issued identification, evidencing nationality or residence and bearing a photograph or a similar safeguard, such as a driver’s license or passport; and for a person other than an individual, documents showing the existence of the entity, such as certified articles of incorporation, a government-issued business license, a partnership agreement or a trust instrument.`}</div>
                </div>
              </div>
              <div className="flex">
                {`The customer has an obligation to update all the information if there is any change.`}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-start gap-2">
                <div className="flex flex-row">{`b.`}</div>
                <div className="flex">{`Customers Who Provide Misleading Information`}</div>
              </div>
              <div className="flex">
                {`After providing the information, the customer must ensure that the information is true, complete, and timely updated. If there are any grounds for believing that any of the information customer provided is incorrect, false, outdated, or incomplete, we reserve the right to send the customer a notice to demand correction and, as the case may be, blacklist the existing account and terminate all or part of the services we provide for the said customer.`}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-start gap-2">
                <div className="flex flex-row">{`c.`}</div>
                <div className="flex">{`Verifying Information`}</div>
              </div>
              <div className="flex">
                {`Based on the risk, and to the extent reasonable and practicable, we will proceed with the verification to the extent that we have collected all information needed in order to know the true identity of our customers by using risk-based procedures to verify and document the accuracy of the information we get about our customers.`}
              </div>
              <div className="flex">
                {`We have appointed a Third-Party service provider, namely Sum & Substance Ltd, which entirely complies with our Privacy Policy in respect to processing the personal information of our customers. Sum & Substance Ltd will analyze the information we obtain to determine (1) whether the information is sufficient to form a reasonable belief that we know the true identity of the customer (e.g., whether the information is logical or contains inconsistencies); (2) whether the documents provided by the customers are valid and do not appear in the Specially Designated Nationals and Blocked Persons List or any other lists of sanctioned individuals.`}
              </div>
              <div className="flex">
                {`We will verify the information within a reasonable time, depending on the nature of the account and risk level of transactions. We may refuse to complete a transaction before we have verified the information, or in some instances, when we need more time, we may, pending verification, restrict transactions and the associated account under suspicion. If we find suspicious information that indicates possible money laundering, terrorist financing activity, or other suspicious activity, we will, after internal consultation with the firm’s AML Compliance Officer, file a SAR/STR in accordance with applicable laws and regulations.`}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-start gap-2">
                <div className="flex flex-row">{`d.`}</div>
                <div className="flex">{`Lack of Verification`}</div>
              </div>
              <div className="flex">
                {`When we cannot form a reasonable belief that we know the true identity of a customer, we will do the following: (1) request additional information; (2) not verify an account; (3) blacklist account after attempts to verify the customer’s identity fail; and (4) determine whether it is necessary to file a SAR/STR in accordance with applicable laws and regulations.`}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-start gap-2">
                <div className="flex flex-row">{`e.`}</div>
                <div className="flex">{`Notice to Customers`}</div>
              </div>
              <div className="flex">
                {`We provide notice to customers that their transactions may be subject to AML/KYC checks. This information is stated in full detail in our Terms of Use, and each customer is obliged to get acquainted with these Terms before initiating transactions.`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="h-screen mt-[24px] overflow-auto">
        <div className="flex bg-lightslategray-300 h-px" />

        <div className={`h-full flex flex-col justify-center items-center`}>
          {/* <SupportModel /> */}
          {terms}
          <div className="relative text-gray-900 dark:text-gray-100 w-full overflow-auto text-left text-sm font-montserrat">
            <div className="flex flex-col justify-center items-center">
              <FooterMini />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
