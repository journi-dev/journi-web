import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import { Skeleton } from '@mui/material';

export default function LoadingCard() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            {/* <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={60} />
            <Skeleton variant="rounded" width={210} height={60} /> */}

            <Skeleton variant="rectangular" height={150} />
            <CardContent>
                <Skeleton variant="rounded" height={30} sx={{ mb: 1 }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            </CardContent>
            <CardActions>

                <Button /* variant="outlined" */ endIcon={<LoginIcon />}>
                    Select
                </Button>

            </CardActions>
        </Card>
    );
}