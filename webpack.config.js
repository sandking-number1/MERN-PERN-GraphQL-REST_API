module.exports = {
    entry: './server-rest/app/index.js',
    output: {
        path: __dirname + '/server-rest/public', 
        filename: 'bundle.js'
    },
    module: {
    	rules: [
    		{
    			use: 'babel-loader',
    			test: /\.js$/,
    			exclude: /node_modules/
    		},

    		{
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
    	]
    }
};