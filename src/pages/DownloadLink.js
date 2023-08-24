import React from 'react';

const DownloadLink = ({ fileData, fileName }) => {
  const handleClick = () => {
    const blob = new Blob([fileData], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button onClick={handleClick}>
      Download File
    </button>
  );
};

export default DownloadLink;