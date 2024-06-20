//Práctica server usando POST

const servidor = require('http');

const server = servidor.createServer((req, res) => {
    
    console.log('Incoming Request');
    console.log(req.method, req.url);

    if (req.method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            console.log(chunk);
            body += chunk;
        });

        req.on('end', () => {
            
            let userData = body.split('&');
            let userName = decodeURIComponent(userData[0].split('=')[1]);
            let password = decodeURIComponent(userData[1].split('=')[1]); 

            res.setHeader('Content-Type', 'text/html');
            res.end(`<p>Username: ${userName}</p><p>Password: ${password}</p>`); 
       
         
        });
    }
    
    else {
        res.setHeader('Content-Type', 'text/html');
    
        res.end(`<form method="POST">
                    <label for="username">Username: </label>
                    <input type="text" name="username"></input>

                    <br>

                    <label for="password">Password: </label>
                    <input type="text" name="password"></input>

                    <br>

                    <button type="submit">Create User</button></form>`
                );    
    }
});

server.listen(5001);