import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    $('.showErrors').hide();
    let city = $('#location').val();
    // $('#location').val("");
    $.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`).then(function(response) {
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${response.main.temp} degrees.`);
    }).fail(function(error) {
      $('.showHumidity').hide();
      $('.showTemp').hide();
      $('.showErrors').text(`There was an error processing your request: ${error.responseText}. Please try again.`);
      $('.showErrors').show();
    });
  });
  $('#showDinoResult').click(function() {
    let dinoPara = $('#dinoPara').val();
    let dinoWords = $('#dinoWords').val();
console.log(dinoPara + " and now dinoWords: " + dinoWords)
    $.get(`http://dinoipsum.herokuapp.com/api?format=json&paragraphs=${dinoPara}&words=${dinoWords}`).then(function(response) {
      let dinoString = `${response}`;
      let dinoArray = dinoString.split(",");
      dinoArray.forEach(function(element) {
        $('.showDinoList').append(`<li>${element}</li>`);
      });
    }).fail(function(error) {
        $('.showDinoError').text(`${error.responseText}`);
    });
  });
});
