import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { State } from '../../store';
import Titlebar from '../../components/elements/Titlebar';
import RoundedButton from '../../components/elements/RoundedButton';

import icon from '../../assets/images/icon.svg';
import styles from './Welcome.module.scss';

const Welcome: React.FC = () => {
  const platform = useSelector((state: State) => state.app.platform);

  useEffect(() => {
    document.title = 'Welcome to InOrdnung';
  }, []);

  const handleNewProjectClick = (): void => {
    console.log('tell the main process to open a new project window');
  };

  return (
    <div className='h-100'>
      {platform === 'darwin' && (<Titlebar />)}

      <Row className='h-100'>
        <Col xs={7}>
          <div className={styles.iconSection}>
            <img src={icon} alt='InOrdnung' className={styles.icon} />

            <div className={styles.welcome}>Welcome to InOrdnung</div>
          </div>

          <div className={styles.buttons}>
            <RoundedButton onClick={handleNewProjectClick}>
              <i className='bi-file-earmark-plus' /> Create a new project
            </RoundedButton>
          </div>
        </Col>
        <Col xs={5} className={styles.recentProjects}>
        </Col>
      </Row>
    </div>
  );
};

export default Welcome;
