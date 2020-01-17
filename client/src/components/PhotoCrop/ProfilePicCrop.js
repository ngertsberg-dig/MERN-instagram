import React from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './ProfilePicCrop.sass';
import { notificationPopup } from '../../helpers/helper';
import * as actions from '../../domains/user/actions';
import { connect } from 'react-redux';

class ProfilePicCrop extends React.Component{
    state = {
        src: null,
        crop: {
          unit: '%',
          width: 25,
          aspect: 16 / 9,
          maxWidth: 50,
          maxHeight: 50
        },
      };
      constructor(props){
        super(props);
        this.submitProfilePic = this.submitProfilePic.bind(this);
      }
      onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
          const reader = new FileReader();
          reader.addEventListener('load', () =>
            this.setState({ src: reader.result })
          );
          reader.readAsDataURL(e.target.files[0]);
        }
      };
    
      // If you setState the crop in here you should return false.
      onImageLoaded = image => {
        this.imageRef = image;
      };
    
      onCropComplete = crop => {
        this.makeClientCrop(crop);
      };
    
      onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
      };
    
      async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
          const croppedImageUrl = await this.getCroppedImg(
            this.imageRef,
            crop,
            'newFile.jpeg'
          );
          this.setState({ croppedImageUrl });
        }
      }
    
      getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
    
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
    
        return new Promise((resolve, reject) => {
          canvas.toBlob(blob => {
            if (!blob) {
              //reject(new Error('Canvas is empty'));
              console.error('Canvas is empty');
              return;
            }
            console.log(blob);
            this.setState({croppedBlob:blob})
            blob.name = fileName;
            window.URL.revokeObjectURL(this.fileUrl);
            this.fileUrl = window.URL.createObjectURL(blob);
            resolve(this.fileUrl);
          }, 'image/jpeg');
        });
        
      } 

      //change user profile pic
      async submitProfilePic(){
        const headerToSend = {"Accept":"application/json","Content-Type":"application/json"};
        if(this.state.croppedBlob){
          const cropped = this.state.croppedBlob;
          //**blob to dataURL**
          this.blobToDataURL(cropped, async (dataurl)=>{
            const userID = this.props.user._id;
            const dataURL = dataurl;
            const res = await fetch("/api/user/uploadImage",{method:"POST",headers:headerToSend,body:JSON.stringify({profilePic:dataURL,userID})});
            const data = await res.json();
            if(data.success){
              this.props.changeUserPic({ newPic:data.image, userObject:this.props.user });
              document.querySelector(".modal.modal-change-profile-pic.active").classList.remove("active");
              notificationPopup(data.message,data.type);
            }
          });
        }
        else{
          notificationPopup("Please select an image!","error");
        }
      }

      blobToDataURL(blob, callback) {
        var a = new FileReader();
        a.onload = function(e) {callback(e.target.result);}
        a.readAsDataURL(blob);
      }


    render(){
        const { crop, src } = this.state;
        return (
          <div id="ProfilePicCrop">
            <p>Select an image to replace profile pic.</p>
            <div className = 'profile-pic-crop-input'>
              <input type="file" accept="image/*" onChange={this.onSelectFile} />
            </div>
            {src && (<div className = 'profile-pic-crop-image'>
              <ReactCrop
                src={src}
                crop={crop}
                ruleOfThirds
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
              /></div>
            )}
        {/* {croppedImageUrl && (
          <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
        )} */}
          <button id = 'submitNewProfilePic' onClick = {this.submitProfilePic}>SUBMIT</button>
          </div>
        );
    }
}

const mapStateToProps = state => ({
  user: state.UserReducer.user
})

const mapDispatchToProps = dispatch => ({
  changeUserPic: payload => dispatch(actions.newUserPicUploaded(payload))
})

export default connect(mapStateToProps,mapDispatchToProps)(ProfilePicCrop);