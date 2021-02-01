import React, {useEffect, useState} from 'react';
import 'fontsource-roboto';
import {makeStyles, Paper} from '@material-ui/core';
import './App.css';
import Table from './table.js';
import Appbar from './appbar.js';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ContactCard from "./ContactCard";
import Grid from "@material-ui/core/Grid";
import {readString} from 'react-papaparse';
import cx from 'clsx';



const useStyles = makeStyles(({spacing, palette}) => {
    const family =
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
    return {
        sectionHeader: {
            fontFamily: family,
            fontSize: 36,
            fontWeight: 700,
            borderBottom: '1px black solid'

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
            minWidth: 0


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
            display: 'flex',
            paddingLeft: spacing(1),
            flexDirection: 'column',
            minWidth: 0

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
        contactPhone: {
            flexGrow: 4,
            textDecoration: 'none',
            color: palette.grey[600],
            fontWeight: 800

        },
        contactCall: {
            marginLeft: spacing(0.5),
            marginRight: spacing(0.5),
            color: palette.grey[600],

        },
        contactCopy: {
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

function processData(data,filter="", group="fullname",sort="asc") {
    let toreturn = {};
    if (filter.trim()) {
        data = data.filter(item => {
            return item[group].toLowerCase().includes(filter);
        });
    }
    console.log(filter,data,"uuuu")
    data.map(item => {
        const char = item[group].charAt(0);
        console.log(char)
        if (!(char in toreturn) ){
            toreturn[char] = [item];
        }else {
            toreturn[char] = [...toreturn[char],item];

        }

    });
    if (sort === 'desc'){
        console.log("desc")
        toreturn = Object.keys(toreturn).reverse().reduce(
            (obj, key) => {
                obj[key] = toreturn[key];
                return obj;
            },
            {}
        );
    }else {
        toreturn = Object.keys(toreturn).sort().reduce(
            (obj, key) => {
                obj[key] = toreturn[key];
                return obj;
            },
            {}
        );
    }
    console.log(toreturn,"data")
}


function App() {
    const styles = useStyles();
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("/data.csv")
            .then(response => response.text().then(text => {setData(readString(text, {header: true}).data)
            processData(readString(text, {header: true}).data,"","fullname","desc")}))
        ;
    }, []);

    return (
        <div className="App">
            <CssBaseline/>
            <Appbar/>
            <Container style={{marginTop: "16px"}}>
                <Typography variant="h4" style={style}>Anggota Keluarga</Typography>

                {/*<Paper elevation={3}>*/}
                {/*    <Table/>*/}
                {/*</Paper>*/}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className={cx(styles.sectionHeader)}>
                            A
                        </div>
                    </Grid>

                    {
                        data.map(item => {
                            return (
                                <Grid item xs={3}>
                                    <ContactCard {...item}/>
                                </Grid>
                            )


                        })
                    }
                </Grid>


            </Container>
        </div>
    );
}

const style = {
    display: 'flex',
    justifyContent: 'center'
}


export default App;
