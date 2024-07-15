import { 
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    Button,
    DialogTitle 
} from '@mui/material';
import { useWebSocket } from '../../context/WithWebSocket';

const AddNewRoomModal = ({ handleOpen, isOpen }) => {
    const { rooms, sendData }  = useWebSocket();
    return (
        <Dialog
            open={Boolean(isOpen)}
            onClose={handleOpen}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const roomName = formJson.roomName;
                    console.log(roomName)
                    sendData(rooms.addNewRoom({roomName, avatar: "pathTofile"}))
                    handleOpen(false);
                },
            }}
        >
            <DialogTitle>Add a new chatroom</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To start chatting create a new chatroom, the topic room is giving by the title so make sure to have a good one!
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="roomName"
                    name="roomName"
                    label="Room Name"
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOpen}>Cancel</Button>
                <Button type="submit">Add room</Button>
            </DialogActions>
        </Dialog>
    )
};

export default AddNewRoomModal;