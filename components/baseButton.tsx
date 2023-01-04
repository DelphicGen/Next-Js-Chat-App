const BaseButton  = ({ text, handleClick }: { 
  text: string;
  handleClick: () => void;
}) => {
  return (
    <button
      className='button button--yellow'
      onClick={handleClick}
    >
      {text}
    </button>
  )
}

export default BaseButton;
