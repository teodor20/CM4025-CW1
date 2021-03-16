import React from 'react'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function Profile() {
    return (
        <section>
          <Container maxWidth="md">
            <Box pt={8} pb={10}>
              <Typography variant="h1">404</Typography>
              <Typography variant="h4" component="h2" gutterBottom={true}>Naaah, page not found...</Typography>
              <Typography variant="subtitle1" color="textSecondary">The requested page couldn't be located. Checkout for any URL misspelling.</Typography>
              <Box mt={4}>
                <Button href='/' variant="contained" color="primary">Return to the homepage</Button>
              </Box>
            </Box>
          </Container>
        </section>
    )
}