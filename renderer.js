const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const { saveAs } = require('file-saver');
const fs = require('fs');
const path = require('path');
const he = require('he'); // HTML Entities library

let companyCount = 1;
let currentPage = 1;

document.getElementById('add-company').addEventListener('click', function() {
    companyCount++;
    const companyForms = document.getElementById('company-forms');
    const newForm = document.createElement('div');
    newForm.classList.add('company-form');
    newForm.id = `company-form-${companyCount}`;
    newForm.style.display = 'none';
    newForm.innerHTML = `
        <h4>Company ${companyCount}</h4>
        <div class="form-group">
            <label for="company${companyCount}">Company</label>
            <input type="text" class="form-control" id="company${companyCount}" name="company${companyCount}">
        </div>
        <div class="form-group">
            <label for="contact${companyCount}">Contact Person</label>
            <input type="text" class="form-control" id="contact${companyCount}" name="contact${companyCount}">
        </div>
        <div class="form-group">
            <label for="street${companyCount}">Street</label>
            <input type="text" class="form-control" id="street${companyCount}" name="street${companyCount}">
        </div>
        <div class="form-group">
            <label for="houseNumber${companyCount}">House Number</label>
            <input type="text" class="form-control" id="houseNumber${companyCount}" name="houseNumber${companyCount}">
        </div>
        <div class="form-group">
            <label for="zip${companyCount}">ZIP Code</label>
            <input type="text" class="form-control" id="zip${companyCount}" name="zip${companyCount}">
        </div>
        <div class="form-group">
            <label for="city${companyCount}">City</label>
            <input type="text" class="form-control" id="city${companyCount}" name="city${companyCount}">
        </div>
    `;
    companyForms.appendChild(newForm);

    document.getElementById('next-page').style.display = 'inline-block';

    // Automatisch zur nächsten Seite springen
    document.getElementById(`company-form-${currentPage}`).style.display = 'none';
    currentPage++;
    document.getElementById(`company-form-${currentPage}`).style.display = 'block';
    updateNavigationButtons();
});

document.getElementById('next-page').addEventListener('click', function() {
    if (currentPage < companyCount) {
        document.getElementById(`company-form-${currentPage}`).style.display = 'none';
        currentPage++;
        document.getElementById(`company-form-${currentPage}`).style.display = 'block';
        updateNavigationButtons();
    }
});

document.getElementById('prev-page').addEventListener('click', function() {
    if (currentPage > 1) {
        document.getElementById(`company-form-${currentPage}`).style.display = 'none';
        currentPage--;
        document.getElementById(`company-form-${currentPage}`).style.display = 'block';
        updateNavigationButtons();
    }
});

function updateNavigationButtons() {
    document.getElementById('prev-page').style.display = currentPage > 1 ? 'inline-block' : 'none';
    document.getElementById('next-page').style.display = currentPage < companyCount ? 'inline-block' : 'none';
}

document.getElementById('process').addEventListener('click', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('upload');
    const files = fileInput.files;

    if (files.length === 0) {
        alert('Please upload a Word file.');
        return;
    }

    const companies = [];

    for (let i = 1; i <= companyCount; i++) {
        companies.push({
            company: he.encode(document.getElementById(`company${i}`).value),
            contact: he.encode(document.getElementById(`contact${i}`).value),
            street: he.encode(document.getElementById(`street${i}`).value),
            houseNumber: he.encode(document.getElementById(`houseNumber${i}`).value),
            zip: he.encode(document.getElementById(`zip${i}`).value),
            city: he.encode(document.getElementById(`city${i}`).value),
        });
    }

    const file = files[0];

    companies.forEach((company, index) => {
        const reader = new FileReader();

        reader.onload = function(event) {
            const content = event.target.result;
            const zip = new PizZip(content);
            const doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
            });

            doc.setData({
                firma: company.company,
                ansprechpartner: company.contact,
                strasse: company.street,
                hausnummer: company.houseNumber,
                plz: company.zip,
                ort: company.city,
            });

            try {
                doc.render();
            } catch (error) {
                console.log(JSON.stringify({ error: error }));
                throw error;
            }

            const buf = doc.getZip().generate({ type: 'nodebuffer' });
            const outputPath = path.join(__dirname, `${company.company}_${index + 1}.docx`);

            fs.writeFileSync(outputPath, buf);

            saveAs(new Blob([buf], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }), `${company.company}_${index + 1}.docx`);

            // Temporäre Datei löschen
            fs.unlink(outputPath, (err) => {
                if (err) {
                    console.error(`Error deleting temp file: ${outputPath}`, err);
                } else {
                    console.log(`Temp file deleted: ${outputPath}`);
                }
            });
        };

        reader.readAsBinaryString(file);
    });

    function keycodeToText(keycode) {
        const specialKeys = {
            8: 'Backspace',
            9: 'Tab',
            13: 'Enter',
            16: 'Shift',
            17: 'Ctrl',
            18: 'Alt',
            19: 'Pause/Break',
            20: 'Caps Lock',
            27: 'Escape',
            32: 'Space',
            33: 'Page Up',
            34: 'Page Down',
            35: 'End',
            36: 'Home',
            37: 'Left Arrow',
            38: 'Up Arrow',
            39: 'Right Arrow',
            40: 'Down Arrow',
            45: 'Insert',
            46: 'Delete',
            // Add more special keys as needed
        };
    
        // Check if the keycode is for a special key
        if (specialKeys[keycode]) {
            return specialKeys[keycode];
        }
    
        // For alphanumeric keys, use String.fromCharCode
        // Note: This is simplistic and works primarily for standard US keyboard layouts
        return String.fromCharCode(keycode);
    }
});
