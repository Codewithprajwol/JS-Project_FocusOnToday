const circleCheck = document.querySelectorAll('.checkbox-circle');
const cir = document.querySelector('.checkbox-circle');
const svgage = document.querySelectorAll('.svg-savag')
const allinputs = document.querySelectorAll('.texty');
const errorLabel = document.querySelector('.info');
const err = document.querySelector('.err');
const slidingbar = document.querySelector('.actual-bar');
const quotes = document.querySelector('.changing-text');
const inputpackagaes = document.querySelector('.all-selections');
const addGoal = document.querySelector('.add-button');
const removeGoal = document.querySelector('.remove-button');
const dynamicELement = document.querySelector('.dynamic-element');
const errorlabeling = document.querySelector('.err');

let dynacounting = 1;
let completedGoalCount1 = 0;

let completedGoalCount2 = 0;

let allGoals = JSON.parse(localStorage.getItem('Goals'));

if (allGoals == null) {
    allGoals = {}
}
let allquotes = [
    'Raise the bar by completing your goals.',
    'Begin beautifully: the rest is yet to be adorned.',
    'Just a step away, Keep going!',
    'Wow! You just completed 3 goals',
    'You are Legend Man... appreciate your dedication :)',
    'Krishna will bless you: Just do you karma',
]
let completedGoalCount = Object.values(allGoals).filter((goal) => {
    return goal.completed;
}).length


circleCheck.forEach((circle) => {
    circle.addEventListener('click', (e) => {
        const alldata = [...allinputs]
        const finalvalue = alldata.every((input) => {
            return input.value;
        })
        if (finalvalue) {

            circle.parentElement.classList.toggle('completed');
            const inputedvalue = circle.nextElementSibling.dataset.info;
            allGoals[inputedvalue].completed = !allGoals[inputedvalue].completed;
            completedGoalCount = Object.values(allGoals).filter((goal) => {
                return goal.completed;
            }).length
            slidingbar.style.width = (((completedGoalCount + completedGoalCount1 + completedGoalCount2) / (circleCheck.length + dynamicELement.childElementCount)) * 100) + "%";
            localStorage.setItem('Goals', JSON.stringify(allGoals));
            slidingbar.firstElementChild.innerText = `${(completedGoalCount + completedGoalCount1 + completedGoalCount2)}/${(circleCheck.length + dynamicELement.childElementCount)} completed`;
            quotes.innerText = allquotes[completedGoalCount + completedGoalCount1 + completedGoalCount2];

        }
        else {
            errorLabel.parentElement.classList.add('extrainfo')
        }
    })
})

allinputs.forEach((input) => {
    if (allGoals[input.dataset.info]) {
        input.value = allGoals[input.dataset.info].name;
    }


    input.addEventListener('focus', () => {
        errorLabel.parentElement.classList.remove('extrainfo');
        errorlabeling.parentElement.classList.remove('altraextra');
    })
    input.addEventListener('input', (e) => {
        if (allGoals[input.dataset.info] && allGoals[input.dataset.info].completed) {
            input.value = allGoals[input.dataset.info].name;
            return;
        }
        allGoals[e.target.dataset.info] = {
            name: input.value,
            completed: false,
        }
        localStorage.setItem('Goals', JSON.stringify(allGoals))

    })


    if (allGoals[input.dataset.info] && allGoals[input.dataset.info].completed) {
        input.parentElement.classList.add('completed');
    }

})


// For dynamic elements manipulation....
let dynamicgoals = JSON.parse(localStorage.getItem('dynaGoals'))
const datanum = ['', 'four', 'five'];
let count = 0;
let clutter = '';
const eventHandler = (e) => {

    if (count < 2) {
        clutter = `
        <div class="select-Prajwol removeitem">
        <div class="box-circle">
                <svg class="svg-savag" width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 4.11111L3.20098 7.12635C3.54481 7.59737 4.21708 7.67546 4.65973 7.29581L12 1" stroke="#F7F7F7" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    </div>
                    <input data-intro="${datanum[count + 1]}" class="testy" type="text" placeholder="Add a new goal..">
                    </div>`;
        dynamicELement.innerHTML += clutter;
        count++;
    }
    else {
        // addGoal.removeEventListener('click', eventHandler);
        addGoal.click();
        errorlabeling.parentElement.classList.add('altraextra');

    }
    const boxCircle = document.querySelectorAll('.box-circle');
    const dynainputs = document.querySelectorAll('.testy');
    const selectguru = document.querySelectorAll('.select-Prajwol');
    const firstDynaElement = document.querySelector('[data-intro="four"]');
    const secondDynaElement = document.querySelector('[data-intro="five"]');

    if (dynamicgoals === null) {
        dynamicgoals = {
            four: {
                name: '',
                completed: false,
            },
            five: {
                name: '',
                completed: false,
            }
        }

    }
    ;


    if (firstDynaElement) {
        firstDynaElement.previousElementSibling.addEventListener('click', (e) => {
            const alldata = [...allinputs]
            const finalvalue = alldata.every((input) => {
                return input.value;
            })
            if (finalvalue) {
                let check = () => {
                    return firstDynaElement.value.trim() !== ''; // Check if the value is not empty
                }
                // Log the result of the check function
                let finalResult = check();
                if (finalResult) {
                    firstDynaElement.parentElement.classList.toggle('fill');
                    const inputedvalue = firstDynaElement.dataset.intro;
                    dynamicgoals[inputedvalue].completed = !dynamicgoals[inputedvalue].completed;
                    completedGoalCount1 = dynamicgoals.four.completed ? 1 : 0;
                    slidingbar.style.width = (((completedGoalCount + completedGoalCount1 + completedGoalCount2) / (circleCheck.length + (dynacounting - 1))) * 100) + "%";
                    slidingbar.firstElementChild.innerText = `${completedGoalCount + completedGoalCount1 + completedGoalCount2}/${circleCheck.length + (dynacounting - 1)} completed`;
                    quotes.innerText = allquotes[completedGoalCount + completedGoalCount1 + completedGoalCount2];
                    localStorage.setItem('dynaGoals', JSON.stringify(dynamicgoals))
                    console.log("first " + dynacounting);
                    console.log("first " + completedGoalCount1);
                    console.log("first " + completedGoalCount2);
                }

            }
            else {
                errorLabel.parentElement.classList.add('extrainfo')
            }



        })
    }

    if (secondDynaElement) {
        secondDynaElement.previousElementSibling.addEventListener('click', (e) => {
            const alldata = [...allinputs]
            const finalvalue = alldata.every((input) => {
                return input.value;
            })
            if (finalvalue) {
                let check1 = () => {
                    return secondDynaElement.value.trim() !== '';
                }
                let finalResult1 = check1();
                if (finalResult1) {
                    secondDynaElement.parentElement.classList.toggle('fill');
                    const inputedvalue1 = secondDynaElement.dataset.intro;
                    dynamicgoals[inputedvalue1].completed = !dynamicgoals[inputedvalue1].completed;
                    completedGoalCount2 = dynamicgoals.five.completed ? 1 : 0;
                    slidingbar.style.width = (((completedGoalCount + completedGoalCount1 + completedGoalCount2) / (circleCheck.length + (dynacounting - 1))) * 100) + "%";
                    slidingbar.firstElementChild.innerText = `${completedGoalCount + completedGoalCount1 + completedGoalCount2}/${circleCheck.length + (dynacounting - 1)} completed`;
                    quotes.innerText = allquotes[completedGoalCount + completedGoalCount1 + completedGoalCount2];
                    localStorage.setItem('dynaGoals', JSON.stringify(dynamicgoals))
                    console.log("second " + dynacounting);
                    console.log("second " + completedGoalCount1);
                    console.log("second " + completedGoalCount2);
                }
            }

            else {
                errorLabel.parentElement.classList.add('extrainfo')
            }


        })
    }



    dynainputs.forEach((inputs) => {
        if (dynamicgoals[inputs.dataset.intro]) {
            inputs.value = dynamicgoals[inputs.dataset.intro].name;

        }
        if (dynamicgoals[inputs.dataset.intro] && dynamicgoals[inputs.dataset.intro].completed) {
            inputs.parentElement.classList.add('fill');
        }
        inputs.addEventListener('focus', () => {
            errorLabel.parentElement.classList.remove('extrainfo');
            errorlabeling.parentElement.classList.remove('altraextra');
        })
        inputs.addEventListener('input', (e) => {
            if (dynamicgoals[inputs.dataset.intro] && dynamicgoals[inputs.dataset.intro].completed) {
                inputs.value = dynamicgoals[inputs.dataset.intro].name;
                return;
            }

            dynamicgoals[e.target.dataset.intro] = {
                name: e.target.value,
                completed: false,
            }
            localStorage.setItem('dynaGoals', JSON.stringify(dynamicgoals));
        })
    })
    if (dynacounting < 3) {
        let checkingTest = dynamicgoals.four.completed ? 1 : 0;
        if (checkingTest && !dynamicgoals.five.completed) {
            slidingbar.style.width = (((completedGoalCount + completedGoalCount1) / (circleCheck.length + dynacounting)) * 100) + "%";
            slidingbar.firstElementChild.innerText = `${completedGoalCount + completedGoalCount1}/${circleCheck.length + dynacounting} completed`;
            quotes.innerText = allquotes[completedGoalCount + completedGoalCount1];
            dynacounting++;
        }
        else if (dynamicgoals.five.completed) {
            slidingbar.style.width = (((completedGoalCount + completedGoalCount1 + completedGoalCount2) / (circleCheck.length + dynacounting)) * 100) + "%";
            slidingbar.firstElementChild.innerText = `${completedGoalCount + completedGoalCount1 + completedGoalCount2}/${circleCheck.length + dynacounting} completed`;
            quotes.innerText = allquotes[completedGoalCount + completedGoalCount1 + completedGoalCount2];
            dynacounting++;
        }
        else {
            slidingbar.style.width = (((completedGoalCount + completedGoalCount1) / (circleCheck.length + dynacounting)) * 100) + "%";
            slidingbar.firstElementChild.innerText = `${completedGoalCount}/${circleCheck.length + dynacounting} completed`;
            quotes.innerText = allquotes[completedGoalCount];
            dynacounting++;
        }
    }


};

const removeEventHandler = () => {
    const firstDynaElement = document.querySelector('[data-intro="four"]');
    const secondDynaElement = document.querySelector('[data-intro="five"]');
    const dynadiv = dynamicELement.querySelectorAll('.removeitem');
    const lastdiv = dynadiv[dynadiv.length - 1];
    if (lastdiv) {
        lastdiv.classList.remove('fill');
        const removedValueIntro = lastdiv.querySelector('.testy').dataset.intro;

        if (removedValueIntro === firstDynaElement.dataset.intro) {
            completedGoalCount1 = 0;
        }
        else if (removedValueIntro === secondDynaElement.dataset.intro) {
            completedGoalCount2 = 0;
        }
        // Remove the value from local storage
        dynamicgoals[removedValueIntro].name = '';
        dynamicgoals[removedValueIntro].completed = false;
        localStorage.setItem('dynaGoals', JSON.stringify(dynamicgoals)); ``

        // Clear the value from the input field
        lastdiv.querySelector('.testy').value = '';

        lastdiv.remove();
        count--;
        if (count < 2) {
            errorlabeling.parentElement.classList.remove('altraextra');

        }
        if (dynacounting <= 3) {
            let checkingTest = dynamicgoals.four.completed ? 1 : 0;
            if (checkingTest && !dynamicgoals.five.completed) {
                slidingbar.style.width = (((completedGoalCount +
                    completedGoalCount1) / (circleCheck.length + (dynacounting - 2))) * 100) + "%";
                slidingbar.firstElementChild.innerText = `${completedGoalCount + completedGoalCount1}/${circleCheck.length + (dynacounting - 2)} completed`;
                quotes.innerText = allquotes[completedGoalCount + completedGoalCount1];
                dynacounting--;
            }
            else if (dynamicgoals.five.completed) {
                slidingbar.style.width = (((completedGoalCount + completedGoalCount1 + completedGoalCount2) / (circleCheck.length + (dynacounting - 1))) * 100) + "%";
                slidingbar.firstElementChild.innerText = `${completedGoalCount + completedGoalCount1 + completedGoalCount2}/${circleCheck.length + (dynacounting - 1)} completed`;
                quotes.innerText = allquotes[completedGoalCount + completedGoalCount1 + completedGoalCount2];
                dynacounting--;
            }
            else {
                slidingbar.style.width = (((completedGoalCount) / (circleCheck.length + (dynacounting - 2))) * 100) + "%";
                slidingbar.firstElementChild.innerText = `${completedGoalCount}/${circleCheck.length + (dynacounting - 2)} completed`;
                quotes.innerText = allquotes[completedGoalCount];
                dynacounting--;
            }
        }

    }

};


addGoal.addEventListener('click', eventHandler);
removeGoal.addEventListener('click', removeEventHandler);


function reloadLogicfun() {

    if (location.reload) {

        if (dynamicgoals && dynamicgoals.four.completed) {
            completedGoalCount1 = 1;
        }
        if (dynamicgoals && dynamicgoals.five.completed) {
            completedGoalCount2 = 1;

        }
        slidingbar.style.width = (((completedGoalCount + completedGoalCount1 + completedGoalCount2) / (circleCheck.length + dynamicELement.childElementCount)) * 100) + "%";
        slidingbar.firstElementChild.innerText = `${(completedGoalCount + completedGoalCount1 + completedGoalCount2)}/${(circleCheck.length + dynamicELement.childElementCount)} completed`;
        quotes.innerText = allquotes[completedGoalCount + completedGoalCount1 + completedGoalCount2];

        if (dynamicgoals != null) {
            if (dynamicgoals.four.name != '' && dynamicgoals.five.name == '') {

                addGoal.click();
            }
            if (dynamicgoals.five.name != '' && dynamicgoals.four.name != '') {

                for (let i = 1; i <= 2; i++) {
                    addGoal.click();
                }
            }
            if (dynamicgoals.four.name == '' && dynamicgoals.five.name != '') {
                for (let i = 1; i <= 2; i++) {
                    addGoal.click();
                }
            }
        }
    }
}
reloadLogicfun();