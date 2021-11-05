import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { ReturnInterface } from "../models/IReturn";
import { format } from 'date-fns'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginTop: theme.spacing(2),
        },
        table: {
            minWidth: 650,
        },
        tableSpace: {
            marginTop: 20,
        },
    })
);

function Returns() {
    const classes = useStyles();
    const [returns, setReturn] = useState<ReturnInterface[]>([]);

    const apiUrl = "http://localhost:8080";
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    const getReturns = async () => {
        let uid = localStorage.getItem("uid");
        fetch(`${apiUrl}/return_s/${uid}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    setReturn(res.data);
                } else {
                    console.log("else");
                }
            });
    };

    useEffect(() => {
        getReturns();
    }, []);

    return (
        <div>
            <Container className={classes.container} maxWidth="lg">
                <Box display="flex">
                    <Box flexGrow={1}>
                        <Typography
                            component="h2"
                            variant="h6"
                            color="primary"
                            gutterBottom
                        >
                            ข้อมูลการคืน
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            component={RouterLink}
                            to="/return/create"
                            variant="contained"
                            color="primary"
                        >
                            ขอคืนสินค้า
                        </Button>
                    </Box>
                </Box>
                <TableContainer component={Paper} className={classes.tableSpace}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" width="2%">
                                    Email
                                </TableCell>
                                <TableCell align="center" width="5%">
                                    สมาชิก
                                </TableCell>
                                <TableCell align="center" width="5%">
                                    หมายเลขคำสั่งซื้อ
                                </TableCell>
                                <TableCell align="center" width="5%">
                                    พนักงานที่รับคืน
                                </TableCell>
                                <TableCell align="center" width="5%">
                                    เหตุผล
                                </TableCell>
                                <TableCell align="center" width="10%">
                                    วันที่และเวลา
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {returns.map((rd: ReturnInterface) => (
                                <TableRow key={rd.ID}>
                                    <TableCell align="center">{rd.Owner.Email}</TableCell>
                                    <TableCell align="center">{rd.Owner.Name}</TableCell>
                                    <TableCell align="center">{rd.Order.ID}</TableCell>
                                    <TableCell align="center">{rd.Staff.Name}</TableCell>
                                    <TableCell align="center">{rd.Reason}</TableCell>
                                    <TableCell align="center">{format((new Date(rd.Returndate)), 'dd MMMM yyyy hh:mm a')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );
}

export default Returns;