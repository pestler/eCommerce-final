import { useEffect, useState } from 'react';
import './App.scss';
import { apiRoot } from './api/ApiRoot.ts';

function App() {
  const [title, setTitle] = useState('');

  useEffect(() => {
    apiRoot
      .get()
      .execute()
      .then(({ body }) => setTitle(body.name));
  });

  return (
    <>
      <h1>{title}</h1>
    </>
  );
}

export default App;
