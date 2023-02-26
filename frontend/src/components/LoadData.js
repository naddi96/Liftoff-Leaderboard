
import React from 'react'
import Plot from 'react-plotly.js';
import config from '../../package.json';
class LoadData extends React.Component{


    async componentDidMount() {
        if (this.first) return; this.first = true;
        this.load_leaderboard(this.state.url,this.state.body);
        
    }
    constructor(props){
        super(props)
        var ModifierFlags=this.props.ModifierFlags
        var date=this.props.date
        if (date!=null){
            var ar=date.split("-")
            var a=ar.map((a)=>  { return Number(a)})
            date=a[0].toString()+"-"+a[1].toString()
            ModifierFlags=ModifierFlags+1
        }
        
        this.state={
            txt:"asdasdasdsasdasad",
            
            url:config.proxy+"https://liftoff-service.azurewebsites.net/unity/v0.5/GetCommunityLeaderboard.php",
            body:"{\"LeaderboardKeyword\":{\"ContentId\":\""+
            this.props.ContentId+"\",\"GamemodeFlags\":\""+
            this.props.GamemodeFlags+"\",\"ModifierFlags\":\""+
            ModifierFlags+"\",\"Timestamp\":\""+
            date+"\"},\"PlatformName\":\"steam\",\"FetchAllEntries\":true,\"FetchUserEntries\":[\""+
            this.props.FetchUserEntries+"\"]}",
            response:{}
        }
        console.log(this.props.date)
        this.load_leaderboard = this.load_leaderboard.bind(this);


    
    }

    async load_leaderboard(url,body){
    console.log("dssdfsdf")
    console.log(this.state)
    var myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("RequestId", "0");
    myHeaders.append("GameVersion", "1.5.1");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("X-Unity-Version", "2021.3.16f1");


    
    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: body,
    redirect: 'follow'
    };

    fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => {

        this.setState({data: JSON.parse(result)})
    })
    .catch(error => console.log('error', error));
    
    }




    render(){
        

        var text=(<></>)
        if ( this.state.data){
            var xValues=[]
            var yValues=[]
            var json=this.state.data
            for(var i=0 ; i<json.AllEntries.length;i++){
                xValues.push(json.AllEntries[i][2])
                yValues.push(json.AllEntries[i][1]/1000)
            }

            var avv= yValues.reduce((a, b) => a + b)/yValues.length
            var Average = {
                x: [xValues[0],xValues[xValues.length-1]],
                y: [avv,avv],
                mode: 'lines',
                name: 'Average time'
              };



            

            var dat
            if (json.UserEntries.length !==0){
                console.log(json.UserEntries)
                var myindex=json.UserEntries[0][2]-1
                

                var position=myindex+1
                var total=yValues.length
                var percentile= 100-parseInt(((total-position)/total)*100)
                var seconds_from1=yValues[myindex]-yValues[0]
                text=(<div><p>You are in the top <b>{percentile}th percentile </b>
                 and you are in position <b>{position} over {total}</b> participants with score of <b>{yValues[myindex]} Seconds</b>.</p>
                <p>You are <b>{seconds_from1} seconds</b> slower then the first pilot</p></div>)

                dat = [{
                    x: xValues,
                    y: yValues,
                    mode:"markers",
                    type:"scatter",
                    name: 'Racer'
                  },  {
                      marker: {
                          color:"red"
                  
                      },
                      x: [xValues[myindex]],
                      y: [yValues[myindex]],
                      type: 'bar',
                      name: 'You',
                      width: 1
                      
                    }, Average];
            }else{
                dat = [{
                    x: xValues,
                    y: yValues,
                    mode:"markers",
                    type:"scatter"
                  }, Average];
                
            }
            
            
            
            var date=this.props.date
            if (date===null){
                date="All time"
            }

            var layout = {
                xaxis: {title: "Positon"},
                yaxis: {title: "Seconds"},
                title: this.props.pressedButton +" Leaderboard \""+this.props.name +"\" "+date
              
        };              
    }

        //style={{width:"100%"}}
        return ( <>
        
        { this.state.data &&
        <Plot style={{width:"100%"}} data={dat}
        layout={layout}/>
        }

        { !this.state.data &&

        
        <img src="https://media.tenor.com/u8sdX3dcszgAAAAC/homer-running.gif" alt="stupid homer"/>
        }
        {text}
    </>)
    }
}





export default LoadData