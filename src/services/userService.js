/**
 * @Purpose     : To create for get the data from front send pass to the server for storing
 * @file        : userService.js
 * @author      : Anuj
 * @version     : v0.1
 * @since       : 16-05-2019
 */

import axios from 'axios'
var baseUrl = "http://localhost:5000";
/**
 * @param {* used to send register Data to Server} data
 */

export function userRegister(data){
    return axios.post(baseUrl+'/register/',data);
}

/**
 * @param {* send login Data to Server} data
 */

export function userLogin(data){
    console.log("data in services ",data)
    return axios.post(baseUrl+'/login',data);
}
