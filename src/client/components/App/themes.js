import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import yellow from '@material-ui/core/colors/yellow';
import deepPurple from '@material-ui/core/colors/deepPurple';

export const darkModeTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: yellow,
    secondary: yellow,
    bar: yellow,
    tableHeader: yellow,
    tableBody: {
      'low': '#757575',
      'high': '#616161'
    },
    compare: {
      50: '#e0e0e0',
      100: '#bdbdbd',
      200: '#9e9e9e',
      300: '#757575',
      400: '#616161',
      500: '#424242',
    },
    darkModeToggle: grey,
  },
});

export const defaultTheme = createMuiTheme({
  palette: {
    bar: deepPurple,
    tableHeader: deepPurple,
    tableBody: {
      'low': '#ede7f6',
      'high': '#d1c4e9'
    },
    compare: {
      50: '#e8f5e9',
      100: '#c8e6c9',
      200: '#a5d6a7',
      300: '#81c784',
      400: '#66bb6a',
      500: '#4caf50'
    },
    darkModeToggle: deepPurple
  }
});
