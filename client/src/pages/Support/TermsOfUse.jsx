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
    <div className="rounded-lg bg-white shadow-lg dark:bg-background-dark overflow-hidden flex flex-col items-start justify-start p-[5px] border-[1px] border-solid border-lightslategray-300 text-left text-xs text-gray-500">
      <div className="flex flex-col items-center h-[500px] w-[512px] overflow-y-auto m-4 gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-center items-center text-base font-black h-[24px]">
            Legal
          </div>

          <div className="flex flex-col justify-start gap-2 text-slate-400">
            <div className="flex">
              {`This Privacy and Data Retention Policy (the Policy) explains the way in which Fintechvision Ltd. (hereinafter referred to as “Changelly”), CGL Pro Technologies Limited (hereinafter referred to as “ChangellyPRO”) and Sum & Substance Ltd. (hereinafter referred to “Sum & Substance”) collect, use, share, and protect Personal Information of Users ("you") obtained through changelly.com and pro.changelly.com ("Websites"), any related applications (including but not limited to the mobile one) and exchange tools integrated into third party services (“Services”). The terms “we,” “us,” and “our” refer to the entities indicated below.`}
            </div>
            <div className="flex">
              {`“Personal Information” is an information that identifies or can be used to identify, contact, or locate the person to whom such information pertains.`}
            </div>
            <div className="flex">
              {`We are fully committed to respecting privacy and to protecting any information that our clients provide. Your privacy and security are both our highest priorities and we make every effort to ensure that all the information provided by you is protected.`}
            </div>
            <div className="flex">
              {`We follow and comply with best practices and regulation in the sphere of privacy including but not limited to General Data Protection Regulation (GDPR).`}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-start gap-2 text-base h-[18px">
            <div className="flex flex-row">{`1.`}</div>
            <div className="flex">{`Who We Are`}</div>
          </div>

          <div className="flex flex-row justify-start gap-2">
            <div className="flex flex-row">{`1.1`}</div>
            <div className="flex">
              {`The Personal Information is collected, controlled and processed by the following entities:`}
            </div>
          </div>

          <div className="ml-4 flex flex-row justify-start gap-2">
            <div className="flex flex-row">{`1.1.1`}</div>
            <div className="flex">
              {`Blendery Contact e-mail: support@blendery.io`}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-start gap-2 text-base h-[18px">
            <div className="flex flex-row">{`2.`}</div>
            <div className="flex">
              {`Personal Information Which We May Collect`}
            </div>
          </div>

          <div className="flex flex-row justify-start gap-2">
            <div className="flex flex-row">{`2.1`}</div>
            <div className="flex">
              {`While providing our Services, we may collect Personal Information, namely:`}
            </div>
          </div>
          <div className="ml-4 flex flex-row justify-start gap-2">
            <div className="flex flex-row">{`2.1.1`}</div>
            <div className="flex">
              {`An information necessary for registration. In order to access the full functionality of the Service, you need to register. When you go through the registration process, you shall provide an e-mail address and create a password. You may also choose to log in via supported third-party service provider (for example, Twitter, Facebook and Google+). You can also choose to add a Google Authenticator account to be used for 2FA verification for improved security;`}
            </div>
          </div>
          <div className="ml-4 flex flex-row justify-start gap-2">
            <div className="flex flex-row">{`2.1.2`}</div>
            <div className="flex">
              {`Transaction Information. For all personal user accounts, we collect transaction information including transaction history.`}
            </div>
          </div>
          <div className="ml-4 flex flex-row justify-start gap-2">
            <div className="flex flex-row">{`2.1.3`}</div>
            <div className="flex">
              {`An information, which we may collect through automated means. Through your use of our Services, including exchange tools, we also monitor and collect tracking information related to usage such as access date & time, device identification, operating system, browser type and IP address. This information may be directly obtained by Us or through third party services.`}
            </div>
          </div>
          <div className="ml-4 flex flex-row justify-start gap-2">
            <div className="flex flex-row">{`2.1.4`}</div>
            <div className="flex">
              {`Sometimes you decide or we require (for example in case of KYC procedure) to share with us some other Personal Information, we may collect it as well.`}
            </div>
          </div>

          <div className="flex flex-row justify-start gap-2">
            <div className="flex flex-row">{`2.2`}</div>
            <div className="flex">
              {`We do not collect any information that may identify You without your permission. However, We use Google Analytics on Our Technology Platform. If You want to know more about Google Analytics and its “do not track” policy, please visit google analytics`}
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
