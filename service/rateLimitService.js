const {
    findByUserAndIp,
    create,
    updateCount,
    resetWindow
} = require("../model/rateLimitModel")


const {
        findIp,
    createIp,
    UpdateIp,
    resetIp
} = require("../model/ipRateLimit")

const USER_LIMIT = 5;
const IP_LIMIT = 10;
const Window_ms = 60*1000;

const checkRateLimit = async(userId, ip)=>{
     const now = Date.now();

    let ipRecord = await findIp(ip);
        if(!ipRecord)
        {
            await createIp(ip)
            ipRecord = {request_count : 1, window_start : new Date()}
        }
        else{
            const ipWindowStart = new Date(ipRecord.window_start).getTime();
            if(now - ipWindowStart >Window_ms)
            {
                await resetIp(ipRecord.id)
                ipRecord.request_count = 1;
            }
            else{
                await UpdateIp(ipRecord.id, ipRecord.request_count+1)
                ipRecord.request_count +=1;
            }
        }   
    
        if(ipRecord.request_count> IP_LIMIT)
        {
            return false
        }
        
    let userRecord = await findByUserAndIp(userId,ip)


    if(!userRecord)
    {
        await create(userId,ip);
        userRecord = {request_count :1, window_start : new Date()}
    }
    else{
        
    const userWindowStart = new Date(userRecord.window_start).getTime();
     if(now - userWindowStart>Window_ms)
    {
        await resetWindow(userRecord.id);
        userRecord.request_count =1
    }
    else{
        
    await updateCount(userRecord.id,userRecord.request_count+1)
    userRecord.request_count +=1;
    }
    }

    if(userRecord.request_count >= USER_LIMIT)
    {
        return false;
    }


    
    return true;
    
}

module.exports= {checkRateLimit}
