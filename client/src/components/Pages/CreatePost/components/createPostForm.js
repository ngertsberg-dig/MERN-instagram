import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import './styles.sass';

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));
const CreatePostForm = ( props ) => {
    const classes = useStyles();
    return(
        <div id = 'createNewPost'>

            <div className = 'post-image'>
                <input
                accept="image/*"
                className={classes.input + " post-image-input"}
                id="contained-button-file"
                multiple
                type="file"
                onChange = {props.postImagePreview}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span" startIcon={<CloudUploadIcon />}>
                        Upload
                    </Button>
                </label>
            </div>

            <div className = 'post-image-preview'>
                <img src = "" />
            </div>

            <div className = 'post-title'>
                <TextField
                id="standard-textarea"
                label="Post Title"
                placeholder="Post Title"
                multiline
                />
            </div>
            <div className = 'post-content'>
                <TextField
                    id="standard-textarea"
                    label="Post Content"
                    placeholder="Post Content"
                    multiline
                    rows="7"
                />
            </div>

            <div className = 'post-submit'>
                <Button variant="contained" color="primary" onClick = {props.submitPost}>
                    Create Post
                </Button>
            </div>
        </div>
    )
}

export default CreatePostForm;