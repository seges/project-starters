var webpack = require("webpack");
var os = require("os");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var childProcess = require('child_process');

var PROD = process.env.NODE_ENV === "production" || false;
var ENV = process.env.PROJECT_ENV || "dev";

var projectConfig = require("./config/" + ENV);

var commitHash;
try {
    commitHash = childProcess.execSync('git rev-parse --short HEAD').toString();
} catch(e) {
    commitHash = "unable-to-get";
}

projectConfig.COMMIT_HASH = commitHash;

console.log("Project " + ENV + " Config: ", projectConfig);

var getHostIp = function() {
    var interfaces = {
        linux: ['eth0', 'wlan0', 'wlan1'],
        darwin: ['en0', 'en5'],
        win32: ['Ethernet', 'Wi-Fi']
    };

    var candidates = interfaces[os.platform()];
    var result = undefined;
    for(var i = 0; i < candidates.length; i++) {
        var candidate = candidates[i];
        var netInterface = os.networkInterfaces()[candidate];

        if(netInterface === undefined) {
            continue;
        }

        for(var j = 0; j < netInterface.length; j++) {
            var addr = netInterface[j];
            if(addr.family !== "IPv4") {
                continue;
            }

            if(result === undefined) {
                result = {ip: addr.address, iface: candidate};
            }
        }
    }

    if(result === undefined) {
        result = { ip: os.hostname(), iface: "unknown" };
    }

    console.log("Found Host IP = " + result.ip + ", interface = " + result.iface);
    return result.ip;
};


var plugins = [];

plugins.push(new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        PROJECT_CONFIG: JSON.stringify({
            PROJECT_ENV: ENV,
            API_URL: projectConfig.API_URL,
            COMMIT_HASH: projectConfig.COMMIT_HASH
        })
    }
}));

plugins.push(new webpack.NoErrorsPlugin());

if(PROD) {
    plugins.push(new webpack.optimize.DedupePlugin());

    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            dead_code: true,
            warnings: false
        },
        output: {
            comments: false
        }
    }));
}

module.exports = {
    context: path.join(__dirname, "src"),
    entry: {
        app: ["./javascript/index.js"]
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: PROD ? "[name].min.js" : "[name].js",
        chunkFilename: PROD ? "[id].[chunkhash].min.js" : "[id].[chunkhash].js",
        publicPath: projectConfig.INSTALLATION_PATH || "/"
    },
    module: {
        loaders: [
            { test: /\.js|\.tag$/, exclude: /node_modules/,  loaders: [ "babel?presets[]=react,presets[]=es2015&cacheDirectory" ] },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: plugins,
    debug: !PROD,
    devtool: 'source-map',
    devServer: {
        headers: { "Access-Control-Allow-Origin": "*" },
        contentBase: path.join(__dirname, "src"),
        host: getHostIp(),
        port: 3000
    }
};
