import { Message } from "element-ui";


export default function({$axios}){
    $axios.onError(res=>{
        var {statusCode,message} = res.response.data;
        if(statusCode === 400){
            Message.error(message)
        }
    })
}