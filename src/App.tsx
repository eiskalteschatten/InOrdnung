import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline, createMuiTheme }  from '@material-ui/core';

import { IntlProviderWrapper } from './intl/IntlContext';
import getThemeOptions from './theme';

import Welcome from './pages/Welcome';
import Project from './pages/Project';
import About from './pages/About';

const App: React.FC = () => {
  // TODO: allow the saved locale from the DB to override the system's settings
  const [locale] = useState<string>(navigator.language.split('-')[0] || 'en');
  const [theme, setTheme] = useState<string>('light');

  const themeOptions = getThemeOptions(theme);

  const muiTheme = createMuiTheme({
    ...themeOptions,
    palette: {
      ...themeOptions.palette,
      theme
    }
  });

  useEffect(() => {
    if (window.matchMedia) {
      setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e: any): void => {
        setTheme(e.matches ? 'dark' : 'light');
      });
    }
  }, []);

  return (
    <>
      <IntlProviderWrapper injectedLocale={locale}>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <BrowserRouter>
            <Switch>
              <Route path='/' exact component={Welcome} />
              <Route path='/project' component={Project} />
              <Route path='/about' component={About} />
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </IntlProviderWrapper>
    </>
  );
};

export default App;
