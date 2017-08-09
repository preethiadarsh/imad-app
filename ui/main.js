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
img.onClick=function()
{ 
   var interval=setInterval(moveRight, 100);
    
};