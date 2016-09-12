$(document).ready(function () {


//Cart Plus button
$('#plus').on('click', function(e){
  e.preventDefault();
  // var point = parseInt($('#points').val());
  var price = parseFloat($('#priceValue').val());
  var quantity = parseInt($('#quantity').val());

  price += parseFloat($('#priceHidden').val());
  // point += parseInt($('#pointHidden').val());
  quantity += 1;

  $('#quantity').val(quantity);
  $('#priceValue').val(price);
  // $('#points').val(point);
  $('#total').html(quantity);
});


//Cart minus button
$('#minus').on('click', function(e){
  e.preventDefault();
  // var point = parseInt($('#points').val());
  var price = parseFloat($('#priceValue').val());
  var quantity = parseInt($('#quantity').val());

  if (quantity === 1){
    // point = $('#points').val();
    price = $('#priceValue').val();
    quantity = 1;
  } else {
    // point -= parseInt($('#pointHidden').val());
    price -= parseFloat($('#priceHidden').val());
    quantity -= 1;
  }

  $('#quantity').val(quantity);
  $('#priceValue').val(price);
  // $('#points').val(point);
  $('#total').html(quantity);
});

});
