$(document).ready(function () {


//Cart Plus button
$('#plus').on('click', function(e){
  e.preventDefault();
  var price = parseInt($('#priceValue').val());
  var quantity = parseInt($('#quantity').val());

  price += parseInt($('#priceHidden').val());
  quantity += 1;

  $('#quantity').val(quantity);
  $('#priceValue').val(price);
  $('#total').html(quantity);
});


//Cart minus button
$('#minus').on('click', function(e){
  e.preventDefault();
  var price = parseInt($('#priceValue').val());
  var quantity = parseInt($('#quantity').val());

  if (quantity === 1){
    price = $('#priceValue').val();
    quantity = 1;
  } else {
    price = parseInt($('#priceHidden').val());
    quantity -= 1;
  }

  $('#quantity').val(quantity);
  $('#priceValue').val(price);
  $('#total').html(quantity);
});

});
