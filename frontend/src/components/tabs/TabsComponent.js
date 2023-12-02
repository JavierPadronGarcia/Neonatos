import './TabsComponent.css';
import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";

function TabsComponent({ pageType, keySelected }) {
  const navigate = useNavigate();


  if (pageType === 'admin') {
    const adminItems = [{
      key: '1',
      label: 'Panel de Control',
    }, {
      key: '2',
      label: 'Cursos'
    }, {
      key: '3',
      label: 'Profesorado'
    }, {
      key: '4',
      label: 'Alumnado'
    }, {
      key: '5',
      label: 'Dirección'
    }]

    const adminLinks = [
      '/admin/control-panel',
      '/admin/groups',
      '/admin/teachers',
      '/admin/students',
      '/admin/directors'
    ]

    const changePage = (key) => {
      switch (key) {
        case '1':
          navigate(adminLinks[0])
          break;
        case '2':
          navigate(adminLinks[1])
          break;
        case '3':
          navigate(adminLinks[2])
          break;
        case '4':
          navigate(adminLinks[3])
          break;
        case '5':
          navigate(adminLinks[4])
          break;
        default:
          break;
      }
    }

    return <Tabs
      defaultActiveKey={keySelected}
      items={adminItems}
      onChange={changePage}
      className='tabs'
    />
  }

}

export default TabsComponent;