import React, { useEffect } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import icon from '../../assets/images/icon.svg';
import styles from './About.module.scss';

const { remote, shell } = window.require('electron');

const About: React.FC = () => {
  useEffect(() => {
    document.title = 'About InOrdnung';
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();

    const target = e.target as HTMLAnchorElement;
    const href = target.getAttribute('href');

    if (href) {
      shell.openExternal(href);
    }
  };

  return (
    <Row className={styles.about}>
      <Col>
        <img src={icon} alt='InOrdnung' />
      </Col>
      <Col>
        <div className={styles.title}>InOrdnung</div>

        <div>by <a href='https://www.alexseifert.com' onClick={handleLinkClick}>Alex Seifert</a></div>

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
