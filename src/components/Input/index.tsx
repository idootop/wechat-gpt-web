import './style.css';

import { forwardRef } from 'react';

import { BoxProps, getBoxProps } from '../Box';

interface InputProps {
  value?: string;
  hint?: string;
  onChange?: (input: string) => void;
  onSubmit?: (input: string) => void;
}

export const Input = forwardRef((props: BoxProps & InputProps, ref: any) => {
  const boxProps = getBoxProps(props);
  const { value, hint = '请输入...', onChange, onSubmit } = props ?? {};

  return (
    <input
      ref={ref}
      {...boxProps}
      value={value}
      placeholder={hint}
      onKeyDown={(event: any) => {
        if (event.key === 'Enter') {
          const str = event.target.value;
          onSubmit?.(str);
        }
      }}
      onChange={(event: any) => {
        const str = event.target.value;
        onChange?.(str);
      }}
    />
  );
});
