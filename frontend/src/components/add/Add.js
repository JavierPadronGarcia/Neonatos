import Icon from '@ant-design/icons/lib/components/Icon';
import { useNavigate } from "react-router-dom";

function Add(props) {

  const navigate = useNavigate();
  const link = props.link;
  const alt = props.alt;
  const colors = props.colors;

  const addIcon = () => (
    <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 21H22M22 21H26M22 21V17M22 21V25" stroke={colors.text || 'black'} strokeWidth="1.75"
        strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M34 9.8V32.2C34 32.6419 33.6419 33 33.2 33H10.8C10.3582 33 10 32.6419 10 32.2V9.8C10 9.35817 10.3582 9 10.8 9H33.2C33.6419 9 34 9.35817 34 9.8Z"
        stroke={colors.text || 'black'} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

  if (colors) {
    return (
      <div
        onClick={() => navigate(link)}
        style={{
          background: colors.background,
          color: colors.text
        }}
        className='add-icon-component'
      >
        <Icon
          component={addIcon}
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => navigate(link)}
      className='add-icon-component'
    >
      <img src="/assets/icons/add.svg" alt={alt} />
    </div>
  );
}

export default Add;