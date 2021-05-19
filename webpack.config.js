const { merge } = require('webpack-merge');
const { Common } = require('./webpack-parts/webpack.common');
const { Development } = require('./webpack-parts/webpack.development');
const { production } = require('./webpack-parts/webpack.production');


const mode = process.env.NODE_ENV;

/** @type { import('webpack').Configuration } */

const modes = {
    'production': merge(Common(), production(), { mode }),
    'development': merge(Common(), Development(), { mode }),
}

const getConfig = (mode) => {
   return modes[mode];
};

module.exports = getConfig(mode);