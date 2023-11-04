import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Add from "../../components/add/Add";
import './Groups.css';
import groupsService from "../../services/groups.service";
import Group from "../../components/group/Group";
import Toolbar from "../../components/toolbar/Toolbar";

function Groups() {

  const [allGroups, setAllGroups] = useState([]);


  async function getAllGroups() {
    const newGroups = await groupsService.getAllGroups();
    setAllGroups(newGroups);
  }

  async function deleteGroup(id) {
    groupsService.deleteGroup(id).then(() => {
      getAllGroups();
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
            <Add link="/groups/add-group" alt="add group" />
          </div>
        </header>
        <section className="groups-page-section">
          {allGroups.map((group) => {
            return (
              <article>
                <Group
                  name={group.name}
                  ident={group.id}
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