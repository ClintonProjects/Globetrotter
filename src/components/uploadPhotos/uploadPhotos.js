import React, { Component } from "react";

class UploadPhotos extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          fileList: []
        };
    }

    render() {
        const changeHandler = (event) => {
            this.setState({fileList: event.target.files});
          };
        
          const handleSubmission = () => {
            alert("You have selected "+this.state.fileList.length+" files!");
          };
        return (
        <div>
            <input type="file" name="file" multiple onChange={changeHandler} />
            <div>
                <button onClick={handleSubmission}>Upload</button>
            </div>
        </div>
        );
      }
}
export default UploadPhotos;