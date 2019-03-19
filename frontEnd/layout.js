$(document).ready(function () {
    let result=document.getElementById('result');
    let head=document.getElementById('head')
    $.ajax({
        url: '/haloo',
        method: 'post',
       success: function (response) {
   if(response.length===0){
       var divemp = document.createElement('H5');
       divemp.innerHTML = "Service not available ";
divemp.style.cssText=" font-family: 'Roboto', sans-serif;font-size:30px;margin:auto auto;";
       result.append(divemp);
   }
        /*var data=response;
        document.body.appendChild(data);*/
           else if(response.length>0) {
       var divemp = document.createElement('H5');
       divemp.innerHTML = `${response[0].pro}`;
       divemp.style.cssText = " font-family: 'Roboto', sans-serif;font-size:30px;margin:10px 40%;";
       head.append(divemp);
   }
           for(var i=0;i<response.length;i++) {


               var div = document.createElement('div');

               div.className = 'card col-lg-2 col-md-3 col-sm-3';
               div.style.cssText = 'width:200px;height:300px;border:3px  solid #ddd;margin:10px;padding-top:30px';
               var divbody = document.createElement('div');
               divbody.className = 'card-body';
               var divName = document.createElement('h5');
               divName.className = ('card-title');
               divName.innerHTML = `${response[i].name}`;
               divbody.appendChild(divName);
               var divtext = document.createElement('label');
               divtext.className = ('card-text');
               var divnum = document.createElement('label');
               divnum.innerHTML = "Phone Number " + `${response[i].pno}`;
               var divlfees = document.createElement('label');
               divlfees.innerHTML = "Visting Charges  " + `${response[i].fees}`;
               var butt = document.createElement('button');
               butt.className = ('btn btn-outline-danger');
               butt.innerHTML = "send req";

               divtext.appendChild(divnum);
               divtext.appendChild(divlfees);
               divbody.appendChild(divtext);
               divbody.appendChild(butt)
               div.appendChild(divbody);
               result.append(div);
               butt.onclick = function () {
                   this.innerHTML = "sent";
                   this.disabled=true;
               }




/*
            let value = `<li>
                                <span>${response[i].name}</span>
                                </li>`


            result.append(value);*/
        }
                }
    })
})