import { blue, red, blueGrey } from '@material-ui/core/colors';

export default (type: string): any => ({
  palette: {
    primary: {
      main: type === 'dark' ? blue[300] : blue[800],
    },
    secondary: {
      main: blueGrey[100],
    },
    error: {
      main: red[900],
      light: red[600],
    },
  },
});
