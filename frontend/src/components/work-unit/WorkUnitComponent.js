import Icon from '@ant-design/icons/lib/components/Icon';
import './WorkUnitComponent.css';
import { SettingOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';

function WorkUnitComponent({ workUnit, unitVisibility, notifyUpdateVisibility }) {

  const navigate = useNavigate();
  const componentRef = useRef(null);
  const [containerExpanded, setContainerExpanded] = useState(false);
  const [visibility, setVisibility] = useState(unitVisibility);
  const [colors, setColors] = useState(visibility ? workUnit.colors.visible : workUnit.colors.invisible);

  useEffect(() => {
    setColors(visibility ? workUnit.colors.visible : workUnit.colors.invisible);
  }, [visibility]);

  const iconEnter = () => (
    <svg width="1em" height="1em" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.9182 2.22925H18.9454C23.3938 2.22925 27 4.66685 27 7.67378V21.2851C27 24.292 23.3938 26.7297 18.9454 26.7297H14.9182" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M2 14.4794H18.9455M18.9455 14.4794L12.9045 10.396M18.9455 14.4794L12.9045 18.5628" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )

  const toggleExpandContainer = () => {
    const component = componentRef.current;
    if (containerExpanded) {
      component.classList.remove('expanded');
    } else {
      component.classList.toggle('expanded');
    }
    setContainerExpanded(!containerExpanded);
  }

  const changeVisibility = () => {
    notifyUpdateVisibility(workUnit.id, !visibility);
    setVisibility(!visibility);
    toggleExpandContainer();
  }

  const showFirsLine = () => (
    <div className="work-unit-component-selection-first-line">
      <SettingOutlined
        className='work-unit-component-icon setting'
        onClick={() => toggleExpandContainer()}
      />
      <span>{workUnit.name}</span>
      <Icon
        component={iconEnter}
        className='work-unit-component-icon enter'
        onClick={() => navigate(`./unit/${workUnit.id}`)}
      />
    </div>
  )

  const showSecondLine = () => (
    <div className="work-unit-component-selection-second-line">
      {visibility ? <span>Visible</span> : <span>Invisible</span>}
      <span>
        <Button
          onClick={() => changeVisibility()}
          style={{ background: colors.secondaryColor, border: '1px solid black' }}
        >
          Cambiar visibilidad
        </Button>
      </span>
    </div>
  )

  return (
    <div
      className='work-unit-component-selection'
      style={{ background: colors.primaryColor }}
      ref={componentRef}
    >
      {showFirsLine()}
      {containerExpanded &&
        showSecondLine()
      }
    </div>
  )

}

export default WorkUnitComponent;