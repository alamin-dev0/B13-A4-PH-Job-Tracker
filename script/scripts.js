
const jobsData = [
    { id: 1, company: "Mobile First Corp", position: "React Native Developer", location: "Remote", type: "Full-time", salary: "$130,000 - $175,000", desc: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.", status: "not-applied" },
    { id: 2, company: "WebFlow Agency", position: "Web Designer & Developer", location: "Los Angeles, CA", type: "Part-time", salary: "$80,000 - $120,000", desc: "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.", status: "not-applied" },
    { id: 3, company: "DataViz Solutions", position: "Data Visualization Specialist", location: "Boston, MA", type: "Full-time", salary: "$125,000 - $165,000", desc: "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.", status: "not-applied" },
    { id: 4, company: "CloudFirst Inc", position: "Backend Developer", location: "Seattle, WA", type: "Full-time", salary: "$140,000 - $190,000", desc: "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.", status: "not-applied" },
    // Add 4 more similar realistic jobs to make it 8
    { id: 5, company: "TechNova", position: "Frontend Engineer", location: "San Francisco, CA", type: "Full-time", salary: "$110,000 - $150,000", desc: "Build responsive UIs with React, TypeScript, and Tailwind CSS for fast-growing SaaS platform.", status: "not-applied" },
    { id: 6, company: "InnoSoft BD", position: "Full Stack Developer", location: "Dhaka, Bangladesh", type: "Full-time", salary: "৳80,000 - ৳1,20,000", desc: "Develop end-to-end features using MERN stack. Opportunity to work on high-traffic local apps.", status: "not-applied" },
    { id: 7, company: "GlobalEdge", position: "UI/UX Designer", location: "Remote", type: "Contract", salary: "$90,000 - $130,000", desc: "Design intuitive user interfaces and experiences for enterprise products.", status: "not-applied" },
    { id: 8, company: "NextGen Labs", position: "DevOps Engineer", location: "Remote", type: "Full-time", salary: "$120,000 - $160,000", desc: "Automate infrastructure with Terraform, Kubernetes, and CI/CD pipelines.", status: "not-applied" }
];

let jobs = [...jobsData];

const jobsGrid = document.getElementById('jobs-grid');
const emptyState = document.getElementById('empty-state');
const totalCount = document.getElementById('total-count');
const interviewCount = document.getElementById('interview-count');
const rejectedCount = document.getElementById('rejected-count');
const jobCountEl = document.getElementById('job-count');
const tabs = document.querySelectorAll('.tab');

function renderJobs(tab = 'all') {
    jobsGrid.innerHTML = '';
    let filtered = jobs;

    if (tab === 'interview') filtered = jobs.filter(j => j.status === 'interview');
    if (tab === 'rejected') filtered = jobs.filter(j => j.status === 'rejected');

    jobCountEl.textContent = `${filtered.length} jobs`;

    if (filtered.length === 0) {
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');

    filtered.forEach(job => {
        const card = document.createElement('div');
        card.className = 'job-card';
        card.innerHTML = `
          <h3>${job.company}</h3>
          <div class="position">${job.position}</div>
          <div class="meta">
            <span>${job.location} • ${job.type}</span>
            <span>${job.salary}</span>
          </div>
          <span class="status-tag ${job.status === 'not-applied' ? 'not-applied' : job.status === 'applied' ? 'applied' : ''}">
            ${job.status === 'interview' ? 'INTERVIEW' : job.status === 'rejected' ? 'REJECTED' : 'NOT APPLIED'}
          </span>
          <p class="description">${job.desc}</p>
          <div class="actions">
            <button class="btn btn-interview ${job.status === 'interview' ? 'disabled' : ''}" 
              ${job.status === 'interview' ? 'disabled' : ''} 
              onclick="updateStatus(${job.id}, 'interview')">
              INTERVIEW
            </button>
            <button class="btn btn-rejected ${job.status === 'rejected' ? 'disabled' : ''}" 
              ${job.status === 'rejected' ? 'disabled' : ''} 
              onclick="updateStatus(${job.id}, 'rejected')">
              REJECTED
            </button>
            <button class="btn-delete" onclick="deleteJob(${job.id})"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        `;
        jobsGrid.appendChild(card);
    });

    updateCounts();
}

function updateStatus(id, newStatus) {
    const job = jobs.find(j => j.id === id);
    if (job) {
        job.status = newStatus;
        renderJobs(getActiveTab());
    }
}

function deleteJob(id) {
    jobs = jobs.filter(j => j.id !== id);
    renderJobs(getActiveTab());
}

function getActiveTab() {
    const active = document.querySelector('.tab.active');
    return active ? active.dataset.tab : 'all';
}

function updateCounts() {
    totalCount.textContent = jobs.length;
    interviewCount.textContent = jobs.filter(j => j.status === 'interview').length;
    rejectedCount.textContent = jobs.filter(j => j.status === 'rejected').length;
}

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderJobs(tab.dataset.tab);
    });
});

// Initial render
renderJobs('all');



