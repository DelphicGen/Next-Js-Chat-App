const BaseButton  = ({ customClassName, disabled = false, children, handleClick }: {
  customClassName?: string; 
  disabled?: boolean;
  children: JSX.Element | string;
  handleClick: () => void;
}) => {
  return (
    <button
      className={`button button--yellow ${customClassName || ''}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default BaseButton;
