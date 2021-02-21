import React, { createContext, useState } from 'react';
import { IntlProvider } from 'react-intl';

import config from '../config';

import enMessages from './en';
import deMessages from './de';

const { defaultLocale } = config.intl;
const availableLocales = ['en', 'de'];

interface Messages {
  [key: string]: string;
}

interface AllMessages {
  [lang: string]: Messages;
}

const allMessages: AllMessages = {
  en: enMessages,
  de: deMessages,
};

interface IContext {
  locale: string;
  defaultLocale: string;
  availableLocales: string[];
  messages: Messages;
  switchLocale: (switchToLocale: string) => void;
}

const Context = createContext<IContext>({
  locale: defaultLocale,
  defaultLocale,
  availableLocales,
  messages: allMessages[defaultLocale],
  switchLocale: (switchToLocale: string) => {},  // eslint-disable-line @typescript-eslint/no-unused-vars
});

interface Props {
  children?: any;
  injectedLocale?: string;
}

const IntlProviderWrapper: React.FC<Props> = ({ children, injectedLocale }) => {
  const standardLocale = injectedLocale || defaultLocale;
  const [locale, setLocale] = useState<string>(standardLocale);
  const [messages, setMessages] = useState(allMessages[standardLocale]);

  const switchLocale = (switchToLocale: string): void => {
    setLocale(switchToLocale);
    setMessages(allMessages[switchToLocale]);
  };

  return (
    <Context.Provider value={{
      locale,
      defaultLocale,
      availableLocales,
      messages,
      switchLocale,
    }}>
      <IntlProvider
        key={locale}
        locale={locale}
        messages={messages}
        defaultLocale={defaultLocale}
      >
        {children}
      </IntlProvider>
    </Context.Provider>
  );
};

export { IntlProviderWrapper, Context as IntlContext };
