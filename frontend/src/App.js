
import './App.css';
import Navigation from './components/Navigation';
import Grid from './components/Grid';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import maps from './maps.json';
import React from 'react';
import packageJson from '../package.json';

class App extends React.Component {
  
  constructor(props){
    
    super(props)
    this.state={
      steam_id:"",
      input:""
    }
  }



  render(){



  return (
    <div style={{backgroundColor:"#adb5bd"}} className="App">
      
      
      
      <Router>
      
      
      <Navigation/>        
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

  <p></p>
      </div>
        <Routes>
        {Object.keys(maps.MAPS).map((item,index) => (
          <Route key={index}
            path= {packageJson.base_path+item}
            element={<Grid  steam_id={this.state.steam_id} map_name={item} tracks={maps.MAPS[item]}/>}
        />


        ))}
        <Route path={packageJson.base_path}
              element={<Navigate to= {packageJson.base_path+"STRAW BALE"} replace />}
              />
        </Routes>
      </Router>
      

    </div>
  );
}
}
export default App;
