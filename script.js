const repositories = [
  {
    title: "Identity Architecture",
    badge: "Identity",
    description:
      "Concepts, tools, and repository work related to identity governance, access structure, and Entra ID administration.",
    fullDescription:
      "A repository space focused on identity architecture, access logic, directory structure, and practical administration around Entra ID and Active Directory. Built around clarity, maintainability, and secure operational flow.",
    tags: ["Entra ID", "AD", "Identity", "Access"],
    link: "https://github.com/broccoliandpepper"
  },
  {
    title: "Microsoft 365 Automation",
    badge: "Automation",
    description:
      "Scripts and repeatable workflows designed to reduce friction in Microsoft 365 administration.",
    fullDescription:
      "A collection of automation-oriented work around Microsoft 365, with attention to consistency, documentation, and useful operational gains. The goal is simple: fewer repetitive tasks, cleaner administration.",
    tags: ["M365", "Automation", "PowerShell", "Operations"],
    link: "https://github.com/broccoliandpepper"
  },
  {
    title: "Infrastructure & Hardening",
    badge: "Security",
    description:
      "Projects related to Windows Server environments, baseline hardening, and resilient infrastructure practices.",
    fullDescription:
      "This area reflects a practical interest in infrastructure stability, Windows Server administration, security hardening, and dependable technical foundations. Thoughtful setup matters as much as functionality.",
    tags: ["Windows Server", "Security", "Hardening", "Infra"],
    link: "https://github.com/broccoliandpepper"
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