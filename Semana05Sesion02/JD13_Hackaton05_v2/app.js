const blackList = ['1234', '2222', '3333', '4444', '5555'];

class Phone {
    constructor(serial, imei, brand) {
        this.serial = serial;
        this.imei = imei;
        this.brand = brand;
        this.isElegible = false;
    }
    // Metodo
    checkElegibility() {
        // revisar lista negra
        if (blackList.includes(this.imei)) {
            this.isElegible = false;
        } else {
            this.isElegible = true;
        }
    }
}


class Thecnician {
    constructor(name, skills) {
        this.name = name;
        this.skills = skills;
        this.id = Date.now();
    }

    canRepair(brand) {
        return this.skills.includes(brand);
    }
}

class Repair {
    constructor(phone) {
        this.phone = phone;
        this.diagnosis = '';
        this.autorization = false;
        this.downPayment = 0;
        this.thecnician = null;
        this.parts = [];
        this.status = 'En Revisión';
        this.id = Date.now();
    }

    saveDiagnostic(diagnosis) {
        this.diagnosis = diagnosis;
    }

    confirmAuthorization(hasAuth, payment) {
        this.authorization = hasAuth;
        this.downPayment = payment;
    }

    assignTechnician(id) {
        for (let tech of thecnicians) {
            if (tech.canRepair(this.phone.brand)) {
                this.thecnician = id;

            }
        }
    }

    addPart(partStr) {
        this.parts = this.parts.concat(partStr.split(',').map(p => p.trim()));
    }

    updateStatus(newStatus) {
        this.status = newStatus;
    }

}

const thecnicians = [
    new Thecnician('Roberto Salazar', ['Iphone', 'Honor', 'Samsung']),
    new Thecnician('Carlos Martinez', ['Oppo', 'Samsung']),
    new Thecnician('Maria Silva', ['Honor', 'Huawei']),
    new Thecnician('Rocio Durand', ['Iphone', 'Huawei']),
]

function showSection(sectionId) {
    document.getElementById(sectionId).classList.remove('hidden');
}

function hiddenSection(sectionId) {
    document.getElementById(sectionId).classList.add('hidden');
}


showSection('register-repair-form');


// Proceso de Reparacion
let currentRepair = null;



document.getElementById('send-repair').addEventListener('click', () => {
    const serial = document.getElementById('serial').value;
    const imei = document.getElementById('imei').value;
    const brand = document.getElementById('brand').value;

    if (!serial || !imei || !brand) {
        alert('Complete los detalles.')
        return;
    }

    const phone = new Phone(serial, imei, brand);

    console.log(phone);

    phone.checkElegibility()

    if (phone.isElegible) {
        currentRepair = new Repair(phone);
        hiddenSection('register-repair-form');
        showSection("first-diagnosis-section");
    } else {
        alert('Telefono Registrado como robado.')
    }
})

document.getElementById('send-first-diagnosis').addEventListener('click', () => {
    const first_diagnosis = document.getElementById('first-diagnosis').value;
    const authorization = document.getElementById('authorization').checked;
    const payment = document.getElementById('payment').value;

    if (!authorization) {
        return alert('Se necesita la Autorizacion del usuario.')
    }

    if (Number(payment) <= 0) {
        return alert('Debe ingrese un monto valido')
    }

    if (first_diagnosis === '') {
        return alert('Ingresar un diagnostico.')
    }

    currentRepair.confirmAuthorization(authorization, payment);
    currentRepair.saveDiagnostic(first_diagnosis);

    hiddenSection('first-diagnosis-section');

    const selectTech = document.getElementById("tech-select");

    const filterTechs = thecnicians.filter(tech => {
        return tech.skills.includes(currentRepair.phone.brand)
    })

    filterTechs.forEach(item => {
        const newOtion = document.createElement("option");
        newOtion.value = item.id;
        newOtion.textContent = item.name;
        selectTech.appendChild(newOtion);
    })
    
    showSection("select-thecnician");
})


document.getElementById('send-tech').addEventListener('click', () => {
    const techSelect = document.getElementById('tech-select').value;
    const parts = document.getElementById('parts').value;

    console.log(`${techSelect} ${parts}`);

    currentRepair.assignTechnician(techSelect);

    currentRepair.addPart(parts);

    localStorage.setItem('current_repair', JSON.stringify(currentRepair));

    currentRepair = null;

    alert('Reparacion creada y asignada de manera correcta');

    hiddenSection('select-thecnician');
    showSection('register-repair-form');


})