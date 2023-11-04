import './Toolbar.css';

import { useNavigate } from 'react-router-dom';

function Toolbar() {

  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div><img src="/assets/icons/log-out.svg" onClick={() => navigate('/')} /></div>
      <div><img src="/assets/icons/home.svg" onClick={() => navigate('/groups')} /></div>
      <div><img src="/assets/icons/profile.svg" onClick={() => navigate('/user')} /></div>
    </footer>
  );
}

export default Toolbar;