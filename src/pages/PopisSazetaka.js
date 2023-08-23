import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const PopisSazetaka = () => {
  const [sazetciData, setSazetciData] = useState([]);

  useEffect(() => {
    const socket = io();

    socket.on('connect', () => {
      console.log('Connected to server:', socket.id);
      // Fetch sažetci data after connecting to the server
      socket.emit('fetchSazetci');
    });

    // Handle the event when sažetci data is received
    socket.on('sazetciData', (fetchedSazetciData) => {
      setSazetciData(fetchedSazetciData);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Popis Sažetaka</h1>
      <ul>
        {sazetciData.map((sazetak) => (
          <li key={sazetak.SažetakID}>
            <div>
              <p>Ime: {sazetak.ime}</p>
              <p>Prezime: {sazetak.prezime}</p>
              <p>Email: {sazetak.email}</p>
              <a href={`/api/sazetci/${sazetak.SažetakID}`} target="_blank" rel="noopener noreferrer">
                File: {sazetak.FileName}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopisSazetaka;
