// THEME TOGGLE + avatar swap
function toggleMode() {
  const html = document.documentElement
  html.classList.toggle("light")

  const avatar = document.getElementById("avatar")
  if (html.classList.contains("light")) {
    avatar.setAttribute("src", "./assets/avatar-light.png")
  } else {
    avatar.setAttribute("src", "./assets/avatar.png")
  }
}

// COPY TO CLIPBOARD
const copyBtn = document.getElementById("copyBtn")
if (copyBtn) {
  copyBtn.addEventListener("click", async (e) => {
    const txt =
      e.currentTarget.getAttribute("data-copy") || "seu-email@exemplo.com"
    try {
      await navigator.clipboard.writeText(txt)
      e.currentTarget.textContent = "Copiado! ✅"
      e.currentTarget.classList.add("copied")
      setTimeout(() => {
        e.currentTarget.textContent = "Copiar meu email"
        e.currentTarget.classList.remove("copied")
      }, 1500)
    } catch (err) {
      e.currentTarget.textContent = "Erro ao copiar"
      console.error(err)
    }
  })
}

// ABOUT MODAL
const aboutBtn = document.getElementById("aboutBtn")
const modal = document.getElementById("modal")
const closeModal = document.getElementById("closeModal")

if (aboutBtn && modal && closeModal) {
  aboutBtn.addEventListener("click", () => {
    modal.classList.remove("modal-hidden")
  })
  closeModal.addEventListener("click", () => {
    modal.classList.add("modal-hidden")
  })
  // fechar clicando fora do card
  modal.addEventListener("click", (ev) => {
    if (ev.target === modal) modal.classList.add("modal-hidden")
  })
}

// small: keyboard ESC to close modal
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    modal &&
    !modal.classList.contains("modal-hidden")
  ) {
    modal.classList.add("modal-hidden")
  }
})
// Função para aplicar o tema conforme preferência salva
function applyTheme(theme) {
  const html = document.documentElement
  const avatar = document.getElementById("avatar")
  if (theme === "light") {
    html.classList.add("light")
    avatar.setAttribute("src", "./assets/avatar-light.png")
  } else {
    html.classList.remove("light")
    avatar.setAttribute("src", "./assets/avatar.png")
  }
}

// Toggle e salvar preferência
function toggleMode() {
  const html = document.documentElement
  const isLight = html.classList.toggle("light")
  const avatar = document.getElementById("avatar")
  if (isLight) {
    avatar.setAttribute("src", "./assets/avatar-light.png")
    localStorage.setItem("theme", "light")
  } else {
    avatar.setAttribute("src", "./assets/avatar.png")
    localStorage.setItem("theme", "dark")
  }
}

// Ao carregar a página, aplicar tema salvo
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark"
  applyTheme(savedTheme)
})
