import './TeacherGroupPage.css';
import { useParams } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import Toolbar from '../../../components/toolbar/Toolbar';
import { LoadingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import WorkUnitComponent from '../../../components/work-unit/WorkUnitComponent';

function TeacherGroupPage() {

  const { name, id } = useParams();
  const [loading, setLoading] = useState(false);

  const workUnit1 = {
    name: 'prueba1',
    visibility: true,
    colors: {
      visible: {
        background: '#279EFF',
        button: '#2F96C4',
        text: '#000000',
      },
      invisible: {
        background: '#279EFF8A',
        button: '#2F96C48A',
        text: '#000000',
      }
    }
  }

  const workUnit2 = {
    name: 'prueba2',
    visibility: true,
    colors: {
      visible: {
        background: '#E25E3E',
        button: '#D0411E',
        text: '#000000',
      },
      invisible: {
        background: '#E25E3E8A',
        button: '#D0411E8A',
        text: '#000000',
      }
    }
  }

  const workUnit3 = {
    name: 'prueba3',
    visibility: true,
    colors: {
      visible: {
        background: '#F4E869',
        button: '#DACC38',
        text: '#000000',
      },
      invisible: {
        background: '#F4E8698A',
        button: '#DACC388A',
        text: '#000000',
      }
    }
  }


  return (
    <div className='teacher-group-page'>
      <Header />
      <h2>{name}</h2>
      <div className='teacher-group-page-main'>
        {loading &&
          <LoadingOutlined style={{ fontSize: 60, color: '#08c', display: 'flex', justifyContent: 'center' }} />
        }
        <WorkUnitComponent workUnit={workUnit1} />
        <WorkUnitComponent workUnit={workUnit2} />
        <WorkUnitComponent workUnit={workUnit3} />
      </div>
      <Toolbar />
    </div>
  );
}

export default TeacherGroupPage;