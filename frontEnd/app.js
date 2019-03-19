$(document).ready(function () {
    let beauty=$('.grid1');
    let select=$('.select');

    beauty.click(function () {
   var d=$(this).text();
   var f=d.trim();
   console.log(f);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                latitude = position.coords.latitude;
          longitude=position.coords.longitude;
          sendData(latitude,longitude,f);

            })

        }

    })
    function sendData(latitude,longitude,f){
        console.log("lat"+latitude)
        console.log("lon"+longitude);

        $.ajax({
            url: '/user',
            method: 'post',

            data: {lat: latitude,
                lon:longitude,
                text:f
            },
            dataType: "json",
            success: function (response) {
                // redirect must be defined and must be true
                if (response.redirect !== undefined && response.redirect) {
                    window.location.href = response.redirect_url;
                }
            }
        })
    }


})