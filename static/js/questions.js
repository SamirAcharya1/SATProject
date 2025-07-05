  const dropArea = document.getElementById('drop-area');
  const preview = document.getElementById('preview');

  // ==== IMAGE UPLOAD HANDLING ====
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, e => e.preventDefault(), false);
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => dropArea.classList.add('highlight'), false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => dropArea.classList.remove('highlight'), false);
  });

  dropArea.addEventListener('drop', e => {
    const file = e.dataTransfer.files[0];
    handleImage(file);
  });

  window.addEventListener('paste', e => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        handleImage(file);
        break;
      }
    }
  });

  document.getElementById('fileElem').addEventListener('change', e => {
    handleImage(e.target.files[0]);
  });

  function handleImage(file) {
    if (!file || !file.type.startsWith('image/')) {
      alert("Only image files are allowed.");
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }

  // ==== DYNAMIC CATEGORY SWITCH BASED ON SUBJECT ====
  const subjectSelect = document.getElementById('subject');
  const categorySelect = document.getElementById('category');

  const mathCategories = [
    { text: "Algebra", value: "Algebra" },
    { text: "Problem Solving", value: "Problem Solving" },
    { text: "Advanced Math", value: "Advanced Math" },
    { text: "Geometry", value: "Geometry" },
  ];

  const englishCategories = [
    { text: "Information and Ideas", value: "Information and Ideas" },
    { text: "Craft and Structure", value: "Craft and Structure" },
    { text: "Expression of Ideas", value: "Expression of Ideas" },
    { text: "Standard English Conventions", value: "Standard English Conventions" },
  ];

  subjectSelect.addEventListener('change', () => {
    categorySelect.innerHTML = '<option selected disabled>Select Appropriate Category</option>';
    const categories = subjectSelect.value === 'English' ? englishCategories : mathCategories;
    categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.textContent = cat.text;
      opt.value = cat.value;
      categorySelect.appendChild(opt);
    });
  });

  // ==== DYNAMIC FIELD TOGGLE BASED ON MCQ/SPR ====
  const qTypeSelect = document.getElementById('QType');
  const correctAnsSelect = document.getElementById('correctAns');

  const optionA = document.querySelector('input[name="A"]');
  const optionB = document.querySelector('input[name="B"]');
  const optionC = document.querySelector('input[name="C"]');
  const optionD = document.querySelector('input[name="D"]');

  qTypeSelect.addEventListener('change', () => {
    if (qTypeSelect.value === 'spr') {
      // SPR: Only A is editable and valid
      optionA.disabled = false;
      optionB.disabled = true;
      optionC.disabled = true;
      optionD.disabled = true;

      correctAnsSelect.innerHTML = '<option value="A">A</option>';
    } else {
      // MCQ: All options enabled
      optionA.disabled = false;
      optionB.disabled = false;
      optionC.disabled = false;
      optionD.disabled = false;

      correctAnsSelect.innerHTML = `
        <option selected disabled>Correct One</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
      `;
    }
  });