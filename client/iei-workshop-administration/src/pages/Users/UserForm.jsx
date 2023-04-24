import React, { Fragment, useState } from 'react'
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { FormControl,Button,TextField ,Dialog,DialogTitle,DialogActions } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../Layout';
import {useForm} from 'react-hook-form';

const useStyles = makeStyles({
    center: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
  });

export function UserForm() {
  const location = useLocation();

  const [name, setName] = useState(location.state === null ? "" : location.state.name),
  [email, setEmail] = useState(location.state === null ? "" : location.state.email),
  [password, setPassword] = useState(location.state === null ? "" : location.state.password),
  navigate = useNavigate(),
  classes = useStyles(),
  {register,handleSubmit} = useForm(),
  [open,setOpen] = useState(false),
  [notificationText,setNotificationText] = useState(""),
  onSubmit = async(data)=>{
    try{
      
        if(location.state === null){  //new client
            try{
                const result = await axios.post('http://localhost:3001/users/addUser', data);
                setNotificationText(result.data.message)
                setOpen(true);  
            }catch(err){
                alert(err)
            }
        }
        else {  //edit client
            try{
                const result = await axios.post('http://localhost:3001/users/editUser', data);
                setNotificationText(result.data.message)
                setOpen(true);  
            }catch(err){
                alert(err)
            }
        }                
      
  }catch(err){
      alert(err)
  }
  },
  handleClose = () => {
    setOpen(false);
    navigate('/Users')
  };

  return (
    <Layout>

<Fragment>
        <br /><br />
        <h1>Editar Taller Existente</h1>

        <div className={classes.center}>
            <Box

            sx={{
                '& > :not(style)': { m: 1, width: '80ch' },
                top:'50%',
                transform : 'translateY(-50%)'

            }}
            noValidate
            autoComplete="off"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl sx={{minWidth: "50%" }}>
                <br />
                <TextField  required id={"name"} label={"Nombre"} variant="outlined" 
                onChange={(e) => {setName(e.target.value);}}
                defaultValue={name}
                inputProps={{ maxLength: 100 }}
                {...register('name',{required : true})}
                />
                <br />
                <TextField  required id={"email"} label={"Email"} variant="outlined" 
                onChange={(e) => {setEmail(e.target.value);}}
                defaultValue={email}
                inputProps={{ maxLength: 100 }}
                {...register('userEmail',{required : true})}
                />
                <br />
                <TextField  required id={"password"} label={"Contraseña"} variant="outlined" 
                onChange={(e) => {setPassword(e.target.value);}}
                defaultValue={password} 
                inputProps={{ maxLength: 8 }}
                {...register('password',{required : true})}
                />                
                <br />
                <Button type="submit"  color="primary" variant="contained" >
                        Registrar datos
                </Button>
              </FormControl> 
                    
                    
                </form>
            </Box>
        </div>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {notificationText}
            </DialogTitle>

            <DialogActions>
                <Button onClick={handleClose} autoFocus>Entendido</Button>
            </DialogActions>

        </Dialog>
        
    </Fragment>

    </Layout>
    
  )
}

/*

<div className="column">
            <h2>Datos del cliente</h2>
            <div className="form-grid">
                <TextField sx={{width:{md: "49%"}}} id={"name"} label={"Nombre"} variant="outlined" 
                onChange={(e) => {setName(e.target.value);}}
                value={name}
                inputProps={{ maxLength: 100 }}
                />
                <TextField sx={{width:{md: "49%"}}} id={"email"} label={"Email"} variant="outlined" 
                onChange={(e) => {setEmail(e.target.value);}}
                value={email}
                inputProps={{ maxLength: 100 }}
                />
                <TextField sx={{width:{md: "49%"}}} id={"phone"} label={"Contraseña"} variant="outlined" 
                onChange={(e) => {setPassword(e.target.value);}}
                DefaultValue={password} 
                inputProps={{ maxLength: 8 }}
                />
                <Button label="Registrar" handleSubmit={handleSubmit}></Button>
            </div>
        </div>

*/