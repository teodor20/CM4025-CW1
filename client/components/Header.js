import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import auth from '../auth/auth-helper'

const useStyles = makeStyles((theme) => ({
  primaryAction: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginRight: theme.spacing(0),
      marginBottom: theme.spacing(2),
    }
  },
}));

export default function Header(props) {
  const classes = useStyles();

  const content = {
    'header': 'The New Internet',
    'description': 'Decentralized, secure, private. The PiperNet is on it\'s way to revolutionize every smartphone, PC, and smart-fridge near you.',
    'primary-action': 'Sign up for free',
    'secondary-action': 'Read more',
    ...props.content
  };

  return (
    <section>
      <Container maxWidth="md">
        <Box py={8} textAlign="center">
          <Typography variant="h3" component="h2" gutterBottom={true}>{content['header']}</Typography>
          <Typography variant="h5" color="textSecondary" paragraph={true}>{content['description']}</Typography>
          <Box mt={4}>
          {
            !auth.isAuthenticated() && (<span>
              <Button href='/signup' variant="contained" color="primary" className={classes.primaryAction}>{content['primary-action']}</Button>
            </span>)
          }
            <Button color="secondary">{content['secondary-action']}</Button>
          </Box>
        </Box>
      </Container>
    </section>
  );
}