// Initial Server
const http = require('http')

const testObject = [
    { id: 1, text: "justin" },
    { id: 2, text: "luke" },
    { id: 3, text: "ava" }
]

const server = http.createServer((req, res) => {

    // Exploring the req object

    // console.log(req); // Returns the entire req object
    console.log("This is 'Object.keys(req)'", Object.keys(req)); // Returns all the keys in the req object
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

    // Consolidate response with writeHead
    res.writeHead(200, "This Worked!", {
        'Content-Type': 'application/json',
        'X-Powered-By': 'Node.js'
    });

    // res.write('hello')  //respond back with 'hello'
    // res.end(); //tells the app that this is the end!
    res.end( //if you have a single response you can put it in res.end. 
        JSON.stringify({//turns our object into a json object (try this without JSON.stringify, you get an error)
        success: true, 
        data: testObject
        })
    );
});        


const PORT = 5000; 

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));



/* var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello World!');
    res.end();
}).listen(8080); */
