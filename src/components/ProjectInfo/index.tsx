import React, { useContext } from 'react';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import MomentUtils from '@date-io/moment';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import moment from 'moment';

import {
  FormControlLabel,
  Switch,
  TextField,
} from '@material-ui/core';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { IntlContext } from '../../intl/IntlContext';
import { State } from '../../store';
import { projectSetProjectInfo } from '../../store/actions/projectActions';
import { getDateLocaleFormat } from '../../lib/dates';
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
      <div className={styles.projectInfo}>
        <ProjectImage />

        <div className={styles.formGroup}>
          <div className={styles.formControlWrapper}>
            <TextField
              id='name'
              label={messages.projectName}
              variant='outlined'
              value={projectInfo?.name}
              onChange={handleFieldChange}
              className={styles.textField}
              InputLabelProps={{ shrink: !!projectInfo?.name }}
            />
          </div>

          <div className={styles.formControlWrapper}>
            <TextField
              id='description'
              label={messages.projectDescription}
              variant='outlined'
              value={projectInfo?.description}
              onChange={handleFieldChange}
              className={styles.textField}
              InputLabelProps={{ shrink: !!projectInfo?.description }}
              multiline
              rows={4}
            />
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
                  checked={projectInfo?.hasStartDate ?? false}
                  onChange={handleSwitchChange}
                  className={styles.switch}
                  id='hasStartDate'
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
                  className={styles.switch}
                  id='hasEndDate'
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
              />
            )}
          </div>
        </div>
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default ProjectInfo;
