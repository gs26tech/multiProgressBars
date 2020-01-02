 window.onload=function pageload(){
     getEndPoints();
}


function getEndPoints(){
    try{
     fetch ('http://pb-api.herokuapp.com/bars')
    //fetch('endPoints.json')  
    .then(function  (res){
        if(!res.ok){
            throw Error ("page is temporarily unavailable");
        }
        
        return res.json();

    })
    .then(function(data){


       maxWidth = data.limit;
        var i;

        //check whether max number of buttons is ristricted
        var btnCount = data.buttons.length;
        if(data.IsMaxBarBtn){
        if(btnCount>6){
            btnCount=6;
        } else btnCount;
        }
        
        //create dynamic buttons
        for(i=0;i<btnCount;i++){
            var btn = document.createElement("button");
           btn.id = "btn"+[i];
           btn.className = "actionBtn";
           btn.innerHTML= data.buttons[i];
           btn.onclick = function(){btnAction(this.innerHTML);}
           document.getElementById('allButtonsContainer').appendChild(btn);
        }
         
        //check whether max number of bars is ristricted
        var barCount = data.bars.length;
        if(data.IsMaxBarBtn){ 
            if(barCount>5){
            barCount=5;
        } else barCount;}
        
        //create dynamic bars
        for(i=0;i<barCount;i++){
        document.getElementById('allBarsContainer').innerHTML += `<div id="progressContainer"><span class="value"></span><div class="progress">
        </div></div>`
        setWidth(data.bars[i],i);
        setColor(data.bars[i],i);

        //crete dynamic dropdown items
        var select = document.getElementById('dropdown');
        var seq = i;
        seq++;
        var option = document.createElement("option"),txt = document.createTextNode("#Progress"+seq);
        option.appendChild(txt);
        option.setAttribute("value", seq);
        select.insertBefore(option,select.lastChild);
        }    
    });
}catch(e){
    console.log(e);
    alert(e)
}
}


//on button click action
function btnAction(btn){
   actionValue = parseFloat(btn);
   var pbCurrIndex= getSelectedValue();
   var oldWidth = parseFloat(getComputedStyle( document.getElementsByClassName('progress')[pbCurrIndex]).getPropertyValue('width'));
   var container = parseFloat(getComputedStyle(document.getElementById('progressContainer')).getPropertyValue('width'));
   var newWidth = Math.round(((oldWidth * 100 )/container) + (actionValue));
   setWidth(newWidth,pbCurrIndex);
   setColor(newWidth,pbCurrIndex);
}

// To get select dropdown value
function getSelectedValue(){
    var pbCurrIndex=0;
    var dd = document.getElementById('dropdown').value;
    pbCurrIndex= dd-1;
    return pbCurrIndex;
 } 

 //To get color for progress bar
 function setColor(width, currIndex){
     var color;
    if(width>100){
       color= "#f39c12"
       }else if(width<=100){
        color ="#2980b9" 
       } else if (width=0){
        color = "#f5f5f5"
       }
       document.getElementsByClassName('progress')[currIndex].style.setProperty("background-color",color)
 }

 // To get innet HTML and width of progress bar
 function setWidth(width,currIndex){
     if(width<0){
         width = 0;
     }else if (width>maxWidth){
         width=maxWidth;
     }else width;

     document.getElementsByClassName('progress')[currIndex].style.setProperty("width",width +"%");
     document.getElementsByClassName('value')[currIndex].innerHTML= width + "%";
     }
     
 

     
     
