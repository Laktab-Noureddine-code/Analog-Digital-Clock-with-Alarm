var big_arrow = document.querySelector('.big_arrow');
var small_arrow = document.querySelector('.small_arrow');
var red_arrow = document.querySelector('.red_arrow');
var digital_clock = document.querySelector('.digital-clock span');

function digital(hour ,minute ,second){
    second < 10 ? second = `0${second}` : second = second;
    minute < 10 ? minute = `0${minute}` : minute = minute;
    hour < 10 ? hour = `0${hour}` : hour = hour;
    return `${hour}:${minute}:${second}`;
}

function getHourMinute(hour ,minute){
    minute < 10 ? minute = `0${minute}` : minute = minute;
    hour < 10 ? hour = `0${hour}` : hour = hour;
    return `${hour}:${minute}`;
}


const addAlarm = document.querySelector('.addAlarm'),
     alarmTime = document.getElementById('time'),
timesContainer = document.querySelector('.times');

let arrayOfTimes = [];


function addTimesToPage(arrayOfTimes){
    timesContainer.innerHTML = "";
    arrayOfTimes.forEach(item=>{
        const p = document.createElement('p')
        p.innerHTML = `
            ${item.time}
            <span class="del">&times;</span>
        `
        p.setAttribute('data-id' ,item.id)
        p.classList.add('item')
        if(item.completed){
            p.classList.add('done')
        }
        timesContainer.append(p)
    });
}



function addTimesToArray(value){
    arrayOfTimes.push(
        {
            id : Date.now(),
            time : value,
            completed : false
        }
    )
}

addAlarm.addEventListener('click' ,()=>{
    if(time.value){
        addTimesToArray(time.value)
        addTimesToPage(arrayOfTimes)
    }
    time.value  =""
});

//  delete the time from times 
function deleteTimeFromArray(timeId){
    arrayOfTimes = arrayOfTimes.filter(item => item.id != timeId)
}

timesContainer.addEventListener('click' ,(e)=>{
    if(e.target.classList.contains('del')){
        const timeId = e.target.parentElement.dataset.id
        deleteTimeFromArray(timeId)
        addTimesToPage(arrayOfTimes)
    }
})
let alarmTriggered = false;
setInterval(()=>{
    var time_now = new Date();
    var second = time_now.getSeconds();
    var minute = time_now.getMinutes();
    var hour = time_now.getHours();
    // console.log(hour)
    red_arrow.style.transform = `rotate(${second * 6}deg)`;
    big_arrow.style.transform = `rotate(${minute * 6}deg)`;
    small_arrow.style.transform = `rotate(${hour * 30}deg)`;
    digital_clock.innerHTML = ""
    digital_clock.append(digital(hour ,minute ,second));
    arrayOfTimes.forEach(item=>{
        if(item.time == getHourMinute(hour ,minute) && !alarmTriggered){
            const audio = document.getElementById('audio')
            audio.play()
            item.completed = true
            addTimesToPage(arrayOfTimes)
        }
    })
} ,1000);