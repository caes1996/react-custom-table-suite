module.exports = {
  presets: [
    ['@babel/preset-env', { modules: false }],
    ['@babel/preset-react', { 
      runtime: 'classic' // Cambiar a classic para requerir imports explícitos
    }]
  ],
  env: {
    test: {
      presets: [
        '@babel/preset-env',
        '@babel/preset-react'
      ]
    }
  }
};