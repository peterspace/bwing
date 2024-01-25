import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import FooterMini from '../../components/FooterMini';

export const TermsOfUse = () => {
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('prevLocation', JSON.stringify(location?.pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const terms = (
    <div className="w-full h-full mt-[64px] overflow-auto bg-white dark:bg-app-container-dark text-gray-500 dark:text-gray-200 flex-col justify-start items-center gap-10 inline-flex">
      <div className="w-[70%] h-full p-6 flex-col justify-start items-start gap-6 flex overflow-y-auto">
        <div className="self-stretch h-[324px] flex-col justify-start items-center gap-2 flex">
          <div className="self-stretch text-center text-zinc-800 dark:text-white text-[27px] font-bold font-['Inter'] leading-9">
            Terms of Use
          </div>
          <div className="self-stretch text-base font-normal font-['Inter'] leading-normal">
            Last Updated: January, 2024
            <br />
            These Terms of Use and any terms incorporated herein (hereinafter,
            the “Terms”) apply to your (“user”, “you“) use of the Services,
            including https://blendery.io/ (“Website“), the technology and the
            platform integrated therein and any related applications (including
            without limitation the mobile one) associated therewith, which are
            operated and maintained by Fintechvision Ltd. and its affiliates
            (“Blendery”, “We”, or “Us”).
            <br />
            We provide you with the possibility to use our Services as defined
            above on the following terms and conditions.
          </div>
        </div>
        <div className="self-stretch h-[440px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            1. Enforcement & Amendments
          </div>
          <div className="self-stretch text-base font-normal font-['Inter'] leading-normal">
            These Terms of Use constitutes a binding agreement between Blendery
            and the user as soon as the user visits the Website and uses
            Services. By doing so, the user confirms that he has read and
            accepted these Terms of Use in their entirety before finishing the
            registration procedure.
            <br />
            The user accepts that Terms of Use may be updated by Blendery from
            time to time. If the user does not read and accept the Terms of Use
            in its entirety he should not use or continue using the Services.
            <br />
            We reserve the right to alter, amend or modify these Terms from time
            to time, in our sole discretion. We will provide you with notice of
            such changes by sending an e-mail, providing notice on the homepage
            of the Website and/or by posting the amended Terms via our Website
            and updating the "Last Updated" date at the top of these Terms. The
            amended Terms will be deemed effective immediately upon posting on
            Website.
          </div>
        </div>
        <div className="self-stretch h-[4820px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            2. Provided Services
          </div>
          <div className="self-stretch">
            <span className="text-base font-normal font-['Inter'] leading-normal">
              Our Services provide you with the possibility to Exchange one type
              of crypto asset for another one, access to Marketplace, and access
              to the Decentralized Exchange of DeFi tokens. Terms of Use in
              regard to the Decentralized exchange on Blendery can be found at
              https://blendery
            </span>
            <span className="text-base font-normal font-['Inter'] underline leading-normal">
              .io/terms
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              OfUse.
              <br />
              For the purposes hereof "Exchange" shall mean an exchange of the
              crypto asset of one type to the crypto asset of another type at
              the terms and conditions set forth by exchanging parties, which is
              executed via the Third-party service in respective block-chain
              network. When you exchange crypto assets you acknowledge and agree
              that the Exchange will be processed through the third-party
              exchange service with additional fees applicable to such Exchange.
              You acknowledge and agree that the exchange rates information made
              available via the Services are an estimation only and may differ
              from prevailing rates available via other sources outside of our
              Services.
              <br />
              "Crypto Assets" herein shall be deemed as type of assets which can
              only and exclusively be transmitted by means of block-chain
              technology, including but not limited to digital coins and digital
              tokens and any other type of digital mediums of exchange, such as
              Bitcoin, Ethereum, Ripple, etc, to the full and absolute exempt of
              the securities of any kind.
              <br />
              “Marketplace” herein shall mean an online digital aggregation
              platform for fiat providers with an option to compare current
              rates and limits for buying or selling crypto assets.
              <br />
              To be able to use all possibilities and functionality of our
              Services you shall go through the registration process and create
              a Blendery Account. "Blendery Account" is a user account
              accessible after the registration process and via the Services
              where the user may request to make a crypto assets exchange. User
              should manage and maintain only one Blendery Account. Users are
              prohibited from creating multiple accounts. When you create a
              Blendery Account you oblige to:
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              change the password, which is generated by our Services
              automatically, for a strong password that you do not use for any
              other websites, online or off-line services;
              <br />
              provide accurate e-mail, which actually belongs to you and shall
              be, therefore, verified. The access to the services provided by
              the Blendery without verification of the e-mail is not allowed;
              <br />
              maintain the security of your Blendery Account and promptly notify
              us if you discover any suspicious activity related to your
              account;
              <br />
              agree to receive emails containing information about credentials,
              passwords, transactions and marketing promotions;
              <br />
              agree to pass through AML/KYC procedures, which may be applied to
              You according to our internal AML/KYC policies. As a part of such
              procedures, Blendery reserves the right to request additional
              information and documents, which are aimed without limitation to
              identify our user and to prove the source of the funds;
              <br />
              take responsibility for all activities that occur under your
              Blendery Account.
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              The "Floating exchange rate" option herein shall mean an exchange
              rate mode in which our platform does not guarantee the rate - so
              it fluctuates in accordance with the market. You acknowledge and
              agree that the exchange rate information made available via
              Services for the Floating exchange rate option is an estimation
              only and may differ from the actual rates available via other
              sources outside of our Services. Blendery cannot guarantee the
              execution of a Floating exchange rate transaction in some cases,
              including, but not limited to the following ones:
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              user sent crypto assets to a previously used one-time address that
              had been generated for a Floating exchange rate transaction;
              <br />
              user sent an amount of crypto assets different from the amount to
              be sent that was displayed on the Website, or did not account for
              the relevant withdrawal and network fees, thus sending an amount
              that is too small;
              <br />
              the user sent crypto assets to a Blendery floating-rate address
              later than in 3 hours after the address was provided. Blendery
              floating rate addresses cannot be used after the 3 hour mark.
              <br />
              in order to avoid any substantial losses for the customer caused
              by the rate change, when a significant disparity between an
              estimated exchange rate available on the Website and the rate
              received from a third-party exchange arises, a Floating exchange
              rate transaction may be failed automatically.
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              If despite the aforementioned cases the market situation allows us
              to make the exchange, the transaction will be exchanged manually
              at the new rate.If the market situation is such that the
              transaction cannot be executed anymore, or if the rate has changed
              significantly and the user asks for a refund, the crypto assets
              that the user wants to exchange will be refunded, if at all
              possible, less all applicable fees. The refund usually takes 1-7
              business days (depending on the reason of the failure) after the
              users confirms their refund address.
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              When using the{' '}
            </span>
            <span className="text-base font-bold font-['Inter'] leading-normal">
              "Fixed exchange rate"
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              {' '}
              option, your rate gets "locked" for fifteen or twenty minutes,
              meaning it remains the same irrespective of the changes on the
              market. You acknowledge and agree that for the Fixed exchange rate
              option the exchange rate information available on the Website may
              be different from the exchange rates for the Floating exchange
              rate option. Blendery cannot guarantee the execution of a Fixed
              exchange rate transaction in some cases, including, but not
              limited to the following ones:
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              user sent crypto assets more than 15 minutes (20 minutes in case
              of BTC, XMR, LTC, DCR, EOS, GAS, BNB, VET) after clicking the
              “confirm & make payment” button when exchanging via the Fixed
              exchange rate option;
              <br />
              user sent an amount of crypto assets different from the amount to
              be sent that was displayed on the Website, or did not account for
              the relevant withdrawal and network fees, thus sending an amount
              that is too small;
              <br />
              user sent crypto assets to a previously used one-time address that
              had been generated for a Fixed exchange rate transaction.
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              If the market situation allows us to make the exchange, the
              transaction will be pushed through manually at the rate that was
              confirmed by the customer at the beginning of the exchange.If the
              market situation is such that the transaction cannot be executed
              anymore, the crypto assets that the user wants to exchange will be
              refunded, if at all possible, less all applicable fees (
              applicable only to 2.7.1 and 2.7.2 cases).Blendery will be able to
              return the crypto assets to the user. The crypto assets will be
              sent manually from an exchange market we work with, less all
              applicable fees. A refund in such case usually takes up to 20
              business days (applicable only to 2.7.3 case).
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              In order to perform the Exchange via our Services, our system will
              automatically generate a particular address for the initiated
              transaction, which contains information about (i) the user; (ii)
              the crypto asset that user wants to exchange and the crypto asset
              that user wants to receive (jointly - "crypto pair"); and (iii)
              the recipient address provided by the user (the address where
              exchanged crypto assets will be deposited). The user understands
              that the crypto assets to be exchanged are transferred only to the
              particular address provided by the system. The address is active
              only for one transaction and particularly, the one designated by
              the system.
              <br />
              The technical issues arising from your misuse of our services,
              such as creating incorrect transactions (entering a wrong address
              both when indicating the recipient address and when sending your
              crypto assets to us), and other types of user mistakes may be
              resolved by our technical department with limitations. Upon
              successful resolution of a technical issue, the crypto assets sent
              incorrectly will be refunded to the user, less all applicable
              fees.
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              Changeless technical department is able to refund only BTC from
              the Segwit BTC address. No other crypto assets, including but not
              limited to, LTC, BSV, BCH sent to a Segwit BTC address could be
              refunded;
              <br />
              No crypto assets sent to us via an unsupported and/or not
              recommended network (e.g. BSC network) can be refunded.
              Recommended networks will be displayed to you during the
              transaction process.
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              You acknowledge and agree that any refund may cause operating
              costs for the allocated resources required for resolving user
              issues arising from misuse of our services. Blendery shall be
              entitled to recover its operating costs for the services while
              executing any refund. In this case crypto assets will be refunded
              to the user, subtracting operating costs and network fees, only
              with a prior user’s consent.
              <br />
              YOU INDEMNIFY AND HOLD BLENDERY HARMLESS AGAINST ANY DIRECT,
              INDIRECT, CONSEQUENTIAL OR SPECIAL DAMAGES, OR ANY OTHER DAMAGES
              OF ANY KIND, INCLUDING, BUT NOT LIMITED TO, LOSS OF USE, LOSS OF
              PROFITS OR LOSS OF DATA, WHETHER IN AN ACTION IN CONTRACT, TORT
              (INCLUDING BUT NOT LIMITED TO NEGLIGENCE) OR OTHERWISE, ARISING
              OUT OF OR IN ANY WAY CONNECTED WITH YOUR USE OF OUR SERVICES,
              INCLUDING BUT NOT LIMITED TO INCORRECT USE OF ADDRESS, INCORRECTLY
              CONSTRUCTED TRANSACTIONS ETC.
              <br />
              Blendery does not provide custodial services, which means, we do
              not store your crypto assets on deposits and balances. In limited
              cases such as e.g. necessity to carry out AML/KYC procedure, your
              Exchange may be delayed. YOU HEREBY UNDERSTAND AND ACKNOWLEDGE,
              THAT ANY DELAYS ARE POSSIBLE; YOU INDEMNIFY AND HOLD US HARMLESS
              AGAINST ANY CLAIMS, DEMANDS AND DAMAGES, WHETHER DIRECT, INDIRECT,
              CONSEQUENTIAL OR SPECIAL, OR ANY OTHER DAMAGES OF ANY KIND,
              INCLUDING, BUT NOT LIMITED TO, LOSS OF USE, LOSS OF PROFITS OR
              LOSS OF DATA, WHETHER IN AN ACTION IN CONTRACT, TORT (INCLUDING
              BUT NOT LIMITED TO NEGLIGENCE) OR OTHERWISE, ARISING OUT OF OR IN
              ANY WAY CONNECTED WITH THE EXCHANGE DELAY, WHETHER ORIGINATED FROM
              OUR FAULT OR NOT.
              <br />
              Blendery is neither the creator, nor the administrator of any fiat
              provider at Marketplace. Therefore Blendery is not responsible for
              providing, setting or controlling the fees applicable to any of
              the services or products which you find and use via our
              Marketplace. It merely acts as an aggregator landing platform for
              the various fiat providers integrating APIs of those providers.
              All fiat trading capabilities and services take place in
              accordance with and are subject to the policies and terms of use
              of the said fiat provider.
            </span>
          </div>
        </div>
        <div className="self-stretch h-[680px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            3. Fees
          </div>
          <div className="self-stretch">
            <span className="text-base font-normal font-['Inter'] leading-normal">
              Blendery keeps its fee policy transparent. The current fee
              structure is two-layered and is comprised of exchange and network
              fees.
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              The exchange fee is the amount charged by Blendery for executing
              transactions initiated by the users. The exchange fee structure
              depends on the transaction type: the Floating exchange rate or the
              Fixed one. The Floating exchange rate transactions incur a 0.25%
              fee from the output amount (it differs for transactions executed
              through our API partners). As with regard to the Fixed exchange
              rate transactions, Blendery finds the best rate available on the
              market and fixes it for the conversion in question; the respective
              rate is displayed to the user, thus guaranteeing the protection of
              users’ funds from market fluctuations during the exchange.
              <br />
              The network fee is paid to cryptocurrency miners for processing
              transactions in the network, and it serves to ensure withdrawals
              of the funds from exchanges. Blendery collects and transfers these
              payments to respective exchanges, which themselves set the amount
              of the fee at any particular time. The moment a transaction is
              created, this fee is displayed to the user, with the amount being
              based on our estimates. With that, you acknowledge and agree that
              the final amount of the network fee charged can sometimes differ
              from our estimate. This occurs entirely due to the volatile nature
              of network fees prevalent on exchanges and does not depend on our
              platform in any respect.
              <br />
            </span>
          </div>
        </div>
        <div className="self-stretch h-[204px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            4. AML and KYC Procedure
          </div>
          <div className="self-stretch">
            <span className="text-base font-normal font-['Inter'] leading-normal">
              In furtherance of the clause 2.5.5 Blendery reserves the right to
              apply the AML/KYC procedure to particular users, addresses and
              particular transactions of crypto assets.
              <br />
              The up-to-date information on the AML/KYC procedures can always be
              found at{' '}
            </span>
            <span className="text-indigo-500 text-base font-normal font-['Inter'] underline leading-normal">
              AML/KYC.
              <br />
            </span>
          </div>
        </div>
        <div className="self-stretch h-[2148px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            5. Eligibility
          </div>
          <div className="self-stretch">
            <span className="text-base font-normal font-['Inter'] leading-normal">
              Prior to your use of the Services and on an ongoing basis you
              represent, warrant, covenant and agree that:
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              you use our Services at your sole option, discretion and risk;
              <br />
              you are solely responsible for any applicable taxes which may be
              payable while using our Services;
              <br />
              you are NOT in, under the control of, or a national or resident of
              any country where crypto assets transactions are explicitly
              prohibited or United States of America (including all USA
              territories like Puerto Rico, American Samoa, Guam, Northern
              Mariana Island, and the US Virgin Islands (St. Croix, St. John and
              St. Thomas) (“Restricted Locations”). Blendery does not operate in
              Restricted Locations. Blendery maintains the right to select the
              markets and jurisdictions to operate in and may restrict or deny
              its services to certain countries at any time;
              <br />
              you are at least 16 years old or of other legal age, according to
              your relevant jurisdiction;
              <br />
              you agree to pay the fees for Exchanges completed via Services as
              defined by Blendery, which We may change from time to time; you
              also understand and acknowledge that network withdrawal fees are
              applicable to any types of withdrawals requested by you, the third
              party authorized by you, or under the request of a competent
              authority;
              <br />
              there are risks, associated with Internet-based system, such as
              the failure of hardware, software, and Internet connections and
              with the Blockchain Protocol, such as any malfunction, unintended
              function, unexpected functioning of or attack on the Blockchain
              protocol;
              <br />
              you guarantee that your crypto assets belong to you and they are
              not sold, encumbered, not in contention, or under seizure, and
              that neither exist any rights of third parties to your crypto
              assets;
              <br />
              you shall provide correct information for constructing Exchange
              (e.g. payin and payout wallet address). Such wallet addresses
              shall not be associated with terrorism, fraudulent, scam or any
              type of illegal activity.
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              You further represent, agree and warrant, that you will not
              violate any law, contract, third-party right or commit a tort by
              accessing or using the Services, and that you are solely
              responsible for your actions and/or inactions while using our
              Services. Without prejudice to the foregoing, you represent, agree
              and warrant, that YOU WILL NOT:
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              use our Services or will immediately cease using those if any
              applicable law in your country prohibits or will prohibit you at
              any time from doing so;
              <br />
              use our Services to participate in fraudulent, scam or any type of
              illegal activity;
              <br />
              exchange via our Services or attempt to pay-in crypto assets,
              which are obtained from illegal gambling activities; fraud;
              money-laundering; or terrorist activities; or any other illegal
              activities. With our Services the user can only use crypto assets,
              which are obtained from legal sources;
              <br />
              provide false, inaccurate, or misleading information;
              <br />
              attempt to modify, decompile, reverse-engineer or disassemble our
              software in any way;
              <br />
              use any robot, spider, crawler, scraper or other automated means
              or interface not provided by us to access the Services or to
              extract data;
              <br />
              attempt to circumvent any content filtering techniques we employ,
              or attempt to access any service or area of our Services that you
              are not authorized to access;
              <br />
              develop any third-party applications that interact with our
              Services without our prior written consent; AND
              <br />
              Encourage or induce any third party to engage in any of the
              activities prohibited under this Section.
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              YOU INDEMNIFY AND HOLD US HARMLESS AGAINST ANY CLAIMS, DEMANDS AND
              DAMAGES, WHETHER DIRECT, INDIRECT, CONSEQUENTIAL OR SPECIAL, OR
              ANY OTHER DAMAGES OF ANY KIND, INCLUDING, BUT NOT LIMITED TO, LOSS
              OF USE, LOSS OF PROFITS OR LOSS OF DATA OR LOSS OF ASSETS, WHETHER
              IN AN ACTION IN CONTRACT, TORT (INCLUDING BUT NOT LIMITED TO
              NEGLIGENCE) OR OTHERWISE, ORIGINATED FROM OR IN ANY WAY CONNECTED
              WITH INVALIDITY OR BREACH OF ANY OF THE PROVISIONS OF THIS SECTION
              AND THE ENTIRE TERMS.
              <br />
            </span>
          </div>
        </div>
        <div className="self-stretch h-[560px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            6. Information Privacy
          </div>
          <div className="self-stretch text-base font-normal font-['Inter'] leading-normal">
            Never share the details of your transaction, including, but not
            limited to, your Blendery ID, the transaction hash, recipient
            address and/or e-mail related to a Blendery account, with anyone
            except Blendery representatives. Blendery will not request
            specific information about user accounts, transactions or other
            personally identifiable data from you unless: (i) the information is
            requested to help complete a transaction initiated by you; (ii)the
            information is requested to efficiently process your enquiry; or
            (iii) it is legally required e.g. in connection with the AML/KYC
            procedure.
            <br />
            You should ascertain that your transactions and/or account details
            are not disclosed by ensuring that you do not knowingly or
            accidentally share, provide or facilitate unauthorized use of it.
            <br />
            WITHOUT LIMITING THE FOREGOING, Blendery SHALL NOT BE LIABLE FOR
            ANY LOSSES OR DAMAGES INCURRED AS A RESULT OF ANY INFORMATION
            SUBMITTED TO IT THROUGH THIS WEBSITE OR ANY CONTACT E-MAIL THEREOF
            OR FOR ITS TRANSMISSION OF INFORMATION TO ANY PERSON(S) OR
            ENTITY(IES) AS A RESULT OF A REQUEST FOR SUCH TRANSMISSION
            REASONABLY BELIEVED BY Blendery TO HAVE BEEN MADE BY SUCH PERSON OR
            ENTITY.
            <br />
          </div>
        </div>
        <div className="self-stretch h-[608px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            7. Risk Disclosure
          </div>
          <div className="self-stretch text-base font-normal font-['Inter'] leading-normal">
            Blendery does not and will not provide any investment advice or
            legal advice regarding your exchange. You acknowledge that only you
            are responsible for your decisions and actions performed on our
            platform and we will not make any personal recommendations for or
            advise you on the exchange of particular crypto assets. Before
            performing any exchange of crypto assets, you should carefully
            consider whether such an exchange is suitable for you with your
            current circumstances and financial resources.
            <br />
            Be aware that crypto assets are generally assumed to be subject to
            high volatility due to them still being in the early stages of
            developing, technologically and financially. Crypto assets do not
            necessarily have a specific form of protection or regulation by any
            governmental body, which means that by exchanging crypto assets, you
            will not be able to enforce any guarantees or safeguards expected
            with regulated financial services.
            <br />
            THE RISK OF LOSS IN THE EXCHANGE OF CRYPTO ASSETS CAN BE
            SUBSTANTIAL, AND THEREFORE YOU SHOULD UNDERSTAND THE POSSIBILITY OF
            LOSSES ASSOCIATED WITH THE EXCHANGE OF CRYPTO ASSETS AND MUST ASSUME
            RESPONSIBILITY FOR ALL THE RISKS ASSOCIATED WITH SUCH EXCHANGES AND
            FOR THEIR RESULTS.
            <br />
          </div>
        </div>
        <div className="self-stretch h-[1244px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            8. Third-Party Content and Services
          </div>
          <div className="self-stretch">
            <span className="text-base font-normal font-['Inter'] leading-normal">
              For the purposes hereof{' '}
            </span>
            <span className="text-base font-bold font-['Inter'] leading-normal">
              "Third-Party Content"
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              {' '}
              shall mean the content provided by third parties, including
              without limitation links to web pages of such parties, which may
              be represented on the Website and other Services. At the same time
              "Third-party service" refers to any platform or network in which
              crypto assets belong to you or where you are the beneficial owner
              of crypto assets; or any website or platform which we redirect you
              to; and this platform or website is maintained by a third party
              outside of the Services, including, but not limited to third-party
              accounts.
              <br />
            </span>
            <span className="text-base font-bold font-['Inter'] leading-normal">
              Price accuracy.
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              {' '}
              Although we enforce strict price accuracy policies for all fiat
              providers and do our best to ensure that the content displayed on
              or via our Marketplace is up-to-date and accurate, we cannot
              guarantee the reliability or accuracy of such content.
              <br />
            </span>
            <span className="text-base font-bold font-['Inter'] leading-normal">
              No control over third-party services.
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              {' '}
              If you encounter any problems with any Third-Party Services
              available via Blendery, you acknowledge that you should resolve
              that issue with the relevant third-party or fiat provider and that
              your sole remedy in such circumstances lies within the relevant
              third-party and not within Blendery.
              <br />
              You may be charged fees by the third-party service provider.
              Blendery is not responsible for any third-party services' fees.
              You are solely responsible for your use of the third-party
              service, and you agree to comply with all terms and conditions
              applicable to any third-party service.
              <br />
              The exchange rates discrepancy is at any time possible due to the
              Third-Party algorithms. YOU INDEMNIFY AND HOLD BLENDERY HARMLESS
              AGAINST ANY DIRECT, INDIRECT, CONSEQUENTIAL OR SPECIAL DAMAGES, OR
              ANY OTHER DAMAGES OF ANY KIND, INCLUDING, BUT NOT LIMITED TO, LOSS
              OF USE, LOSS OF PROFITS OR LOSS OF DATA, WHETHER IN AN ACTION IN
              CONTRACT, TORT (INCLUDING BUT NOT LIMITED TO NEGLIGENCE) OR
              OTHERWISE, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE
              AFORESAID EXCHANGE RATES DISCREPANCY WHICH IS BELOW 10 USD.
              <br />
              While using our Services, you may view Third-Party Content. We do
              not control, endorse or adopt (unless otherwise expressly stated
              by Us) any Third-Party Content and shall have no responsibility
              for Third-Party Content, including without limitation material
              that may be misleading, incomplete, erroneous, offensive, indecent
              or otherwise objectionable. In addition, your business dealings or
              correspondence with such third parties are solely between you and
              the third parties. We are not responsible or liable for any loss
              or damage of any sort incurred as the result of any such dealings,
              and you understand that your use of Third-Party Content, and your
              interactions with third parties, is at your own risk.
              <br />
            </span>
          </div>
        </div>
        <div className="self-stretch h-[552px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            9. Intellectual Property
          </div>
          <div className="self-stretch">
            <span className="text-base font-normal font-['Inter'] leading-normal">
              All our intellectual property assets ("IP") including but not
              limited to all copyrights, trademarks, patents, service marks,
              trade names, software code, icons, logos, characters, layouts,
              trade secrets, buttons, color scheme and graphics are protected by
              local and international intellectual property laws and treaties.
              <br />
              We hereby grant you a limited, nonexclusive and non-sublicensable
              license to access and use our IP for your personal use only.
              <br />
              In any case you may not alter, modify, reproduce, distribute or
              commercially exploit any materials, including text, graphics,
              video, audio, software code, user interface design or logos.
              <br />
              The license granted under this Section will automatically
              terminate if We suspend or terminate your access to the Services
              <br />
              In case you upload or share any feedback, suggestion, idea or
              other information or material (
            </span>
            <span className="text-base font-bold font-['Inter'] leading-normal">
              "Content"
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              ) with us you automatically grant us a worldwide license to use
              your content. It becomes part of the public domain as long as it
              remains on our Website and Services. It can be used for marketing
              or any other purposes at our sole discretion.
              <br />
            </span>
          </div>
        </div>
        <div className="self-stretch h-[328px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            10. Communications
          </div>
          <div className="self-stretch">
            <span className="text-base font-normal font-['Inter'] leading-normal">
              You agree and consent to receive electronically all
              Communications, that Blendery may be willing to communicate to you
              in connection with your Blendery Account and/or use of our
              Services. For the purposes hereof{' '}
            </span>
            <span className="text-base font-bold font-['Inter'] leading-normal">
              “Communications”
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              {' '}
              shall mean all and any communication, agreement, document,
              receipt, notice and disclosure, which may be from time to time
              addressed to user by Blendery. You may withdraw your consent to
              receive electronic Communications by sending a withdrawal notice
              to support. If this is a case you waive your right to plead
              ignorance. If you decline or withdraw consent to receive
              electronic Communications, Blendery may suspend or terminate your
              use of the Services.
              <br />
            </span>
          </div>
        </div>
        <div className="self-stretch h-[1608px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            11. Limitation of Liabilities
          </div>
          <div className="self-stretch text-base font-normal font-['Inter'] leading-normal">
            Except as expressly provided to the contrary in a writing by Us, our
            Services are provided on an "As is" and "As available" basis. WE
            EXPRESSLY DISCLAIM, AND YOU WAIVE, ALL WARRANTIES OF ANY KIND,
            WHETHER EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, IMPLIED
            WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
            TITLE AND NON-INFRINGEMENT AS TO OUR SERVICES, INCLUDING THE
            INFORMATION, CONTENT AND MATERIALS CONTAINED THEREIN.
            <br />
            Except as otherwise required by law, IN NO EVENT SHALL BLENDERY, OUR
            DIRECTORS, OFFICERS, MEMBERS, EMPLOYEES OR AGENTS BE LIABLE FOR ANY
            DIRECT, INDIRECT, CONSEQUENTIAL OR SPECIAL DAMAGES, OR ANY OTHER
            DAMAGES OF ANY KIND, INCLUDING, BUT NOT LIMITED TO, LOSS OF USE,
            LOSS OF PROFITS OR LOSS OF DATA, WHETHER IN AN ACTION IN CONTRACT,
            TORT (INCLUDING BUT NOT LIMITED TO NEGLIGENCE) OR OTHERWISE, ARISING
            OUT OF OR IN ANY WAY CONNECTED WITH THE USE OF OR INABILITY TO USE
            OUR SERVICES, INCLUDING WITHOUT LIMITATION ANY DAMAGES CAUSED BY OR
            RESULTING FROM RELIANCE BY ANY USER ON ANY INFORMATION OBTAINED FROM
            BLENDERY, OR THAT RESULT FROM MISTAKES, OMISSIONS, INTERRUPTIONS,
            DELETION OF FILES OR EMAIL, ERRORS, DEFECTS, VIRUSES, DELAYS IN
            OPERATION OR TRANSMISSION OR ANY FAILURE OF PERFORMANCE, WHETHER OR
            NOT RESULTING FROM A FORCE MAJEURE EVENT, COMMUNICATIONS FAILURE,
            THEFT, DESTRUCTION OR UNAUTHORIZED ACCESS TO BLENDERY'S RECORDS,
            PROGRAMS OR SERVICES.
            <br />
            Exchanges via our Services cannot be canceled by Blendery.
            Therefore, check the details of your exchange details before making
            such exchange. Blendery is not responsible for your crypto assets
            once they have been sent outside of the Services. Moreover, Blendery
            doesn’t guarantee the uptime of the exchange.
            <br />
            To the maximum extent permitted by applicable law, IN NO EVENT SHALL
            THE AGGREGATE LIABILITY OF BLENDERY (INCLUDING OUR DIRECTORS,
            OFFICERS, MEMBERS, EMPLOYEES AND AGENTS), WHETHER IN CONTRACT,
            WARRANTY, TORT (INCLUDING NEGLIGENCE, WHETHER ACTIVE, PASSIVE OR
            IMPUTED), PRODUCT LIABILITY, STRICT LIABILITY OR OTHER THEORY,
            ARISING OUT OF OR RELATING TO THE USE OF, OR INABILITY TO USE,
            BLENDERY OR TO THESE TERMS EXCEED THE FEES PAID BY YOU TO BLENDERY
            WITHIN 3 MONTHS IMMEDIATELY PRECEDING THE DATE OF ANY CLAIM GIVING
            RISE TO SUCH LIABILITY.
            <br />
            We strive to protect our users from fraudulent and scam activities
            in the sphere of crypto assets. It is possible, that some crypto
            assets are purposed for unlawful seizure of the property, or are
            construed as a fraud, scam or any other activity, recognized by the
            laws as illegal and/or non-compliant with legal requirements.
            Blendery cooperates with law enforcements agencies and other
            competent authorities in order to determine and disclose such crypto
            assets. We reserve the right to prohibit and discontinue any
            Exchanges via our Services with such crypto asset at our sole
            discretion, without any prior notice to you and without publication
            of the reason for such decision, whenever this comes to our
            knowledge. YOU INDEMNIFY AND HOLD BLENDERY HARMLESS AGAINST ANY
            CLAIMS, DEMANDS AND DAMAGES, WHETHER DIRECT, INDIRECT, CONSEQUENTIAL
            OR SPECIAL, OR ANY OTHER DAMAGES OF ANY KIND, INCLUDING, BUT NOT
            LIMITED TO, LOSS OF USE, LOSS OF PROFITS OR LOSS OF DATA, WHETHER IN
            AN ACTION IN CONTRACT, TORT (INCLUDING BUT NOT LIMITED TO
            NEGLIGENCE) OR OTHERWISE, ORIGINATED FROM OR IN ANY WAY CONNECTED
            WITH PROHIBITION AND DISCONTINUATION OF EXCHANGES IN OUR WEBSITE
            WITH ANY CRYPTO ASSET.
            <br />
          </div>
        </div>
        <div className="self-stretch h-[488px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            12. No Offer of Securities
          </div>
          <div className="self-stretch text-base font-normal font-['Inter'] leading-normal">
            Blendery takes all possible measures to integrate and exchange those
            digital coins and digital tokens and other types of digital mediums
            of exchange only that cannot be classified as “security“ by SEC or
            other competent national authorities.
            <br />
            The responsibility for the fact that the crypto asset cannot be
            treated as “security“ lies with the owner of digital token and/or
            digital coin. Blendery reserves the right at its sole discretion to
            prohibit and discontinue any exchanges (as well as any other type of
            transaction) with the token or the coin if there is any risk or
            speculations that such token and/or coin can be treated as
            “security“.
            <br />
            We follow the best practices to decide whether crypto assets are
            security or not. However, for the avoidance of any doubt the
            provisions of this clause shall not constitute or deemed to be
            construed to constitute any warranty and/or investment, financial,
            legal or any other professional advice, that any crypto asset that
            any crypto asset available through our Services is not a security.
            <br />
          </div>
        </div>
        <div className="self-stretch h-[504px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            13. Termination of Terms
          </div>
          <div className="self-stretch">
            <span className="text-base font-normal font-['Inter'] leading-normal">
              We reserve the right to terminate these Terms and delete your
              Blendery Account and registration (including your username and
              password) in the following cases:
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              If for any reason We decide to discontinue to provide the Service,
              by providing at least a 3 (three) calendar days’ notice (which
              shall be provided by e-mail);
              <br />
              If We believe that you have breached any of the terms of these
              Terms, immediately without notice;
              <br />
              If We decide to terminate our Services, immediately without
              notice.
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              Blendery may suspend or terminate your account or use of the
              Services, or the processing of any crypto asset transaction, at
              any time if it determines in its sole discretion that you are
              accessing the Services from a Restricted Location or are a
              resident of one (see cl.5.1.3. of our Terms of Use).
              <br />
            </span>
          </div>
        </div>
        <div className="self-stretch h-[876px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            14. Applicable Law; Arbitration
          </div>
          <div className="self-stretch">
            <span className="text-base font-normal font-['Inter'] leading-normal">
              You and Blendery agree to arbitrate any dispute arising from these
              Terms or your use of the Services, except for disputes in which
              either party seeks equitable and other relief for the alleged
              unlawful use of copyrights, trademarks, trade names, logos, trade
              secrets or patents.
              <br />
              You and Blendery agree to notify each other in writing of any
              dispute within thirty (30) days of when it arises. Notice to
              Blendery shall be sent to{' '}
            </span>
            <span className="text-base font-normal font-['Inter'] underline leading-normal">
              legal@b
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              lendery.io
              <br />
              Any dispute, controversy, difference or claim arising out of or
              relating to the Terms, including the existence, validity,
              interpretation, performance, breach or termination thereof or any
              dispute regarding non-contractual obligations arising out of or
              relating to it shall be referred to and finally resolved by
              arbitration administered by the Hong Kong International
              Arbitration Centre (HKIAC) under the HKIAC Administered
              Arbitration Rules in force when the Notice of Arbitration is
              submitted.
              <br />
              The law of this arbitration clause shall be Hong Kong law.
              <br />
              The seat of arbitration shall be in Hong Kong.
              <br />
              The number of arbitrators shall be one. The arbitration
              proceedings shall be conducted in English language.
              <br />
              Other than class procedures and remedies discussed below, the
              arbitrator has the authority to grant any remedy that would
              otherwise be available in court. Any dispute between the parties
              will be governed by these Terms and the laws of Hong Kong, without
              giving effect to any conflict of laws principles that may provide
              for the application of the law of another jurisdiction.
              <br />
              Whether the dispute is heard in arbitration or in court, you will
              not commence against Blendery a class action, class arbitration or
              representative action or proceeding.
              <br />
            </span>
          </div>
        </div>
        <div className="self-stretch h-[576px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            15. Miscellaneous
          </div>
          <div className="self-stretch text-base font-normal font-['Inter'] leading-normal">
            These Terms contain the entire agreement, and supersede all prior
            and contemporaneous understandings between the parties regarding the
            Services.
            <br />
            In the event of any conflict between these Terms and any other
            agreement you may have with Blendery, the terms of that other
            agreement will prevail only if these Terms are specifically
            identified and declared to be overridden by such other agreement.
            <br />
            Our failure or delay in exercising any right, power or privilege
            under these Terms shall not operate as a waiver thereof.
            <br />
            The invalidity or unenforceability of any of these Terms shall not
            affect the validity or enforceability of any other of these Terms,
            all of which shall remain in full force and effect.
            <br />
            You may not assign or transfer any of your rights or obligations
            under these Terms without prior written consent from Blendery,
            including by operation of law or in connection with any change of
            control. Blendery may assign or transfer any or all of its rights
            under these Terms, in whole or in part, without obtaining your
            consent or approval.
            <br />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
    <div className="h-full flex flex-col gap-2">
    {terms}
        <FooterMini />
      </div>
    </>
  );
};
