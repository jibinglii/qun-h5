// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import http from '$utils/http'

// send login data and retrive a new token
export const getProtocol = (name) => {
  return http.get('/api/v1/games/protocol/' + name)
}
