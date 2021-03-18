import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    }
  },
  iconsBoxRoot: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginBottom: theme.spacing(2),
    }
  },
  copy: {
    [theme.breakpoints.down('md')]: {
      width: '100%',
      order: 12,
    }
  }
}));

export default function Footer() {
  const classes = useStyles();

  const content = {
    'copy': '© 2021 Game Mania. All rights reserved.'
  };

  return (
    <footer className={classes.root}>
      <Container maxWidth="lg">
        <Box py={6} display="flex" flexWrap="wrap" alignItems="center">
          <Typography color="secondary" component="p" gutterBottom={false} className={classes.copy}>{content['copy']}</Typography>
          <Box ml="auto" className={classes.iconsBoxRoot}>
            <IconButton color="secondary" aria-label="Twitter">
              <TwitterIcon />
            </IconButton>
            <IconButton color="secondary" aria-label="Facebook">
              <FacebookIcon />
            </IconButton>
            <IconButton color="secondary" aria-label="Instagram">
              <InstagramIcon />
            </IconButton>
            <IconButton color="secondary" aria-label="LinkedIn">
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </footer>
  );
}