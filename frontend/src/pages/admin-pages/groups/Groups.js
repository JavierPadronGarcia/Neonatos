import { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import Add from "../../../components/add/Add";
import './Groups.css';
import groupsService from "../../../services/groups.service";
import Group from "../../../components/group/Group";
import Toolbar from "../../../components/toolbar/Toolbar";
import { message } from "antd";
import { noConnectionError } from "../../../utils/shared/errorHandler";
import { LoadingOutlined } from '@ant-design/icons';

function Groups() {

  const [allGroups, setAllGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getAllGroups() {
    try {
      setLoading(true);
      const newGroups = await groupsService.getAllGroups();
      setAllGroups(newGroups);
      setLoading(false);
    } catch (err) {
      if (!err.response) {
        noConnectionError();
      }
    }
  }

  function deleteGroup(id) {
    groupsService.deleteGroup(id).then(() => {
      getAllGroups();
      message.success({
        content: "Curso eliminado",
        duration: 2,
        style: {
          display: "flex",
          justifyContent: "flex-end",
        }
      })
    }).catch(err => {
      if (!err.response) {
        noConnectionError();
      }
    })
  }

  useEffect(() => {
    getAllGroups();
  }, [])

  return (
    <div className="groups-page">
      <Header />
      <main>
        <header className="groups-page-header">
          <h2>Cursos</h2>
          <div className="groups-page-add" >
            <Add link="/admin/groups/add-group" alt="add group" />
          </div>
        </header>
        <section className="groups-page-section">
          {loading &&
            <LoadingOutlined style={{ fontSize: 60, color: '#08c' }} />
          }
          {allGroups.length === 0 && !loading &&
            <p>No se encuentran cursos</p>
          }
          {allGroups.map((group) => {
            return (
              <article key={group.id}>
                <Group
                  group={group}
                  edit={true}
                  notifyDelete={(id) => deleteGroup(id)}
                />
              </article>
            );
          })}
        </section>
      </main>
      <Toolbar />
    </div>
  );

}

export default Groups;