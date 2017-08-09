console.log('Loaded!');
//change the text of the main-text div
var element=document.getElementById('main-text');
element.innerHTML="My New Value";
// Move the image
var img=document.getElementById('madi');
var marginLeft=o;
function moveRight()
{
   marginLeft=marginLeft+10;
   img.style.marginLeft=marginLeft+'px';
}
img.onclick=function()
{ 
   var interval=setinterval(moveRight, 100);
    
};