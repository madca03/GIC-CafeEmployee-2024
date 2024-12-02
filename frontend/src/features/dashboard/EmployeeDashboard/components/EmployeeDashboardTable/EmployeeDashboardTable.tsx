import EmployeeDashboardTableProps
    from "@/features/dashboard/EmployeeDashboard/components/EmployeeDashboardTable/EmployeeDashboardTableProps";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {
    Button,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import TablePaginationActions from "@/components/TablePaginationActions/TablePaginationActions";
import ModalUtil from "@/common/utils/ModalUtil";
import StringUtil from "@/common/utils/StringUtil";

const EmployeeDashboardTable = (props: EmployeeDashboardTableProps) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const navigate = useNavigate();

    const showEmployeesOfCafe = !StringUtil.isNullOrEmpty(props.cafeId);

    useEffect(() => {
        setPage(0);
    }, [props.employees]);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.employees.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const onDeleteEmployee = (employeeId: string) => () => {
        ModalUtil.showConfirmation({
            title: "Confirm",
            description: "Are you sure you want to remove this employee?",
            onConfirm: () => {
                if (props.onDeleteEmployee) props.onDeleteEmployee(employeeId);
            }
        })
    }

    const onEditEmployee = (employeeId: string) => () => {
        navigate(`/employee/${employeeId}`);
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email Address</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>Days Worked</TableCell>
                        {!showEmployeesOfCafe && (
                            <>
                                <TableCell>Cafe</TableCell>
                                <TableCell>Actions</TableCell>
                            </>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                            ? props.employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : props.employees
                    ).map((row) => (
                        <TableRow key={row.employeeStringId}>
                            <TableCell style={{ width: 160 }}>
                                {row.employeeStringId}
                            </TableCell>
                            <TableCell style={{ width: 160 }}>
                                {row.name}
                            </TableCell>
                            <TableCell style={{ width: 160 }}>
                                {row.emailAddress}
                            </TableCell>
                            <TableCell style={{ width: 160 }}>
                                {row.phoneNumber}
                            </TableCell>
                            <TableCell style={{ width: 160 }}>
                                {row.daysWorked}
                            </TableCell>
                            {!showEmployeesOfCafe && (
                                <>
                                    <TableCell style={{ width: 160 }}>
                                        {row.cafe}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }}>
                                        <Stack direction="row" spacing={2}>
                                            <Button variant="contained" onClick={onEditEmployee(row.employeeStringId)}>Edit</Button>
                                            <Button variant="contained" onClick={onDeleteEmployee(row.employeeStringId)}>Delete</Button>
                                        </Stack>

                                    </TableCell>
                                </>
                            )}
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={props.employees.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            slotProps={{
                                select: {
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                },
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

EmployeeDashboardTable.defaultProps = {
    showEmployeesOfCafe: false
}

export default EmployeeDashboardTable;