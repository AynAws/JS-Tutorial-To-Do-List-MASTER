// CODE EXPLAINED channel

//Select the Elements
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

// Classes names
const CHECK = 'fa-check-circle';
const UNCHECK = 'fa-circle-thin';
const LINE_THROUGH = 'lineThrough';

// Var
let LIST, id;

// Show todays date
const options = {weekday: 'long', month: 'short', day:'numeric'}
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString('en-US', options);

// add to do function
function addToDo(toDo, id, done, trash) {
    if (trash) {return;}
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : '';
    const item = `
    <li class="item">
        <i class="fa ${DONE} co" job="complete" id="${id}"></i>
        <p class="text ${LINE}">${toDo}</p>
        <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>
    `;
    const position = 'beforeend';

    list.insertAdjacentHTML(position, item);
}

// add item when enter key down
document.addEventListener('keyup', function(even) {
    if (event.keyCode == 13) {
        const toDo = input.value;
        // if not empty
        if (toDo) {
            addToDo(toDo);
        }
        input.value = ''
    }
});

addToDo('Coffee', 1, false, true)