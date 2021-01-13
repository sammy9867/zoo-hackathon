import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForest } from '../../../../hooks';
import { FaRandom } from 'react-icons/fa';
import './style.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
}));

export const SelectForest = ({ forestId, setForestId, fetchRandomLocation }) => {

    const classes = useStyles();

    const [openSelectForest, setOpenSelectForest] = useState(false);
    const { forests, isLoading } = useForest();

    return (
        <div className="forest-selection">
            <FormControl className={classes.formControl}>
                <InputLabel id="select-forest-label">Forest</InputLabel>
                <Select
                    open={openSelectForest}
                    onOpen={() => { setOpenSelectForest(true) }}
                    onClose={() => { setOpenSelectForest(false) }}
                    value={forestId}
                    onChange={(e) => { setForestId(e.target.value); }}
                >      
                    {!isLoading && forests.map((forest) => {
                        return (
                            <MenuItem key={forest._id} value={forest._id}>
                                {forest.name}
                            </MenuItem>
                        );
                    })} 
                </Select>
            </FormControl>

            <IconButton
                onClick={() => {fetchRandomLocation(forestId)}}>
                <FaRandom />
            </IconButton>
        </div>
    );
}