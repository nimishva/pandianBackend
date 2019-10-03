//API Response generation Library
let resGenerate = (err,msg,status,data) => {

        let response = {

            error   : err,
            message : msg,
            status  : status,
            data    : data
        }

        return response;


}; //Response generation function ends here

module.exports = {
    generate:resGenerate
};