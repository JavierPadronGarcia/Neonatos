import { notification } from "antd";

export const noConnectionError = () => {
  notification.error({
    message: 'Error de conexión',
    description: "No se ha podido establecer una conexión con el servidor, intentalo de nuevo o pruebalo más tarde",
    placement: 'top',
  });
}

export const errorOnLogin = () => {
  notification.error({
    message: 'No se ha podido iniciar sesión',
    description: "El usuario o la contraseña son correctos?",
    placement: 'top',
    duration: 5
  });
}

export const errorMessage = (message, description) => {
  notification.error({
    message: message,
    description: description,
    placement: 'top',
    duration: 5
  });
}