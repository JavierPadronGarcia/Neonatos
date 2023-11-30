import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";

function TabsComponent({ pageType, keySelected }) {
  const navigate = useNavigate();


  if (pageType === 'admin') {
    const adminItems = [
      {
        key: '1',
        label: 'Panel de Control',
      },
      {
        key: '2',
        label: 'Cursos'
      }
    ]

    const adminLinks = [
      '/admin/control-panel',
      '/admin/groups'
    ]

    const changePage = (key) => {
      switch (key) {
        case '1':
          navigate(adminLinks[0])
          break;
        case '2':
          navigate(adminLinks[1])
          break;
        default:
          break;
      }
    }

    return <Tabs defaultActiveKey={keySelected} items={adminItems} onChange={changePage} />
  }

}

export default TabsComponent;