import { blue, red, blueGrey } from '@material-ui/core/colors';

export default (type: string): any => ({
  palette: {
    type,
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
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 15,
    button: {
      textTransform: 'none',
    },
  },
});
