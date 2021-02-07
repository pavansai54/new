import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

export const  LeavePolicy=()=>{
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess=({ numPages }) =>{
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        file="./component/Leave_Policy.pdf"
        onLoadSuccess={onDocumentLoadSuccess} >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>Page {pageNumber} of {numPages}</p>
    </div>
  );
}