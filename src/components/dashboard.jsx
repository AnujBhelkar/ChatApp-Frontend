/******************************************************************************************
 * @Purpose     : To craete dashbord component for shoe the chats and user 
 * @file        : dashboard.jsx
 * @author      : Anuj
 * @since        18-05-2019
 *****************************************************************************************/
import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { chatServices, userChatArray } from "../services/chatService";
import AppBar from '@material-ui/core/AppBar';
import "../App.css";
/**
 * to import socket.io here and set the server port number
 */
import io from 'socket.io-client';
const socket = io.connect('http://localhost:5000');
export default class dashBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onlineUser: [],
            MsgArray: [],
            message: "",
            MsgDisplay: "",
            Receiver: '',
            Sender: '',
            msg: [],
        }
    }
    componentDidMount() {
        /**
         * Get all the users data
         **/
        chatServices()
            .then((result) => {
                this.setState({
                    onlineUser: result.data.result
                })
                console.log("users", result.data.result);
            })
            .catch((error) => {
                alert(error)
            });
        /**
         * Get all users chat history to display
         **/
        userChatArray()
            .then((result) => {
                this.setState({
                    MsgArray: result.data.result
                })
                console.log("chat history is :", this.state.MsgArray);
            })
            .catch((error) => {
                alert(error);
            });
       // const Sender = localStorage.getItem('Sender');
      
    }
    /**
     * it will takes the current typed message
     */
    handleMessage = (e) => {
        this.setState({ message: e.target.value });
    }
    /**
     * it will submit the send icon and display the message to selected user
     */
    handleSubmit = (event) => {
        event.preventDefault();
        /**
         * Get the sender who has login to the application
         **/
        const Sender = localStorage.getItem('Sender');
        this.setState({ Sender: Sender })
        console.log('Sender is :', Sender);
        console.log("Selected receiver: ", this.state.Receiver);
        //chatDisplay(Sender, this.state.Receiver, this.state.message);
        const data = {
            senderId: Sender,
            receiverId: this.state.Receiver,
            message: this.state.message,
        }
        console.log("All Data" , data)
        socket.emit('new_msg', data);
        //responce comes from server.js when you emit 
        socket.on('Sender', (res) => {
            console.log("responce in dash board========>", res);
            const msg = this.state.msg;
            msg.push(res);
            this.setState({ msg: msg });
            console.log("this set msg====>", this.state.msg);
        })
        this.setState({
            message: '',
            anchorEl: null
        });
    }
    /**
     * Takes the users list
     */
    handleClick = (key, event) => {
        this.setState({ anchorEl: null });
        let Receiver = event.target.textContent;
        this.setState({ Receiver: Receiver });
    };
    /**
     * redirect to login page
     */
    handleLogout = event => {
        event.preventDefault();
        this.props.props.history.push("/login");
    }
    render() {

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
            console.log("key.senderId === this.state.senderId", key.senderId === this.state.senderId);
            return (
                <div>
                    {key.senderId === this.state.Sender ?
                        (<div className="sender-div">
                            {/*<label></label>*/}
                            <div>{key.message}</div>
                        </div>)
                        : (<div className="receiver-div">
                            <label>{key.senderId}:</label>
                            <div>{key.message}</div>
                        </div>)
                    }
                </div>
            )
        })
        // console.log("Message is " , msg)
        // console.log("Message dis" , msgdis)
        return (
            <div>
                <div > 
                    <AppBar position="static" align="center" className = "appDiv"><h1>Welcome TO ChatApp..!!!</h1>
                        <div className = "logout">
                            <Button className="grow" color="inherit" onClick={this.handleLogout}>Logout</Button>
                        </div>         
                    </AppBar>
                </div>
                <div>
                <div className="userList">
                        <p><h4><u>user</u>:-{localStorage.getItem('Sender')}</h4></p>
                        <label><u>Users List:-</u></label>
                        <div>
                            {loginUsers}
                        </div>
                    </div>
                    <div className="msgDisplay">
                        <center>To:-  {this.state.Receiver}</center>
                        {msg}
                        {msgdis}
                     
                    </div>
                </div>
                <div className = "sendDiv">
                    <div className="containerButton">
                        <TextField
                            type="textfield"
                            value={this.state.message}
                            placeholder="Write a Message ................."
                            onChange={this.handleMessage}
                            variant="filled"
                            InputProps={{
                                disableUnderline: true
                            }}
                        />
                    </div>
                    <div className = "sendButton">
                        <Button
                            id="send"
                            type="submit"
                            variant="contained"
                            color="primary"
                            title="click on send"
                            onClick={this.handleSubmit}>
                            send
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}
