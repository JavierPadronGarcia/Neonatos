import './ActivityForm.css';
import { Button, Checkbox, Select } from 'antd';
import { useEffect, useState } from 'react';
import casesService from '../../services/cases.service';
import groupEnrolementService from '../../services/groupEnrolement.service';
import { noConnectionError } from '../../utils/shared/errorHandler';
import { activityFormValidation } from '../../utils/shared/globalFunctions';

function ActivityForm({ groupId, workUnitId }) {

  const colors = JSON.parse(sessionStorage.getItem('colors'));

  const [allStudents, setAllStudents] = useState([]);
  const [allCases, setAllCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [checked, setChecked] = useState([false, false]);
  const [disabled, setDisabled] = useState(false);
  const [formStatus, setStatus] = useState({ caseStatus: '', studentStatus: '' });

  const getAllCases = async () => {
    try {
      const cases = await casesService.getAllCasesOfTheGroup(groupId, workUnitId);
      setAllCases(transformCases(cases));
    } catch (err) {
      if (!err.response) {
        noConnectionError();
      }
    }
  }

  const getAllStudents = async () => {
    try {
      const students = await groupEnrolementService.getAllStudentsInAGroup(groupId);
      setAllStudents(transformStudents(students));
    } catch (err) {
      if (!err.response) {
        noConnectionError();
      }
    }
  }

  const transformCases = (casesArray) => {
    casesArray.map((object) => {
      object.value = object.id;
      object.label = object.name;
    })
    return casesArray;
  }

  const transformStudents = (studentArray) => {
    let newStudentArray = [];
    studentArray.map((student) => {
      newStudentArray.push(student.User);
    })
    return newStudentArray;
  }
  const getStudentIds = (studentArray) => {
    let studentIdsArray = [];
    studentArray.map((student) => {
      studentIdsArray.push(student.id);
    })
    return studentIdsArray;
  }

  useEffect(() => {
    getAllCases();
    getAllStudents();
  }, []);

  const filterOption = (input, option) =>
    (option?.label ?? '')
      .toLowerCase()
      .includes(input.toLowerCase());

  const filteredStudents = allStudents.filter((o) => !selectedItems.includes(o));

  const handleCreate = (e) => {
    e.preventDefault();
    setStatus({ caseStatus: '', studentStatus: '' });
    const activityCase = selectedCase;
    const students = checked[0] ? getStudentIds(allStudents) : selectedItems;

    const validForm = activityFormValidation(activityCase, students, setStatus);

    if (validForm) {
      console.log(activityCase)
      console.log(students)
      console.log(checked[1])
      //TODO -> pass all to the backend and bulk create all activities by one case and many students
    }
  }

  const checkboxStudentsChanged = (e) => {
    setChecked(prevState => [e.target.checked, prevState[1]]);
    setDisabled(e.target.checked);
  };

  return (
    <div className='add-activity-form' style={{ background: colors.primaryColor }}>
      <span className='workUnitName' style={{ color: colors.text }}>Nueva actividad</span>
      <form onSubmit={handleCreate} className='activity-form'>
        <div className='selects'>
          <label>
            <Select
              showSearch
              status={formStatus.caseStatus}
              placeholder="Selecciona un caso"
              optionFilterProp="children"
              onChange={(value) => setSelectedCase(value)}
              filterOption={filterOption}
              style={{
                width: '100%',
              }}
              options={allCases}
            />
          </label>
          <label>
            <Select
              mode="multiple"
              disabled={disabled}
              status={formStatus.studentStatus}
              placeholder="Selecciona alumnos"
              value={selectedItems}
              onChange={setSelectedItems}
              style={{
                width: '100%',
              }}
              options={filteredStudents.map((item) => ({
                value: item.id,
                label: item.username,
              }))}
            />
          </label>
        </div>
        <div className='checkboxes'>
          <label>
            <Checkbox
              checked={checked[0]}
              onChange={checkboxStudentsChanged}
              style={{ color: colors.text }}
            >
              Seleccionar toda la clase
            </Checkbox>
          </label>
          <label>
            <Checkbox
              checked={checked[1]}
              onChange={(e) => setChecked(prevState => [prevState[0], e.target.checked])}
              style={{ color: colors.text }}
            >
              Actividad evaluada
            </Checkbox>
          </label>
        </div>
        <span className='buttons'>
          <Button htmlType='submit'>Agregar actividad</Button>
        </span>
      </form>
    </div>
  )
}

export default ActivityForm;