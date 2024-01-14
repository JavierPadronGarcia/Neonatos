const nodemailer = require('nodemailer');

exports.sendMail = async (req, res) => {
  const { to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4d889db909c434",
      pass: "bf6b8727923cb2"
    }
  });

  const mailOptions = {
    from: '4d889db909c434@mailtrap.io',
    to: to,
    subject: subject,
    text: text,
    attachments: [
      {
        filename: 'reporte.pdf',
        content: req.file.buffer,
        encoding: 'base64'
      }
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado correctamente');
    res.status(200).send('Correo electrónico enviado correctamente');
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    res.status(500).send('Error al enviar el correo electrónico');
  }
}