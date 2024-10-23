let students = []; 
let currentPage = 1;
let rowsPerPage = document.getElementById("rowsPerPage").value;

const table = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
const prevButton = document.getElementById("back");
const nextButton = document.getElementById("next");
const pageSpan = document.getElementById("currentPage");
let legacy= 1;

const searchButton = document.getElementById('searchButton');
const resetButton = document.getElementById('resetButton');
const searchField = document.getElementById('searchField');
let filtered = [];


const data = document.getElementById('data');

window.onload = function(){
    const storedData = localStorage.getItem('tableData');
    if (storedData) {
        students = JSON.parse(storedData);  
        if (students.length > 0) {
            const maxLegacy = Math.max(...students.map(students => students.legacy));
            legacy = maxLegacy + 1;
    }
}
    showTable(currentPage);
};

function saveToLocalStorage() {
    localStorage.setItem('tableData', JSON.stringify(students));  // Guardar el array como JSON
}


data.addEventListener('submit', function(event){

event.preventDefault();


    const name = document.getElementById("name").value;
    const lastName = document.getElementById("lastName").value;
    const leg = legacy_Generator();

    students.push({legacy: leg ,name: name, lastName: lastName});

    data.reset();

    saveToLocalStorage();

    showTable(currentPage);
});




    function showTable(page) {
    

        table.innerHTML = ''; // Limpiar tabla
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const paginatedData = students.slice(start, end);
    
        paginatedData.forEach(item => {

            const row = table.insertRow();

            
            row.insertCell(0).innerHTML = item.legacy;
            row.insertCell(1).innerHTML = item.name;
            row.insertCell(2).innerHTML = item.lastName;
        });
    
        // Actualizar el número de página
        pageSpan.innerText = page;
    }
    
    // Función para manejar el botón "Anterior"
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            showTable(currentPage);
        }
    });
    
    // Función para manejar el botón "Siguiente"
    nextButton.addEventListener('click', () => {
        if (currentPage * rowsPerPage < students.length) {
            currentPage++;
            showTable(currentPage);
        }
    });
    
    function legacy_Generator(){
        return legacy++;
    }

    

    function changeRows(){
        rowsPerPage = document.getElementById("rowsPerPage").value;
        currentPage=1;
        showTable(currentPage);
    }

    searchButton.addEventListener('click', function() {

        const query = searchField.value.toLowerCase();
        
        
        const filteredStudents = students.filter(students => 
            students.name.toLowerCase().includes(query) || students.lastName.toLowerCase().includes(query) 
        );

        showFilteredTable(filteredStudents);

    });

    function showFilteredTable(filtered){
        table.innerHTML = ''; // Limpiar la tabla
        filtered.forEach(item => {
            const row = table.insertRow();
            row.insertCell(0).innerHTML = item.legacy;
            row.insertCell(1).innerHTML = item.name;
            row.insertCell(2).innerHTML = item.lastName;
        });
    }

    resetButton.addEventListener('click', function() {
        searchField.value = ''; // Limpiar el campo de búsqueda
        showTable(currentPage); // Mostrar todos los estudiantes
    });

