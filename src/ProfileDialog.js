import React from 'react'
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function ProfileDialog(open, ...props) {

    const handleClose = () => {

    }

    const handleListItemClick = (event, value) => {
      console.log(value)
      props.onClose(value)
    };
    
    return (
      <Dialog
        // onClose={handleClose}
        open={open}
      >
        <DialogTitle>Set backup account</DialogTitle>
        <List>
          <ListItem
            autoFocus
            button
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemText primary="Thay đổi thông tin" />
          </ListItem>

          <ListItem
            autoFocus
            button
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemText primary="Đăng xuất" />
          </ListItem>
        </List>
      </Dialog>
    );
}

export default ProfileDialog
