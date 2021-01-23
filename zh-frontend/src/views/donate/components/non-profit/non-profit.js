import React, { useState }from 'react';
import { useAuthValue } from '../../../../context';
import axiosInstance from '../../../../utils/axios';
import { Avatar, Button, TextField, InputAdornment  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FaDonate } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './style.css';


const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },

    text_field: {
        width: '60%',
        height: '30px',
        marginTop: '5%',
    },

    button: {
        marginTop: '10%',
        width: '50%',
        height: '40px'
    }

}));

export const NonProfit = ({ id, name, donations }) => {

    const { token } = useAuthValue();
    const classes = useStyles();
    const [amount, setAmount] = useState(0);

    const handleChange = (event) => {
        setAmount(event.target.value);
    };

    const header = {
        headers: {'auth-token': token }
    };

    const donateToNonProfit = async (amount) => {
        console.log(amount)
        await axiosInstance.post('/users/donate', {
            nonProfitId: id,
            donations: amount
        }, header)
        .then(result => {
            console.log("res", result.data)
            toast.success("Thanks for the donation!", {
            });
        })
        .catch(e => {
            console.log("err", e.response.data);
            toast.error("Oops, not enough funds.", {
            });
        })
    }

    return (
        <li className="non-profit-list-item">
            <div className="non-profit-container">
                <Avatar className={classes.large}>{name[0]}</Avatar>
                <div className="non-profit-details">
                    <h3 className="non-profit-name">{name}</h3>
                    <span className="non-profit-donations">${donations} raised!</span>
                    <TextField 
                        className={classes.text_field}
                        label="Amount" 
                        variant="outlined" 
                        size="small"
                        type="number"
                        value={amount}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        />
                </div>
            </div>
            <Button 
                variant="contained"
                aria-label="donate"
                size="small"
                color="secondary"
                className={classes.button}
                onClick={() => {donateToNonProfit(amount)}}
                startIcon={
                    <FaDonate
                        color="white" />
                    }
                > 
                Donate
            </Button>
        </li>
    );
}