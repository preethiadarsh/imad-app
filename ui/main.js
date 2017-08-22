

//Submit username/ password to login

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
                //Capture a list of names and render it as a list
              console.log('User is logged in');
              alert('Logged in Successfully');
            }
            else if (request.staus===403)
            { 
               alert('Username/Password is incorrect'); 
            }
            else if (request.staus===500)
            { 
               alert('Something went wrong in the server'); 
            }
        }
        // Not done yet
    };
    // Make a request to the Server and send the name
    //Make the Request
    var username=document.getElementById('username').value;
    var password=document.getElementById('password').value;
    console.log(username);
    console.log(password);
    
   request.open('POST', "http://preethiadarsh9700.imad.hasura-app.io/login", true);
   request.setRequestHeader('Content-Type', 'application/json');
   request.send(JSON.stringify({username:username, password:password}));
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