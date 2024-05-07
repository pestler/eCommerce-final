import React, {useEffect} from 'react';
import {api} from "../../api";

const Main: React.FC = () => {

    useEffect(() => {
        api.get().execute()
            .then(r => console.log(r))
    })

  return (
    <div>
      <h2>Main</h2>
    </div>
  );
};

export default Main;
