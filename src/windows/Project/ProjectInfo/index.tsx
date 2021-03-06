import React, { useContext } from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import MomentUtils from '@date-io/moment';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import moment from 'moment';

import {
  Grid,
  FormControlLabel,
  Switch,
  TextField,
} from '@material-ui/core';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { IntlContext } from '../../../intl/IntlContext';
import { State } from '../../../store';
import { projectSetProjectInfo } from '../../../store/actions/projectActions/projectInfoActions';
import { getDateLocaleFormat } from '../../../lib/dates';
import ProjectImage from './ProjectImage';

import styles from './ProjectInfo.module.scss';

const ProjectInfo: React.FC = () => {
  const projectInfo = useSelector((state: State) => state.project.projectInfo);
  const dispatch = useDispatch();
  const { locale, messages } = useContext(IntlContext);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    dispatch(projectSetProjectInfo({
      ...projectInfo,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(projectSetProjectInfo({
      ...projectInfo,
      [e.target.id]: !!e.target.checked,
    }));
  };

  const handleDateChange = (id: string, date: MaterialUiPickersDate): void => {
    const saveDate = moment(date).format('yyyy-MM-DD');

    dispatch(projectSetProjectInfo({
      ...projectInfo,
      [id]: saveDate?.toString(),
    }));
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils} locale={locale}>
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

      <div className={styles.secondHalf}>
        <div
          className={clsx(
            'form-group',
            styles.formGroup
          )}
        >
          <div className={styles.formControlWrapper}>
            <FormControlLabel
              control={
                <Switch
                  checked={projectInfo?.hasStartDate ?? false}
                  onChange={handleSwitchChange}
                  id='hasStartDate'
                  color='primary'
                />
              }
              label={messages.projectHasStartDate}
            />

            {projectInfo?.hasStartDate && (
              <KeyboardDatePicker
                margin='normal'
                id='startDate'
                format={getDateLocaleFormat()}
                value={projectInfo?.startDate}
                onChange={(date: MaterialUiPickersDate) => handleDateChange('startDate', date)}
                className={styles.datePicker}
                disableToolbar
                fullWidth
              />
            )}
          </div>
        </div>

        <div
          className={clsx(
            'form-group',
            styles.formGroup
          )}
        >
          <div className={styles.formControlWrapper}>
            <FormControlLabel
              control={
                <Switch
                  checked={projectInfo?.hasEndDate ?? false}
                  onChange={handleSwitchChange}
                  id='hasEndDate'
                  color='primary'
                />
              }
              label={messages.projectHasEndDate}
            />

            {projectInfo?.hasEndDate && (
              <KeyboardDatePicker
                margin='normal'
                id='endDate'
                format={getDateLocaleFormat()}
                value={projectInfo?.endDate}
                onChange={(date: MaterialUiPickersDate) => handleDateChange('endDate', date)}
                className={styles.datePicker}
                disableToolbar
                fullWidth
              />
            )}
          </div>
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default ProjectInfo;
