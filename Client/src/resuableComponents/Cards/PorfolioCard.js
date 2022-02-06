import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Divider, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {

        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: '350px',
            height: '210px',
            background: theme.palette.primary.main,
        },
         [theme.breakpoints.down('md')]: {
             
       paddingLeft:'23px', 
       marginTop:'5px'
    },
        
         
    },

    typography: {
        marginLeft: '10px',
        flexDirection: "column",
        fontSize: '18px',
        fontWeight: 'bold',
        color: theme.palette.secondary.main,
        "& .MuiTypography--subheading": {
            lineHeight: 1.8,
          
        },
    },
    informationTypo:{
        marginLeft: '125px', 
        fontSize: '13px',
        fontWeight: 'bold',
        color: theme.palette.secondary.main,
    },
    informationHeadTypo:{
        marginLeft: '20px', 
        fontSize: '15px',
        fontWeight: 'bold',
        color: theme.palette.secondary.main,
    },
    divider: {
        // Theme Color, or use css color in quote
        background: theme.palette.secondary.main,
        marginLeft:'15px',
        marginRight :'15px',
    },


}));

const PorfolioCard = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root} >
            <Paper elevation={3}  > 

                <div style={{alignItems:'center',textAlign:'center',marginTop:'10px'}}>
                <Typography
                        color="inherit"
                        noWrap
                        className={classes.typography}
                    >
                       
                       Personal Information
                       
                    </Typography>
                </div>

                    {   /* role */}
                <div style={{ display: "flex", alignItems: "baseline", marginTop: '10px' }}> 
                    <Typography
                        color="inherit"
                        noWrap
                        className={classes.informationHeadTypo}
                    >
                        Role
                    </Typography>
                    <Typography
                        color="inherit"
                        noWrap
                        className={classes.informationTypo}
                    >
                       Divider
                </Typography>
                </div>
                <Divider classes={{ root: classes.divider }} light style={{ marginBottom: '20px' }} />

                {   /* Permanent */}
                <div style={{ display: "flex", alignItems: "baseline", marginTop: '10px' }}> 
                    <Typography
                        color="inherit"
                        noWrap
                        className={classes.informationHeadTypo}
                    >
                        Permanent
                    </Typography>
                    <Typography
                        color="inherit"
                        noWrap
                        className={classes.informationTypo}
                    >
                       True
                </Typography>
                </div>
                <Divider classes={{ root: classes.divider }} light style={{ marginBottom: '20px' }} /> 

                {   /* Gender */}
                <div style={{ display: "flex", alignItems: "baseline", marginTop: '10px' }}> 
                    <Typography
                        color="inherit"
                        noWrap
                        className={classes.informationHeadTypo}
                    >
                        Gender
                    </Typography>
                    <Typography
                        color="inherit"
                        noWrap
                        className={classes.informationTypo}
                    >
                       Male
                </Typography>
                </div>
                <Divider classes={{ root: classes.divider }} light style={{ marginBottom: '20px' }} /> 

                {   /* Phone Number */}
                <div style={{ display: "flex", alignItems: "baseline", marginTop: '10px' }}> 
                    <Typography
                        color="inherit"
                        noWrap
                        className={classes.informationHeadTypo}
                    >
                        Ph No
                    </Typography>
                    <Typography
                        color="inherit"
                        noWrap
                        className={classes.informationTypo}
                    >
                      09726255252
                </Typography>
                </div>
                


            </Paper>
        </div>
    );
}

export default PorfolioCard;