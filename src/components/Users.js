import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import HashLoader from "react-spinners/HashLoader";
import Backdrop from "@mui/material/Backdrop";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";

const columns = [
  { id: "id", label: "User Id", minWidth: 130 },
  { id: "name", label: "UserName", minWidth: 80 },
  { id: "email", label: "email", minWidth: 100 },
  {
    id: "role",
    label: "User Role",
    minWidth: 80,
    // align: "right",
  },
  {
    id: "Action",
    label: "Action",
    minWidth: 80,
  },
];

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Users() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState("#ffffff");
  const [loading, setLoading] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [singleUser, setSingleUser] = React.useState({});
  const [savedRows, setSavedRows] = React.useState([]);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const [showDelete,setShowDelete]=React.useState(false);
  const [selectedData,setSelectedData]=React.useState([]);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  useEffect(() => {
    setOpen(true);
    fetchData();
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }, []);
  const fetchData = async () => {
    const users = await axios.get(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    setRows(users.data);
    setSavedRows(users.data);
    // setRowsPerPage(users.data.data.length);
  };

  const dateFormat = (date, column) => {
    if (column.id === "createdAt") {
      let ndate = new Date(date);

      return (
        ndate.getDate() +
        "/" +
        (ndate.getMonth() + 1) +
        "/" +
        ndate.getFullYear()
      );
    } else return date;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteRow = (row, id) => {
    setOpen(true);
    const newRow = rows.filter((item) => row.id !== item.id);
    setTimeout(() => {
      setOpen(false);
      setRows(newRow);
    }, 3000);
  };

  const searchHandler = (e) => {
    if (e.target.value.length > 0) {
      let newRows = rows.filter(
        (row) =>
          row.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          row.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
          row.id.includes(e.target.value) ||
          row.role.toLowerCase().includes(e.target.value.toLowerCase())
      );

      setRows(newRows);
    } else {
      setRows(savedRows);
    }
  };
  const updateDetails = () => {
    setOpenDialog(false);
    setOpen(true);
    const newRow = rows;
    newRow[index] = {
      id: singleUser.id,
      name,
      email,
      role,
    };
    setTimeout(() => {
      setOpen(false);
      setRows(newRow);
    }, 3000);
  };
  const editDialog = (row, index) => {
    setName(row.name);
    setEmail(row.email);
    setRole(row.role);
    setOpenDialog(true);
    setSingleUser(row);
    setIndex(index);
  };
  const onSelectAllClick=(event,row)=>{
    setShowDelete(event.target.checked);
    const value=event.target.checked;
    if(value){
      const newarr=selectedData;
      newarr.push(row)
      setSelectedData(newarr)
    }

    
  }
  const deleteAllData=()=>{
     setOpen(true);
     const newArr=rows;
     console.log(newArr,"sdf");
     console.log("a")
     selectedData.forEach((item,index)=>{
      const temp=deleteArr(item,newArr);
      newArr=temp;
      console.log(newArr)
     })
     setRows(newArr);
    setOpen(false)
  }

  const deleteArr=(data,arr)=>{
    console.log(arr)
    const arrt=arr.filter(item=>item.id!==data.id);
    console.log(arrt)
     return arrt;
  }

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        // onClick={handleClose}
      >
        <HashLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </Backdrop>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"User's Edit Form"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <br />
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              style={{ width: "25rem" }}
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              style={{ width: "25rem" }}
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <br />
            <TextField
              id="outlined-basic"
              label="Role"
              variant="outlined"
              style={{ width: "25rem" }}
              placeholder="Enter role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "1rem" }}>
          <Button
            color="primary"
            style={{ background: "blue", color: "white" }}
            onClick={updateDetails}
          >
            Update Details
          </Button>
          <Button
            onClick={handleClose}
            color="primary"
            style={{ border: "1px solid blue", color: "blue" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        type="text"
        placeholder="Search..."
        sx={{ marginBottom: "1rem", width: "40%" }}
        onChange={searchHandler}
        id="outlined-basic"
        label="Search"
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Paper sx={{ width: "100%", overflow: "hidden", padding: "1rem" }}>
       {showDelete? <Button variant="contained" onClick={deleteAllData} >Delete Selected Rows</Button>: ''}
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    
                    color="primary"
                    // indeterminate={numSelected > 0 && numSelected < rowCount}
                    // checked={rowCount > 0 && numSelected === rowCount}
                    // onChange={onSelectAllClick}
                    inputProps={{
                      "aria-label": "select all desserts",
                    }}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          // indeterminate={numSelected > 0 && numSelected < rowCount}
                          // checked={rowCount > 0 && numSelected === rowCount}
                          onChange={(e)=>onSelectAllClick(e,row)}
                          inputProps={{
                            "aria-label": "select all desserts",
                          }}
                        />
                      </TableCell>

                      {columns.map((column) => {
                        const value = row[column.id];
                        
                        if (column.label === "Action") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <ModeEditIcon
                                variant="contained"
                                style={{ color: "blue" }}
                                onClick={() => {
                                  editDialog(row, index);
                                }}
                              ></ModeEditIcon>
                              <DeleteIcon
                                variant="contained"
                                onClick={() => {
                                  deleteRow(row, index);
                                }}
                              ></DeleteIcon>
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : dateFormat(value, column)}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 20,25,30]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
