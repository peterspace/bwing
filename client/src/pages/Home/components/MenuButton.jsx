import { useMemo } from 'react';

const MenuButton = ({
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
      className="cursor-pointer rounded-lg overflow-hidden flex flex-row items-start justify-start p-1 text-left input-icon text-gray-900 dark:text-gray-100 font-roboto"
      style={menuButtonStyle}
      onClick={handleClick}
    >
      <div className="relative">{title}</div>
    </div>
  );
};

export default MenuButton;
