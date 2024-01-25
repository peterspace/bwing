import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import FooterMini from '../../components/FooterMini';

export const PrivacyPolicy = () => {
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('prevLocation', JSON.stringify(location?.pathname));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const privacy2 = (
    <div className="w-full h-full mt-[64px] overflow-auto bg-white dark:bg-app-container-dark text-gray-500 dark:text-gray-200 flex-col justify-start items-center gap-10 inline-flex">
      <div className="w-[70%] h-full p-6 flex-col justify-start items-start gap-6 flex overflow-y-auto">
        <div className="self-stretch h-[604px] flex-col justify-start items-center gap-2 flex">
          <div className="self-stretch text-center text-zinc-800 dark:text-white text-[27px] font-bold font-['Inter'] leading-9">
            Privacy and Data Retention Policy
          </div>
          <div className="self-stretch text-base font-normal font-['Inter'] leading-normal">
            Last Updated:September, 2023
            <br />
            This Privacy and Data Retention Policy (the Policy) explains the way
            in which Blendery collect, use, share, and protect Personal
            Information of Users ("you") obtained through Blendery.io, any related applications (including
            but not limited to the mobile one) and exchange tools integrated
            into third party services (“Services”). The terms “we,” “us,” and
            “our” refer to the entities indicated below.
            <br />
            “Personal Information” is an information that identifies or can be
            used to identify, contact, or locate the person to whom such
            information pertains.
            <br />
            We are fully committed to respecting privacy and to protecting any
            information that our clients provide. Your privacy and security are
            both our highest priorities and we make every effort to ensure that
            all the information provided by you is protected.
            <br />
            We follow and comply with best practices and regulation in the
            sphere of privacy including but not limited to General Data
            Protection Regulation (GDPR).
          </div>
        </div>
        <div className="self-stretch h-[364px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            1. Who We Are
          </div>
          <div className="self-stretch">
            <span className="text-base font-normal font-['Inter'] leading-normal">
              The Personal Information is collected, controlled and processed by
              the Blendery:
              <br />
            </span>
            {/* <span className="text-base font-normal font-['Inter'] leading-normal">
              Fintechvision Ltd. 7/F, Woon Lee Commercial Building, 7-9 Austin
              Ave, Tsim Sha Tsui, Kowloon, Hong Kong, contact e-mail:{' '}
            </span> */}
            <span className="text-base font-normal font-['Inter'] underline leading-normal">
              legal@blendery.io.
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
            {`Blendery Contact e-mail: support@blendery.io`}
            </span>
          </div>
        </div>
        <div className="self-stretch h-[764px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            2. Personal Information Which We May Collect
          </div>
          <div className="self-stretch">
            <span className="text-base font-normal font-['Inter'] leading-normal">
              While providing our Services, we may collect Personal Information,
              namely:
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              An information necessary for registration. In order to access the
              full functionality of the Service, you need to register. When you
              go through the registration process, you shall provide an e-mail
              address and create a password. You may also choose to log in via
              supported third-party service provider (for example, Twitter,
              Facebook and Google+). You can also choose to add a Google
              Authenticator account to be used for 2FA verification for improved
              security;
              <br />
              Transaction Information. For all personal user accounts, we
              collect transaction information including transaction history.
              <br />
              An information, which we may collect through automated means.
              Through your use of our Services, including exchange tools, we
              also monitor and collect tracking information related to usage
              such as access date & time, device identification, operating
              system, browser type and IP address. This information may be
              directly obtained by Us or through third party services.
              <br />
              Sometimes you decide or we require (for example in case of KYC
              procedure) to share with us some other Personal Information, we
              may collect it as well.
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              We do not collect any information that may identify You without
              your permission. However, We use Google Analytics on Our
              Technology Platform. If You want to know more about Google
              Analytics and its “do not track” policy, please visit{' '}
            </span>
            <span className="text-base font-normal font-['Inter'] underline leading-normal">
              google analytics
              <br />
            </span>
          </div>
        </div>
        <div className="self-stretch h-[184px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            3. Children
          </div>
          <div className="self-stretch text-base font-normal font-['Inter'] leading-normal">
            We do not intend to solicit or collect Personal Information from
            anyone under the age of 16 or under the legal age of your country,
            if it is higher. If you are under 16 or are not of a legal age of
            your country, do not enter any personal information on our Website
            and Services platform.
            <br />
          </div>
        </div>
        <div className="self-stretch h-[880px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            4. Our Use of Your Information
          </div>
          <div className="self-stretch">
            <span className="text-base font-normal font-['Inter'] leading-normal">
              We and our representatives store and use Personal Information only
              for providing and improving the Website and the Services. In
              particular, we use user's Personal Information for the following
              purposes:
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              To maintain our Website and the Services. We use Personal
              Information to ensure that our services function properly;
              <br />
              To improve our Website and Services. Personal Information helps
              our systems ensure that our interface is accessible for Users
              across all platforms;
              <br />
              To comply with our legal obligations. In many jurisdictions we are
              obliged to collect certain information about our users to be
              authorized to act (Know Your Client and Anti-Money Laundering
              regulations). We obliged to obtain Personal Information in order
              to be able to aid during criminal investigations;
              <br />
              To protect your assets We may use information to identify you and
              the assets belonging to you in order to secure access to your
              accounts and to prevent the fraud. Information about your
              transaction allows us to monitor suspicious activity and protect
              you from fraud and scam activity;
              <br />
              To send periodic e-mails We may use the information we collect
              from you when you register or use certain other site features.
              This might be for security reasons, to ask your opinion about the
              website, or it may be to keep you updated on any changes to the
              services provided on the Website and our Services. We may also
              send periodic emails with news and Services updates, or use this
              information to follow up with you following live chat or email;
              <br />
              To resolve disputes and enforce our agreements to the extent
              necessary and sufficient for protecting your interests or
              interests of other users.
              <br />
            </span>
          </div>
        </div>
        <div className="self-stretch h-[300px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            5. Data Retention
          </div>
          <div className="self-stretch text-base font-normal font-['Inter'] leading-normal">
            We will retain your information only for as long as is necessary for
            the purposes set out in this policy. We will retain your information
            just to the extent necessary to comply with our legal obligations,
            resolve disputes, and enforce our agreements.
            <br />
            The User may request to remove the personal data. Should that be a
            case, user requests could be fulfilled by the erasure of personal
            data to the extent permissible by the applicable law and
            regulations. In certain cases we are obliged to store your
            information to be legally compliant.
            <br />
          </div>
        </div>
        <div className="self-stretch h-[776px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            6. Cookie Policy
          </div>
          <div className="self-stretch">
            <span className="text-base font-normal font-['Inter'] leading-normal">
              Cookies are files with small amount of data, which may include an
              anonymous unique identifier. Cookies are sent to your browser from
              the Website and stored on your computer's hard drive.
              <br />
              We use cookies to recognise your browser or device, learn more
              about your interests, and provide you with essential features and
              services and for additional purposes, including:
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              Recognising you when you sign-in to use our services;
              <br />
              Keeping track of your specified wallet addresses for improving
              user experience;
              <br />
              Keeping track of transaction initiating process;
              <br />
              Preventing fraudulent activity;
              <br />
              Improving security;
              <br />
              Reporting. This allows us to measure and analyze the performance
              of our services.
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              You can manage browser cookies through your browser settings. The
              "Help" feature on most browsers will tell you how to prevent your
              browser from accepting new cookies, how to have the browser notify
              you when you receive a new cookie, how to disable cookies, and
              when cookies will expire. If you disable all cookies on your
              browser, neither we nor third parties will transfer cookies to
              your browser. If you do this, however, you may have to manually
              adjust some preferences every time you visit a Website and some
              features and services may not work.
              <br />
            </span>
          </div>
        </div>
        <div className="self-stretch h-[396px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            7. Security Measures
          </div>
          <div className="self-stretch text-base font-normal font-['Inter'] leading-normal">
            Blendery and Sum & Substance aim to protect your information as
            much as we aim to protect our own information and network. We will
            not permit any third parties to contact you directly on an
            unsolicited basis in relation to their own products or services. We
            do not sell, trade, or rent your personal identification information
            to others. You should never disclose your account password to
            unauthorized parties.
            <br />
            We use certain security measures to help keep your personal
            information safe, but we cannot guarantee that these measures will
            stop any users try to get around the privacy or security settings on
            the Website and Services platform through unforeseen and/or illegal
            activity. That is why we make no warranty, express, implied or
            otherwise, that we will prevent such access.
            <br />
          </div>
        </div>
        <div className="self-stretch h-[440px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            8. How We Can Disclose Your Information
          </div>
          <div className="self-stretch text-base font-normal font-['Inter'] leading-normal">
            We may enter into a contract with third parties that need to know
            personal information to help us provide our Services. In order to
            provide us contractual services these third party service providers
            are required to follow this Policy and are limited to only using the
            information as instructed.
            <br />
            You agree that we may share and transfer your information to the
            third party who is a contracting party with us. Sharing information
            is possible only in the ways that are described in this Policy.
            <br />
            Notwithstanding anything to the contrary in this Policy, we may
            preserve or disclose your information if we believe that it is
            reasonably necessary to comply with a law, regulation, legal
            process, or governmental request; to protect the safety of any
            person; to address fraud, security or technical issues; or to
            protect our or our users’ rights or property.
            <br />
          </div>
        </div>
        <div className="self-stretch h-[1208px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            9. Your Rights to Your Information
          </div>
          <div className="self-stretch">
            <span className="text-base font-normal font-['Inter'] leading-normal">
              In accordance with effective regulations You have a significant
              number of rights related to your Personal Information, such as
              e.g.:
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              The right to access and amend the personal information we hold
              about you. You have a right to request a copy of the personal
              information we hold about you. Also you have the right to correct
              or update your Personal Information at any time.
              <br />
              The right to delete the Personal Information. You may request to
              remove the personal data If you do not want to use our Services or
              want your data to be erased, you can request us to remove your
              account permanently. Should that be a case, your requests could be
              fulfilled by the erasure of personal data to the extent
              permissible by the applicable law and regulations. In certain
              cases we are obliged to store your information to be legally
              compliant.
              <br />
              The right to restrict processing. You have the right to ask us to
              restrict the processing of your Personal Information. When
              processing is restricted, we can still store your information, but
              will not use it further.
              <br />
              The right to object to the processing of your data. You have a
              right to object to our use of your Personal Information for our
              own purpose at any time. In other words you can withdraw your
              consent to processing your Personal Information by us. In case you
              want to exercise this right, you may contact us. This right also
              includes the right to object to processing your Personal
              Information for marketing and advertising purposes. You can do it
              by clicking on the special button (an unsubscribe button) or by
              contact us and opting out from receiving all e-mails.
              <br />
              The right to data portability. You have the right to receive
              Personal Information you provide to us, in a "commonly used
              machine-readable format". This allows you to obtain and reuse your
              information for your own purposes across different services.
              <br />
              The right to lodge a complaint with a Supervisory Authority.
              <br />
            </span>
            <span className="text-base font-normal font-['Inter'] leading-normal">
              In case you want to exercise your rights, please contact us.
              <br />
              There are exceptions to these rights, however. For example, access
              to Personal Information may be denied in some circumstances if
              making the information available would reveal Personal Information
              about another person or if we are legally prevented from
              disclosing such information. In addition, where some of the data
              is necessary to maintain our Website and Services or where that is
              a legal requirement, we may retain such data for the period it is
              needed or required even if you withdraw your consent or cancel
              your account. Such information will not be considered as subject
              to erasure.
              <br />
            </span>
          </div>
        </div>
        <div className="self-stretch h-64 flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            10. Law and Harm
          </div>
          <div className="self-stretch text-base font-normal font-['Inter'] leading-normal">
            Notwithstanding anything to the contrary in this Policy, we may
            preserve or disclose your information if we believe that it is
            reasonably necessary to comply with a law, regulation, legal
            process, or governmental request; to protect the safety of any
            person; to address fraud, security or technical issues; or to
            protect our or our users’ rights or property. However, nothing in
            this Policy is intended to limit any legal defences or objections
            that you may have to a government’s request for disclosure of your
            information.
            <br />
          </div>
        </div>
        <div className="self-stretch h-[184px] flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            11. Changes to Policy
          </div>
          <div className="self-stretch text-base font-normal font-['Inter'] leading-normal">
            This Policy may be amended at our full discretion without prior
            notice. We encourage you to review it periodically in order to be
            aware of the changes we may have made. Reading it carefully and
            checking for any modifications is your responsibility. By using the
            Services, you accept and agree to the Policy and the Terms of Use.
            <br />
          </div>
        </div>
        <div className="self-stretch h-28 flex-col justify-start items-start gap-4 flex">
          <div className="self-stretch text-zinc-800 dark:text-white text-base font-bold font-['Inter'] leading-normal">
            12. Contact Us
          </div>
          <div className="self-stretch text-base font-normal font-['Inter'] leading-normal">
            If you have any questions about this Policy, please contact us via
            legal@blendery.io.
            <br />
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <>
  //     <div className="h-screen mt-[24px] overflow-auto">
  //       <div className="flex bg-lightslategray-300 h-px" />

  //       <div className={`h-full flex flex-col justify-center items-center`}>
  //         {terms}
  //         <div className="relative text-gray-900 dark:text-gray-100 w-full overflow-auto text-left text-sm font-montserrat">
  //           <div className="flex flex-col justify-center items-center">
  //             <FooterMini />
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
  return (
    <>
      <div className="h-full flex flex-col gap-2">
        {privacy2}
        <FooterMini />
      </div>
    </>
  );
};
