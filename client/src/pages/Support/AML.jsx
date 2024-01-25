import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import FooterMini from '../../components/FooterMini';

export const AML = () => {
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('prevLocation', JSON.stringify(location?.pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 
  const aml = (
    <div className="w-full h-full mt-[64px] overflow-auto bg-white dark:bg-app-container-dark text-gray-500 dark:text-gray-200 flex-col justify-start items-center gap-10 inline-flex">
      <div className="w-[70%] h-full p-6 flex-col justify-start items-start gap-6 flex overflow-y-auto">
        <div className="self-stretch h-[1212px] flex-col justify-start items-center gap-2 flex">
          <div className="self-stretch text-center text-zinc-800 dark:text-white text-[27px] font-bold font-['Inter'] leading-9">
            AML/KYC POLICY
          </div>
          <div className="self-stretch">
            <span className="text-base font-normal font-['Inter'] leading-normal">
              Last Updated: January, 2024
              <br />
              This document gives an overview of the standards of the “Know Your
              Customer” and “Anti-Money Laundering” policies, thereby setting
              our practices for the prevention of money-laundering activities
              while dealing with our users.
              <br />
              The objective of AML/KYC Policy is to prevent Blendery from being
              used, intentionally or unintentionally, by criminal elements for
              money-laundering activities. The Policy also mandates making
              reasonable efforts to determine the true identity and beneficial
              ownership of accounts, source of funds, the nature of customer’s
              business, the reasonableness of operations in the account in
              relation to the customer’s business, etc., which in turn helps us
              to manage its risks prudently.
              <br />
              We strive to protect our customers from fraudulent and scam
              activities in the crypto assets sphere. Blendery employs a
              steadfast approach in the implementation of the latest
              recommendations and revised guidelines by FATF, European
              Parliament, and regulators of the financial industry by and large.
              Our in-compliance policy stance is designed to detect funds proven
              to be involved in illicit activities as well as to protect the
              funds of our customers who have fallen victims to hacks,
              ransomware and malware attacks. The toolkit at work committed to
              fighting money laundering and its implications is comprised of
              policy regulations in conjunction with recent developments in
              software aimed at tracking suspicious transactions in real time.
              <br />
              Our AML/KYC Policy, procedures, and internal controls are designed
              to ensure compliance with all applicable regulations and rules and
              will be reviewed and updated on a regular basis to ensure
              appropriate policies, procedures, and internal controls are in
              place, to account for both changes in regulations and changes in
              our business.
              <br />
              Glossary:
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              AML Anti-Money Laundering
              <br />
              KYC Know Your Customer
              <br />
              CIP Customer Identification Program
              <br />
              PEP Politically Exposed Persons
              <br />
              STR Suspicious Transaction Reporting
              <br />
              SAR Suspicious Activity Reporting
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              The Policy covers the following matters:
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              CUSTOMER IDENTIFICATION PROCEDURE (CIP)
              <br />
              RECORDKEEPING
              <br />
              AML COMPLIANCE OFFICER
              <br />
              MONITORING OF TRANSACTIONS
              <br />
              RISK MANAGEMENT
              <br />
              COLLABORATION WITH LAW ENFORCEMENT AGENCIES
            </span>
          </div>
        </div>
        <div className="self-stretch h-[248px] flex-col justify-start items-center gap-2 flex">
          <div className="self-stretch text-center text-zinc-800 dark:text-white text-[27px] font-bold font-['Inter'] leading-9">
            1. CUSTOMER IDENTIFICATION PROCEDURE (CIP)
          </div>
          <div className="self-stretch text-base font-normal font-['Inter'] leading-normal">
            CIP applies to transactions that are spotted by our scoring system
            as suspicious. We will collect certain customer identification
            information from each customer who passes CIP; utilize risk-based
            measures to verify the identity of each customer who passes CIP;
            record customer identification information and the verification
            methods and results; provide adequate CIP notice to customers that
            we will seek identification information from to verify their
            identities.
          </div>
        </div>
        <div className="self-stretch h-[604px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            a. Identification
          </div>
          <div className="self-stretch">
            <span className="text-base font-normal font-['Inter'] leading-normal">
              In case a transaction is spotted by our risk scoring system as
              suspicious, the transaction will be put on hold, and we will
              collect the following information from the customers, if
              applicable, from any person, entity, or organization:
              <br />
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              the full name;
              <br />
              date of birth (for an individual);
              <br />
              the address, which will be residential and business street address
              (for an individual) or a principal place of business, local
              office, or other physical location (for a person other than an
              individual); and
              <br />
              for an individual, a valid government-issued identification,
              evidencing nationality or residence and bearing a photograph or a
              similar safeguard, such as a driver’s license or passport; and for
              a person other than an individual, documents showing the existence
              of the entity, such as certified articles of incorporation, a
              government-issued business license, a partnership agreement or a
              trust instrument.
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              <br />
              The customer has an obligation to update all the information if
              there is any change.
              <br />
            </span>
          </div>
        </div>
        <div className="self-stretch h-52 flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            b. Customers Who Provide Misleading Information
          </div>
          <div className="self-stretch text-base font-normal font-['Inter'] leading-normal">
            After providing the information, the customer must ensure that the
            information is true, complete, and timely updated. If there are any
            grounds for believing that any of the information customer provided
            is incorrect, false, outdated, or incomplete, we reserve the right
            to send the customer a notice to demand correction and, as the case
            may be, blacklist the existing account and terminate all or part of
            the services we provide for the said customer.
          </div>
        </div>
        <div className="self-stretch h-[656px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            c. Verifying Information
          </div>
          <div className="self-stretch text-base font-normal font-['Inter'] leading-normal">
            Based on the risk, and to the extent reasonable and practicable, we
            will proceed with the verification to the extent that we have
            collected all information needed in order to know the true identity
            of our customers by using risk-based procedures to verify and
            document the accuracy of the information we get about our customers.
            <br />
            We have appointed a Third-Party service provider, namely Sum &
            Substance Ltd, which entirely complies with our Privacy Policy in
            respect to processing the personal information of our customers. Sum
            & Substance Ltd will analyze the information we obtain to determine
            (1) whether the information is sufficient to form a reasonable
            belief that we know the true identity of the customer (e.g., whether
            the information is logical or contains inconsistencies); (2) whether
            the documents provided by the customers are valid and do not appear
            in the Specially Designated Nationals and Blocked Persons List or
            any other lists of sanctioned individuals.
            <br />
            We will verify the information within a reasonable time, depending
            on the nature of the account and risk level of transactions. We may
            refuse to complete a transaction before we have verified the
            information, or in some instances, when we need more time, we may,
            pending verification, restrict transactions and the associated
            account under suspicion. If we find suspicious information that
            indicates possible money laundering, terrorist financing activity,
            or other suspicious activity, we will, after internal consultation
            with the firm’s AML Compliance Officer, file a SAR/STR in accordance
            with applicable laws and regulations.
          </div>
        </div>
        <div className="self-stretch h-40 flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            d. Lack of Verification
          </div>
          <div className="self-stretch text-base font-normal font-['Inter'] leading-normal">
            When we cannot form a reasonable belief that we know the true
            identity of a customer, we will do the following: (1) request
            additional information; (2) not verify an account; (3) blacklist
            account after attempts to verify the customer’s identity fail; and
            (4) determine whether it is necessary to file a SAR/STR in
            accordance with applicable laws and regulations.
          </div>
        </div>
        <div className="self-stretch h-[136px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            e. Notice to Customers
          </div>
          <div className="self-stretch">
            <span className="text-base font-normal font-['Inter'] leading-normal">
              We provide notice to customers that their transactions may be
              subject to AML/KYC checks. This information is stated in full
              detail in our{' '}
            </span>
            <span className="text-base font-normal font-['Inter'] underline leading-normal">
              Terms of Use
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              , and each customer is obliged to get acquainted with these Terms
              before initiating transactions.
            </span>
          </div>
        </div>
        <div className="self-stretch h-[368px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            f. Reliance on Another Institution for Identity Verification
          </div>
          <div className="self-stretch">
            <span className="text-base font-normal font-['Inter'] leading-normal">
              We may, under the following circumstances, rely on the performance
              of some or all of the elements of our CIP by an exchange, trading
              platform, crypto wallet (including an affiliate) with respect to
              any customer that is opening an account or has established an
              account or similar business relationship with the other company to
              provide or engage in services, dealings, or other financial
              transactions:
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              when such reliance is reasonable under the circumstances; and
              <br />
              when the other institution has entered into a contract with our
              company requiring it to certify annually to us that it has
              implemented its anti-money-laundering program and that it will
              fulfill (or its agent will fulfill) specified requirements of the
              customer identification program
            </span>
          </div>
        </div>
        <div className="self-stretch h-[560px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            g. Enhanced Due Diligence
          </div>
          <div className="self-stretch text-base font-normal font-['Inter'] leading-normal">
            We conduct Enhanced Due Diligence in connection will all customers
            or accounts that are determined as posing potential high risk and
            are determined to warrant enhanced scrutiny. We have established
            procedures to decline to do business with or discontinue
            relationships with any customer when we cannot adequately complete
            necessary Enhanced Due Diligence or when the information received is
            deemed to have a significant adverse impact on reputational risk.
            The following are the indicative list where the risk perception of a
            customer may be considered higher: (1) customers requesting an
            exchange of untraceable cryptocurrencies; (2) an ongoing
            investigation in regards to customers; (3) the trading activity
            appears to be from higher-risk countries; (4) virtual asset
            transfers above the threshold set by the FATF guidelines; (5)
            Politically Exposed Persons.
            <br />
            Enhanced Due Diligence may be in the nature of keeping the account
            monitored closely for the recategorization of risk, update of KYC
            documents, etc
            <br />
            Enhanced Due Diligence implies checking the source of funds. Among
            the proofs accepted for verification are the following: exchange
            accounts with the history of trading, receipts from cryptocurrency
            sellers, or proofs of mining activity.
          </div>
        </div>
        <div className="self-stretch h-[600px] flex-col justify-start items-center gap-2 flex">
          <div className="self-stretch text-center text-zinc-800 dark:text-white text-[27px] font-bold font-['Inter'] leading-9">
            2. RECORDKEEPING
          </div>
          <div className="self-stretch">
            <span className="text-base font-normal font-['Inter'] leading-normal">
              We will document our verification, including all identifying
              information provided by a customer, the methods used and results
              of verification, and the resolution of any discrepancies
              identified in the verification process.
              <br />
              According to the documentation of Sum Substance, all User data
              obtained during the KYC procedure is encrypted and stored on
              GDPR-compliant Amazon servers, which are located in the EU. These
              are kept at Uptime Institute classified Tier III data centers
              compliant with TIA-942 and PCI DSS standards. The data centers are
              protected technically and guarded physically around the clock by
              specially audited security personnel.
              <br />
              For more information, please refer to{' '}
            </span>
            <span className="text-base font-normal font-['Inter'] underline leading-normal">
              this page
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              .<br />
              We will retain records of all identification information for five
              years after the account has been closed; we will retain records
              made about verification of the customer’s identity for five years
              after the record is made.
              <br />
              The above-mentioned records can be made available to the competent
              authorities upon request.
              <br />
            </span>
          </div>
        </div>
        <div className="self-stretch h-[280px] flex-col justify-start items-center gap-2 flex">
          <div className="self-stretch text-center text-zinc-800 dark:text-white text-[27px] font-bold font-['Inter'] leading-9">
            3. AML COMPLIANCE OFFICER
          </div>
          <div className="self-stretch">
            <span className="text-base font-normal font-['Inter'] leading-normal">
              The AML Compliance Officer is the person, duly authorized by
              Blendery, whose responsibility is to implement and effectively
              monitor the application and enforcement of the AML/KYC policy as
              outlined in this document. The AML Compliance Officer is obliged
              to oversee and conduct effective monitoring of all aspects of
              Blendery’s anti-money laundering and counter-terrorist financing.
              Any suspicious behavior or activities should be reported to the
              AML Compliance Officer.
              <br />
              Communication with the AML Compliance Officer in regards to this
              Policy is conducted via{' '}
            </span>
            <span className="text-base font-normal font-['Inter'] underline leading-normal">
              compliance@b
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              lendery.io.
            </span>
          </div>
        </div>
        <div className="self-stretch h-[376px] flex-col justify-start items-center gap-2 flex">
          <div className="self-stretch text-center text-zinc-800 dark:text-white text-[27px] font-bold font-['Inter'] leading-9">
            4. MONITORING OF TRANSACTIONS
          </div>
          <div className="self-stretch text-base font-normal font-['Inter'] leading-normal">
            Ongoing monitoring is an essential element of effective KYC
            procedures. We have an understanding of the normal and reasonable
            activity of the customer, ensuring that we have the means of
            identifying transactions that fall outside the regular pattern of
            activity. However, the extent of monitoring will depend on the risk
            sensitivity of the account. High-risk accounts have to be subjected
            to intensified monitoring. In case of sudden swaps of big amounts,
            these accounts can be flagged by the risk scoring system as low,
            medium, or high risk
            <br />
            We have implemented a Know-Your-Transaction service that is the
            real-time anti-money-laundering compliance solution for monitoring
            cryptocurrency transactions. As a result of its targeted approach,
            it empowered our Blendery compliance team to significantly speed up
            the detection of transactions with fraudulent funds involved.
          </div>
        </div>
        <div className="self-stretch h-[260px] flex-col justify-start items-center gap-2 flex">
          <div className="self-stretch text-center text-zinc-800 dark:text-white text-[27px] font-bold font-['Inter'] leading-9">
            5. RISK MANAGEMENT
          </div>
          <div className="self-stretch text-base font-normal font-['Inter'] leading-normal">
            We have put in place appropriate procedures to ensure the effective
            implementation of KYC guidelines. The implementation procedure
            covers proper management oversight, systems and controls,
            segregation of duties, training, and other related matters. From
            time to time, the Blendery compliance team will carry on the
            necessary quality checks and file audits to ensure that the KYC
            policies and procedures are adhered to. From time to time, the
            Blendery compliance team shall update senior management about
            issues arising during the customer acquisition process.
          </div>
        </div>
        <div className="self-stretch h-[152px] flex-col justify-start items-center gap-2 flex">
          <div className="self-stretch text-center text-zinc-800 dark:text-white text-[27px] font-bold font-['Inter'] leading-9">
            6. COLLABORATION WITH LAW ENFORCEMENT AGENCIES
          </div>
          <div className="self-stretch text-base font-normal font-['Inter'] leading-normal">
            We obtain and hold required and accurate originator information and
            required beneficiary information on virtual asset transfers and make
            it available to appropriate authorities on official request
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="h-full flex flex-col gap-2">
        {aml}
        <FooterMini />
      </div>
    </>
  );
};
