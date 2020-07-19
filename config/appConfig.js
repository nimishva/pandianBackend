let appConfig = {};

appConfig.port              = 3000;
appConfig.allowedCorsOrigin = "*";
appConfig.env               = "dev";
appConfig.db                = {  uri : 'mongodb://127.0.0.1:27017/pandianDb'};
appConfig.apiVersion        = '/api/v1';

module.exports = {

    port                : appConfig.port,
    db                  : appConfig.db,
    allowedCorsOrigin   : appConfig.allowedCorsOrigin,
    env                 : appConfig.env,
    apiVersion          :appConfig.apiVersion
}