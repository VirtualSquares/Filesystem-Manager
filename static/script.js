document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const createFolderBtn = document.getElementById('createFolderBtn');
    const createFolderModal = document.getElementById('createFolderModal');
    const createFolderSubmitBtn = document.getElementById('createFolderSubmitBtn');
    const cancelCreateBtn = document.getElementById('cancelCreateBtn');
    const folderNameInput = document.getElementById('folderNameInput');
  
    const createFileBtn = document.getElementById('createFileBtn');
    const createFileModal = document.getElementById('createFileModal');
    const createFileSubmitBtn = document.getElementById('createFileSubmitBtn');
    const cancelFileBtn = document.getElementById('cancelFileBtn');
    const fileNameInput = document.getElementById('fileNameInput');
  
    const deleteBtn = document.getElementById('deleteBtn');
    const deleteModal = document.getElementById('deleteModal');
    const deleteSubmitBtn = document.getElementById('deleteSubmitBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    const deleteNameInput = document.getElementById('deleteNameInput');
  
    const viewFileBtn = document.getElementById('viewFileBtn');
    const fileInput = document.getElementById('fileInput');
    const fileContentDiv = document.getElementById('fileContent');
    const contentDisplay = document.getElementById('contentDisplay');
  
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
      document.body.classList.add('dark');
    }
  
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
  
    createFolderBtn.addEventListener('click', () => {
      createFolderModal.style.display = 'flex';
    });
  
    cancelCreateBtn.addEventListener('click', () => {
      createFolderModal.style.display = 'none';
    });
  
    createFolderSubmitBtn.addEventListener('click', async () => {
      const folderName = folderNameInput.value.trim();
      if (!folderName) {
        alert('Please enter a folder name');
        return;
      }
  
      try {
        const response = await fetch('/create_folder', {
          method: 'POST',
          body: new URLSearchParams({ folder_name: folderName }),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        const data = await response.json();
        alert(data.message);
        if (response.ok) {
          createFolderModal.style.display = 'none';
        }
      } catch (error) {
        alert('Error creating folder: ' + error.message);
      }
    });
  
    createFileBtn.addEventListener('click', () => {
      createFileModal.style.display = 'flex';
    });
  
    cancelFileBtn.addEventListener('click', () => {
      createFileModal.style.display = 'none';
    });
  
    createFileSubmitBtn.addEventListener('click', async () => {
      const fileName = fileNameInput.value.trim();
      if (!fileName || !fileName.includes('.')) {
        alert('Please enter a valid file name with extension (e.g. notes.txt)');
        return;
      }
  
      try {
        const response = await fetch('/create_file', {
          method: 'POST',
          body: new URLSearchParams({ file_name: fileName }),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        const data = await response.json();
        alert(data.message);
        if (response.ok) {
          createFileModal.style.display = 'none';
        }
      } catch (error) {
        alert('Error creating file: ' + error.message);
      }
    });
  
    deleteBtn.addEventListener('click', () => {
      deleteModal.style.display = 'flex';
    });
  
    cancelDeleteBtn.addEventListener('click', () => {
      deleteModal.style.display = 'none';
    });
  
    deleteSubmitBtn.addEventListener('click', async () => {
      const name = deleteNameInput.value.trim();
      if (!name) {
        alert('Please enter a file or folder name');
        return;
      }
  
      try {
        const response = await fetch('/delete', {
          method: 'POST',
          body: new URLSearchParams({ name }),
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        const data = await response.json();
        alert(data.message);
        if (response.ok) {
          deleteModal.style.display = 'none';
        }
      } catch (error) {
        alert('Error deleting: ' + error.message);
      }
    });
  
    viewFileBtn.addEventListener('click', () => {
      fileInput.click();
    });
  
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
  
      fileContentDiv.style.display = 'block';
  
      const reader = new FileReader();
  
      reader.onload = function (event) {
        contentDisplay.textContent = event.target.result;
      };
  
      reader.onerror = function (error) {
        alert('Error reading file: ' + error);
      };
  
      reader.readAsText(file);
    });
  });
  
