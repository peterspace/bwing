import TokenButtonLight from './TokenButtonLight';

const TToken = (props) => {
  const { image, symbol, name, openModal } = props;

  return (
    <div
      className="flex flex-row items-center justify-start gap-[32px] text-right input-token-container text-gray-500 font-roboto self-stretch"
      onClick={openModal}
    >
      <TokenButtonLight image={image} symbol={symbol} />
      <div className="flex-1 relative">{name}</div>
    </div>
  );
};

export default TToken;
