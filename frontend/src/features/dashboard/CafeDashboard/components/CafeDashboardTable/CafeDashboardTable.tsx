import React, {useEffect} from "react";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter, TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import CafeDashboardTableProps
    from "@/features/dashboard/CafeDashboard/components/CafeDashboardTable/CafeDashboardTableProps";
import CafeLogo from "@/components/CafeLogo/CafeLogo";
import StringUtil from "@/common/utils/StringUtil";
import {Link, useNavigate} from "react-router-dom";
import ModalUtil from "@/common/utils/ModalUtil";
import TablePaginationActions from "@/components/TablePaginationActions/TablePaginationActions";

const CafeDashboardTable = (props: CafeDashboardTableProps) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        setPage(0);
    }, [props.cafes]);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.cafes.length) : 0;

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

    const onEditCafe = (cafeId: string) => () => {
        navigate(`/cafe/${cafeId}`);
    }

    const onDeleteCafe = (cafeId: string) => () => {
        ModalUtil.showConfirmation({
            title: "Confirm",
            description: "Are you sure you want to delete this cafe?",
            onConfirm: () => {
                if (props.onDeleteCafe) {
                    props.onDeleteCafe(cafeId);
                }
            }
        })
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell>Logo</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Employees</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                            ? props.cafes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : props.cafes
                    ).map((row) => (
                        <TableRow key={row.id}>
                            <TableCell style={{ width: 150 }}>
                                {!StringUtil.isNullOrEmpty(row.logo ?? '') && <CafeLogo url={row.logo!}/>}
                            </TableCell>
                            <TableCell>
                                {row.name}
                            </TableCell>
                            <TableCell>
                                {row.description}
                            </TableCell>
                            <TableCell style={{ width: 100 }}>
                                <Link to={`/cafe/${row.id}/employees`}>Employees</Link>
                            </TableCell>
                            <TableCell>
                                {row.location}
                            </TableCell>
                            <TableCell style={{ width: 200 }}>
                                <Button variant="contained" onClick={onEditCafe(row.id)}>Edit</Button>
                                <Button variant="contained" onClick={onDeleteCafe(row.id)}>Delete</Button>
                            </TableCell>
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
                            count={props.cafes.length}
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

export default CafeDashboardTable