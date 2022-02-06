import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export const DescriptionAlerts=( props  )=> {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity= {props.alertType ? props.alertType : 'error'} color = "info">
        <AlertTitle>{props.alertTitle ? props.alertTitle : 'Error'}</AlertTitle>
        {props.alertMessage ? props.alertMessage : 'This is a Error alert'} — <strong>check it out!</strong>
      </Alert>
    </Stack>
  );
}
export default DescriptionAlerts;