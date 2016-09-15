$(document).ready(function () {


//Cart Plus button
$('#plus').on('click', function(e){
  e.preventDefault();
  var point = parseInt($('#points').val());
  var price = parseFloat($('#priceValue').val());
  var quantity = parseInt($('#quantity').val());

  price += parseFloat($('#priceHidden').val());
  point += parseInt($('#pointHidden').val());
  quantity += 1;

  $('#quantity').val(quantity);
  $('#priceValue').val(price);
  $('#points').val(point);
  $('#total').html(quantity);
});


//Cart minus button
$('#minus').on('click', function(e){
  e.preventDefault();
  var point = parseInt($('#points').val());
  var price = parseFloat($('#priceValue').val());
  var quantity = parseInt($('#quantity').val());

  if (quantity === 1){
    // point = $('#points').val();
    price = $('#priceValue').val();
    quantity = 1;
  } else {
    point -= parseInt($('#pointHidden').val());
    price -= parseFloat($('#priceHidden').val());
    quantity -= 1;
  }

  $('#quantity').val(quantity);
  $('#priceValue').val(price);
  $('#points').val(point);
  $('#total').html(quantity);
});


// $.ajax({
//     url: 'https://andruxnet-random-famous-quotes.p.mashape.com/',
//
//     type: 'POST',
//     headers: {
//             'X-Mashape-Key': 'm2TVGB0dPmmshjy3VWzjORBnsy2tp14BP2DjsnrrXLsRuhozEG',
//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Accept': 'application/json'
//           },
//     data: {
//     cat: "movies",
//     },
//     datatype: 'json',
//     success: function(data) {
//       console.log(data);
//       // alert(data.category);
//       $('.quote').text(data.author);
//     }
// })
//     .fail(function(request, textStatus, errorThrown){
//     $('.testing').html(request.status + " " + textStatus + " " + errorThrown); //If fail to show error msg
//
//    });


     $.ajax({
         // where the data live
         url: 'https://andruxnet-random-famous-quotes.p.mashape.com/',
         headers: {
           'X-Mashape-Key': 'm2TVGB0dPmmshjy3VWzjORBnsy2tp14BP2DjsnrrXLsRuhozEG',
           'Content-Type': 'application/x-www-form-urlencoded',
           'Accept': 'application/json'
         },
         type: 'POST',
         data: {cat: 'movies'},
         dataType: 'json'
       }).done(successFunction)
         .fail(failFunction);


   function successFunction(data, dataType, status) {
      $('.quote').text("\"" + data.quote + "\"" + " from movie - " + data.author);
      // $(".author").text("From the movie " + data.author);
    };

    function failFunction(request, textStatus, errorThrown) {
        alert('An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + errorThrown);
    };




});
