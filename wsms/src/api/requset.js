/**
 * 封装axios
 * 携带token
 * 
 */
import axios from 'axios';
import qs from  'qs';
import { promises, realpath } from 'fs';
import { resolve } from 'path'
//设置默认根目录==服务端地址
axios.defaults.baseURL = 'http://127.0.0.1:666';

//设置请求拦截  在发送axios之前携带token 请求头


//封装方法
export default{
    get(url,params={}){
        return new Promise((resolve,reject)=>{
            axios.get(url,{params})
                 .then(response=>{
                     resolve(response.data);//返回数据
                 })
                 .catch(err=>{
                     reject(err);
                 })
        })
    },
    post(url,params={}){
        return new Promise((resolve,reject)=>{
            axios.post(url,qs.stringify(params))
                .then(response=>{
                    resolve(response.data);
                })
                .catch(err=>{
                    reject(err);
                })
        })
    }
}


