import { blue, red, blueGrey, deepPurple, purple, pink, green, yellow, indigo, lightBlue, cyan, teal, lightGreen, lime, amber, orange, deepOrange, brown, grey } from '@material-ui/core/colors';

interface Colors {
  [key: string]: {
    main: {
      [type: string]: string;
    };
    dark: {
      [type: string]: string;
    };
  };
}

export const colors: Colors = {
  blue: {
    main: {
      dark: blue[300],
      light: blue[800],
    },
    dark: {
      dark: blueGrey[800],
      light: blueGrey[100],
    },
  },
  red: {
    main: {
      dark: red[300],
      light: red[800],
    },
    dark: {
      dark: blueGrey[800],
      light: blueGrey[100],
    },
  },
  yellow: {
    main: {
      dark: yellow[300],
      light: yellow[800],
    },
    dark: {
      dark: blueGrey[800],
      light: blueGrey[100],
    },
  },
  green: {
    main: {
      dark: green[300],
      light: green[800],
    },
    dark: {
      dark: blueGrey[800],
      light: blueGrey[100],
    },
  },
  pink: {
    main: {
      dark: pink[300],
      light: pink[800],
    },
    dark: {
      dark: blueGrey[800],
      light: blueGrey[100],
    },
  },
  purple: {
    main: {
      dark: purple[300],
      light: purple[800],
    },
    dark: {
      dark: blueGrey[800],
      light: blueGrey[100],
    },
  },
  deepPurple: {
    main: {
      dark: deepPurple[300],
      light: deepPurple[800],
    },
    dark: {
      dark: blueGrey[800],
      light: blueGrey[100],
    },
  },
  indigo: {
    main: {
      dark: indigo[300],
      light: indigo[800],
    },
    dark: {
      dark: blueGrey[800],
      light: blueGrey[100],
    },
  },
  lightBlue: {
    main: {
      dark: lightBlue[300],
      light: lightBlue[800],
    },
    dark: {
      dark: blueGrey[800],
      light: blueGrey[100],
    },
  },
  cyan: {
    main: {
      dark: cyan[300],
      light: cyan[800],
    },
    dark: {
      dark: blueGrey[800],
      light: blueGrey[100],
    },
  },
  teal: {
    main: {
      dark: teal[300],
      light: teal[800],
    },
    dark: {
      dark: blueGrey[800],
      light: blueGrey[100],
    },
  },
  lightGreen: {
    main: {
      dark: lightGreen[300],
      light: lightGreen[800],
    },
    dark: {
      dark: blueGrey[800],
      light: blueGrey[100],
    },
  },
  lime: {
    main: {
      dark: lime[300],
      light: lime[800],
    },
    dark: {
      dark: blueGrey[800],
      light: blueGrey[100],
    },
  },
  amber: {
    main: {
      dark: amber[300],
      light: amber[800],
    },
    dark: {
      dark: blueGrey[800],
      light: blueGrey[100],
    },
  },
  orange: {
    main: {
      dark: orange[300],
      light: orange[800],
    },
    dark: {
      dark: blueGrey[800],
      light: blueGrey[100],
    },
  },
  deepOrange: {
    main: {
      dark: deepOrange[300],
      light: deepOrange[800],
    },
    dark: {
      dark: blueGrey[800],
      light: blueGrey[100],
    },
  },
  brown: {
    main: {
      dark: brown[300],
      light: brown[800],
    },
    dark: {
      dark: blueGrey[800],
      light: blueGrey[100],
    },
  },
  grey: {
    main: {
      dark: grey[300],
      light: grey[800],
    },
    dark: {
      dark: blueGrey[800],
      light: blueGrey[100],
    },
  },
  blueGrey: {
    main: {
      dark: blueGrey[300],
      light: blueGrey[800],
    },
    dark: {
      dark: blueGrey[800],
      light: blueGrey[100],
    },
  },
};

export default (type: string, projectColor = 'blue'): any => ({
  palette: {
    type,
    primary: {
      main: colors[projectColor].main[type],
      dark: colors[projectColor].dark[type],
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
