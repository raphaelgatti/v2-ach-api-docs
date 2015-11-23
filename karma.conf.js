module.exports = function(config) {
    config.set({
        frameworks: [
            'mocha',
            'chai',
            'referee'
        ],

        files: [
            'source/_bower_components/jquery/dist/jquery.js',
            
            'source/_bower_components/dwolla-core-js/dist/js/core.js',
            'source/javascripts/dwolla/**/*.js',

            'source/javascripts/test/**/*.spec.js'
        ],

        browsers: ['PhantomJS'],

        client: {
            captureConsole: true
        }
    });
};
