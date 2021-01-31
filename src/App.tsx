import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import EventsFromMain from './EventsFromMain';
import { IntlProviderWrapper } from './intl/IntlContext';

import Welcome from './pages/Welcome';
import Project from './pages/Project';

const App: React.FC = () => {
  // TODO: allow the saved locale from the DB to override the system's settings
  const [locale] = useState<string>(navigator.language.split('-')[0] || 'en');

  return (
    <>
      <EventsFromMain />
      <IntlProviderWrapper injectedLocale={locale}>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Welcome} />
            <Route path='/project' component={Project} />
          </Switch>
        </BrowserRouter>
      </IntlProviderWrapper>
    </>
  );
};

export default App;
