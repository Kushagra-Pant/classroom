function date(){
    today = new Date();
    options = { month: 'short', day: '2-digit', year: 'numeric' };
    document.getElementById("date").innerHTML = "Today's Date: " + today.toLocaleDateString('en-US', options);
}

class Student {
    constructor(name, days, attendance, makeups){
        this.name = name;
        this.days = days;
        this.att = attendance;
        this.makeups = makeups;
    }
}

students = []

function extract(){
    return fetch('students.txt').then(response => response.text()).then(data=>{
        const lines = data.trim().split("\n")

        for(i = 0; i < lines.length; i++){
            [nom, days, attendance, makeups] = lines[i].split('\t');
            students.push(new Student(nom, days.split(','), attendance.split(';'), makeups.split(',')));
        }

    })
}

function createClassroom(){
    room = document.getElementById('room');
    amount = students.length
    if(amount > 0){
        for(i = 0; i < amount; i++){
            studentDiv = document.createElement('div')
            studentDiv.id = 'student' + (i + 1)
            studentDiv.classList.add('desk')
            room.appendChild(studentDiv)

            text = document.createElement('p')
            text.innerHTML = students[i].name
            text.classList.add('student')
            studentDiv.appendChild(text)
        }
    }
}

function load(){
    date()
    extract().then(() => {
        createClassroom();
    });
}

function save(){
    write = ""
    for(i = 0; i < students.length; i++){
        write += students[i].name + '\t' + students[i].days.join(',') + '\t' + students[i].att.join(';') + '\t' + students[i].makeups.join(',') +'\n'
    }
    console.log(write)
}

function add(){
    days = document.getElementsByClassName("check")
    siq = students.push(new Student(document.getElementById("name").value, [], [], []))
    for(i = 0; i < days.length; i++){
        if(days[i].checked){
            siq.days.push(days[i].id)
        }
    }
    console.log(siq.days)
    save().then(() => {
        window.location.href = 'tution.html'
    });
}
