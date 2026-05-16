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

const GITHUB_USERNAME = "broccoliandpepper";
const FEATURED_TOPIC = "featured";
const FEATURED_MARKER = "[featured]";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isFeaturedRepo(repo) {
  const topics = Array.isArray(repo.topics) ? repo.topics : [];
  const hasFeaturedTopic = topics.includes(FEATURED_TOPIC);
  const description = (repo.description || "").toLowerCase();
  const hasFeaturedMarker = description.includes(FEATURED_MARKER);

  return hasFeaturedTopic || hasFeaturedMarker;
}

function mapRepo(repo) {
  const rawDescription = repo.description || "No description provided.";
  const cleanDescription = rawDescription
    .replace(/\[featured\]/ig, "")
    .trim() || "No description provided.";

  return {
    title: repo.name,
    badge: repo.language || "Repository",
    description: cleanDescription,
    fullDescription: cleanDescription,
    tags: Array.isArray(repo.topics) ? repo.topics : [],
    link: repo.html_url
  };
}

function renderEmptyState(message) {
  libraryGrid.innerHTML = `<p>${escapeHtml(message)}</p>`;
}

function renderRepositories(repositories) {
  libraryGrid.innerHTML = "";

  repositories.forEach((repo) => {
    const article = document.createElement("article");
    article.className = "card repo-card";
    article.tabIndex = 0;
    article.setAttribute("role", "button");
    article.setAttribute("aria-label", `Open repository details for ${repo.title}`);
    article.innerHTML = `
      <div class="card-topline">
        <span class="badge">${escapeHtml(repo.badge)}</span>
      </div>
      <h3>${escapeHtml(repo.title)}</h3>
      <p>${escapeHtml(repo.description)}</p>
      <div class="tags">
        ${repo.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
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
}

async function loadRepositories() {
  renderEmptyState("Loading repositories...");

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?type=owner&sort=updated&per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28"
        }
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    const featuredRepos = repos
      .filter((repo) => !repo.fork)
      .filter(isFeaturedRepo)
      .map(mapRepo);

    if (!featuredRepos.length) {
      renderEmptyState("No featured repositories found. Add topic 'featured' to a repository.");
      return;
    }

    renderRepositories(featuredRepos);
  } catch (error) {
    renderEmptyState("Unable to load repositories for now.");
    console.error(error);
  }
}

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

loadRepositories();