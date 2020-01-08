import React from 'react';

class Home extends React.Component{
    constructor(props){
        super(props);
    }
    pic(e){
        e.preventDefault();
        const FormDat = new FormData(document.querySelector("#pic-form"));
        const picImage = FormDat.get("profile-pic");
        console.log(picImage);
    }
    render(){
        return(
            <form onSubmit = {(e)=>this.pic(e)} id = 'pic-form'>
                <input type = 'file' name = 'profile-pic'></input>
                <button type = 'submit'>SUBMIT</button>
            </form>
        )
    }
}

export default Home;