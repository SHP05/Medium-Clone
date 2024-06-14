import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import axios from 'axios';

export default function ProfileUpdate(props) {

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const id = props.id;

  return (
    <React.Fragment>
      <button className="bg-transparent h-10  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded align-bottom"
      color="neutral"
      // startDecorator={<Add />}
      onClick={() => setOpen(true)}
      >
      Edit
      </button>
      
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              setOpen(false);

              await axios.put(`http://localhost:3001/userupdate/${id}`,{name , desc} )
              .then(result => {
                console.log(result)
            })
              .catch(err => console.log(err))
            }}
          >
            <Stack spacing={2}>
              <FormControl className=''>
                <FormLabel>Name</FormLabel>
                <Input autoFocus type='text' required onChange={(e)=> setName(e.target.value)}/>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input required type='text' onChange={(e)=> setDesc(e.target.value)}/>
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}