import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import useTranslation from '../../intl/useTranslation';
import { State } from '../../store';
import Titlebar from '../../components/elements/Titlebar';
import RoundedButton from '../../components/elements/RoundedButton';

import icon from '../../assets/images/icon.svg';
import styles from './Welcome.module.scss';

const { ipcRenderer } = window.require('electron');

const Welcome: React.FC = () => {
  const platform = useSelector((state: State) => state.app.platform);
  const welcomeToInOrdung = useTranslation('welcomeToInOrdung');

  useEffect(() => {
    document.title = welcomeToInOrdung;
  }, [welcomeToInOrdung]);

  const handleNewProjectClick = (): void => {
    ipcRenderer.send('createNewProject');
    window.close();
  };

  return (
    <div className='h-100'>
      {platform === 'darwin' && (<Titlebar />)}

      <Row className='h-100'>
        <Col xs={7}>
          <div className={styles.iconSection}>
            <img src={icon} alt='InOrdnung' className={styles.icon} />

            <div className={styles.welcome}>
              <FormattedMessage id='welcomeToInOrdung' />
            </div>
          </div>

          <div className={styles.buttons}>
            <RoundedButton onClick={handleNewProjectClick}>
              <i className='bi-file-earmark-plus' />&nbsp;<FormattedMessage id='createANewProject' />
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
