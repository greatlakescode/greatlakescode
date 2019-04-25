import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

function CircularIndeterminate(props) {
    const { classes } = props;
    const largeSize = 100;
    return (
        <div>
            {/*<CircularProgress className={classes.progress} />*/}
            <CircularProgress className={classes.progress} size={largeSize} />
            {/*<CircularProgress className={classes.progress} color="secondary" />*/}
            {/*<CircularProgress className={classes.progress} style={{ color: purple[500] }} thickness={7} />*/}
        </div>
    );
}

CircularIndeterminate.propTypes = {
    classes: PropTypes.object.isRequired,
};

const LoadingLarge = withStyles(styles)(CircularIndeterminate);

export default LoadingLarge;