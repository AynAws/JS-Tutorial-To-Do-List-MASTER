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

// get item from local storage
let data = localStorage.getItem('TODO');

// check if data is not empty
if (data) {
    LIST = JSON.parse(data); // BROKEN
    id = LIST.length; // set id to last list item
    loadList(LIST); // load list to UI
} else {
    // if data empty
    LIST = [];
    id = 0;
}
function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    })
};

// clear local storage
clear.addEventListener('click', function() {
    localStorage.clear();
    location.reload();
});

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
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            })
            // add item to local storage
            localStorage.setItem('TODO', JSON.stringify(LIST));
            id++;
        }
        input.value = ''
    }
});

// complete toDo
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
};

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
};

// taregt the items created dynamically

list.addEventListener('click', function(event){
    const element = event.target; // returns element clicked
    const elementJob = element.attributes.job.value; // complete/delete

    if (elementJob == 'complete') {
        completeToDo(element);
    } else if (elementJob == 'delete') {
        removeToDo(element);
    }
});