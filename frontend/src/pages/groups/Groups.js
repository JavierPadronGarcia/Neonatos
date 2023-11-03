import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Add from "../../components/add/Add";
import './Groups.css';
import groupsService from "../../services/groups.service";
import Group from "../../components/group/Group";

function Groups() {

  const [allGroups, setAllGroups] = useState([]);


  async function getAllGroups() {
    const newGroups = await groupsService.getAllGroups();
    setAllGroups(newGroups);
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
                <Group name={group.name} ident={group.id} />
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );

}

export default Groups;