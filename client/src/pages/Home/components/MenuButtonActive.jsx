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
      // className="cursor-pointer rounded-lg bg-gray-100 text-gray-900 dark:bg-indigo-500 dark:text-white overflow-hidden flex flex-row items-start justify-start p-1 text-left text-5xl font-roboto"
      className="cursor-pointer rounded-lg bg-chizzySnow text-gray-900 dark:bg-indigo-500 dark:text-white overflow-hidden flex flex-row items-start justify-start p-1 text-left text-5xl font-roboto"
      style={menuButtonStyle}
      onClick={handleClick}
    >
      <div className="relative">{title}</div>
    </div>
  );
};

export default MenuButtonActive;
