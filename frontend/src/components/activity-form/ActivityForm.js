import './ActivityForm.css';
import { Button, Checkbox, DatePicker, Select, message } from 'antd';
import { useEffect, useState } from 'react';
import casesService from '../../services/cases.service';
import groupEnrolementService from '../../services/groupEnrolement.service';
import { noConnectionError } from '../../utils/shared/errorHandler';
import { activityFormValidation, activityFormValidationWithDate } from '../../utils/shared/globalFunctions';
import exercisesService from '../../services/exercises.service';

function ActivityForm({ groupId, workUnitId, isUpdateForm, updateFormContent, notifyUpdateInfo }) {

  const colors = JSON.parse(sessionStorage.getItem('colors'));

  const [allStudents, setAllStudents] = useState([]);
  const [allCases, setAllCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [checked, setChecked] = useState([false, false]);
  const [disabled, setDisabled] = useState(false);
  const [formStatus, setStatus] = useState({ caseStatus: '', studentStatus: '', dateStatus: '' });

  const [prevUpdateData, setPrevUpdateData] = useState({
    prevCaseId: updateFormContent?.case.id,
    prevAssigned: updateFormContent?.assigned,
    prevDate: updateFormContent?.date
  });

  const getAllCases = async () => {
    try {
      const cases = await casesService.getAllCasesOfTheGroup(groupId, workUnitId);
      setAllCases(transformCases(cases));

      if (isUpdateForm) {
        setSelectedCase({ label: updateFormContent.case.name, value: updateFormContent.case.id });
        setSelectedDate(new Date(updateFormContent.date));
        setChecked(prevState => [prevState[0], updateFormContent.assigned])
      }
    } catch (err) {
      if (!err.response) {
        noConnectionError();
      }
    }
  }

  const getAllStudents = async () => {
    try {
      const students = await groupEnrolementService.getAllStudentsInAGroup(groupId);
      setAllStudents(transformStudents(students))
      if (isUpdateForm) {
        const selectedStudents =
          await exercisesService.getAllStudentsAssignedInActivity(groupId,
            workUnitId,
            updateFormContent.case.id,
            updateFormContent.assigned,
            updateFormContent.date);
        setSelectedItems(setUpToOptionsSelect(selectedStudents));
      }

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
      studentIdsArray.push(student.value);
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
    setStatus({ caseStatus: '', studentStatus: '', dateStatus: '' });
    const activityCase = selectedCase;
    const students = checked[0] ? getStudentIds(allStudents) : selectedItems;
    const date = selectedDate;

    let validForm = false;

    if (!checked[1]) {
      validForm = activityFormValidation(activityCase, students, setStatus);
    } else {
      validForm = activityFormValidationWithDate(activityCase, students, date, setStatus);
    }

    if (validForm) {
      exercisesService.addExercises(activityCase, students, checked[1], date).then(response => {
        message.success('Actividad agregada correctamente', 2);
        setSelectedCase(null);
        setSelectedItems([]);
        setSelectedDate(null);
        setChecked(false);
        setDisabled(false);
      });
    }
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    setStatus({ caseStatus: '', studentStatus: '', dateStatus: '' });
    const activityCase = selectedCase;
    const students = checked[0] ? getStudentIds(allStudents) : getStudentIds(selectedItems);
    const date = selectedDate;


    let validForm = false;

    if (!checked[1]) {
      validForm = activityFormValidation(activityCase, students, setStatus);
    } else {
      validForm = activityFormValidationWithDate(activityCase, students, date, setStatus);
    }

    if (validForm) {

      const updateData = {
        groupId: groupId,
        workUnitId: workUnitId,
        prevCaseId: prevUpdateData.prevCaseId,
        caseId: selectedCase,
        students: students,
        prevAssigned: prevUpdateData.prevAssigned,
        assigned: checked[1],
        prevDate: prevUpdateData.prevDate,
        finishDate: selectedDate
      }


      exercisesService.updateExercises(updateData).then(response => {
        message.success('Actividad agregada correctamente', 2);
        setSelectedCase(null);
        setSelectedItems([]);
        setSelectedDate(null);
        setChecked(false);
        setDisabled(false);
        notifyUpdateInfo();
      });
    }
  }

  const checkboxStudentsChanged = (e) => {
    setChecked(prevState => [e.target.checked, prevState[1]]);
    setDisabled(e.target.checked);
  };

  const changeDate = (e) => {
    setSelectedDate(e?.$d);
  }

  const setUpToOptionsSelect = (data) => {
    let newArray = [];

    newArray = data.map((item) => ({
      value: item.id,
      label: item.username,
    }))

    return newArray
  }

  if (isUpdateForm) {

    return (
      <div className='update-activity-form' style={{ background: colors.primaryColor }}>
        <span className='workUnitName' style={{ color: colors.text }}>Actualizando actividad</span>
        <form onSubmit={handleUpdate} className='activity-form'>
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
            <label>
              <DatePicker
                status={formStatus.dateStatus}
                disabled={!checked[1]}
                onChange={changeDate}
                placeholder='fecha de finalización'
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
            <Button htmlType='submit'>Actualizar actividad</Button>
          </span>
        </form>
      </div>
    )
  }

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
          <label>
            <DatePicker
              status={formStatus.dateStatus}
              disabled={!checked[1]}
              onChange={changeDate}
              placeholder='fecha de finalización'
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