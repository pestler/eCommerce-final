import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.scss';
import Layout from './Layout.tsx';
import { router } from './router';

const App: React.FC = () => {
  return (
      <BrowserRouter>
          <Layout>
              <Routes>
                  {router.map((route, index) => (
                      <Route key={index} path={route.path} element={route.element} />
                  ))}
              </Routes>
          </Layout>
      </BrowserRouter>
  );
};

export default App;
