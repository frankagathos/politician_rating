import React from 'react';
import list from './list.js';
import './App.css'


class Cards extends React.Component {  
        state = {
            list:[],joke:"",
            joker:"",
            userip:"",
            isLoaded:false,
            loc_stats:{ip:'loading'},
            spaceResults:"hide",
            numberInSpace:"", 
            photoresults:"hide",
            user_city:"",
            city_photo_url:"",
            photocounter:0,
            
        };
               
    componentDidMount(){
        this.setState({list:list}); 
        
        //API request inside componentDidMount //IP API (1)
        fetch(`https://ipinfo.io/json`)
         .then(res => res.json())
         .then(json => {
           
            this.setState({
                isLoaded:true,
                loc_stats:json,
                user_city:json.city,
                
            }     
            )
        })
        

    }
    //card vote up function
      cardVoteUp = (x) => {                           
         const increasedList = this.state.list.map((z)=>{
             if (z.id===x){
                 return Object.assign({},z,{points:z.points+1,});
             }
             else {
                 return z;
             }
         });
           this.setState({
              list:increasedList, 
           });
       }
   cardVoteDown = (x) => {  
       const reducedist = this.state.list.map((y)=>{
           if (y.id===x){
               return Object.assign({},y,{points:y.points-1,});
           }
           else{
               return y;
           }
       });    
       this.setState(
       {list:reducedist});    
   }
    
   //Get random joke function API (2)
          GetRandomJoke = async (x) => {
  
                const api_call = await fetch(`https://api.chucknorris.io/jokes/random`);
                const data = await api_call.json();
                const joke = data;
                     this.setState({
                          joke:joke.value,
                          joker:x+' says:',
                       });
      }
          
    //Get specific countrys stats FUNCTION API (3)
       findCountryStats = (z) =>{
        const MYCOUNTRY=this.state.loc_stats.country;
           
        //API request  of users country
        fetch(`https://restcountries.eu/rest/v2/alpha/${MYCOUNTRY}`)
         .then(res => res.json())
         .then(json => {
            this.setState({          
              
                specific_country:json.name,
                specific_country_flag:json.flag,
            }     
            )
        })
     }
       findPeopleInSpace = (z) =>{
        //API request number of people in space API (4)
        fetch(`http://api.open-notify.org/astros.json`)
         .then(res => res.json())
         .then(json => {
           
            this.setState({
                numberInSpace:json.number,
                spaceResults:"show",
                      
              
            }     
            )
        })
       }
          //Get photos near me API (5)
       findPhotosNear = (z) =>{
        const query= this.state.loc_stats.city;
        const client_id ="8ed09088a4eb4d257e69127e636984bbf65599f0f00bc9a10a35d759d3f2b7d2"  ;
        let photocounter = this.state.photocounter ; 
          
        //API request  of users country
        fetch(`https://api.unsplash.com/search/photos?client_id=${client_id}&query=${query}`)
         .then(res => res.json())
         .then(json => {
            

            this.setState({          
              
               city_photo_url:json.results[photocounter].urls.regular,
                photocounter:this.state.photocounter+1,
                photoresults:"show photoresults"
            }     
            )
        })
     }
       
    render(){
        const loc_stats = this.state.loc_stats;
        const sortedlist = this.state.list.sort((a,b)=>(b.points-a.points)); //sort(); mutates the original array it was called on   
        const cards = sortedlist.map((x)=>(
             <Card
                 name = {x.name}
                 surname={x.surname}       
                 points = {x.points}
                 key = {x.id}
                 image={x.image}   
                 id={x.id}             
                 onVoteup= {this.cardVoteUp}
                 onVotedown={this.cardVoteDown}
                 onGetJoke={this.GetRandomJoke}                  
                 ></Card>
         ));
        return(
            <div className='App'>
                      
                       <div>Rate politicians jokes</div>
                       <div>{cards}</div>
                               
                    <div className="statistics">
                        <div>Your IP is : {loc_stats.ip}</div>
                        <div>You live in : {loc_stats.region}</div>
                        <div>Near : {loc_stats.city}</div>
                        <button onClick={this.findCountryStats}>MY FLAG </button>
                         <button onClick={this.findPeopleInSpace}>PEOPLE IN SPACE</button>
                         <button onClick={this.findPhotosNear}>PHOTO NEAR ME</button>
                          <div className="country-results">
                                    <div>{this.state.specific_country}</div>
                            <img src={this.state.specific_country_flag} alt=""></img>
                              
                          </div>
                          
                            <div className={this.state.spaceResults}>
                                    <div>Currently there are: {this.state.numberInSpace} people in space</div>
                        
                              
                          </div >
                               <div className={this.state.photoresults}>
                                    <div>Photo  related to {this.state.loc_stats.city} :<img src={this.state.city_photo_url} alt="imagesfd"/></div>
                        
                              
                          </div>
                     
                           
                     </div>
                     <div className="joke-card">
                           <div>{this.state.joker}</div>
                           <div>{this.state.joke}</div>  
                         
                     </div>
                
            </div>
     
        );
        
    }
    
    
}

class Card extends React.Component {
 
    onVoteup = () => (
        this.props.onVoteup(this.props.id)
    );
    
    onVotedown = () => (
        this.props.onVotedown(this.props.id)
    );
    onGetJoke = () => (
        this.props.onGetJoke(this.props.name)
    );
    render(){
        return (
            <div className="card">
              <div className="card-inner">
                      <div>{this.props.name+"  "+this.props.surname}</div>
                      <img className="imagestyle" src={this.props.image} alt="Joker"></img>
                      <div className="points">POINTS : {this.props.points}</div>      
                      <button className="upvote btn" onClick={this.onVoteup}>+1 point</button>
                      <button className="downvote btn" onClick={this.onVotedown}>-1 point</button>
                      <button className="getjoke btn" onClick={this.onGetJoke}>get joke</button>
               
                </div>
            </div>
        )
       
        
    }
   
}

export default Cards;