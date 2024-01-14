import jsreport from '@jsreport/browser-client';
import { useEffect, useRef, useState } from 'react';
import { Spin, Input, Button, Modal, Form, message } from 'antd';
import emailService from '../../services/email.service';

jsreport.serverUrl = 'http://localhost:5488/';

function ReportGenerator({ reportData }) {
  const pdfContainerRef = useRef();
  const [loading, setLoading] = useState(false);
  const [showEmailFields, setShowEmailFields] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [emailSubject, setEmailSubject] = useState('Nuevo informe generado');
  const [emailBody, setEmailBody] = useState('');

  const sendEmail = async (reportInfo) => {
    emailService.sendEmail(reportInfo).then(reponse => {
      message.success('Correo electrónico enviado correctamente');
    }).catch(err => {
      message.error('Error al enviar el correo electrónico')
    })
  };

  const generateReport = async () => {
    setLoading(true);
    const report = await jsreport.render({
      template: {
        shortid: "7ggS5RqZL2"
      },
      data: {
        token: localStorage.getItem('token'),
        params: reportData
      }
    })
    const uriReport = await report.toDataURI();
    pdfContainerRef.current.src = uriReport;
    setLoading(false);
  };

  const handleRecipientChange = (e) => {
    setRecipientEmail(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setEmailSubject(e.target.value);
  };

  const handleBodyChange = (e) => {
    setEmailBody(e.target.value);
  };

  const handleSendEmail = async () => {
    const formData = new FormData();

    const report = await jsreport.render({
      template: {
        shortid: "7ggS5RqZL2"
      },
      data: {
        token: localStorage.getItem('token'),
        params: reportData
      }
    })

    const blob = await report.toBlob();

    formData.append('pdf', blob, 'informe.pdf');
    formData.append('to', recipientEmail);
    formData.append('subject', emailSubject);
    formData.append('text', emailBody);

    await sendEmail(formData);
    setShowEmailFields(false);
  };

  const handleCancelEmail = () => {
    setShowEmailFields(false);
  };

  const showEmailModal = () => {
    setShowEmailFields(true);
  };

  useEffect(() => {
    generateReport();
  }, []);

  return (
    <div>
      <Button type="primary" onClick={showEmailModal}>Enviar por correo electrónico</Button>

      <Modal
        title="Enviar por correo electrónico"
        open={showEmailFields}
        onCancel={handleCancelEmail}
        footer={[
          <Button key="cancel" onClick={handleCancelEmail}>
            Cancelar
          </Button>,
          <Button key="send" type="primary" onClick={handleSendEmail}>
            Enviar
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Correo electrónico del destinatario">
            <Input
              placeholder="Ingrese el correo electrónico"
              value={recipientEmail}
              onChange={handleRecipientChange}
            />
          </Form.Item>

          <Form.Item label="Asunto del correo electrónico">
            <Input
              placeholder="Ingrese el asunto del correo electrónico"
              value={emailSubject}
              onChange={handleSubjectChange}
            />
          </Form.Item>

          <Form.Item label="Cuerpo del correo electrónico">
            <Input.TextArea
              placeholder="Ingrese el cuerpo del correo electrónico"
              value={emailBody}
              onChange={handleBodyChange}
            />
          </Form.Item>
        </Form>
      </Modal>

      {loading && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Spin size="large" />
          <p>Generando informe...</p>
        </div>
      )}

      <iframe
        ref={pdfContainerRef}
        title="Visor PDF"
        width="100%"
        height="600px"
        style={{ display: loading ? 'none' : 'block' }}
      />
    </div>
  );
}

export default ReportGenerator;