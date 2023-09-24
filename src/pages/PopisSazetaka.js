
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Table, Form } from 'react-bootstrap';
import DownloadLink from './DownloadLink';

const PopisSazetaka = () => {
  const [sazetciData, setSazetciData] = useState([]);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    const socket = io();

    socket.on('connect', () => {
      console.log('Connected to server:', socket.id);
      socket.emit('fetchSazetci');
    });

    socket.on('sazetciData', (fetchedSazetciData) => {
      setSazetciData(fetchedSazetciData);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Function to filter sazetciData based on the search string
  const filteredSazetci = sazetciData.filter((sazetak) => {
    const searchStr = searchString.toLowerCase();
    return (
      sazetak.ime.toLowerCase().includes(searchStr) ||
      sazetak.prezime.toLowerCase().includes(searchStr) ||
      sazetak.email.toLowerCase().includes(searchStr) || sazetak.Oblik_sudjelovanja.toLowerCase().includes(searchStr)
    );
  });

  return (
    <div className="container mt-5">
      <h1>Popis Sažetaka</h1>
      <Form.Group controlId="search">
        <Form.Label>Search</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter search string"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
      </Form.Group>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Ime</th>
            <th>Prezime</th>
            <th>Email</th>
            <th>Oblik sudjelovanja</th>
            <th>Files</th>
          </tr>
        </thead>
        <tbody>
          {filteredSazetci.map((sazetak) => (
            <tr key={sazetak.SažetakID}>
              <td>{sazetak.ime}</td>
              <td>{sazetak.prezime}</td>
              <td>{sazetak.email}</td>
              <td>{sazetak.Oblik_sudjelovanja}</td>
              <td>
                {Array.isArray(sazetak.FileData) ? (
                  sazetak.FileData.map((fileData, index) => (
                    <DownloadLink key={index} fileData={fileData} fileName={sazetak.FileName}
                   />
                  ))
                ) : (
                  <DownloadLink fileData={sazetak.FileData} fileName={sazetak.FileName} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PopisSazetaka;
