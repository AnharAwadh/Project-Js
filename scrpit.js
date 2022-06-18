URL = "https://restcountries.com/v3.1";
getCountries = "";
function convertToHtml(json) {
  let html = "";
  for (let i = 0; i < json.length; i++) {
    console.log(json[i].flags.svg);
    console.log(json[i].capital);
    html += `<div class="col-4">
    <div class="card">
      <img
        src="${json[i].flags.png}"
        class="card-img-top "
        height="250px"
      />
      <div class="card-body">
        <h5 class="card-title">${json[i].name.common}</h5>
        <p class="card-text">
         Captial: ${json[i].capital ? json[i].capital[0] : "Not Found"}
        </p>
        <p class="card-text">
        Population: ${json[i].population}
        </p>
        <p>
        Region: ${json[i].region}
        </p>
        
        <a href="${
          json[i].maps.googleMaps
        }" target="_blank" class="btn btn-primary">Go to Google map</a>
      </div>
    </div>
  </div>`;
  }
  return html;
}
function fetchCounties(keyword) {
  url = URL;
  if (keyword == "all") {
    url += "/all";
  } else {
    url += `/name/${keyword}`;
  }

  if (
    localStorage.getItem(keyword) != "undefined" &&
    localStorage.getItem(keyword) != null
  ) {
    const cachedCountries = JSON.parse(localStorage.getItem(keyword));
    displayCountries(cachedCountries);
  } else {
    fetch(url)
      .then((response) => response.json())
      .then((countries) => {
        localStorage.setItem(keyword, JSON.stringify(countries));
        displayCountries(countries);
      });
  }
}
function displayCountries(countries) {
  let html = convertToHtml(countries);
  getCountries = countries;
  document.getElementById("content").innerHTML = html;
}

function seach() {
  let keyword = document.getElementById("search").value.trim();
  if (keyword == "") {
    fetchCounties("all");
  } else {
    fetchCounties(keyword);
  }
}

fetchCounties("all");
