import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  Grid,
} from '@material-ui/core';


import styles from './Bookmarks.module.scss';


const Bookmarks: React.FC = () => {
  return (
    <Grid container className={styles.about} spacing={5}>
      <Grid item xs={6}>
        Bookmark Name
      </Grid>
      <Grid item xs={5}>
        URL
      </Grid>
      <Grid item xs={5}>
        -&gtr;
      </Grid>
    </Grid>
  );
};

export default Bookmarks;
