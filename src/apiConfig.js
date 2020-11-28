let apiUrl
const apiUrls = {
  production: 'https://warm-chamber-62945.herokuapp.com/',
  development: 'http://localhost:4741'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

// hack to access production api from localhost
// commment out or remove this line to access development api
// apiUrl = apiUrls.production

export default apiUrl
