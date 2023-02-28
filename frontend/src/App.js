
import './App.css';
import Navigation from './components/Navigation';
import Grid from './components/Grid';
import maps from './maps.json';
import React from 'react';

class App extends React.Component {
  
  constructor(props){
    
    super(props)
    this.state={
      steam_id:"",
      input:"",
      top_menu_cliked:"STRAW BALE",
    
    }

    this.topMenuClicked = this.topMenuClicked.bind(this);
  }

  topMenuClicked(value){
    this.setState({top_menu_cliked:value})
  }



  render(){



  return (
    <div style={{backgroundColor:"#adb5bd"}} className="App">
      
      
      

      
      
      <Navigation topMenuClicked={this.topMenuClicked}/>        
      <div style={{ marginBottom:"10px" ,marginTop:"10px",  margin:"0 auto" ,width:"50%" ,textAlign: "left"}}>
    
  <div className="form-group">
    <label style={{fontSize:"20px"}} htmlFor="formGroupExampleInput">Paste your public steam url for comparing the results</label>
    <input value={this.state.input} type="text" 
        className="form-control" 
        id="formGroupExampleInput" 
        placeholder="example -> https://steamcommunity.com/profiles/7656119831165XXXX/"
        onChange={(event)=>{
          
          this.setState({input:event.target.value})
          try{
            let regex = /\d+/g;
            let matches = event.target.value.match(regex);
            let longest = "";
          // Loop through the array and compare the length of each match with the longest sequence
          for (let match of matches) {
            // If the match is longer than the longest sequence, update the longest sequence
            if (match.length > longest.length) {
              longest = match;
            }

          }
          if (longest.length>15){
            this.setState({steam_id:longest})
          }
          // Return the longest sequence
          

          }catch{}
          

          

          
        }}/>
  </div>
      </div>
        <Grid  steam_id={this.state.steam_id} map_name={this.state.top_menu_cliked} tracks={maps.MAPS[this.state.top_menu_cliked]}/>
    </div>
  );
}
}
export default App;
