let projects = JSON.parse(localStorage.getItem('projects')) || [];

const addProjectButton = document.getElementById('addProjectButton');
const projectList = document.getElementById('projectList');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');

addProjectButton.addEventListener('click', function() {
    const title = document.getElementById('projectTitle').value;
    const description = document.getElementById('projectDescription').value;
    const status = document.getElementById('projectStatus').value;

    if (!title || !description || !status) {
        alert("Please fill in all fields.");
        return;
    }

   const newProject = { title, description, status };

    projects.push(newProject);
    saveProjects();
    renderProjects();
    clearForm();
});

function renderProjects() {
    projectList.innerHTML = '';

    const filteredProjects = filterProjects();
    filteredProjects.forEach((project, index) => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project-item');
        
        projectElement.innerHTML = `
            <div>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
            <span class="project-status ${project.status.replace(/\s+/g, '')}">${project.status}</span>
            <div class="project-actions">
                <button onclick="editProject(${index})">Edit</button>
                <button onclick="deleteProject(${index})">Delete</button>
            </div>
        `;

        projectList.appendChild(projectElement);
    });
}

function saveProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function clearForm() {
    document.getElementById('projectTitle').value = '';
    document.getElementById('projectDescription').value = '';
    document.getElementById('projectStatus').value = 'Pending';
}

function deleteProject(index) {
    projects.splice(index, 1);
    saveProjects();
    renderProjects();
}

function editProject(index) {
    const project = projects[index];
    document.getElementById('projectTitle').value = project.title;
    document.getElementById('projectDescription').value = project.description;
    document.getElementById('projectStatus').value = project.status;
    deleteProject(index);
}

function filterProjects() {
    const filterValue = statusFilter.value;
    const searchValue = searchInput.value.toLowerCase();

    return projects.filter(project => {
        const statusMatches = filterValue === 'All' || project.status === filterValue;
        const titleMatches = project.title.toLowerCase().includes(searchValue);
        return statusMatches && titleMatches;
    });
}

searchInput.addEventListener('input', renderProjects);

statusFilter.addEventListener('change', renderProjects);

renderProjects();