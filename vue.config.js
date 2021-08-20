module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/nova_tasks' : '/',
  pwa: {
    name: 'Nova Tasks',
    themeColor: '#212731',
    display: 'standalone',
    backgroundColor: '#212731'
  }
}
