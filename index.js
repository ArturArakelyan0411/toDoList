const body = document.querySelector('body');
const changeTheme = document.querySelector('.changeTheme');
const toDoName = document.querySelector('.toDoName');

let localDarkMode = localStorage.getItem('theme');

changeTheme.addEventListener('click', () => {
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('darkMode');

        changeTheme.style.color = 'yellow';
        toDoName.style.color = 'white';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('darkMode');

        changeTheme.style.color = 'black';
        toDoName.style.color = 'black';
        localStorage.setItem('theme', 'light');
    }
});

if (localDarkMode === 'dark') {
    document.body.classList.add('darkMode');

    changeTheme.style.color = 'yellow';
    toDoName.style.color = 'white';
} else {
    document.body.classList.remove('darkMode');

    changeTheme.style.color = 'black';
    toDoName.style.color = 'black';
}

const incrementDecrementNumber = document.querySelector('.incrementDecrementNumber');
const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const defaultBtn = document.querySelector('.defaultBtn');

plus.addEventListener('click', () => {
    +incrementDecrementNumber.textContent++;


    localStorage.setItem('number', incrementDecrementNumber.textContent);

    if(localStorage.getItem('number') <= 0) {
        incrementDecrementNumber.style.color = 'red';

        localStorage.setItem('color', 'red');
    } else if(localStorage.getItem('number') > 0) {
        incrementDecrementNumber.style.color = 'green';

        localStorage.setItem('color', 'green');
    }
});

minus.addEventListener('click', () => {
    +incrementDecrementNumber.textContent--;

    localStorage.setItem('number', incrementDecrementNumber.textContent);

    if(localStorage.getItem('number') <= 0) {
        incrementDecrementNumber.style.color = 'red';

        localStorage.setItem('color', 'red');
    } else if(localStorage.getItem('number') > 0) {
        incrementDecrementNumber.style.color = 'green';

        localStorage.setItem('color', 'green');
    }
});

if(localStorage.getItem('color') === 'red') {
    incrementDecrementNumber.style.color = 'red';
} else if(localStorage.getItem('color') === 'green') {
    incrementDecrementNumber.style.color = 'green';
}

incrementDecrementNumber.textContent = localStorage.getItem('number');

defaultBtn.addEventListener('click', () => {
    incrementDecrementNumber.textContent = 0;
    localStorage.setItem('number', 0);
});


const addTodo = document.querySelector('.addTodo');
const toDoDate = document.querySelector('.toDoDate');

class Todo {
    constructor() {
        this.toDo = this.toDoList.appendChild(document.createElement('div'));
        this.toDo.classList.add('toDo');
        
        this.toDoInfo = this.toDo.appendChild(document.createElement('div'));
        this.toDoInfo.classList.add('toDoInfo');

        this.toDoWork = this.toDoInfo.appendChild(document.createElement('h3'));
        this.toDoWork.innerHTML = `${this.toDoName.value}`;
        this.toDoWork.classList.add('toDoWork');

        this.toDoCreatedTime = this.toDoInfo.appendChild(document.createElement('p'));
        this.toDoCreatedTime.innerHTML = `Created: ${new Date().toLocaleTimeString()}`;
        this.toDoCreatedTime.classList.add('toDoCreatedTime');

        this.toDoButtons = this.toDo.appendChild(document.createElement('div'));
        this.toDoButtons.classList.add('toDoButtons');

        this.toDoComplete = this.toDoButtons.appendChild(document.createElement('button'));
        this.toDoComplete.innerHTML = 'Completed';
        this.toDoComplete.classList.add('toDoConfirm');
        
        this.toDoDelete = this.toDoButtons.appendChild(document.createElement('button'));
        this.toDoDelete.innerHTML = 'Remove';
        this.toDoDelete.classList.add('toDoDelete');

        this.toDoEdit = this.toDoButtons.appendChild(document.createElement('button'));
        this.toDoEdit.innerHTML = 'Edit';
        this.toDoEdit.classList.add('toDoEdit');

        if(!this.toDoName.value.trim()) {
            this.toDo.remove();
        }

        this.toDoComplete.addEventListener('click', () => {
            if(this.toDoComplete.textContent === 'Completed') {
                this.toDoWork.classList.add('toDoCompleted');
                this.toDoCreatedTime.innerHTML = `Completed: ${new Date().toLocaleTimeString()}`;
                this.toDoComplete.innerHTML = 'No completed';
            } else {
                this.toDoWork.classList.remove('toDoCompleted');
                this.toDoComplete.innerHTML = 'Completed';
            }

            this.toDoClone = this.toDo.cloneNode(true);

            if(this.toDoComplete.textContent === 'No completed') {
                this.toDoCompleteAlert = this.toDoAlertsBlock.appendChild(this.toDoClone);
                this.toDoCompleteAlert.classList.remove('toDo');
                this.toDoCompleteAlert.classList.add('completedToDo');
                this.toDoCompleteAlert.lastChild.remove();
            }
            
            this.toDoCompleteAlert.firstChild.firstChild.classList.remove('toDoCompleted');
            
            if(this.toDoCompleteAlert.firstChild.firstChild.firstChild.tagName === 'INPUT') {
                this.toDoCompleteAlert.firstChild.firstChild.innerHTML = this.toDoWorkFirstContent;
            }

            this.toDoAlertRemoving(this.toDoCompleteAlert);
        });

        this.toDoEdit.addEventListener('click', () => {
            this.toDoEdit.style.display = 'none';

            this.toDoWork.innerHTML = `<input type="text" value="${this.toDoWork.textContent.trim()}" class="toDoWorkInput">`;
            this.toDoConfirmEditing = this.toDoButtons.appendChild(document.createElement('button'));
            this.toDoConfirmEditing.innerHTML = 'Confirm';
            this.toDoConfirmEditing.classList.add('toDoConfirmEditing');
            this.toDoWorkInput = document.querySelector('.toDoWorkInput');

            this.toDoWorkFirstContent = this.toDoWorkInput.value;

            this.toDoChangeColor = this.toDoInfo.firstChild.appendChild(document.createElement('button'));
            this.toDoChangeColor.textContent = 'Color';
            this.toDoChangeColor.classList.add('toDoChangeColor');

            this.toDoChangeColor.addEventListener('click', () => {
                this.toDoColors = this.toDoAlertsBlock.appendChild(document.createElement('div'));
    
                this.toDoColors.innerHTML = `
                    <div class="allColors">
                        <div class="colors">
                            <div class="colorsLine1">
                                <div class="colorChange colorChangeRed" data-colors="red"></div>
                                <div class="colorChange colorChangeBlue" data-colors="blue"></div>
                                <div class="colorChange colorChangeGreen" data-colors="green"></div>
                            </div>
                            <div class="colorsLine2">
                                <div class="colorChange colorChangeYellow" data-colors="yellow"></div>
                                <div class="colorChange colorChangeDarkorchid" data-colors="darkorchid"></div>
                                <div class="colorChange colorChangeOrange" data-colors="orange"></div>
                            </div>
                        </div>
                    </div>`;
                
                this.allColors = document.querySelector('.allColors');
                this.colorChange = document.querySelectorAll('.colorChange');
    
                this.colorChange.forEach(elem => {
                    elem.addEventListener('click', () => {
                        this.allColors.remove();
                        this.toDo.style.color = elem.dataset.colors;

                        this.toDoWork.innerHTML = `${this.toDoWorkInput.value}`;
                        this.toDoConfirmEditing.remove();
                        this.toDoCreatedTime.innerHTML = `Edited: ${new Date().toLocaleTimeString()}`;
                        this.toDoEdit.style.display = 'block';
        
                        if(!this.toDoWorkInput.value.trim()) {
                            this.toDoWork.innerHTML = this.toDoWorkFirstContent;
                        }
                    });
                });
            });

            this.toDoConfirmEditing.addEventListener('click', () => {
                this.toDoWork.innerHTML = `${this.toDoWorkInput.value}`;
                this.toDoConfirmEditing.remove();
                this.toDoCreatedTime.innerHTML = `Edited: ${new Date().toLocaleTimeString()}`;
                this.toDoEdit.style.display = 'block';

                if(!this.toDoWorkInput.value.trim()) {
                    this.toDoWork.innerHTML = this.toDoWorkFirstContent;
                }
            });
        });

        this.toDoDelete.addEventListener('click', () => {
            this.toDoRemovedClone = this.toDo.cloneNode(true);

            this.toDo.remove();
            this.toDoRemoveAlert = this.toDoAlertsBlock.appendChild(this.toDoRemovedClone);
            this.toDoRemoveAlert.classList.add('removedToDo');
            this.toDoRemoveAlert.lastChild.remove();
            this.toDoRemovedTime = this.toDoRemoveAlert.firstChild.lastChild.innerHTML = `Removed: ${new Date().toLocaleTimeString()}`;

            this.toDoRestablish = this.toDoRemoveAlert.appendChild(document.createElement('button'));
            this.toDoRestablish.innerHTML = 'Restablish';
            this.toDoRestablish.classList.add('restablishBtn');

            this.toDoRestablish.addEventListener('click', () => {
                this.toDoList.appendChild(this.toDo);
                this.toDo.firstChild.lastChild.innerHTML = this.toDoRemovedTime;
                this.toDoRemoveAlert.remove();
            });

            if(this.toDoRemoveAlert.firstChild.firstChild.firstChild.tagName === 'INPUT') {
                this.toDoRemoveAlert.firstChild.firstChild.innerHTML = this.toDoWorkFirstContent;
            }

            this.toDoAlertRemoving(this.toDoRemoveAlert);
        });
    }

    toDoAlertRemoving(alert) {
        setTimeout(() => {
            alert.style.opacity = 0;
        }, 3000);
        setTimeout(() => {
            alert.remove();
        }, 5000); 
    }

    toDoTime() {
        this.time = this.toDoClock.appendChild(document.createElement('p'));
        this.time.classList.add('time');
        this.time.textContent = new Date().toLocaleTimeString();
        
        setInterval(() => {
            return this.time.textContent = new Date().toLocaleTimeString();
        }, 1000);
    }

    toDoAlertsBlock = document.querySelector('.toDoAlertsBlock');
    toDoClock = document.querySelector('.toDoTime');
    toDoList = document.querySelector('.toDoList');
    toDoName = document.querySelector('.toDoName');
}

toDoDate.addEventListener('submit', (e) => {
    e.preventDefault();
    new Todo();
    toDoName.value = '';
});

const ToDo = new Todo();
ToDo.toDoTime();