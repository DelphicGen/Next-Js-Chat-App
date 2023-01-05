const BaseButton  = ({ children, handleClick }: { 
  children: JSX.Element | string;
  handleClick: () => void;
}) => {
  return (
    <button
      className='button button--yellow'
      onClick={handleClick}
    >
      {children}
    </button>
  )
}

export default BaseButton;
