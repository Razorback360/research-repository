import { cn } from '@app/utils/cn';

const Badge = ({
  className,
  children,
  badgeType,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
> &
  Partial<{ badgeType: 'high' | 'medium' | 'low' | 'neutral' }>) => {
  let badgeJSX = null;
  if (badgeType == 'high') {
    badgeJSX = badgeJSX = (
      <span
        className={cn(
          'bg-red-600 rounded-2xl px-5 py-1 text-white',
          className || '',
        )}
        {...props}
      >
        {children}
      </span>
    );
  } else if (badgeType == 'medium') {
    badgeJSX = (
      <span
        className={cn(
          'bg-orange-500 rounded-2xl px-5 py-1 text-white',
          className || '',
        )}
        {...props}
      >
        {children}
      </span>
    );
  } else if (badgeType == 'low') {
    badgeJSX = (
      <span
        className={cn(
          'bg-green-500 rounded-2xl px-5 py-1 text-white',
          className || '',
        )}
        {...props}
      >
        {children}
      </span>
    );
  } else {
    badgeJSX = (
      <span
        className={cn(
          'bg-gray-500 rounded-2xl px-5 py-1 text-white',
          className || '',
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
  return badgeJSX;
};

export default Badge;
