const releaseInformation = document.querySelector('.release');
const informationContainer = document.querySelector('.information');

//Adding all the available employees in site

releaseInformation.addEventListener('click', (e) => {
//Append every employee on page 
getData().then(data => {
  informationContainer.innerHTML += `
      <div class="header-table">
        <div class="information-column">Name</div>
        <div class="information-column">Street</div>
        <div class="information-column">state</div>
        <div class="information-column">city</div>
        <div class="information-column">country</div>
        <div class="information-column">telephone</div>
        <div class="information-column">birthday</div>
      </div>
      `;
data.forEach(employee => {
  informationContainer.innerHTML += `
            <div class="information-table">
            <div class="information-column more-information" id="name">${employee.name}</div>
            </div>
            `
});
});
});

informationContainer.addEventListener('click', (e) => {

  const upperContainer = e.target.parentElement;
  const employeeName = upperContainer.querySelector('#name').textContent;

  if ((upperContainer.classList.contains('expanded'))) {
    getData().then(employees => {
      employees.forEach(employee => {
        if (employee.name === employeeName) {
          upperContainer.innerHTML = `
                   <div class="information-column" id="name">${employee.name}</div>
                   `;
        }
      })
    });
    upperContainer.classList.remove('expanded');
  }
  //Nesting expanding information of information to an employee on clicking name
  if ((e.target.classList.contains('information-column')) && (upperContainer.childElementCount === 1)) {
    getData().then(employees => {
      employees.forEach(employee => {
        if (employee.name === employeeName) {
          upperContainer.innerHTML = `
                <div class="information-column" id="name">${employee.name}</div>
                <div class="information-column">${employee.street}</div>
                <div class="information-column">${employee.state}</div>
                <div class="information-column">${employee.city}</div>
                <div class="information-column">${employee.country}</div>
                <div class="information-column">${employee.telephone}</div>
                <div class="information-column">${employee.birthday}</div>
                `;
        }
      })
    });
    //marking that is expanded information
    upperContainer.classList.add('expanded');
    upperContainer.firsChild.classList.remove('more-information');
  }

});


//Bringing data from local JSON
function getData() {
  return fetch('./data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la carga del archivo JSON');
      }
      return response.json();
    })
    .then(data => {
      // Declaring information
      let information = data;
      return information;
    })
}