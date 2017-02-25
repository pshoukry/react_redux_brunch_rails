// See http://brunch.io for documentation.
exports.config = {
  files: {
    javascripts: {joinTo: 'javascripts/app.js'},
    stylesheets: {joinTo: 'stylesheets/app.css'}
  },
  paths: {
    public: '../app/assets/'
  },
  plugins: {
    babel: {presets: ['latest', 'react', 'stage-2']}
  },
  overrides: {
    production: {
      optimize: true,
      sourceMaps: false,
      plugins: {autoReload: {enabled: false}}
    }
  }
};
