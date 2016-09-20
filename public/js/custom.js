$(document).ready(function () {

Stripe.setPublishableKey('pk_test_4d4BncQFx1UVmBY3OAqmf7bD');

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



//payment
    function stripeResponseHandler(status, response) {
      // Grab the form:
      var $form = $('#payment-form');

      if (response.error) { // Problem!

        // Show the errors on the form:
        $form.find('.payment-errors').text(response.error.message);
        $form.find('.submit').prop('disabled', false); // Re-enable submission

      } else { // Token was created!

        // Get the token ID:
        var token = response.id;

        // Insert the token ID into the form so it gets submitted to the server:
        $form.append($('<input type="hidden" name="stripeToken">').val(token));

        // Submit the form:
        $form.get(0).submit();
      }
    };

    var $form = $('#payment-form');
  $form.submit(function(event) {
    // Disable the submit button to prevent repeated clicks:
    $form.find('.submit').prop('disabled', true);

    // Request a token from Stripe:
    Stripe.card.createToken($form, stripeResponseHandler);

    // Prevent the form from being submitted:
    return false;
  });


});
