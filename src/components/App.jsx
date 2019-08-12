import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState({ hits: [] });

  useEffect(() => {
    async function fetchUser() {
        const result = await axios('/api/profile');
        setUser(result.data.data);
    }

    fetchUser();
  }, []);

  return (
    <div>
      {user.hits.map(item => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </div>
  );
};

export default App;
