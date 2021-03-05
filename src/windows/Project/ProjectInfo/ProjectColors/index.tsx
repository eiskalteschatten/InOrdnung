import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  useTheme,
  Grid,
} from '@material-ui/core';

import { colors } from '../../../../theme';
import { State } from '../../../../store';
import { uiSetProjectColor } from '../../../../store/actions/uiActions';
import RoundedButton from '../../../../components/RoundedButton';
import { ProjectColor } from '../../../../interfaces/ui';

import styles from './ProjectColors.module.scss';

const ProjectColors: React.FC = () => {
  const projectColor = useSelector((state: State) => state.ui.projectColor);
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleColorClicked = (color: ProjectColor): void => {
    dispatch(uiSetProjectColor(color));
  };

  return (
    <div>
      <div className={styles.label}>
        Project Color:
      </div>

      <Grid container alignItems='center' justify='center'>
        {Object.keys(colors).map((color, index) => (
          <Grid item key={index}>
            <RoundedButton
              onClick={() => handleColorClicked(color as ProjectColor)}
              className={styles.button}
              selected={projectColor === color}
            >
              <div
                style={{
                  backgroundColor: colors[color].main[theme.palette.type],
                }}
                className={styles.swatch}
              />
            </RoundedButton>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProjectColors;
