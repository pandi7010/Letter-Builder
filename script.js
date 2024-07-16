const reasons = {
    "Sick Leave": `I am writing to formally request sick leave as I am currently experiencing health issues that prevent me from attending work. I believe it is important to prioritize my health and ensure a full recovery before returning to my duties. I kindly ask for your understanding in this matter and hope to resume my responsibilities soon.`,
    
    "Personal Leave": `I would like to request a leave of absence for personal reasons. There are certain personal matters that require my immediate attention and cannot be postponed. I assure you that I will manage my responsibilities and will ensure a smooth workflow during my absence.`,
    
    "Vacation": `I am planning to take some time off for a family vacation. This break is crucial for me to recharge and spend quality time with my loved ones. I have ensured that my current projects will be up to date before my leave, and I will be reachable for any urgent matters.`,
    
    "Permission": `I seek your permission to take a short leave due to important commitments that I must attend to. This request is made with great respect for my responsibilities, and I assure you that I will handle any pending tasks accordingly.`,
    
    "Apology": `I sincerely apologize for any inconvenience caused by my recent absence. Unfortunately, circumstances arose that were beyond my control. I deeply appreciate your understanding and support during this time, and I am committed to ensuring that such issues do not affect my performance in the future.`
};

function addAddressLine() {
    const fromSection = document.getElementById('fromAddressSection');
    const toSection = document.getElementById('toAddressSection');

    fromSection.insertAdjacentHTML('beforeend', `
        <input type="text" class="name" placeholder="Name">
        <input type="text" class="qualification" placeholder="Qualification">
        <input type="text" class="place" placeholder="Place">
    `);
    toSection.insertAdjacentHTML('beforeend', `
        <input type="text" class="name" placeholder="Name">
        <input type="text" class="qualification" placeholder="Qualification">
        <input type="text" class="place" placeholder="Place">
    `);
}

function generateLetter() {
    const fromAddresses = Array.from(document.querySelectorAll('#fromAddressSection .name')).map(input => input.value).join(', ');
    const fromQualifications = Array.from(document.querySelectorAll('#fromAddressSection .qualification')).map(input => input.value).join(', ');
    const fromPlaces = Array.from(document.querySelectorAll('#fromAddressSection .place')).map(input => input.value).join(', ');

    const toAddresses = Array.from(document.querySelectorAll('#toAddressSection .name')).map(input => input.value).join(', ');
    const toQualifications = Array.from(document.querySelectorAll('#toAddressSection .qualification')).map(input => input.value).join(', ');
    const toPlaces = Array.from(document.querySelectorAll('#toAddressSection .place')).map(input => input.value).join(', ');

    const subject = document.getElementById('subject').value;
    const date = document.getElementById('date').value;
    const signatureName = document.getElementById('signatureName').value;
    const place = document.getElementById('place').value;
    const selectedReason = document.getElementById('reason').value;

    const body = reasons[selectedReason];

    const letter = `
    From,
        ${fromAddresses} 
        (${fromQualifications}) 
        ${fromPlaces}
        
        
        To,
        ${toAddresses} 
        (${toQualifications}) 
        ${toPlaces}
        
        
        
        Dear Sir/Madam,
              Subject: ${subject}

        ${body}
        
        Thank you for considering my request. I look forward to your positive response.
        
        Sincerely,
        <span style="font-family: 'Brush Script MT', cursive;">${signatureName}</span>
        
        ${date}
        ${place}
    `.trim();

    const formattedLetter = letter.replace(/\n/g, "<br>").replace(/^(?=.)/gm, '&nbsp;&nbsp;&nbsp;&nbsp;');

    document.getElementById('letterPreview').innerHTML = formattedLetter;
    document.getElementById('downloadBtn').style.display = 'block';
}

document.getElementById('downloadBtn').onclick = function() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    const letterText = document.getElementById('letterPreview').innerText;
    pdf.setFontSize(12);
    pdf.text(letterText, 10, 10, { maxWidth: 190 });
    pdf.save('letter.pdf');
};
