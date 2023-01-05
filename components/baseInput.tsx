const BaseInput = ({ customClassName, name, value, handleChange }: {
  customClassName: string;
  name: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      className={`focus:outline-none bg-transparent ${customClassName}`}
      name={name}
      value={value}
      onChange={handleChange}
    />
  )
}

export default BaseInput;