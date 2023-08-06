
  document.addEventListener("DOMContentLoaded", function () {
    let allData; // Variable to store the original data

    // Function to fetch data from the JSON file
    function fetchData() {
      fetch('data.json')
        .then(response => response.json()) // Parse response as JSON
        .then(data => {
          // Save the original data in the allData variable
          allData = data;
          // Process the data and inject into HTML elements
          displayData(data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }

    // Function to display the fetched data
    function displayData(data) {
      const countriesContainer = document.querySelector('.countries');
      countriesContainer.innerHTML = ''; // Clear previous content

      data.forEach((datum) => {
        const country = document.createElement('div');
        country.classList.add('country');

        country.innerHTML = `
            <img src="${datum.flags.svg}" alt="">
            <div class="text">
            <h4 class="name" id="name">${datum.name}</h4>
            <p class="population" id="popp"><b>Population: </b>${datum.population}</p>
            <p class="region" id="region"><b>Region: </b> ${datum.region}</p>
            <p class="capital" id="cap"><b>Capital: </b> ${datum.capital}</p>
            </div>
        `;

        countriesContainer.appendChild(country);
        country.onclick = () =>{
          showDetail(datum)
        }
      });
    }

    // Function to filter data based on the selected region and search query
    function filterDataByRegion(region) {
        let filteredData = allData;
    
        // Filter by region
        if (region !== 'all') {
          filteredData = filteredData.filter(item => item.region === region);
        }
    
        displayData(filteredData);
      }
    
      // Event listener for region filter change
      const regionFilter = document.getElementById('region-filter');
      regionFilter.addEventListener('change', (event) => {
        const selectedRegion = event.target.value;
        filterDataByRegion(selectedRegion);
      });
    
      // Function to search data based on the search query
      function searchData(searchQuery) {
        const filteredData = allData.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    
        displayData(filteredData);
      }
    
      // Event listener for search input change
      const searchInput = document.getElementById('search-input');
      searchInput.addEventListener('input', (event) => {
        const searchQuery = event.target.value;
        searchData(searchQuery);
      });

      regionFilter.addEventListener('change', (event) => {
        const selectedRegion = event.target.value;
        if (selectedRegion === 'all') {
          searchInput.value = '';     // Clear the search input
          displayData(allData);       // Display all countries again
        }
      });
    
      // Call the fetchData function to fetch data and inject it into the HTML
      fetchData();
    });



    const countryModal = document.querySelector('.countrymod')

function showDetail(datum){
  countryModal.classList.toggle('show')
  countryModal.innerHTML = `
    <button class="back"><i class="bi bi-arrow-left"></i> Back</button>
    <div class="modal-ctn">
        <div class="leftside">
            <img src="${datum.flags.svg}" alt="">
        </div>
        <div class="right-ctn">
            <h3>${datum.name}</h3>
            <div class="right-flex">
                <div class="first-right right">
                    
                    <p class="population" id="popp"><b>Native Name: </b>${datum.nativeName}</p>
                    <p class="population" id="popp"><b>Population: </b>${datum.population}</p>
                    <p class="region" id="region"><b>Region: </b> ${datum.region}</p>
                    <p class="region" id="region"><b>Sub Region: </b> ${datum.subregion}</p>
                    <p class="capital" id="cap"><b>Capital: </b> ${datum.capital}</p>
                </div>
                <div class="second right">
                    <p class="population" id="popp"><b>Top Level Domain: </b>${datum.topLevelDomain}</p>
                    <p class="region" id="region"><b>Currencies: </b> ${datum.currencies.map(elem=>elem.name)}</p>
                    <p class="capital" id="cap"><b>Languages: </b> ${datum.languages.map(elem=>elem.name)}</p>
                </div>
            </div>
            <div class="border">
                <p><b>Border Countries: </b> </p>
                ${datum.borders.map(elem => `<button class="bodcon">${elem}</button>`).join('')}
                
            </div>
        </div>
    </div>
    </div>
  `;
  const back = countryModal.querySelector('.back')

back.onclick = () =>{
  countryModal.classList.toggle('show')
}
}



  