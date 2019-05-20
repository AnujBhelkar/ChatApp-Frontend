/******************************************************************************************
 * @Purpose     : To craete dashbord component for shoe the chats and user 
 * @file        : dashboard.jsx
 * @author      : Anuj
 * @since        18-05-2019
 *****************************************************************************************/
import React, { Component } from 'react'
import '../App.css'
import {chatServices, userChatArray} from '../services/chatService'
import { AppBar, Button, TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem'
/**
 * import chart server io here and set the server port number
 */
import io from 'socket.io-client'
const socket = io.connect('http://localhost:5000');
export default class dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            onlineUser  : [],
            MsgArray    : [],
            MsgDisplay  : "",
            message     : "",
            Receiver    : "",
            Sender      : "",
            msg         : [],
        }
    }
    componentDidMount() {
        /**
         * Get All user Data
         */
        chatServices()
            .then((result) =>{
                this.setState({
                    onlineUser :result.data.result
                })
                console.log("user",result.data.result)
            })
            .catch((error) => {
                alert(error)
            });
        /**
         * Get all History to display
         */
        userChatArray()
            .then((result) => {
                this.setState({
                    MsgArray : result.data.result
                })    
                console.log("chat history is", this.state.MsgArray)
            })
            .catch((error) => {
                alert(error)
            })

                const Sender = localStorage.getItem('Sender');
                socket.on(Sender,(res) =>{
                console.log("Response in dashboard ===>",res)
                const msg = this.state.msg;
                msg.push(res)
                this.setState({msg : msg});
                console.log("this set message is ===>", this.state.msg)
                })
       
    }
        /**
         * It will take the current typed message
         */
        handleMessage =(e) =>{
            this.setState({message: e.target.value})
        }
        /**
         * it will submit the send icon and display the message to selected user
         */
        handleSubmit = (event) =>{
            event.preventDefault();
            /**
             * Get the sender Who has login to the application
             */
            const Sender =localStorage.getItem('Sender');
            this.setState({ Sender : Sender })
            console.log('Sender is ' + Sender)
            console.log('Selected Receiver is ' + this.state.Receiver )
            console.log("Message is :-" ,this.state.message)
            const data ={
                senderId : Sender,
                receiverId : this.state.Receiver,
                message     : this.state.message,
            }
            socket.emit('new_msg',data);
            console.log("All Data is ",data)
            this.setState({
                message : '',
                anchorE1 : null
            });
        }
            /**
             * Takes the user List
             */
            handleClick = (key,event)=>{
                this.setState({anchorE1 : null});
                let Receiver = event.target.textContent;
                this.setState({Receiver : Receiver});
            };
            /**
             * redirect to login page
             */
            handleLogout = event => {
                event.preventDefault();
                this.props.props.history.push("/login");
            }
        
    
  render() {
    //   const msg = this.state.MsgArray.map((key) => {
    //     return(
    //             <div>
    //                 {
    //                     key.senderId === localStorage.getItem('Sender') ? 
    //                     (
    //                         key.senderId === this.state.Receiver ? 
    //                         (
    //                             <div className = "sender-div">
    //                                 <label>{key.senderId}:</label>
    //                                 <div>{key.message}</div>
    //                             </div>  
    //                         )   : (null)
    //                     )   : (null) 
    //                 }
    //                 {
    //                     key.senderId === this.state.Receiver ? 
    //                     (
    //                         <div className = "receiver-div">
    //                             <label>{key.senderId} : </label>
    //                             <div>{key.message}</div>
    //                         </div>
    //                     ) : (null)
    //                 }
    //             </div>
    //         )
    //   })    
    //   const loginUsers = this.state.onlineUser.map((index) => {
    //       if(index.email !== localStorage.getItem('Sender')) {
    //           return(
    //               <MenuItem onClick = {(event) => this.handleClick(index,event)}>{index.email}</MenuItem>
    //           )
    //       }
    //       else{
    //           return  true;
    //       }
    //   })
    //   const msgdis = this.state.msg.map((key) => {
    //       console.log("key.senderId === this.state.senderId",key.senderId === this.state.senderId)
    //       return(
    //           <div>
    //             {
    //                 key.senderId === this.state.Sender ?
    //                 (
    //                     <div className = "sender-div">
    //                         <label>{key.senderId}</label>
    //                         <div>{key.message}</div>
    //                     </div>
    //                 ) : (
    //                     <div className = "recieve-div">
    //                         <label>{key.senderId}</label>
    //                         <div>{key.message}</div>
    //                     </div>
    //                 )
    //             }
    //           </div>
    //       )
    //   })





        const msg = this.state.MsgArray.map((key) => {
            return (
                <div >
                    {key.senderId === localStorage.getItem('Sender') ? (
                        key.senderId === this.state.Receiver ?
                            (
                                <div className="sender-div">
                                    <label>{key.senderId}:</label>
                                    <div>{key.message}</div>
                                </div>) : (null)
                    ) : (null)}
                    {key.senderId === this.state.Receiver ? (
                        <div className="receiver-div">
                            <label> {key.senderId}:</label>
                            <div>{key.message} </div>
                        </div>
                    ) : (null)
                    }
                </div>
            )
        })
        const loginUsers = this.state.onlineUser.map((key) => {
            if (key.email !== localStorage.getItem('Sender')) {
                return (
                    <MenuItem onClick={(event) => this.handleClick(key, event)}>{key.email}</MenuItem>
                )
            }
            else {
                return true;
            }
        })
        const msgdis = this.state.msg.map((key) => {
            console.log(key)
            console.log("key.senderId === this.state.senderId", key.senderId === this.state.senderId);
            return (
                <div>
                    {key.senderId === this.state.Sender ?
                        (<div className="sender-div">
                            <label>{key.senderId}:</label>
                            <div>{key.message}</div>
                            {/* <MenuItem >{key.senderId}:{key.message}</MenuItem> */}
                        </div>)
                        : (<div className="receiver-div">
                            <label>{key.senderId}:</label>
                            <div>{key.message}</div>
                        </div>)
                    }
                </div>
            )
        })

      console.log("messsss" , msg);
      console.log("messsssgggge" , msgdis);
    return (
      <div>
            <div className = "topHeading">                
                <AppBar position = "static" align = "center">
                <h1> Welcome TO Chat App</h1>
                    <div className = 'logout'>
                        <Button color = "inherit" onClick = {this.handleLogout} >Logout</Button>
                    </div>
                </AppBar>
            </div>
            <div>
                <div className = "userList">
                    <p><u>User</u> :- {localStorage.getItem('Sender')}</p>
                    <label><u>User List :- </u></label>
                    <div>
                        {loginUsers}
                    </div>
                </div>
                {/** Display Message on a Screen */}
                <div className = "msgDisplay">
                    <center>To :- {this.state.Receiver }</center>
                    {msg}
                    {msgdis}
                </div>
            </div>
            <div>
                <TextField
                    type = "textfield"
                    value = {this.state.message}
                    placeholder = "Write a Message Here...."
                    onChange = {this.handleMessage}
                    variant = "filled"
                    InputProps = {{
                        disableUnderline : true
                    }}
                />
            </div>
            <div>
                <Button
                id = "send"
                type = "submit"
                variant = "contained"
                color = "primary"
                title = "click on send"
                onClick = {this.handleSubmit}>
                send
                </Button>
            </div>
      </div>
    )
  }
}

