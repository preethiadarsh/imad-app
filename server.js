var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool= require('pg').Pool;

var config=
{
    user: 'preethiadarsh9700',
    database:'preethiadarsh9700',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
    
};
var pool= new Pool(config);
var app = express();
app.use(morgan('combined'));


function createTemplate (data)
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
                <a href='/'>Home</a>
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

app.get('/favicon.ico', function (req, res) {

  res.sendFile(path.join(__dirname, 'ui', 'favicon.ico'));

});

app.get('/', function (req, res)
{
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


app.get('/test-db', function (req, res)
{
  // make a select request
  // return a response with the results
  pool.query('SELECT * FROM test', function(err, result)
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

app.get('/ui/main.js', function (req, res)
{
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});




