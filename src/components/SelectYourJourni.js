import React from 'react'
import { Container, Grid } from '@mui/material'
import JourniCard from './JourniCard'
import LoadingCard from './LoadingCard'

export default function SelectYourJourni() {
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <JourniCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <JourniCard />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <LoadingCard />
                </Grid>
            </Grid>
        </Container>
    )
}
