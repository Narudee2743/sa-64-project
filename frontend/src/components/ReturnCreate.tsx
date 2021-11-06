import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, createStyles, } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import { UsersInterface } from "../models/IUser";
import { OrdersInterface } from "../models/IOrder";
import { StaffsInterface } from "../models/IStaff";
import { ReturnInterface } from "../models/IReturn";

import { MuiPickersUtilsProvider, KeyboardDateTimePicker, } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { TextField } from "@material-ui/core";

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        container: {
            marginTop: theme.spacing(2),
        },
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
        },
    })
);

function ReturnCreate() {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [users, setUsers] = useState<Partial<UsersInterface>>({});
    const [orders, setOrders] = useState<OrdersInterface[]>([]);
    const [staffs, setStaffs] = useState<StaffsInterface[]>([]);
    const [returns, setReturns] = useState<Partial<ReturnInterface>>({});
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    
    const apiUrl = "http://localhost:8080";
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
    };

    const handleChange = (
        event: React.ChangeEvent<{ name?: string; value: unknown }>
    ) => {
        const name = event.target.name as keyof typeof returns;
        setReturns({
            ...returns,
            [name]: event.target.value,
        });
    };

    const handleDateChange = (date: Date | null) => {
        console.log(date);
        setSelectedDate(date);
    };

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const name = event.target.id as keyof typeof returns;
        setReturns({
            ...returns,
            [name]: event.target.value,
        });
    };

    const getUsers = async () => {
        let uid = localStorage.getItem("uid");
        fetch(`${apiUrl}/user/${uid}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setUsers(res.data);
                } else {
                    console.log("else");
                }
            });
    };

    const getOrders = async () => {
        let uid = localStorage.getItem("uid");
        fetch(`${apiUrl}/orders/${uid}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setOrders(res.data);
                } else {
                    console.log("else");
                }
            });
    };

    const getStaffs = async () => {
        fetch(`${apiUrl}/staffs`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setStaffs(res.data);
                } else {
                    console.log("else");
                }
            });
    };

    useEffect(() => {
        getUsers();
        getOrders();
        getStaffs();
    }, []);

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    function submit() {
        let data = {
            OwnerID: convertType(users?.ID),
            OrderID: convertType(returns.OrderID),
            StaffID: convertType(returns.StaffID),
            Reason: returns.Reason ?? "",
            Returndate: selectedDate || "",
        };
        console.log(data)

        const requestOptionsPost = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        fetch(`${apiUrl}/return_s`, requestOptionsPost)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log("บันทึกได้")
                    setSuccess(true);
                } else {
                    console.log("บันทึกไม่ได้")
                    setError(true);
                }
            });
    }

    return (
        <Container className={classes.container} maxWidth="sm">
            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    บันทึกสำเร็จ
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    การบันทึกผิดพลาด
                </Alert>
            </Snackbar>
            <Paper className={classes.paper}>
                <Box display="flex">
                    <Box flexGrow={1}>
                        <Typography
                            component="h2"
                            variant="h6"
                            color="primary"
                            gutterBottom
                        >
                            บันทึกการคืน
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={3} className={classes.root}>
                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <Typography
                                color="textPrimary"
                            >
                                สมาชิก
                            </Typography>
                            <Select
                                native
                                value={returns.OwnerID}
                                onChange={handleChange}
                                disabled
                            >
                                <option aria-label="None" value="">
                                    {users?.Name}
                                </option>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <Typography
                                color="textPrimary"
                            >
                                หมายเลขคำสั่งซื้อ
                            </Typography>

                            <Select
                                native
                                value={returns.OrderID}
                                onChange={handleChange}
                                inputProps={{
                                    name: "OrderID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือกหมายเลขคำสั่งซื้อ
                                </option>
                                {orders.map((od: OrdersInterface) => (
                                    <option value={od.ID} key={od.ID}>
                                        {od.ID}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <Typography
                                color="textPrimary"
                            >
                                พนักงาน
                            </Typography>
                            <Select
                                native
                                value={returns.StaffID}
                                onChange={handleChange}
                                inputProps={{
                                    name: "StaffID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    กรุณาเลือกพนักงาน
                                </option>
                                {staffs.map((st: StaffsInterface) => (
                                    <option value={st.ID} key={st.ID}>
                                        {st.Name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                            <Typography
                                color="textPrimary"
                            >
                                เหตุผล
                            </Typography>
                            <option aria-label="None" value="">
                                กรุณาใส่เหตุผล
                            </option>

                            <TextField
                                id="Reason"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={returns.Reason || ""}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                        <Typography
                                color="textPrimary"
                            >
                                วันที่และเวลา
                            </Typography>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDateTimePicker
                                    name="Returndate"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    label="กรุณาเลือกวันที่และเวลา"
                                    minDate={new Date("2018-01-01T00:00")}
                                    format="yyyy/MM/dd hh:mm a"
                                />
                            </MuiPickersUtilsProvider>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            component={RouterLink}
                            to="/returns"
                            variant="contained"
                        >
                            กลับ
                        </Button>

                        <Button
                            style={{ float: "right" }}
                            variant="contained"
                            onClick={submit}
                            color="primary"
                        >
                            บันทึก
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default ReturnCreate;