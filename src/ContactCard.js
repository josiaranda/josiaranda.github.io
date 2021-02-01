import React, {Fragment} from 'react';
import cx from 'clsx';
import {makeStyles,useTheme} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CallIcon from '@material-ui/icons/Call';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';



const useStyles = makeStyles(({spacing, palette}) => {
    const family =
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
    return {
        content: {
            display: 'flex',
            // border: "1px solid green",
            width: '100%',
            flexWrap: 'nowrap',
            justifyContent: 'start',
            maxHeight: '15vh',

        },

        box: {
            // border: "1px solid red",
        },
        card: {
            // display: 'flex',
            padding: spacing(1),
            borderRadius: 7,
            // boxShadow: '0 2px 4px 0 rgba(138, 148, 159, 0.2)',
            // '& > *:nth-child(1)': {
            //     marginRight: spacing(2),
            // },
            // '& > *:nth-child(2)': {
            //     flex: 'auto',
            // },
        },
        avatar: {
            // border: "1px solid red",
            flexGrow: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth:0


        },
        avatarImg: {
            // border: "1px solid red",
            // maxWidth:'100%',
            // flexGrow:1
            width: spacing(8),
            height: spacing(8),

        },
        details: {
            // border: "1px solid red",
            flexGrow: 10,
            display:'flex',
            paddingLeft: spacing(1),
            flexDirection:'column',
            minWidth:0

        },
        fullname: {
            fontFamily: family,
            fontSize: 16,
            fontWeight: 700,
            // marginBottom: 0,
            // display: 'flex'
        },
        address: {
            fontFamily: family,
            // fontSize: 14,
            color: palette.grey[600],
            // letterSpacing: '1px',
            // marginBottom: 4,
            paddingLeft: spacing(0.5)
        },
        contact: {
            // fontFamily: family,
            fontSize: 14,
            color: palette.grey[600],
            letterSpacing: '1px',
            // marginBottom: 4,
            display: 'flex',
            justifyContent: 'space-between',
            // border: "1px solid red",
            marginTop: spacing(1),
            alignItems: 'center'
        },
        contactPhone:{
            flexGrow:4,
            textDecoration:'none',
            color: palette.grey[600],
            fontWeight: 800

        },
        contactCall:{
            marginLeft: spacing(0.5),
            marginRight: spacing(0.5),
            color: palette.grey[600],

        },
        contactCopy:{
            marginLeft: spacing(0.5),
            marginRight: spacing(0.5),
            color: palette.grey[600],

        },
        value: {
            marginLeft: 8,
            fontSize: 14,
            color: palette.grey[500],
        },
    };
});

const useSliderStyles = makeStyles(() => ({
    root: {
        height: 4,
    },
    rail: {
        borderRadius: 10,
        height: 4,
        backgroundColor: 'rgb(202,211,216)',
    },
    track: {
        borderRadius: 10,
        height: 4,
        backgroundColor: 'rgb(117,156,250)',
    },
    thumb: {
        display: 'none',
    },
}));

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}



export const KanbanCardDemo = React.memo(function KanbanCard(props) {
    const styles = useStyles();
    const sliderStyles = useSliderStyles();
    const theme = useTheme();
    if (!props.fullname || !props.address || !props.contactPhone ) {
        return (
            <Fragment>
                <div></div>
            </Fragment>
        )
    }else {

        return (
            <Card className={cx(styles.card)} elevation={2}>
                <div className={cx(styles.content)}>
                    <div className={cx(styles.avatar)}>
                        <Avatar src={props.imgUrl}
                                className={styles.avatarImg}
                                style={{
                                    color: theme.palette.getContrastText(stringToColor(props.fullname)),
                                    backgroundColor: stringToColor(props.fullname),

                                }}
                        >{props.fullname.charAt(0) || 'John Doe'}</Avatar>

                    </div>
                    <div className={cx(styles.details)}>
                        <div
                            className={styles.fullname}>{props.fullname || 'John Doe'}</div>
                        <div className={styles.address}>{props.address || 'Blok F7'}</div>
                        <div className={cx(styles.contact)}>
                            <a className={cx(styles.contactPhone)}
                               href={`tel:${props.contactPhone || '+6282155627063'}`}>{props.contactPhone || '+6282155627063'}</a>
                            <Tooltip title={`Call ${props.fullname || 'John Doe'}`}>
                                <IconButton style={{width: '4vh', height: '4vh'}}>

                                    <a className={cx(styles.contactCall)}
                                       href={`tel:${props.contactPhone || '+6282155627063'}`}><CallIcon/></a>
                                </IconButton>

                            </Tooltip>

                            <Tooltip title={"Copy"}>
                                <IconButton style={{width: '4vh', height: '4vh'}}>

                                <span className={cx(styles.contactCopy)}><FileCopyIcon onClick={() => {
                                    navigator.clipboard.writeText(props.contactPhone || '+6282155627063').then();
                                }}/></span> </IconButton>

                            </Tooltip>


                        </div>

                    </div>
                </div>
                {/*    <Avatar src={'https://i.pravatar.cc/300'} className={styles.avatar} />*/}

                {/*<Box>*/}
                {/*    <Avatar src={'https://i.pravatar.cc/300'} className={styles.avatar} />*/}
                {/*    <Box style={{border:"1px red solid"}}>*/}
                {/*        <h3 style={{border:"1px red solid"}} className={styles.heading}>{props.fullname || 'John Doe'}</h3>*/}
                {/*        <p style={{border:"1px red solid"}} className={styles.subheader}>Blok F7</p>*/}
                {/*        <Box style={{border:"1px red solid"}}display={'flex'} alignItems={'center'}>*/}
                {/*            <a href="tel:+6282155627063" id={`#${props.id || 1}`}>+6282155627063</a>*/}
                {/*            <a href="tel:+6282155627063"><CallIcon/></a>*/}

                {/*            <FileCopyIcon onClick={()=>{*/}
                {/*                navigator.clipboard.writeText('+6282155627063').then();*/}
                {/*            }}/>*/}

                {/*        </Box>*/}

                {/*    </Box>*/}
                {/*</Box>*/}
            </Card>
        );
    }
});


export default KanbanCardDemo;