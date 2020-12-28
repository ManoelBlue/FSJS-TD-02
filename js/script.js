/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function displayNineStudents(studentsList, pageNum) {
    let startIndex = (pageNum * 9) - 9;
    let endIndex = pageNum * 9;
    const studentsUL = document.querySelector('.student-list');

    studentsUL.innerHTML = '';
    for (let i = 0; i < studentsList.length; i++) {
        if ( i >= startIndex && i < endIndex ) {
            studentsUL.textContent += `
                <li class="student-item cf">
                    <div class="student-details">
                    <img class="avatar" src="https://randomuser.me/api/portraits/women/25.jpg" alt="Profile Picture">
                    <h3>Ethel Dean</h3>
                    <span class="email">ethel.dean@example.com</span>
                    </div>
                    <div class="joined-details">
                    <span class="date">Joined 12-15-2005</span>
                    </div>
                </li>
            `
        }
    };
};


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(studentsList) {
    let numOfPages = Math.ceil(studentsList.length / 9);
    const paginationUL = document.querySelector('.link-list');

    paginationUL.innerHTML = '';
    for ( let i = 0; i < numOfPages; i++ ) {
        let pageBtn = `
            <li>
                <button type="button">${i}</button>
            </li>
        `;
        paginationUL.insertAdjacentHTML('beforeend', pageBtn);
    }
    document.querySelectorAll('.button')[0].classList.add('active');
    paginationUL.addEventListener('click', (event) => {
        const buttons = document.querySelectorAll('.button');

        if (event.target.tagName === 'BUTTON') {
            let clickedPage = event.target.textContent;

            for (let i = 0; i < buttons.length; i++) {
                buttons[i].classList.remove('active');
            }

            buttons[i].classList.add('active');
            displayNineStudents(studentsList, clickedPage);
        }
    });
}


// Call functions
