import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';

import Logo from '../../assets/founder.jpg'
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 350,
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        background:theme.palette.primary.main,
        color:theme.palette.secondary.main,
        
    },
    media: {
        height: 0,
        //  paddingTop: '56.25%', // 16:9
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        padding: '35.25%',
         
        

    },
    "& .MuiTypography--heading": {
        fontWeight: "bold"
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    "& .MuiDivider-root": {
        margin: `${theme.spacing.unit * 3}px 0`,

    },
   
    "& .MuiTypography--subheading": {
        lineHeight: 1.8
    },
    "& .MuiAvatar-root": {
        display: "inline-block",
        border: "2px solid white",
        "&:not(:first-of-type)": {
            marginLeft: theme.spacing.unit
        }
    },
    divider: {
        // Theme Color, or use css color in quote
        background: theme.palette.secondary.main,
    },
}));

export default function RecipeReviewCard() {
    const classes = useStyles();
    // const [expanded, setExpanded] = React.useState(false);

    // const handleExpandClick = () => {
    //     setExpanded(!expanded);
    // };

    return (
        <Card className={classes.root}>

            <CardMedia
                classes={{root:classes.media}}
                image={Logo}
                title="Paella dish"
            />
            <CardContent>
                <Typography
                    className={"MuiTypography--heading"}
                    variant={"h6"}
                    gutterBottom
                >
                    Worker Profile
            </Typography>

                {/* Name */}
                <div style={{ display: "flex", alignItems: "baseline", marginTop: '10px' }}>
                    <Typography
                        className={"MuiTypography--subheading"}

                        color="inherit"
                        noWrap
                        style={{ flexDirection: "column", fontSize: '16px', fontWeight: 'bold' }}
                    >
                        Name 
                    </Typography>
                    <Typography

                        color="inherit"
                        noWrap
                        style={{ marginLeft: 130, fontSize: '13px', fontWeight: 'bold' }}
                    >
                        Kyaw Htet Zaw
                </Typography>
                </div>
                <Divider classes={{root: classes.divider}} light  style={{marginBottom:'20px'}}/>

                {/* NRC */}

                <div style={{ display: "flex", alignItems: "baseline", marginTop:'10px' }}>
                    <Typography
                        className={"MuiTypography--subheading"}
                         
                        color="inherit"
                        noWrap
                        style={{ flexDirection: "column",fontSize:'16px',fontWeight:'bold' }}
                    >
                        NRC  
                    </Typography>
                    <Typography

                        color="inherit"
                        noWrap
                        style={{ marginLeft: 138,fontSize:'13px',fontWeight:'bold' }}
                    >
                       12/nrc(N)013586
                </Typography>
                </div>
                <Divider classes={{root: classes.divider}} light  style={{marginBottom:'20px'}}/>

                 {/* EMail */}

                 <div style={{ display: "flex", alignItems: "baseline", marginTop:'10px' }}>
                    <Typography
                        className={"MuiTypography--subheading"}
                         
                        color="inherit"
                        noWrap
                        style={{ flexDirection: "column",fontSize:'16px',fontWeight:'bold' }}
                    >
                        Email 
                    </Typography>
                    <Typography

                        color="inherit"
                        noWrap
                        style={{ marginLeft: 130,fontSize:'13px',fontWeight:'bold' }}
                    >
                       Khz@gmail.com
                </Typography>
                </div>
                <Divider classes={{root: classes.divider}} light  style={{marginBottom:'20px'}}/>

            </CardContent>
        </Card>
    );
}
