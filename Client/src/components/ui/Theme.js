import { createMuiTheme } from '@material-ui/core/styles';

const primary = "#1B2635"
const secondary = "#D7C7CC"
const Tertiary = "#0c151f"

export default createMuiTheme({
    palette: {
        background: {
            default: `${primary}`,
        },
        common: {
            blue: `${primary}`,
            orange: `${secondary}`
        },
        primary: {
            main: `${primary}`
        },
        secondary: {
            main: `${secondary}`
        },
        Tertiary:{
            main: `${Tertiary}`
        }

    },
    typography: {
        h2: {
            fontWeight: 1000,
            fontFamily: '"Montserrat", Open Sans',
            fontSize: 25
        },
        subtitle1:{
            color:`${primary}`
        }
    },
    tableHeader: {
        color: 'red'
    },
})