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
    $('.showDinoList').text("");
    let dinoPara = $('#dinoPara').val();
    let dinoWords = $('#dinoWords').val();
    $.get(`http://dinoipsum.herokuapp.com/api?format=json&paragraphs=${dinoPara}&words=${dinoWords}`).then(function(response) {
      response.forEach(function(element) {
        let newElement = element.join(", ")
        $('.showDinoList').append(`<h6>${newElement}</h6><br>`);
      });
    }).fail(function(error) {
        $('.showDinoError').text(`${error.responseText}`);
    });
  });
});
