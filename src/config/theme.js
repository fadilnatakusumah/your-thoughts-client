import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: '#00695f',
      light: '#33ab9f',
      main: '#009688',
      contrastText: '#fff'
    }, //#009688
    secondary: {
      light: '#eb7333',
      main: '#e65100',
      dark: '#a13800',
      contrastText: '#fff'
    }
  }
})


export default theme;