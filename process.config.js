module.exports = {
    apps: [{
        name: "iteck",
        script: "./server.js",
        watch: true,
        env: {
            "NODE_ENV": "development",
        },
        env_production: {
            "NODE_ENV": "production"
        },
        instances: 2,
        exec_mode: "cluster"
    }]
}