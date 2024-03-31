document.addEventListener("DOMContentLoaded", function() {
  const addForm = document.getElementById('addForm');
  const notification = document.getElementById('notification');
  const internList = document.getElementById('internList');

  addForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const birthdate = document.getElementById('birthdate').value;
    const university = document.getElementById('university').value;
    const major = document.getElementById('major').value;
    const year = document.getElementById('year').value;
    const cv = document.getElementById('cv').files[0];

    const newIntern = {
      name: name,
      gender: gender,
      birthdate: birthdate,
      university: university,
      major: major,
      year: year,
      cv: URL.createObjectURL(cv)
    };

    addForm.reset();
    notification.innerText = 'Data added successfully!';
    notification.style.display = 'block';
    setTimeout(function() {
      notification.style.display = 'none';
    }, 3000);

    displayIntern(newIntern);
  });

  function displayIntern(intern) {
    // ตรวจสอบว่าข้อมูลของนักศึกษาที่เพิ่มเข้ามานั้นมีบริษัทเดียวกันหรือไม่
    const internsWithSameCompany = internList.querySelectorAll(`.intern[data-company="${intern.company}"]`);
  
    // ถ้ามีข้อมูลของนักศึกษาที่มีบริษัทเดียวกันอยู่แล้ว
    if (internsWithSameCompany.length > 0) {
      const existingInternDiv = internsWithSameCompany[0]; // เลือกอันแรกเพื่อแทนที่ข้อมูลของนักศึกษาที่มีบริษัทเดียวกัน
      existingInternDiv.innerHTML += `
        <h2>${intern.name}</h2>
        <p><strong>Gender:</strong> ${intern.gender}</p>
        <p><strong>Birthdate:</strong> ${intern.birthdate}</p>
        <p><strong>University:</strong> ${intern.university}</p>
        <p><strong>Major:</strong> ${intern.major}</p>
        <p><strong>Year:</strong> ${intern.year}</p>
        <a href="${intern.cv}" target="_blank">View CV</a>
      `;
    } else {
      // ถ้ายังไม่มีข้อมูลของนักศึกษาที่มีบริษัทเดียวกัน
      const internDiv = document.createElement('div');
      internDiv.classList.add('intern');
      internDiv.setAttribute('data-company', intern.company); // เพิ่ม attribute เพื่อระบุบริษัทของนักศึกษา
      internDiv.innerHTML = `
        <h2>${intern.name}</h2>
        <p><strong>Gender:</strong> ${intern.gender}</p>
        <p><strong>Birthdate:</strong> ${intern.birthdate}</p>
        <p><strong>University:</strong> ${intern.university}</p>
        <p><strong>Major:</strong> ${intern.major}</p>
        <p><strong>Year:</strong> ${intern.year}</p>
        <a href="${intern.cv}" target="_blank">View CV</a>
      `;
      internList.appendChild(internDiv);
    }
  }
  

  window.onload = function() {
    alert('Welcome to the Internship Program');
  };
});