import { orange500 } from 'material-ui/styles/colors';
import kinectsitTheme from './kinectsitTheme';

export default {
  errorStyle: {
    color: orange500,
  },
  underlineStyle: {
    borderColor: kinectsitTheme.palette.accent1Color,
  },
  floatingLabelStyle: {
    color: kinectsitTheme.palette.accent1Color,
  },
  floatingLabelFocusStyle: {
    color: kinectsitTheme.palette.accent1Color,
  },
  fieldStyles: {
    width: '100%',
  },
  paperStyle: {
    margin: 'auto',
    padding: 20,
  },
  switchStyle: {
    marginBottom: 16,
  },
  submitStyle: {
    marginTop: 32,
    textAlign: 'center',
  },
  center: {
    textAlign: 'center',
  },
  error: {
    color: 'red',
  },
};
