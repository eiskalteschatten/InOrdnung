import React, { useEffect } from 'react';
import { remote } from 'electron';

// import styles from './About.module.scss';

const About: React.FC = () => {
  useEffect(() => {
    document.title = 'About InOrdnung';
  }, []);

  return (
    <div>
      <div>Version {remote.app.getVersion()}</div>

      <div><b>Node Version:</b> {process.versions.node}</div>
      <div><b>Chromium Version:</b> {process.versions.chrome}</div>
      <div><b>Electron Version:</b> {process.versions.electron}</div>
    </div>
  );
};

export default About;
