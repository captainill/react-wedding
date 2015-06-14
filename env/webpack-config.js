import config from './config';


let file = config.environment === 'production' ? '.production' : '.dev';


export default require(`../webpack.config${file}`);
