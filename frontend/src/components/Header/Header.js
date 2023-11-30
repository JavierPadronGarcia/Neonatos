import './Header.css'

function Header() {
  return (
    <header className="header-component">
      <div className='page-name'>
        Administración
      </div>
      <div className='content'>
        <div className='logo-name'>
          <h1>MetaHospitalFP</h1>
        </div>
        <div className='user-icon'>
          <img
            src="/assets/icons/profile.svg"
            alt='ver información del perfil'
          />
        </div>
      </div>
    </header>
  );
}

export default Header;