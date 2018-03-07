const isProdMode = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
  cdnUrl: isProdMode ? 'http://xxx.xxx.xxx' : '',
  baseUrl: isProdMode ? 'http://xxx.xxx.xxx' : 'http://localhost:3000/'
}
