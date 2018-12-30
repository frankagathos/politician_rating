import React from 'react';
import list from './list.js';
import './App.css'


  
 

class Cards extends React.Component {
    
        state = {
            list:[],joke:"",
            joker:"",
            userip:""
                
        };
        
          
    componentDidMount(){
        this.setState({list:list});
    }
 
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
 
   
       
    GetIp = async (x) => {
  
    const api_call = await fetch(`https://ipinfo.io/json`);
    const data = await api_call.json();
    const ip = data.ip;


       
     this.setState({
            
         userip:ip,
       });
        
     
      }
    
          GetRandomJoke = async (x) => {
  
    const api_call = await fetch(`https://api.chucknorris.io/jokes/random`);
    const data = await api_call.json();
    const joke = data;


       
     this.setState({
            
          joke:joke.value,joker:x+' says:',
       });
      }
      
    render(){
        
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
                       <div>Politicians Ranking</div>
                       <div>{cards}</div>
                     
                        
                        
                    <div className="statistics">
                        <div>{this.state.joker}</div>
                        <div>{this.state.joke}</div>
                        <button onClick={this.GetIp}>Get ip</button>
                  
                        <div>Your IP IS:{this.state.userip}</div>
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
              <div>{this.props.points}</div>      
              
              <button onClick={this.onVoteup}>+1 point</button>
              <button onClick={this.onVotedown}>-1 point</button>
              <button  onClick={this.onGetJoke}>get joke</button>
               
                </div>
            </div>
        )
       
        
    }
   
}

export default Cards;