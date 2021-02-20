$(document).ready(function () {
  let country = [];
  $.get("https://restcountries.eu/rest/v2", function (data, status) {
    country = data;
    let option = "";
    option += "<option selected> Choose a country ... </option>";
    country.forEach((element) => {
      option += `<option values=''>${element.name}</option>`;
    });
    $("#all_country").html(option);
    $("#all_country").change(function () {
      let index = $("#all_country option:selected").index();
      $("#country-name").html(country[index - 1].name);
      $(".textColor").removeClass("txt-light");
      $(".textColor").addClass("txt-warning");
      $("#country-nativeName").html(country[index - 1].nativeName);
      $("#country-capital").html(country[index - 1].capital);
      let region =
        country[index - 1].region + ", " + country[index - 1].subregion;
      $("#country-region").html(region);
      $("#country-population").html(country[index - 1].population);
      let lang =
        country[index - 1].languages[0].name +
        ", " +
        country[index - 1].languages[0].nativeName;
      $("#country-language").html(lang);
      $("#country-timeZone").html(country[index - 1].timezones);
      $("#calling-code").html(country[index - 1].callingCodes);
      $("#calling-code").css("font-size", "100px");
      $("#calling-code").css("margin-top", "5rem");
      $("#country-flagImage").attr("height", "85% !important");
      $("#country-flagImage").attr("src", country[index - 1].flag);
      $.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${
          country[index - 1].capital
        }&appid=10c0b1982250886124ffb4415511eca9`,
        function (data, status) {
          $("#weather-img").attr(
            "src",
            `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
          );
          $(".weather-description").html(data.weather[0].main);
          $("#weather-windSpeed").html(data.wind.speed);
          $("#weather-windSpeed").append(" MS");
          let temp = data.main.temp - 273.15;
          temp = +String(temp).slice(0, 3);
          $("#weather-temperature").html(temp);
          $("#weather-temperature").append(" °C");
          $("#weather-humidity").html(data.main.humidity);
          $("#weather-humidity").append(" %");
          $("#weather-visibility").html(data.visibility);
          $("#weather-visibility").append(" m");
          $("#gmap_canvas").attr(
            "src",
            `https://maps.google.com/maps?width=520&height=400&hl=en&q=%20${
              country[index - 1].capital
            }+()&t=&z=5&ie=UTF8&iwloc=B&output=embed`
          );
        }
      );
    });
  });
});
