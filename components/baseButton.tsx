const BaseButton  = ({ customClassName, children, handleClick }: {
  customClassName?: string; 
  children: JSX.Element | string;
  handleClick: () => void;
}) => {
  return (
    <button
      className={`button button--yellow ${customClassName || ''}`}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export default BaseButton;
