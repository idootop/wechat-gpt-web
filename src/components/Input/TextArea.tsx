import './style.css';

import { forwardRef, useEffect, useRef } from 'react';

import { clamp } from '@/utils/base';

import { BoxProps, getBoxProps } from '../Box';

interface TextAreaProps {
  rows?: number;
  maxLines?: number;
  lineHeight?: number;
  value?: string;
  hint?: string;
  onChange?: (input: string) => void;
  onSubmit?: (input: string) => void;
}

export const TextArea = forwardRef(
  (props: BoxProps & TextAreaProps, ref: any) => {
    const {
      value = '',
      hint = '',
      rows = 1,
      maxLines = 5,
      lineHeight = 20,
      onChange,
      onSubmit,
    } = props ?? {};
    const boxProps = getBoxProps({ ...props, lineHeight: lineHeight + 'px' });

    const _ref = useRef();
    const inputRef = ref ?? _ref;

    const updateInputHeight = () => {
      if (!inputRef.current) return;
      const minHeight = rows * lineHeight;
      const maxHeight = maxLines * lineHeight;
      if (inputRef.current.value === '\n') {
        inputRef.current.value = '';
        inputRef.current.style.height = 'auto';
        return;
      }
      inputRef.current.style.height = 'auto';
      const height = inputRef.current.scrollHeight;
      inputRef.current.style.height =
        clamp(height, minHeight, maxHeight) + 'px';
    };

    useEffect(() => {
      const timer = setInterval(() => {
        updateInputHeight();
      }, 100);
      return clearInterval(timer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <textarea
        rows={1}
        ref={inputRef}
        {...boxProps}
        className="text-area"
        value={value === '\n' ? '' : value}
        placeholder={hint}
        onKeyDown={(event: any) => {
          if (event.key === 'Enter') {
            updateInputHeight();
            const str = event.target.value;
            onSubmit?.(str);
          }
        }}
        onChange={(event: any) => {
          updateInputHeight();
          const str = event.target.value;
          onChange?.(str);
        }}
      />
    );
  },
);
