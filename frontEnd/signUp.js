$(document).ready(function () {
    let btn= $('#btn');
    var inp=$('#name');
    let pn=$('#pno');
    let pass =$('#pass');
    let visitFees=$('#visitFees');
    let profession=$('#profession');
    var latitude;
    btn.click(function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                latitude = position.coords.latitude;
                console.log(latitude);
                console.log(inp.val())
                console.log(pn.val())
                console.log(pass.val())
                console.log(profession.val());
           sendData(latitude,inp.val(),pn.val(),pass.val(),profession.val(),visitFees.val());
            })

        }


    });

    function sendData(latitude,inpo,pno,passo,profeso,visito){
        $.ajax({
            url: '/data',
            method: 'post',
            data: {
                name:inpo,
                pro:profeso,
                lat: latitude,
                pno:pno,
                pass:passo,
                fees:visito

            },
            dataType: "json",
            success: function(response) {   //redirect to page login for worker
                if (response.redirect !== undefined && response.redirect) {
                    window.location.href = response.redirect_url;
                }

            }
        })
    }




})