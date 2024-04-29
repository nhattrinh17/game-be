module.exports = {
  apps: [
    {
      name: 'game-be-main',
      script: 'dist/main.js',
      // autorestart: true,
      // watch: ['dist'],
      instances: 3,
      env: {
        NODE_ENV: 'development',
        PORT: 9990,
      },
    },
  ],
};
