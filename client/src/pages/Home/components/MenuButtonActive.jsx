import { useMemo } from 'react';

const MenuButtonActive = ({
  title,
  menuButtonBackgroundColor,
  menuButtonBorder,
  handleClick,
}) => {
  const menuButtonStyle = useMemo(() => {
    return {
      backgroundColor: menuButtonBackgroundColor,
      border: menuButtonBorder,
    };
  }, [menuButtonBackgroundColor, menuButtonBorder]);

  return (
    <div
      className="cursor-pointer rounded-lg bg-indigo-600 text-white overflow-hidden flex flex-row items-start justify-start p-1 text-left input-icon font-roboto"
      style={menuButtonStyle}
      onClick={handleClick}
    >
      <div className="relative">{title}</div>
    </div>
  );
};

export default MenuButtonActive;
