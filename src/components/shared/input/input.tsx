import css from './input.module.css';
import { InputHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, onChange, ...props }, ref) => {
  return (
    <input ref={ref} className={clsx(css.input, className)} {...props} />
  );
});
