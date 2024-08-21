import { useState, useEffect } from 'react';

export function getPersistState(key: string) {
  return JSON.parse(localStorage.getItem(key) || 'null')
}

export function setPersistState<T>(key: string, newState: T) {
  localStorage.setItem(key, JSON.stringify(newState));
}

export default <T>(key: string, initialState: T): [T, (v: T) => void] => {
  const [state, setInternalState] = useState<T>(initialState);

  useEffect(() => {
    if(getPersistState(key)) {
      setInternalState(getPersistState(key));
    }
  }, []);

  const setState = (newState: T): void => {
    setPersistState(key, newState);
    setInternalState(newState);
  };

  return [state, setState];
};