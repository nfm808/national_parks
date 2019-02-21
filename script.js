'use strict';
//get the parks
function getParkInfo(url, options) {
  fetch(url, options)
  .then(response=> {
    if (response.ok) {
      return response.json();
    }
    throw new Error (response.statusText);
  })
  .then(responseJson => displayResults(responseJson.data))
  .catch(err => {
    $('#js_error_message').text(`Something went wrong: ${err.message}`);
  });
};

// watch form
function watchForm() {
  $('#my-form').submit(function(e) {
    e.preventDefault();
    let state = $('#state-select').val();
    let maxNumber = $('#js_max_results').val();
    createUrl(state, maxNumber);
  });
};

// create url
// api.nps.gov/api/v1/parks?stateCode=tx,ak,wy&limit=100
function createUrl(state, maxNumber) {
  const options = {
    "X-Api-Key": "oURQrnnz9sXtX6GPQGAoC3BtwclpYf9D4IDWYVPa"
  };
  const baseUrl = `https://api.nps.gov/api/v1`;
  const url = baseUrl + `/parks?stateCode=${state.join()}&limit=${maxNumber}`
  getParkInfo(url, options);
};

// create elements
function displayResults(responseJson) {
  console.log(responseJson);
  const header = `<h2>Results</h2>`;
  const results = responseJson.map(element => {
    return `<h2> ${element.fullName} </h2>
            <h3>About ${element.name}</h3>
            <p>${element.description}</p>
            <h3>Website: <a href="${element.url}">${element.url}</a><h3>`
  });
  $('#results').prepend(header);
  $('#results').append(results);
};

function handlePage(){
  watchForm();
};


$(handlePage());