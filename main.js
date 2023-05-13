// AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] = 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
// GET REQUEST
function getTodos() {
    // axios({
    //     method: 'get',
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     params: {
    //         _limit: 5
    //     }
    // })
    //     .then(res => showOutput(res))
    //     .catch(err => console.log(err))

    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5', {timeout: 5000})
    .then(res => showOutput(res))
    .catch(err => console.error(err))
  }
  
  // POST REQUEST
  function addTodo() {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: 'New Todo',
        body: 'new sentences',
        completed: false
    })
        .then(res => showOutput(res))
        .catch(err => console.log(err))
  }
  
  // PUT/PATCH REQUEST
  function updateTodo() {
    axios.patch('https://jsonplaceholder.typicode.com/todos/1', {
        title: 'Updated Todo',
        completed: true
    })
        .then(res => showOutput(res))
        .catch(err => console.log(err))
  }
  
  // DELETE REQUEST
  function removeTodo() {
    axios.delete('https://jsonplaceholder.typicode.com/todos/1')
        .then(res => showOutput(res))
        .catch(err => console.log(err))
  }
  
  // SIMULTANEOUS DATA
  function getData() {
    axios.all([
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
        axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
    ])
    .then(axios.spread((todos, posts) => showOutput(posts)))
    .catch(err => console.error(err))
  }
  
  // CUSTOM HEADERS
  function customHeaders() {
const config ={
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'sometoken'
    }
}
    axios.post('https://jsonplaceholder.typicode.com/todos', {
        title: 'New Todo',
        completed: false
    }, config)
        .then(res => showOutput(res))
        .catch(err => console.log(err))
  }
  
  // TRANSFORMING REQUESTS & RESPONSES
  function transformResponse() {
    const options = {
      method: 'post',
      url: 'https://jsonplaceholder.typicode.com/todos',
      data: {
        title: 'hello world'
      },
      transformResponse: axios.defaults.transformResponse.concat(data =>{
        data.title = data.title.toUpperCase();
        return data;
      })
    };
    axios(options).then(res => showOutput(res))
  }
  
  // ERROR HANDLING
  function errorHandling() {
    axios.get('https://jsonplaceholder.typicode.com/todoss'
    //  , {
    //     validateStatus: function(status){
    //         return status < 500;
    //     }
    // }
    )
    .then(res => showOutput(res))
    .catch(err => {
        if(err.response){
            console.log(err.response.data);
            console.log(err.response.status);
     -       console.log(err.response.headers);

            if(err.response.status === 404){
                alert('error: page not found')
            }
            else if(error.request){
                console.error(err.request)
            }
            else{
                console.error(err.message)
            }
        }
    })
  }
  
  // CANCEL TOKEN
  function cancelToken() {
    const source = axios.CancelToken.source();

    axios
    .get('https://jsonplaceholder.typicode.com/todos', {
        cancelToken: source.token
    })
    .then(res => showOutput(res))
    .catch(thrown => {
        if(axios.isCancel(thrown)){
         console.log('request  cancelled', thrown.message)
        }
    })
    if(true) {
        source.cancel('request cancelled!')
    }
  }
  
  // INTERCEPTING REQUESTS & RESPONSES
  axios.interceptors.request.use(config =>{
    console.log(`${config.method.toUpperCase()} request sent to ${config.url
    } at ${new Date().getTime()}`);
    return config;
  }, error => {
    return Promise.reject(eerror);
  })

  // AXIOS INSTANCES
  const axiosInstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com"
  })

//   axiosInstance.get('/comments').then(res => showOutput(res))
  
  // Show output in browser
  function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }
  
  // Event listeners
  document.getElementById('get').addEventListener('click', getTodos);
  document.getElementById('post').addEventListener('click', addTodo);
  document.getElementById('update').addEventListener('click', updateTodo);
  document.getElementById('delete').addEventListener('click', removeTodo);
  document.getElementById('sim').addEventListener('click', getData);
  document.getElementById('headers').addEventListener('click', customHeaders);
  document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
  document.getElementById('error').addEventListener('click', errorHandling);
  document.getElementById('cancel').addEventListener('click', cancelToken);


//   Ans (1) => Headers are like a meta data,or the key: value pair which talks about the request we have made to the server, or the extra information about the transferred data. There are generally two types of headers Request and Response headers which further have sub-parts called as representational headers. Request headers are the http request made to the server to get some information while the response headers are made by the server to the client with some response which generally gives the extra information about the data.


// Ans (2) => Axios are promise based HTTP client , axios are kind of library or tool which helps us to communicate with server. It can we compared as the advanced version of fetch(). There are many methods in axios :- POST, GET, PUT/PATCH, DELETE, ERROR HANDLING. 


// Ana (3) => First common mistake is wrong URL base, in which the server won't be able to understand the url base.

// Other mistake can be like body problem while using POST method.