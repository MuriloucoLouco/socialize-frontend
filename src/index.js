import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
require('dotenv').config();

const LightTheme = React.lazy(() => import('./styles/light/lightTheme'));
const DarkTheme = React.lazy(() => import('./styles/dark/darkTheme'));

function ThemeSelector({ children }) {
  const CHOSEN_THEME = cookies.get('theme') || 'light';
  return (
    <>
      <React.Suspense fallback={<></>}>
        {(CHOSEN_THEME === 'light') && <LightTheme />}
        {(CHOSEN_THEME === 'dark') && <DarkTheme />}
      </React.Suspense>
      {children}
    </>
  )
}

ReactDOM.render(<ThemeSelector><App /></ThemeSelector>, document.getElementById('root'));