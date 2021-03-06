import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import MomentUtils from '@date-io/moment';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import moment from 'moment';

import {
  Grid,
  Card,
  CardContent,
  Switch,
} from '@material-ui/core';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { IntlContext } from '../../../../intl/IntlContext';
import { State } from '../../../../store';
import { projectSetProjectInfo } from '../../../../store/actions/projectActions/projectInfoActions';
import { getDateLocaleFormat } from '../../../../lib/dates';
import CardTitle from '../../../../components/CardTitle';

import styles from './ProjectDates.module.scss';

const ProjectDates: React.FC = () => {
  const projectInfo = useSelector((state: State) => state.project.projectInfo);
  const dispatch = useDispatch();
  const { locale } = useContext(IntlContext);

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
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Card className={styles.card}>
            <CardContent>
              <CardTitle className={styles.projectDatesTitle}>
                <Switch
                  checked={projectInfo?.hasStartDate ?? false}
                  onChange={handleSwitchChange}
                  id='hasStartDate'
                  color='primary'
                  className={styles.dateSwitch}
                />

                <FormattedMessage id='projectStartDate' />
              </CardTitle>

              {projectInfo?.hasStartDate && (
                <KeyboardDatePicker
                  margin='normal'
                  id='startDate'
                  format={getDateLocaleFormat()}
                  value={projectInfo?.startDate}
                  onChange={(date: MaterialUiPickersDate) => handleDateChange('startDate', date)}
                  disableToolbar
                  fullWidth
                />
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card className={styles.card}>
            <CardContent>
              <CardTitle className={styles.projectDatesTitle}>
                <Switch
                  checked={projectInfo?.hasEndDate ?? false}
                  onChange={handleSwitchChange}
                  id='hasEndDate'
                  color='primary'
                  className={styles.dateSwitch}
                />

                <FormattedMessage id='projectEndDate' />
              </CardTitle>

              {projectInfo?.hasEndDate && (
                <KeyboardDatePicker
                  margin='normal'
                  id='endDate'
                  format={getDateLocaleFormat()}
                  value={projectInfo?.endDate}
                  onChange={(date: MaterialUiPickersDate) => handleDateChange('endDate', date)}
                  disableToolbar
                  fullWidth
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default ProjectDates;
