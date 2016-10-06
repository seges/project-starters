import React from 'react';

import Paper from 'material-ui/Paper';

const style = {
    paper: {
        margin: 10,
        padding: 10
    },

    root: {
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    }
}

const Dashboard = () => {
    return (
        <div style={style.root}>
            <Paper style={style.paper}>
                <h2>
                    Average time passage through the guide (last 7 days)
                </h2>
            </Paper>
        </div>
    );
};

export default Dashboard;
