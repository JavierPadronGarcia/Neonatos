import Header from "../../components/Header/Header";
import Add from "../../components/add/Add";
import './Groups.css';
function Groups() {
  return (
    <div className="groups-page">
      <Header />
      <main>
        <header className="groups-page-header">
          <h2>Cursos</h2>
          <div className="groups-page-add" >
            <Add />
          </div>
        </header>
        <section>
          <article>
            {/* componente */}
          </article>
        </section>
      </main>
    </div>
  );
}

export default Groups;