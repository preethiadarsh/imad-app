var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool= require('pg').Pool;
var crypto=require('crypto');
var bodyParser = require('body-parser');
var config=
{
    user: 'preethiadarsh9700',
    database:'preethiadarsh9700',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
    
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

function createTemplate(data)
    {
     var title=data.title;
     var heading=data.heading;
     var date=data.date;
     var content=data.content;


   
    var htmlTemplate=
    `
    <html>
        <head>
            <title>
 
            ${title}
            
            </title>
            
              <link href="/ui/style.css" rel="stylesheet" />
            
        </head>
        <body>
            <div class="container">
                
           
            <div>
                <a href="/">Home</a>
            </div>
            <hr>
             
             <h3>
                 ${heading}
            </h3>
                 
            <div>
                ${date.toDateString()}
            </div>
            <div>
                ${content}
            </div>   
             </div>
        </body>
    </html>
    `;
    return htmlTemplate;
    }


app.get('/', function (req, res)
{
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input, salt)
{
    //how do we create a hash function
    var hashed=crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
    //algoritm: md5
    //"password" -> jdu3eiwwl4scmdk54lwdk6edqmv8nhd
    //"password-this-is-some-random-string" -> kjdidle98dlleo30elmbndkf74
    //"password+salt" -> hash1 -> hash2 -> hash3-> ..... hash10ktimes
    //
    //
    
}


app.get('/hash/:input', function (req, res)
{
    var hashedString=hash(req.params.input, 'this-is-some-random-string');
    res.send(hashedString);
});

app.post('/create-user', function(req, res)
{
    // username, password
    // {"username": "siva", "password": "password"}
    // JSON
    var username = req.body.username;
    var password = req.body.password;
    var salt=crypto.randomBytes(128).toString('hex');
    var dbString=hash(password, salt);
    pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result)
    {
       if (err)
      {
          res.status(500).send (err.toString());
      }
      else
      { 
          res.send("User Successfully Created with Username:" + username);
      } 
    });
});

app.post('/login', function(req, res)
{
    
    // JSON
    var username = req.body.username;
    var password = req.body.password;
   
    pool.query('SELECT * FROM "user" WHERE username=$1', [username],  function (err, result)
    {
       if (err)
      {
          res.status(500).send (err.toString());
      }
      else
      {
          if (result.rows.length===0)
          {
          res.send(403).send('username/password is invalid');
          }
          else
          {
              // Match the Password
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password, salt); 
              // Creating a hash based on the password submitted and original salt
              if (hashedPassword===dbString)
              {
                  res.send('Credentials correct');
                  
                  // Set a Session
                  
              }
              else
              {
                 res.send('username/password is invalid');
              }
          }
      }
      { 
          res.send("User Successfully Created with Username:" + username);
      } 
    });
});

var pool= new Pool(config);
app.get('/test-db', function (req, res)
{
  // make a select request
  // return a response with the results
  pool.query("SELECT * FROM test", function(err, result)
  {
      if (err)
      {
          res.status(500).send (err.toString());
      }
      else
      { 
          res.send(JSON.stringify(result.rows));
      }
});
});

var counter=0;
app.get('/counter', function (req, res)
{
  counter=counter+1;
  res.send(counter.toString());
});
var names=[];
app.get('/submit-name', function (req, res)
{
    // URL:/submit-name?name=xxxxx
    // Get the name from the request
    var name= req.query.name; //ToDO
   names.push(name);
    //JSON:JavaScript Object Notation
    
   res.send(JSON.stringify(names)); //ToDo


  
});
var  articles=[];
app.get('/articles/:articleName', function (req, res)
{
  // articleName==article-one
  // articles[articleName]= { }content object of article-one
   
 //'SELECT * FROM article WHERE title='article-one' 
  pool.query("SELECT * FROM article WHERE title=$1", [req.params.articleName], function (err,result)
  {
      if(err)
      {
          res.status(500).send (err.toString());
      }
      else
      {
          if (result.rows.length===0)
          {
              res.status(404).send('Article Not Found'); 
          }
          else
          {
              var articleData=result.rows[0];
              res.send(createTemplate(articleData));
          }
      }
      { 
         
      }
  });
 
  
});

app.get('/ui/style.css', function (req, res)
{
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res)
{
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


var port = 80;
app.listen(port, function ()
{
  console.log(`IMAD course app listening on port ${port}!`);
});



