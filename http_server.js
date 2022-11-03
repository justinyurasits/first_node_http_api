// Initial Server
const http = require('http');

const testObject = [
  { id: 1, text: 'justin' },
  { id: 2, text: 'luke' },
  { id: 3, text: 'ava' },
];

const server = http.createServer((req, res) => {
  // Exploring the req object

  // console.log(req); // Returns the entire req object
  // console.log("This is 'Object.keys(req)'", Object.keys(req)); // Returns all the keys in the req object
  // console.log(Object.values(req)); // Returns all the values  in the req object
  // console.log(req._readableState); // Returns all values for a given key
  // console.log(req._readableState.buffer.head); // Returns value of buffer within _readable state
  // console.log(Object.keys(Object.values(req))); // Returns all the values in the req object
  // const { headers, url, method } = req;  // deconstructs req object into three defined variables
  // console.log(headers, url, method)

  // Setting basic responses
  // res.setHeader('Content-Type', 'text/plain')  // set the header content type to text
  // res.statusCode = 200;
  // res.setHeader('Content-Type', 'application/json'); // set header content type to json
  // res.setHeader('X-Powered-By', 'Node.js')  // return in the header your server type

  // Assign the incoming data to 'body' and turn the data into a string.
  const { method, url } = req;

  // Define an array to store your incoming data
  let body = [];

  req
    .on('data', (chunk) => {
      //console.log(chunk.toString());
      body.push(chunk); // chunk could be multiple arrays?
      //console.log(body.toString());
    })
    .on('end', () => {
      body = Buffer.concat(body).toString(); //this takes the multiple arrays and concats them?
      let status = 404;

      // Response object base definition
      const response = {
        success: false,
        data: null,
        response: null,
      };

      // GET response
      if (method === 'GET' && url === '/items') {
        status = 200;
        response.success = true;
        response.data = testObject;

        // use POST to add an KVP to testObject & respond to request with the object
      } else if (method === 'POST' && url === '/items') {
        const { id, text } = JSON.parse(body);
        console.log(body);
        console.log(JSON.parse(body));

        // Validate the incoming json data
        if (!id || !text) {
          //Send a failure status code if this is true
          status = 400;
          response.response = 'Please use correct data format';

          // If data is good, then push incoming data to testObject
        } else {
          testObject.push(JSON.parse(body));
          status = 201;
          response.success = true;
          response.data = testObject;
        }
      }

      // Consolidate response with writeHead
      res.writeHead(status, {
        'Content-Type': 'application/json',
        'X-Powered-By': 'Node.js',
      });

      // res.end(); //tells the app that this is the end!
      res.end(
        //if you have a single response you can put it in res.end.
        JSON.stringify(response) //turns our object into a json object (try this without JSON.stringify, you get an error)
      );
    });
});

const PORT = 5001;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/* var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello World!');
    res.end();
}).listen(8080); */
