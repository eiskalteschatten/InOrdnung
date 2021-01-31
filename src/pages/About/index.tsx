import React, { useEffect } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import icon from '../../assets/images/icon.svg';
import styles from './About.module.scss';

const { remote } = window.require('electron');

const About: React.FC = () => {
  useEffect(() => {
    document.title = 'About InOrdnung';
  }, []);

  return (
    <Row className={styles.about}>
      <Col>
        <img src={icon} alt='InOrdnung' />
      </Col>
      <Col>
        <div className={styles.title}>InOrdnung</div>

        <div>by Alex Seifert</div>

        <div className={styles.version}>
          {remote.app.getVersion()}
        </div>

        <div className={styles.electronVersions}>
          <div><b>Node Version:</b> {process.versions.node}</div>
          <div><b>Chromium Version:</b> {process.versions.chrome}</div>
          <div><b>Electron Version:</b> {process.versions.electron}</div>
        </div>

        <div className={styles.legal}>
          Copyright © Alex Seifert 2021.
        </div>
      </Col>
    </Row>
  );
};

export default About;
