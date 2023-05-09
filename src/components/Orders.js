import React from 'react'
import { Box } from '@mui/system'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

export default function Orders() {

    const orderData1 = [
        {
            orderNumber: 1,
            name: 'Jamal Riley',
            date: 'Jan 1, 2023',
            platform: 'iOS',
            orderType: 'Pickup',
            orderTotal: '$12.34',
            orderDetails: 'Details',
        },
        {
            orderNumber: 2,
            name: 'Jamal Riley',
            date: 'Jan 1, 2023',
            platform: 'iOS',
            orderType: 'Pickup',
            orderTotal: '$12.34',
            orderDetails: 'Details',
        },
        {
            orderNumber: 3,
            name: 'Jamal Riley',
            date: 'Jan 1, 2023',
            platform: 'iOS',
            orderType: 'Pickup',
            orderTotal: '$12.34',
            orderDetails: 'Details',
        },
    ];

    const timelineData = [
        {
            month: 'Jan',
            revenue: 1123.58,
            orderCount: 100,
        },
        {
            month: 'Feb',
            revenue: 2468.10,
            orderCount: 175,
        },
        {
            month: 'Mar',
            revenue: 150,
            orderCount: 150,
        },
        {
            month: 'Apr',
            revenue: 200,
            orderCount: 200,
        },
    ];

    return (
        <Box>
            <Typography variant='h5' sx={{ userSelect: 'none', py: 2 }}>Order History</Typography>
            <TableContainer component={Paper} sx={{ maxHeight: '200px' }}>
                <Table sx={{ minWidth: 650 }} stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Order No.</TableCell>
                            <TableCell align='center'>Name</TableCell>
                            <TableCell align='center'>Date</TableCell>
                            <TableCell align='center'>Platform</TableCell>
                            <TableCell align='center'>Order Type</TableCell>
                            <TableCell align='center'>Order Total</TableCell>
                            <TableCell align='center'>Order Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderData1.map(item => (
                            <TableRow key={item.orderNumber}>
                                <TableCell align='center'>{item.orderNumber}</TableCell>
                                <TableCell align='center'>{item.name}</TableCell>
                                <TableCell align='center'>{item.date}</TableCell>
                                <TableCell align='center'>{item.platform}</TableCell>
                                <TableCell align='center'>{item.orderType}</TableCell>
                                <TableCell align='center'>{item.orderTotal}</TableCell>
                                <TableCell align='center'>{item.orderDetails}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Typography variant='h5' sx={{ userSelect: 'none', py: 2 }}>Order & Revenue Data</Typography>
            <Paper sx={{ p: 2 }}>
                <LineChart width={650} height={400} data={timelineData}>
                    <Line type='monotone' dataKey='orderCount' stroke='#ffcc66'></Line>
                    <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
                    <XAxis dataKey='month' />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </Paper>
        </Box>
    )
}
