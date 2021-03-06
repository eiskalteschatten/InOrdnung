import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import {
  Container,
  Grid,
  Card,
  CardContent,
  TextField,
} from '@material-ui/core';

import { IntlContext } from '../../../intl/IntlContext';
import { State } from '../../../store';
import { projectSetProjectInfo } from '../../../store/actions/projectActions/projectInfoActions';
import CardTitle from '../../../components/CardTitle';

import ProjectImage from './ProjectImage';
import ProjectColors from './ProjectColors';
import ProjectDates from './ProjectDates';

import styles from './ProjectInfo.module.scss';

const ProjectInfo: React.FC = () => {
  const projectInfo = useSelector((state: State) => state.project.projectInfo);
  const dispatch = useDispatch();
  const { messages } = useContext(IntlContext);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    dispatch(projectSetProjectInfo({
      ...projectInfo,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <Container maxWidth='md'>
      <Grid container justify='center' className={styles.projectInfo}>
        <Grid item>
          <ProjectImage />
        </Grid>
        <Grid item>
          <div className={styles.formGroup}>
            <div className={styles.formControlWrapper}>
              <TextField
                id='name'
                label={messages.projectName}
                variant='outlined'
                value={projectInfo?.name ?? ''}
                onChange={handleFieldChange}
                className={styles.textField}
                InputLabelProps={{ shrink: !!projectInfo?.name }}
                fullWidth
              />
            </div>

            <div className={styles.formControlWrapper}>
              <TextField
                id='description'
                label={messages.projectDescription}
                variant='outlined'
                value={projectInfo?.description ?? ''}
                onChange={handleFieldChange}
                className={styles.textField}
                InputLabelProps={{ shrink: !!projectInfo?.description }}
                multiline
                fullWidth
                rows={7}
              />
            </div>
          </div>
        </Grid>
      </Grid>

      <Card className={styles.card}>
        <CardContent>
          <CardTitle>
            <FormattedMessage id='projectProjectColor' />
          </CardTitle>

          <ProjectColors />
        </CardContent>
      </Card>

      <ProjectDates />
    </Container>
  );
};

export default ProjectInfo;
