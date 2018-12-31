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
                
        };
               
    componentDidMount(){
        this.setState({list:list}); 
        //API request inside componentDidMount
        fetch(`https://ipinfo.io/json`)
         .then(res => res.json())
         .then(json => {
            this.setState({
                isLoaded:true,
                loc_stats:json,
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
    
          GetRandomJoke = async (x) => {
  
                const api_call = await fetch(`https://api.chucknorris.io/jokes/random`);
                const data = await api_call.json();
                const joke = data;
                     this.setState({
                          joke:joke.value,
                          joker:x+' says:',
                       });
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