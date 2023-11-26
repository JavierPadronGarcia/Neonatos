import Icon from '@ant-design/icons/lib/components/Icon';
import './GroupComponent.css';
import { SettingOutlined } from "@ant-design/icons";
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function GroupComponent({ group, index }) {

  const navigate = useNavigate();
  const componentRef = useRef(null);
  const [containerExpanded, setContainerExpanded] = useState(false);

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

  const showFirsLine = () => (
    <div className="group-component-selection-first-line">
      <SettingOutlined
        className='group-component-icon setting'
        onClick={() => toggleExpandContainer()}
      />
      <span>{group.name}</span>
      <Icon
        component={iconEnter}
        className='group-component-icon enter'
        onClick={() => navigate(`./group/${group.name}/${group.id}`)}
      />
    </div>
  )

  const showSecondLine = () => (
    <div className="group-component-selection-second-line">
      <span onClick={() => navigate(`./group/${group.id}/students`)}>Ver alumnado</span>
    </div>
  )

  if (index % 2 === 0) {
    return (
      <div className='group-component-selection color-one'
        ref={componentRef}
      >
        {showFirsLine()}
        {
          containerExpanded &&
          showSecondLine()
        }
      </div>
    )
  }

  if (index % 2 !== 0) {
    return (
      <div className='group-component-selection color-two'
        ref={componentRef}
      >
        {showFirsLine()}
        {
          containerExpanded &&
          showSecondLine()
        }
      </div>
    )
  }

}

export default GroupComponent;