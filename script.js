const repositories = [
  {
    title: "Azure-Hub-and-Spoke-Lab-with-Bicep-Foundation-Phase",
    badge: "Cloud Architecture",
    description:
      "Concepts, tools, and repository work related to network cloud architecture.",
    fullDescription:
      "A repository space focused on Azure network architecture, particularly the hub-and-spoke model. This includes Bicep templates, design patterns, and practical implementations for secure and scalable virtual networks in Azure.",
    tags: ["Azure", "VNet", "Hub & Spoke", "Network security groups", "Bicep"],
    link: "https://github.com/broccoliandpepper/Azure-Hub-and-Spoke-Lab-with-Bicep-Foundation-Phase"
  },
  {
    title: "Infra-pfSense",
    badge: "Network Security",
    description:
      "A complete, production-ready home laboratory infrastructure based on pfSense, Hyper-V, Samba AD, VLANs, and DMZ isolation with Traefik reverse proxy.",
    fullDescription:
      "this repository is a comprehensive home lab infrastructure project centered around pfSense for network security. It includes Hyper-V for virtualization, Samba AD for directory services, VLANs for network segmentation, and DMZ isolation with Traefik as a reverse proxy. The project is designed to provide a secure and functional environment for learning and experimentation.",
    tags: ["Network Security", "pfSense", "virtualization", "Samba AD", "VLANs", "DMZ", "Traefik"],
    link: "https://github.com/broccoliandpepper/Infra-pfSense"
  },
  {
    title: "Jobs-Tracker-Project",
    badge: "Career Development",
    description:
      "Job application tracker — Node.js · Express · SQLite · Vanilla JS · Ollama AI · n8n Webhook",
    fullDescription:
      "A job application tracker built with Node.js, Express, SQLite, and Vanilla JS. It integrates Ollama AI for intelligent insights and n8n Webhook for automation. This project helps users manage their job applications efficiently, providing features like tracking application status, setting reminders, and generating reports.",
    tags: ["Node.js", "Express", "SQLite", "Vanilla JS", "Ollama AI", "n8n Webhook"],
    link: "https://github.com/broccoliandpepper/Jobs-Tracker-Project"
  }
];

const libraryGrid = document.getElementById("libraryGrid");
const repoModal = document.getElementById("repoModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTags = document.getElementById("modalTags");
const modalLink = document.getElementById("modalLink");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

repositories.forEach((repo) => {
  const article = document.createElement("article");
  article.className = "card repo-card";
  article.tabIndex = 0;
  article.setAttribute("role", "button");
  article.setAttribute("aria-label", `Open repository details for ${repo.title}`);
  article.innerHTML = `
    <div class="card-topline">
      <span class="badge">${repo.badge}</span>
    </div>
    <h3>${repo.title}</h3>
    <p>${repo.description}</p>
    <div class="tags">
      ${repo.tags.map(tag => `<span>${tag}</span>`).join("")}
    </div>
  `;
  article.addEventListener("click", () => openModal(repo));
  article.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal(repo);
    }
  });
  libraryGrid.appendChild(article);
});

function openModal(repo) {
  modalTitle.textContent = repo.title;
  modalDescription.textContent = repo.fullDescription;
  modalLink.href = repo.link;
  modalTags.innerHTML = repo.tags.map(tag => `<span>${tag}</span>`).join("");
  repoModal.classList.add("open");
  repoModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  repoModal.classList.remove("open");
  repoModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});