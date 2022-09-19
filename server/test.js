import TrezSmsClient from 'trez-sms-client'
const client = new TrezSmsClient('rafshari', 'password@')

////////// ارسال پیامک کد تایید 
client
  .autoSendCode('09123595539', 'دیجی قطعه')
  .then((messageId) => {
    console.log('Sent Message ID: ' + messageId)
  })
  .catch((error) => console.log(error))

  //////      چک کردن کد دریافتی

client 
  .checkCode('mobile', 'code')
  .then((isValid) => {
    if (isValid) {
      console.log(
        'Code 595783 for this number 09123595539 is valid and verified.'
      )
    } else {
      console.log('Provided code for that number is not valid!')
    }
  })
  .catch((error) => console.log(error))
