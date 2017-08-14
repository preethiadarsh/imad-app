var express = require('express');
var morgan = require('morgan');
var path = require('path');

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
                ${date}
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

var counter=0;
app.get('/counter', function (req, res)
{
  counter=counter+1;
  res.send(counter.toString());
});


app.get('/:articleName', function (req, res)
{
  // articleName==article-one
  // articles[articleName]= { }content object of article-one
  var articleName=req.params.articleName;
  res.send(createTemplate(articles[articleName]));
  
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

var names=[];
app.get('/submit-name/name', function (req, res)
{
    // Get the name from the request
    var name; //ToDO
    names.push(name);
    
    res.send(names);//ToDo
  
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
