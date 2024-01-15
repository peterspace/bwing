import { useNavigate } from 'react-router-dom';

const FooterMini = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-[64px] overflow-hidden text-left text-xl text-gray-900 dark:text-gray-200 w-full">
      <div className="bottom-[0px] flex flex-col items-start justify-start p-5 box-border gap-[20px]">
        <div className="relative bg-lightslategray-300 w-full h-px overflow-hidden shrink-0" />

        <div className="self-stretch flex flex-col items-end justify-start gap-[10px] text-sm font-medium text-gray-900 dark:text-gray-100 font-roboto">
          <div className="self-stretch relative h-5">
            {/* <div
              className="cursor-pointer absolute top-[0px] left-[125px] h-5 flex flex-row items-center justify-center py-px px-0 box-border"
              onClick={() => navigate('/termsOfUse')}
            >
              <div className="relative">Terms of Use</div>
            </div> */}
            <div
              className="cursor-pointer absolute top-[0px] left-[125px] h-5 flex flex-row items-center justify-center py-px px-0 box-border"
              onClick={() => navigate('/support')}
            >
              <div className="relative">Support</div>
            </div>
            {/* <div
              className="cursor-pointer absolute top-[0px] left-[0px] h-5 flex flex-row items-center justify-center py-px px-0 box-border"
              onClick={() => navigate('/support')}
            >
              <div className="relative">Support</div>
            </div> */}
            <div
              className="cursor-pointer absolute top-[0px] left-[229px] h-5 flex flex-row items-center justify-center py-px px-0 box-border"
              onClick={() => navigate('/privacyPolicy')}
            >
              <div className="relative">Privacy Policy</div>
            </div>
            <div
              className="cursor-pointer absolute top-[0px] left-[337px] h-5 flex flex-row items-center justify-center py-px px-0 box-border"
              onClick={() => navigate('/aml')}
            >
              <div className="relative">AML/KYC</div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center text-right text-smi text-gray-500 dark:text-gray-200">
            <div className="relative leading-[16.1px]">© Blendery 2024</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterMini;
