 window.onload=function pageload(){
     getEndPoints();
     //addBars(4);
     //addButtons(a);
}

function getEndPoints(){
    //fetch ('https://agiledev.ncs.com.sg/DemoAPI/rest/barInputs/GetProgressBarsInput')
    fetch('endPoints.json')
    .then(function  (res){
        return res.json();
    })
    .then(function(data){
        console.log(data);
        const maxWidth = data.limit;
        var i;
        var btnCount = data.buttons.length;
       /* if(btnCount>6){
            btnCount=6;
        } else btnCount;*/

        for(i=0;i<btnCount;i++){
            var btn = document.createElement("button");
           btn.id = "btn"+[i];
           btn.className = "actionBtn";
           btn.innerHTML= data.buttons[i];
           console.log(data.buttons[i]);
           //btn.addEventListener('click', function(){btnAction(this.innerHTML)} )
           btn.onclick = function(){btnAction(this.innerHTML);}
           document.getElementById('allButtonsContainer').appendChild(btn);
           //document.getElementsByClassName('actionBtn')[i].innerHTML= data.buttons[i];
        }

        var barCount = data.bars.length;
       /* if(barCount>5){
            barCount=5;
        } else barCount;*/

        for(i=0;i<barCount;i++){
            document.getElementById('allBarsContainer').innerHTML += `<div id="progressContainer"><div class="progress">
            <span class="value"></span></div>`
            document.getElementsByClassName('progress')[i].style.setProperty("width",data.bars[i]+"%");
            document.getElementsByClassName('value')[i].innerHTML= data.bars[i]+"%";

            var select = document.getElementById('dropdown');
            var seq = i;
            seq++;
            var option = document.createElement("option"),txt = document.createTextNode("#Progress"+seq);
            option.appendChild(txt);
            option.setAttribute("value", seq);
            select.insertBefore(option,select.lastChild);
        }
        
    });
}

function btnAction(btn){
    actionValue = parseFloat(btn);
   //var maxWidth=160;
   console.log(actionValue);
   var pbCurrIndex= getSelectedValue();
   var oldWidth = parseFloat(getComputedStyle( document.getElementsByClassName('progress')[pbCurrIndex]).getPropertyValue('width'));
   var container = parseFloat(getComputedStyle(document.getElementById('progressContainer')).getPropertyValue('width'));
   var newWidth = Math.round(((oldWidth * 100 )/container) + (actionValue));
   
   if(newWidth<=0){
       newWidth = 0;
   } else if(newWidth>=160){
       newWidth=160;
   }else newWidth;

   document.getElementsByClassName('progress')[pbCurrIndex].style.setProperty("width",newWidth+"%");
   document.getElementsByClassName('value')[pbCurrIndex].innerHTML= newWidth + "%";
   
   if(newWidth>100){
    document.getElementsByClassName('progress')[pbCurrIndex].style.setProperty("background-color","#f39c12")
   }else if(newWidth<=100){
    document.getElementsByClassName('progress')[pbCurrIndex].style.setProperty("background-color","#2980b9") 
   }
}

function getSelectedValue(){
    var pbCurrIndex=0;
    var dd = document.getElementById('dropdown').value;
    pbCurrIndex= dd-1;

    /*switch(dd){
        case 'p1' :
            pbCurrIndex=0;
            break;
         case 'p2' :
             pbCurrIndex=1;
             break; 
         case 'p3' :
               pbCurrIndex=2;
               break; 
         case 'p4' :
               pbCurrIndex=3;
                break;  
    }*/
    return pbCurrIndex;
 } 

 /*function addBars(a){
     //var dynamicaBar = document.createElement('div');
     for(i=0;i<a;i++){
     document.getElementById('allBarsContainer').innerHTML += `<div id="progressContainer"><div class="progress">
     <span class="value"></span></div>`
     }
    }*/

    /*function addButtons(a){
        for(i=0; i<a; i++){
           var btn = document.createElement("button");
           btn.id = "btn"+[i];
           btn.class = "actionBtn";
           btn.onclick= "btnAction(" + "btn"+[i] +")";
          document.getElementById('allButtonsContainer').appendChild(btn);
            //<button id="btn1" class="actionBtn" onclick="btnAction('btn1')"></button>
        }
    }*/
     
     
