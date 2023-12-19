import { useState, useEffect } from 'react';
import './AuthCodeGenerator.css';
import { jwtDecode } from 'jwt-decode';
import userService from '../../services/users.service';

function AuthCodeGenerator() {
  const user = jwtDecode(localStorage.getItem('token'));

  const [codigo, setCodigo] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [tempId, setTempId] = useState(null);

  const startTemp = (expDate) => {
    if (tempId) {
      clearInterval(tempId);
    }

    const newTempId = setInterval(() => {
      const now = new Date().getTime();
      const distance = expDate - now;
      const hours = Math.floor(distance / (1000 * 60 * 60));

      setRemainingTime(hours);

      if (distance < 0) {
        clearInterval(newTempId);
        setCodigo(null);
        setRemainingTime(null);
        userService.getUserById(user.id).then(user => {
          if (user.code) {
            userService.unAssignCode();
          }
        });
      }
    }, 1000);

    setTempId(newTempId);
  };

  const getCode = async () => {
    try {
      const response = await userService.getUserById(user.id);
      const code = await response.code;
      const expDate = await response.codeExpirationDate;
      if (await code) {
        setCodigo(code);
        return expDate;
      }
    } catch (err) {
      console.log("no se ha podido devolver");
    }
  };

  const generateCode = async () => {
    const expDate = new Date().getTime() + (24 * 60 * 60 * 1000);

    userService.assignCode().then(response => {
      getCode();
      setRemainingTime(24);
      startTemp(expDate);
    });
  };

  useEffect(() => {
    getCode().then(expDate => {
      const date = new Date(expDate)
      if (expDate !== undefined && date > new Date().getTime()) {
        const tiempoRestante = Math.floor((date - new Date().getTime()) / (1000 * 60 * 60));
        setRemainingTime(tiempoRestante);

        startTemp(date);
      } else {
        userService.getUserById(user.id).then(response => {
          if (response.code) {
            userService.unAssignCode();
          }
        })
      }
    });

    return () => {
      clearInterval(tempId);
    };
  }, []);

  return (
    <div className='auth-code-container'>
      <button onClick={() => generateCode()} disabled={codigo != null}>Generar Código</button>
      {codigo && <p>Código: {codigo}</p>}
      {!codigo && <p>Código no generado</p>}
      {remainingTime && <p>Tiempo restante: {remainingTime} horas</p>}
    </div>
  );
}

export default AuthCodeGenerator;