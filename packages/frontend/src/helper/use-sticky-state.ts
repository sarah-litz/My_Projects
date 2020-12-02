import React from 'react';

export function useStickyState(defaultValue: string, key: string) {
  const [value, setValue] = React.useState<string>(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
  });
  
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  React.useEffect(() => {
    const listener = () => {
      console.log('fadsfasdff')
      setValue(window.localStorage.getItem(key) ?? defaultValue);
    }
    window.addEventListener('storage', listener);
    return () => {
      window.removeEventListener('storage', listener)
    };
  }, [key, defaultValue])

  return [value, setValue];
}