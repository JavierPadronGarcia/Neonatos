import jsreport from '@jsreport/browser-client';
import { useRef } from 'react';

jsreport.serverUrl = 'http://localhost:5488/';

function ExamplePage() {
  const pdfContainerRef = useRef();

  const handleCall = () => {
    jsreport.render({
      template: {
        shortid: "7ggS5RqZL2"
      },
      data: {
        token: localStorage.getItem('token'),
        params: localStorage.getItem('reportData'),
      }
    }).then(report => {
      report.toDataURI().then(dataUri => {
        pdfContainerRef.current.src = dataUri;
      });
    });
  };

  return (
    <div>
      <button onClick={handleCall}>Generar reporte</button>
      <iframe
        ref={pdfContainerRef}
        title="Visor PDF"
        width="90%"
        height="750px"
      />
    </div>
  );
}

export default ExamplePage;
