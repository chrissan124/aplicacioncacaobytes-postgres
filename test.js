const { DateTime } = require('luxon')
const { sendEmail } = require('./src/app/common/services/mailer/mailer')

const date = DateTime.fromSeconds(1631920814)
const currrentDate = DateTime.now()
console.log(date.toString() < currrentDate.toString())
console.log(currrentDate.minus({ minutes: 5 }).toString())
/*
  < -> antes
  > -> despues
*/

/* MAILER TEST */
try {
  /*const thing = '2021-09-10T22:19:29.815Z'
  const badDate = DateTime.fromISO(thing)
  console.log('valid', badDate.toLocaleString())*/
  sendEmail('luiscasm2501@gmail.com', 'Testing', 'register', {
    user: { firstName: 'Luisito', url: 'www.google.com' },
  })
} catch (error) {
  console.log('whoooops', error.message)
}
