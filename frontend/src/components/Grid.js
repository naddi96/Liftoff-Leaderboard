import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import LoadData from './LoadData';
import packageJson from '../../package.json';
//function Grid(props) {

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "block" : "none";

  return (
      <div className='modal' style={{display:showHideClassName}}>
          <section className="modal-main">
              {children}
              <div className="text-center">
              <button className="btn btn-danger" type="button" onClick={handleClose}>
                  Close
              </button>
              </div>
          </section>
      </div>
  );
};



class Grid extends React.Component{


  constructor(props) {
    super(props);
    var arr = new Array(this.props.tracks.length).fill(null);
    this.state = {
      showPopup: false,
      ContentId:null,
      GamemodeFlags:null,
      ModifierFlags:null,
      Timestamp:null,
      track:null,
      date:null,
      name:null,
      date_array:arr,
      FetchUserEntries:this.props.steam_id,
      value_drop_down:1,
  }
  this.openPopupHandler = this.openPopupHandler.bind(this);
  this.closePopupHandler = this.closePopupHandler.bind(this);

  }

  openPopupHandler = (item) => {
    this.setState({
        ContentId:item.track.id,
        name:item.track.name,
        GamemodeFlags:item.GamemodeFlags,
        ModifierFlags:item.ModifierFlags,
        date:item.date,
        showPopup: true,
        pressedButton:item.pressedButton
    });
  }

  closePopupHandler = () => {
    this.setState({ showPopup: false,
      track:null,
      GamemodeFlags:null,
      ModifierFlags:null,
      date:null
    
    });
  }

  
  render(){

        console.log('url( ".'+packageJson.base_path+'images/' + this.props.map_name + '.jpg")')
        return (
          
          <div className='pippo' style={{ backgroundImage :'url("http://localhost:3000/Liftoff-Leaderboard/images/AUTUMN%20FIELDS.jpg")'}}>

              
              
              {console.log(this.state.date_array)}
              {this.state.showPopup &&
              <Modal show={this.state.showPopup} handleClose={this.closePopupHandler}>
                <LoadData   
                            name={this.state.name}
                            ContentId={this.state.ContentId}
                            GamemodeFlags={this.state.GamemodeFlags}
                            ModifierFlags={this.state.ModifierFlags}
                            date={this.state.date} 
                            FetchUserEntries={this.props.steam_id}
                            pressedButton={this.state.pressedButton} />

              </Modal>
            }
            <div className="container-lg">
            <div className="row">
            {
                this.props.tracks.map((item,index)=> (
                    
                    <div key={index} style={{height: "300px", width: '400px', margin: '5px' }} className='col-xl-4 col-md-6 col-xxl-3'>
                    
                    <Card>
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>

                      <div className="row">
                        <div className="col-sm-6">
                           <p>Leaderboard date </p>
                           <p>Best race times</p>
                           <p>Best lap times</p>
                           <p>Best race times (purist)</p>
                           <p>Best lap times (purist)</p>
                        </div>
                        <div className="col-sm-6">
                        
                        { this.state.date_array[index] != null &&
                        <p><input className='LeaderboardDate' 
                            type="month" id="start" name="start" defaultValue={this.state.date_array[index]} 
                            onChange={(event)=>{
                              var tmp=this.state.date_array
                               
                              tmp[index]=event.target.value;
                              
                              if (event.target.value===""){
                                tmp[index]=null
                              }
                              this.setState({ date_array:tmp})

                            } }/></p>

                        }

                        {this.state.date_array[index] ===null &&
                        

                          
                        <p>

                            <select  defaultValue={1} onChange={(event)=> {
                              console.log(event.target.value)
                              if (event.target.value==="2"){
                                var k=this.state.date_array
                                k[index]=""
                                this.setState({ date_array:k})

                              }
                            }}>

                              <option  value="1">All time</option>
                              <option value="2">Pick a date</option>

                            </select>
                          

                      </p>
                        
                        
                        }
                        
                        <p><Button className='BestRaceTimes' variant='primary' size='sm' 
                        onClick={() => this.openPopupHandler({pressedButton:'Best Race Times',date:this.state.date_array[index], GamemodeFlags:1, ModifierFlags:0, track:item})}>
                          view</Button></p>
                        <p><Button className='BestLapTimes' variant='primary' size='sm' 
                        onClick={() => this.openPopupHandler({pressedButton:'Best Lap Times' ,date:this.state.date_array[index], GamemodeFlags:2, ModifierFlags:0, track:item})}>
                          view</Button></p>
                        <p> <Button className='BestRaceTimesPurist' variant='primary' size='sm'
                        onClick={() => this.openPopupHandler({pressedButton:'Best Race Times Purist', date:this.state.date_array[index], GamemodeFlags:1, ModifierFlags:2, track:item})}>
                          view</Button></p>
                        <p><Button className='BestLapTimesPurist' variant='primary' size='sm' 
                        onClick={() => this.openPopupHandler({pressedButton:'Best Lap Times Purist',date:this.state.date_array[index], GamemodeFlags:2, ModifierFlags:2, track:item})}>
                          view</Button></p>
                      </div>
              
                      </div>

                    </Card.Body>
                  </Card>
                  </div>
                
                )
                
                )
              }
             </div>
          </div>
          </div>
        );
    }
  }


export default Grid;