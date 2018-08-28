let env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
    let config = require('./../config.json');
    let envConfig = config[env];
    console.log('env ****', env);
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}