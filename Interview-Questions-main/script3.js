var clickedDivs = [];
const generalQues = [];
const techQues = [];
const salesQues = [];
const oparatQues = [];
const wrapupQues = [];
var clickCount = 0;
var counter = 0;


var workbook;
const divContainer = document.getElementById('div-container');


const upload = document.getElementById('upload');
upload.addEventListener("click", handleUpload);
function handleUpload() {
  const fileInput = document.querySelector('.inputExcel');
  const file = fileInput.files[0];

  if (!file) {
    alert('Please select an Excel file.');
    return;
  }

  // Read the file data
  const reader = new FileReader();
  reader.onload = handleFileRead;
  reader.readAsArrayBuffer(file);
}

function handleFileRead(event) {
  console.log("event: " + event);
  const arrayBuffer = event.target.result;
  console.log("arrayBuffer: " + arrayBuffer);

  const data = new Uint8Array(arrayBuffer);
  console.log(data);
  const workbook = XLSX.read(data, { type: 'array' });

  // Assuming you want to display the data in the console
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  console.log(jsonData);
  displayJsonToHtmlTable(jsonData);
}


// document.addEventListener('DOMContentLoaded', function () {
//   fetch('data.xlsx')
//     .then(response => response.arrayBuffer())
//     .then(data => {
//       console.log(data);
//       workbook = XLSX.read(data, { type: 'binary' });
//       var firstSheetName = workbook.SheetNames[0];
//       var jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);
//       console.log(jsonData);
//       displayJsonToHtmlTable(jsonData);
//     })
//   console.log('Page loaded');
// });


function displayJsonToHtmlTable(jsonData) {

  jsonData.forEach(function (row) {

    console.log(row);
    if (row[0].includes("General")) {
      generalQues.push(row);
    }
    else if (row[0].includes("Wrap Up Questions")) {
      wrapupQues.push(row);
    }
    else if (row[0].includes("Office and Tech Questions")) {
      techQues.push(row);
    }
    else if (row[0].includes("Sales Questions")) {
      salesQues.push(row);
    }
    else if (row[0].includes("Oparations Questions")) {
      oparatQues.push(row);
    }
    else {
      console.log("no")
    }

  });

  const div1 = document.createElement('div');
  div1.classList.add('div1');
  divContainer.appendChild(div1);
  const div2 = document.createElement('div');
  div2.classList.add('div2');
  divContainer.appendChild(div2);
  const div3 = document.createElement('div');
  div3.classList.add('div3');
  divContainer.appendChild(div3);
  const div4 = document.createElement('div');
  div4.classList.add('div4');
  divContainer.appendChild(div4);
  const div5 = document.createElement('div');
  div5.classList.add('div5');
  divContainer.appendChild(div5);
  const resetButton = document.createElement('button');
  resetButton.classList.add("reset");
  resetButton.textContent = "Reset";
  divContainer.appendChild(resetButton);

  resetButton.addEventListener("click", function () {
    const divs = document.querySelectorAll(".clickabl");
    divs.forEach(element => {
      element.remove();
      clickedDivs = [];
      clickCount = 0;
    });
  });
console.log(generalQues);
  const gqDiv = document.createElement('div');
  gqDiv.textContent = "General Questions";
  gqDiv.classList.add('clickable-div-gq');
  gqDiv.setAttribute('data-content', generalQues);
  div1.appendChild(gqDiv);
  const sqDiv = document.createElement('div');
  sqDiv.textContent = "Sales Questions";
  sqDiv.classList.add('clickable-div-sq');
  sqDiv.setAttribute('data-content', salesQues);
  div2.appendChild(sqDiv);
  const tqDiv = document.createElement('div');
  tqDiv.textContent = "Office and Tech Questions";
  tqDiv.classList.add('clickable-div-tq');
  tqDiv.setAttribute('data-content', techQues);
  div3.appendChild(tqDiv);
  const oqDiv = document.createElement('div');
  oqDiv.textContent = "Oparations Questions";
  oqDiv.classList.add('clickable-div-sq');
  oqDiv.setAttribute('data-content', oparatQues);
  console.log(oparatQues);
  div4.appendChild(oqDiv);
  const wqDiv = document.createElement('div');
  wqDiv.textContent = "Wrap Up Questions";
  wqDiv.classList.add('clickable-div-oq');
  wqDiv.setAttribute('data-content', wrapupQues);
  div5.appendChild(wqDiv);

function createNewDivs (data,div22,is){
  const diva = document.querySelectorAll('.clickabl');
  const divand = document.getElementById(is);
  clickCount++;
  console.log(divand);
  console.log(divand);

  if (clickCount == 1) {
    const ques = data;
    console.log(ques);
    if (divand == null) {
      ques.forEach(function (row) {
        const div = document.createElement('div');
        div.setAttribute('data-content', row);
        div.textContent = row;
        div.id = is;
        div.classList.add('clickabl');
        div22.appendChild(div);
        div.addEventListener('click', function () {
          if(!this.classList.contains('clicked')){
            const content = this.getAttribute('data-content');
            clickedDivs.push(content);
            this.classList.add('clicked');
          }

          else{
            const content = this.getAttribute('data-content');
            const index = clickedDivs.indexOf(content);
            clickedDivs.splice(index,1);
            this.classList.remove('clicked');

          }

          });

      });
    }
    else {
      for (var i = 0; i < diva.length; i++) {
        if(diva[i].id == is){
          diva[i].style.display = "block";
        }
      }
    }
  }
  else {
    const divas = document.querySelectorAll('.clickabl');
    for (var i = 0; i < divas.length; i++) {
      divas[i].style.display= "none";
    }
    clickCount = 0;
  }
}
gqDiv.addEventListener("click", createNewDivs.bind(null, generalQues,div1,"gq"));
sqDiv.addEventListener("click", createNewDivs.bind(null, salesQues,div2,"sq"));
oqDiv.addEventListener("click", createNewDivs.bind(null, oparatQues,div4,"oq"));
wqDiv.addEventListener("click", createNewDivs.bind(null, wrapupQues,div5,"wq"));
tqDiv.addEventListener("click", createNewDivs.bind(null, techQues,div3,"tq"));


  const transferButton = document.getElementById('transfer-button');


  const menu = document.querySelector('.menu-bar');

  transferButton.addEventListener('click', function () {


  menu.style.display = "flex";
  const clickedDivsWithInput = [];
  const divmain = document.createElement('div');
  const button = document.createElement('button');
  const close = document.createElement('button');
  button.classList.add('button-style');
  divmain.classList.add('clicked-divs');
  menu.appendChild(divmain);
  close.classList.add('close');

  button.textContent = "Download";
  close.textContent = "X";

  // Loop through the clicked divs and display them in the 'clicked-divs' div
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
    
    divmain.appendChild(div);
    divmain.appendChild(input);
    
    clickedDivsWithInput.push(divWithInput);
  
  });
  divmain.appendChild(button);
  divmain.appendChild(close);



  
  close.addEventListener('click',function(){
    menu.style.display = "none";
    divmain.remove();
  });


  
  
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
    XLSX.writeFile(workbook, 'data1.xls');
    }
    button.addEventListener('click',exportToexcel)
  });
}
