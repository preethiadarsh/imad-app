// counter code
var button=document.getElementById('counter');
//var counter=0;
button.onclick=function()
{
    //Create a request object
    var request=new XMLHttpRequest();
    //Capture the response and store it in a variable
    request.onreadystatechange=function()
    {
        if (request.readyState===XMLHttpRequest.DONE)
        {
            //Take some action
            if (request.status===200)
            {
                var counter=request.responseText;
                var span=document.getElementById('count');
                span.innerHTML=counter.toString();
            }
        }
        // Not done yet
    };
    
   //Make the Request
   request.open('GET', "http://preethiadarsh9700.imad.hasura-app.io/counter", true);
   request.send(null);
};    

//Submit name

var submit=document.getElementById('submit_btn');
submit.onclick=function()
{
   //Create a request object
    var request=new XMLHttpRequest();
    //Capture the response and store it in a variable
    request.onreadystatechange=function()
    {
        if (request.readyState===XMLHttpRequest.DONE)
        {
            //Take some action
            if (request.status===200)
            {
                //var counter=request.responseText;
               // var span=document.getElementById('count');
               // span.innerHTML=counter.toString();
               var names=request.responseText;
               names=JSON.parse(names);
                var list='';
                for (var i=0; i<names.length; i++)
                    { 
                    list+= '<li>' + names[i] + '</li>';
        
                    }
    
    var ul=document.getElementById('namelist');
    ul.innerHTML=list;
            }
        }
        // Not done yet
    };
    // Make a request to the Server and send the name
    //Make the Request
    var nameInput=document.getElementById('name');
    var name=nameInput.value;
   request.open('GET', "http://preethiadarsh9700.imad.hasura-app.io/submit-name?name=" + name, true);
   request.send(null);
    // Capture the response, ie., the list of names and render it as a list
    
};













//*Earlier Program code
//console.log('Loaded!');
//change the text of the main-text div
//var element=document.getElementById('main-text');
//element.innerHTML="My New Value";
// Move the image
//var img=document.getElementById('madi');
//var marginLeft=0;
//function moveRight()
//{
//   marginLeft=marginLeft+1;
//   img.style.marginLeft=marginLeft+'px';
//}
//img.onclick=function()
//{ 
 //  var interval=setInterval(moveRight, 50);
    
//};
//