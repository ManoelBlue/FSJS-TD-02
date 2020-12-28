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
function showPage(studentsList, pageNum) {
    let startIndex = (pageNum * 9) - 9;
    let endIndex = pageNum * 9;
    const studentsUL = document.querySelector('.student-list');

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
                <button type="button">${i + 1}</button>
            </li>
        `;
        paginationUL.insertAdjacentHTML('beforeend', pageBtn);
    }
    document.querySelectorAll('button')[0].classList.add('active');
    paginationUL.addEventListener('click', (event) => {
        const buttons = document.querySelectorAll('button');

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


// Call functions
showPage(data, 1);
addPagination(data);