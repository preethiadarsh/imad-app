var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool= require('pg').Pool;
var pool= new Pool(config);
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

var articles=
{


    'article-one':
    {
        title: 'Article One: By M.Sivakumar',
        heading: 'Article One',
        date: '06 SEP 2017',
        content:
        `<p>
        This is Para-1 of Article One. 
        </p>
        <p>
        This is Para-2 of Article One. 
        </p>
        <p>
        This is Para-3 of Article One. 
        </p>`
    },

    'article-two':
    {
        title: 'Article Two: By M.Sivakumar',
        heading: 'Article Two',
        date: '07 SEP 2017',
        content:
        `<p>
        This is Para-1 of Article Two. 
        </p>
        <p> 
        This is Para-2 of Article Two. 
        </p>
        <p>
        This is Para-3 of Article Two. 
        </p>`
    },

    'article-three':
    {
        title: 'Article Three: By M.Sivakumar',
        heading: 'Article Three',
        date: '08 SEP 2017',
        content:
        `<p>
        This is Para-1 of Article Three. 
        </p>
        <p> 
        This is Para-2 of Article Three. 
        </p>
        <p>
        This is Para-3 of Article Three. 
        </p>`
    }
};

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

// following code is for request with variable 'name' passed on to server
//app.get('/submit-name/:name', function (req, res)
//{
    // Get the name from the request
 //   var name= req.params.name; //ToDO
 //   names.push(name);
    //JSON:JavaScript Object Notation
    
 //   res.send(JSON.stringify(names)); //ToDo
  
});

app.get('/articles/:articleName', function (req, res)
{
  // articleName==article-one
  // articles[articleName]= { }content object of article-one
   
 //'SELECT * FROM article WHERE title='article-one' 
  pool.query("SELECT * FROM article WHERE title='" + req.params.articleName+"'"), function (err,result)
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
          //res.send(JSON.stringify(result.rows));
      }
  };
  //res.send(createTemplate(articleData));
  
});

app.get('/ui/style.css', function (req, res)
{
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res)
{
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res)
{
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

//var names=[];

//app.get('/submit-name', function (req, res)
//{
    // URL:/submit-name?name=xxxxx
    // Get the name from the request
   // var name= req.query.name; //ToDO
  // names.push(name);
    //JSON:JavaScript Object Notation
    
   //res.send(JSON.stringify(names)); //ToDo

// following code is for request with variable 'name' passed on to server
//app.get('/submit-name/:name', function (req, res)
//{
    // Get the name from the request
 //   var name= req.params.name; //ToDO
 //   names.push(name);
    //JSON:JavaScript Object Notation
    
 //   res.send(JSON.stringify(names)); //ToDo
  
//});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
//console.log(`IMAD course app listening on port ${port}!`);
});



