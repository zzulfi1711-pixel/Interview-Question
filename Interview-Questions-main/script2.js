// Get the clicked divs parameter from the URL and decode it
const urlParams = new URLSearchParams(window.location.search);
const clickedDivsString = urlParams.get('clickedDivs');
const clickedDivs = JSON.parse(decodeURIComponent(clickedDivsString));

const clickedDivsWithInput = [];
const button = document.createElement('button');
button.classList.add('button-style');
button.textContent = "Download";
// Loop through the clicked divs and display them in the 'clicked-divs' div
const clickedDivsDiv = document.getElementById('clicked-divs');
clickedDivs.forEach(function (content) {
  const div = document.createElement('div');
  const input = document.createElement('textarea');
  const divWithInput = { content: content, input: '' };
  
  div.textContent = content;
  div.classList.add('clicked2');
  
  input.classList.add('inpute');
  input.addEventListener('input', function () {
    divWithInput.input = input.value;
    // console.log(divWithInput);
    console.log(clickedDivsWithInput);
  });
  
  clickedDivsDiv.appendChild(div);
  clickedDivsDiv.appendChild(input);
  
  clickedDivsWithInput.push(divWithInput);

});
clickedDivsDiv.appendChild(button);


// Require the XLSX.js library


// Define the data you want to export to Excel as a JSON object


// Convert the JSON object to an array of arrays that can be used by XLSX.js
function exportToexcel(){
// Create a new workbook and add a worksheet with the converted data
const workSheetColumName = [
  "Questions",
  "Responses"
];
const data = clickedDivsWithInput.map(obj => [obj.content, obj.input ]);
console.log(data);
const worksheetData = [
  workSheetColumName,
  ...data
]
console.log(worksheetData);

const workbook = XLSX.utils.book_new();
console.log(workbook);

const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
console.log(worksheet);

XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

// Write the workbook to a file
XLSX.writeFile(workbook, 'data1.xlsx');
}
button.addEventListener('click',exportToexcel)