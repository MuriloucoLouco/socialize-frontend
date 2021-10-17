import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
require('dotenv').config();

const LightTheme = React.lazy(() => import('./styles/light/lightTheme'));
const DarkTheme = React.lazy(() => import('./styles/dark/darkTheme'));

function ThemeSelector({ children }) {
  let chosenTheme = cookies.get('theme');
  if (!chosenTheme) {
    cookies.set('theme', 'light');
    chosenTheme = 'light';
  }
  return (
    <>
      <React.Suspense fallback={<></>}>
        {(chosenTheme === 'light') && <LightTheme />}
        {(chosenTheme === 'dark') && <DarkTheme />}
      </React.Suspense>
      {children}
    </>
  )
}

ReactDOM.render(<ThemeSelector><App /></ThemeSelector>, document.getElementById('root'));