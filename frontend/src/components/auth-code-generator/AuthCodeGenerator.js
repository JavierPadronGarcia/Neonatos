import { useState } from 'react';
import './AuthCodeGenerator.css';
import { Button } from 'antd';

function AuthCodeGenerator(props) {
  const user = props.user;
  const [timerVisibility, setTimerVisibility] = useState(false);

  return (
    <div className='auth-code-container'>
      {timerVisibility && <p>hola</p>}
      <Button
        onClick={() => setTimerVisibility(!timerVisibility)}>
        Generar código de autentificación
      </Button>
    </div>
  );
}

export default AuthCodeGenerator;