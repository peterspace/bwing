import { useNavigate } from 'react-router-dom';

const FooterMini = () => {
  const navigate = useNavigate();

  const footer = (
    <div className="self-stretch xl:h-[70px] mb-4 px-6 xl:py-5 flex-col justify-start items-end gap-2.5 flex text-gray-900 dark:text-gray-200">
      <div className="relative bg-lightslategray-300 w-full h-px overflow-hidden shrink-0 mb-2" />
      <div className="self-stretch flex flex-col xl:flex-row gap-2 xl:justify-between items-end xl:inline-flex w-full">
        <div className="grow shrink basis-0 h-5 justify-start items-end gap-5 flex">
          <div
            className="cursor-pointer w-[50px] py-px justify-center items-center gap-2.5 flex"
            onClick={() => navigate('/support')}
          >
            <div className="text-sm font-medium font-['Roboto']">Support</div>
          </div>
          <div
            className="cursor-pointer w-[84px] py-px justify-center items-center gap-2.5 flex"
            onClick={() => navigate('/termsOfUse')}
          >
            <div className="text-sm font-medium font-['Roboto']">
              Terms of Use
            </div>
          </div>
          <div
            className="cursor-pointer w-[88px] py-px justify-center items-center gap-2.5 flex"
            onClick={() => navigate('/privacyPolicy')}
          >
            <div className="text-sm font-medium font-['Roboto']">
              Privacy Policy
            </div>
          </div>
          <div
            className="cursor-pointer w-[61px] py-px justify-center items-center gap-2.5 flex"
            onClick={() => navigate('/aml')}
          >
            <div className="text-sm font-medium font-['Roboto']">AML/KYC</div>
          </div>
        </div>
        <div className="justify-center items-center gap-2.5 flex">
          <div className="text-right text-gray-500 text-[13px] font-normal font-['Montserrat'] leading-none">
            © Blendery 2024
          </div>
        </div>
      </div>
    </div>
  );

  return <div className="mt-[64px] overflow-hidden w-full">{footer}</div>;
};

export default FooterMini;
