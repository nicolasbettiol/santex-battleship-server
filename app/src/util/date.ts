import moment = require('moment');

const FORMAT_DATE  = 'MM-DD-YYYY hh:mm';

function getDate(){
    return  moment().format('MM-DD-YYYY hh:mm');
};
export { getDate };