import React, { createContext, useContext } from 'react';
import { enUS } from './en-us';

const localeContext = createContext(enUS);

/**creates a context provider that swaps its value per the locale name argument
 *
 * @returns (locale: string, children: any) => JSX.Element
 */
export const createLocalProvider = () => {
  return ({ locale, children }) => {
    // TODO: switch between dictionaries per locale parameter
    const localizedStrings = enUS;
    return (
      <localeContext.Provider value={localizedStrings}>
        {children}
      </localeContext.Provider>
    );
  };
};

export const useLocale = () => {
  return useContext(localeContext);
};
