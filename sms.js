import schedule from 'node-schedule';
import twilio from 'twilio';

const accountSid = 'YOUR TWILLO ACCOUNT SID';
const authToken = 'YOUR TWILLO AUTH TOKEN';
const twilioNumber = 'YOUR TWILLO NUMBER';

module.exports.createSms = function(date, to, body){
    let client = new twilio(accountSid, authToken);

    schedule.scheduleJob(date, function(){
        client.messages.create({
            to: to,
            from: twilioNumber,
            body: body,
        }).then(msg => {
            return true;
        });
    });
}