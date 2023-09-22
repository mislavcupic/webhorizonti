import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Table } from 'react-bootstrap';
import DownloadLink from './DownloadLink';

const PopisSazetaka = () => {
  const [sazetciData, setSazetciData] = useState([]);

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

  return (
    <div className="container mt-5">
      <h1>Popis Sažetaka</h1>
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
          {sazetciData.map((sazetak) => (
            <tr key={sazetak.SažetakID}>
              <td>{sazetak.ime}</td>
              <td>{sazetak.prezime}</td>
              <td>{sazetak.email}</td>
              <td>{sazetak.Oblik_sudjelovanja}</td>
              <td>
                {Array.isArray(sazetak.FileData) ? (
                  sazetak.FileData.map((fileData, index) => (
                    <DownloadLink key={index} fileData={fileData} fileName={`filename${sazetak.fileName}.pdf`} />
                  ))
                ) : (
                  <DownloadLink fileData={sazetak.FileData} fileName={`filename.pdf`} />
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

// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import { Table } from 'react-bootstrap';
// import DownloadLink from './DownloadLink';

// const PopisSazetaka = () => {
//   const [sazetciData, setSazetciData] = useState([]);

//   useEffect(() => {
//     const socket = io();

//     socket.on('connect', () => {
//       console.log('Connected to server:', socket.id);
//       socket.emit('fetchSazetci');
//     });

//     socket.on('sazetciData', (fetchedSazetciData) => {
//       setSazetciData(fetchedSazetciData);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h1>Popis Sažetaka</h1>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Ime</th>
//             <th>Prezime</th>
//             <th>Email</th>
//             <th>Files</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sazetciData.map((sazetak) => (
//             <tr key={sazetak.SažetakID}>
//               <td>{sazetak.ime}</td>
//               <td>{sazetak.prezime}</td>
//               <td>{sazetak.email}</td>
//               <td>
//                 {Array.isArray(sazetak.FileData) ? (
//                   sazetak.FileData.map((fileData, index) => (
//                     <DownloadLink key={index} fileData={fileData} fileName={`filename${index}.pdf`} />
//                   ))
//                 ) : (
//                   <DownloadLink fileData={sazetak.FileData} fileName={`filename.pdf`} />
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default PopisSazetaka;

//ovaj je bio ok
// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import { Table } from 'react-bootstrap';
// import DownloadLink from './DownloadLink';

// const PopisSazetaka = () => {
//   const [sazetciData, setSazetciData] = useState([]);

//   useEffect(() => {
//     const socket = io();

//     socket.on('connect', () => {
//       console.log('Connected to server:', socket.id);
//       socket.emit('fetchSazetci');
//     });

//     socket.on('sazetciData', (fetchedSazetciData) => {
//       setSazetciData(fetchedSazetciData);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h1>Popis Sažetaka</h1>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Ime</th>
//             <th>Prezime</th>
//             <th>Email</th>
//             <th>Files</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sazetciData.map((sazetak) => (
//             <tr key={sazetak.SažetakID}>
//               <td>{sazetak.ime}</td>
//               <td>{sazetak.prezime}</td>
//               <td>{sazetak.email}</td>
//               <td>
//                 <DownloadLink fileData={sazetak.FileData} fileName={`filename.pdf`} />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default PopisSazetaka;
// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
// import DownloadLink from './DownloadLink';

// const PopisSazetaka = () => {
//   const [sazetciData, setSazetciData] = useState([]);

//   useEffect(() => {
//     const socket = io();

//     socket.on('connect', () => {
//       console.log('Connected to server:', socket.id);
//       socket.emit('fetchSazetci');
//     });

//     socket.on('sazetciData', (fetchedSazetciData) => {
//       setSazetciData(fetchedSazetciData);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Popis Sažetaka</h1>
//       <ul>
//         {sazetciData.map((sazetak) => (
//           <li key={sazetak.SažetakID}>
//             <div>
//               <p>Ime: {sazetak.ime}</p>
//               <p>Prezime: {sazetak.prezime}</p>
//               <p>Email: {sazetak.email}</p>
//               <DownloadLink fileData={sazetak.FileData} fileName={`filename.pdf`} />
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

