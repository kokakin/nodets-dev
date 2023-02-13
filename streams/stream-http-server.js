import http from 'node:http'

import { Transform } from 'node:stream';

class InvertNumberStream extends Transform {

  _transform(chunk, encoding, callback) {

    const transformed = -1 * Number(chunk.toString());

    console.log(transformed);
    
    callback(null, Buffer.from(String(transformed)));

  }

};

// Request => Readable Stream
// Response => Writable Stream

const server = http.createServer(async (request, response) => {

  const buffers = [];


  for await (const chunk of request) {

    buffers.push(chunk);

  }

  const fullStreamContent = Buffer.concat(buffers).toString();
  
  console.log(fullStreamContent);

  return response.end(fullStreamContent);


  // return request
  //   .pipe(new InvertNumberStream())
  //   .pipe(response);

});

server.listen(6970);
