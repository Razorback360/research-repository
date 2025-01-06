import { cn } from '@app/utils/cn';

const Button = ({
  className,
  children,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button
      className={cn(
        'mt-6 px-6 py-2 bg-gray-300 text-gray-600 rounded-md',
        className || '',
      )}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
