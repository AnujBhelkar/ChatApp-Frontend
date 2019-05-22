/**
 * @Purpose : To create chat Service that will send incomming data to server and
 *            store the data into database
 * @file    : chatServices.js
 * @author  : Anuj
 * @since   : 18-05-2019
 */
import axios from 'axios'
var baseUrl = "http://localhost:5000";
/**
 * @param {* used to get all users data } data
 */
 export function chatServices(data){
     return axios(baseUrl + '/getAllUsers',
        {
            method : 'GET',
            data : data
        })
 }
 /**
 * @param {* used to get all chart data } data
 */
 export function userChatArray(data){
    return axios( baseUrl +'/getAllUserChat',
       {
           method : 'GET',
           data : data
       })
}
 /**
 * @param {* add message into database } data
 */
export function userAddMessage(data){
    return axios( baseUrl +'/addMessage',
       {
           method : 'Post',
           data : data
       })
}

