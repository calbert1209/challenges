import React, { createContext, useContext } from 'react';
import { enUS } from './en-us';
import { jaJP } from './ja-jp';

export const localeTypes = {
  enUS: 'en-US',
  jaJP: 'ja-JP',
};

const localeContext = createContext(enUS);

const resolveStringDictionary = (locale) => {
  if (locale === localeTypes.jaJP) {
    return jaJP;
  }

  return enUS;
};

/**creates a context provider that swaps its value per the locale name argument
 *
 * @returns (locale: string, children: any) => JSX.Element
 */
export const createLocalProvider = () => {
  return ({ locale, children }) => {
    // TODO: switch between dictionaries per locale parameter
    const localizedStrings = resolveStringDictionary(locale);
    return (
      <localeContext.Provider value={localizedStrings}>
        {children}
      </localeContext.Provider>
    );
  };
};

/**
 * Custom React hook to retrieve localized string dictionary
 * @returns LocalizedStringDictionary
 */
export const useLocale = () => {
  return useContext(localeContext);
};
