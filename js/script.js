/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


const studentsUL = document.querySelector('.student-list');

/**
 * @function
 * @name showPage
 * @param {Array.<Object>} studentsList - array of Objects with students data.
 * @param {number} pageNum - number representing the page to be displayed.
 * @description Displays 9 students in the page.
 */
function showPage(studentsList, pageNum) {
    let startIndex = (pageNum * 9) - 9;
    let endIndex = pageNum * 9;

    studentsUL.innerHTML = '';
    for (let i = 0; i < studentsList.length; i++) {
        if ( i >= startIndex && i < endIndex ) {
            studentsUL.innerHTML += `
                <li class="student-item cf">
                    <div class="student-details">
                        <img class="avatar" src="${studentsList[i].picture.medium}" alt="Profile Picture">
                        <h3>${studentsList[i].name.first} ${studentsList[i].name.last}</h3>
                        <span class="email">${studentsList[i].email}</span>
                    </div>
                    <div class="joined-details">
                        <span class="date">Joined ${studentsList[i].registered.date}</span>
                    </div>
                </li>
            `
        }
    };
};

/**
 * @function
 * @name addPagination
 * @param {Array.<Object>} studentsList - array of Objects with students data.
 * @description Creates the pagination buttons and updates the displayed students based on the selected page number.
 */
function addPagination(studentsList) {
    let numOfPages = Math.ceil(studentsList.length / 9);
    const paginationUL = document.querySelector('.link-list');

    // Creates the pagination buttons:
    paginationUL.innerHTML = '';
    for ( let i = 0; i < numOfPages; i++ ) {
        let pageBtn = `
            <li>
                <button type="button">${i + 1}</button>
            </li>
        `;
        paginationUL.insertAdjacentHTML('beforeend', pageBtn);
    }

    // Adds the active class to the first button by default:
    document.querySelectorAll('.link-list button')[0].classList.add('active');

    // Detects a click on pagination and then:
    // Adds the active class to the clicked pagination button
    // Calls the showPage function for the chosen page number
    paginationUL.addEventListener('click', (event) => {
        const buttons = document.querySelectorAll('.link-list button');

        if (event.target.tagName === 'BUTTON') {
            let clickedPage = event.target.textContent;

            for (let i = 0; i < buttons.length; i++) {
                buttons[i].classList.remove('active');
            }

            buttons[clickedPage - 1].classList.add('active');
            showPage(studentsList, clickedPage);
        }
    });
}

/**
 * @function addSearchBar
 * @description Adds a search bar input on the markup.
 */
function addSearchBar() {
    studentsUL.insertAdjacentHTML('beforebegin', `
        <label for="search" class="student-search">
            <input id="search" placeholder="Search by name...">
            <button id="search-button" type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
        </label>
    `);
    document.querySelector('.student-search').style.marginBottom = '2em';
};

addSearchBar();

/**
 * @function filterStudents
 * @param {Array.<Object>} studentsList - array of Objects with students data.
 * @description Filters the student list based on the search input.
 */
function filterStudents(studentsList) {
    let userInput = document.getElementById('search').value.toLowerCase();
    let filteredStudents = [];

    for (let i = 0; i < studentsList.length; i++) {
        let studentName = `${studentsList[i].name.first} ${studentsList[i].name.last}`.toLowerCase();
        if (studentName.includes(userInput)) {
            filteredStudents.push(studentsList[i]);
        };
    };

    if (filteredStudents.length === 0) {
        studentsUL.innerHTML = '<p>No results found!</p>'
    } else {
        showPage(filteredStudents, 1);
        addPagination(filteredStudents);
    }
};

// Search Bar Listeners:
document.querySelector('.student-search').addEventListener('keyup', () => {
    filterStudents(data);
});
document.getElementById('search-button').addEventListener('click', () => {
    filterStudents(data);
});

// Default behavior:
// Shows the first page displaying the first 9 students
showPage(data, 1);
addPagination(data);
