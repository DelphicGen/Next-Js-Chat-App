const BaseInput = ({ customClassName, name, value, handleChange, handleKeyDown }: {
  customClassName: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      className={`focus:outline-none bg-transparent ${customClassName}`}
      name={name}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  )
}

export default BaseInput;