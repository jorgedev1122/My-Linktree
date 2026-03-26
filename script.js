document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement
  const switchContainer = document.getElementById("switch")
  const btn = document.querySelector("#switch button")
  const avatar = document.getElementById("avatar")
  const copyBtn = document.getElementById("copyBtn")
  const aboutBtn = document.getElementById("aboutBtn")
  const modal = document.getElementById("aboutModal")
  const closeModal = document.getElementById("closeModal")
  const revealElements = document.querySelectorAll(".reveal")

  function updateSwitchUI(theme) {
    const isLight = theme === "light"
    btn.textContent = ""
    btn.setAttribute("aria-pressed", isLight ? "true" : "false")
    btn.setAttribute(
      "aria-label",
      isLight ? "Modo claro ativado" : "Modo escuro ativado",
    )
    btn.classList.toggle("light-mode", isLight)
  }

  function applyTheme(theme) {
    const isLight = theme === "light"
    html.classList.toggle("light", isLight)
    document.body.classList.toggle("light", isLight)

    // Atualiza o fundo e texto de forma explícita para garantir troca de modo
    document.body.style.background = isLight
      ? "linear-gradient(130deg, #f5f7fb 0%, #eaeef7 60%, #eef2f8 100%)"
      : "linear-gradient(130deg, #080b18 0%, #0f1222 50%, #0d0f1d 100%)"
    document.body.style.color = isLight ? "#101928" : "#e8ecf6"

    // Avatar: light/escuro com fallback
    const lightAvatar1 = "./assets/avatar-light.png"
    const lightAvatar2 = "./assets/avatarlight.png"
    avatar.src = isLight ? lightAvatar1 : "./assets/avatar.png"
    if (isLight) {
      avatar.onerror = () => {
        avatar.onerror = null
        avatar.src = lightAvatar2
      }
    } else {
      avatar.onerror = null
    }

    updateSwitchUI(theme)
    localStorage.setItem("theme", theme)
  }

  let savedTheme = localStorage.getItem("theme")
  if (!savedTheme) {
    savedTheme = "dark"
    localStorage.setItem("theme", "dark")
  }
  applyTheme(savedTheme)

  const toggleTheme = () => {
    const newTheme = html.classList.contains("light") ? "dark" : "light"
    applyTheme(newTheme)
  }

  btn.addEventListener("click", toggleTheme)
  if (switchContainer) {
    switchContainer.addEventListener("click", (event) => {
      if (event.target === switchContainer || event.target === btn) {
        toggleTheme()
      }
    })
  }

  // Scroll reveal
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show")
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 },
  )

  revealElements.forEach((el) => observer.observe(el))

  // Copy to clipboard
  if (copyBtn) {
    copyBtn.addEventListener("click", async (event) => {
      const email = event.currentTarget.dataset.copy
      try {
        await navigator.clipboard.writeText(email)
        const original = event.currentTarget.textContent
        event.currentTarget.textContent = "E-mail copiado!"
        setTimeout(() => {
          event.currentTarget.textContent = original
        }, 1500)
      } catch (error) {
        event.currentTarget.textContent = "Erro ao copiar"
        setTimeout(() => {
          event.currentTarget.textContent = "Copiar meu Email"
        }, 1500)
      }
    })
  }

  // Modal
  if (aboutBtn && modal && closeModal) {
    const openModal = () => {
      modal.classList.add("active")
      modal.setAttribute("aria-hidden", "false")
      document.body.style.overflow = "hidden"
    }

    const close = () => {
      modal.classList.remove("active")
      modal.setAttribute("aria-hidden", "true")
      document.body.style.overflow = "auto"
    }

    aboutBtn.addEventListener("click", openModal)
    closeModal.addEventListener("click", close)
    modal.addEventListener("click", (event) => {
      if (event.target === modal) close()
    })
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.classList.contains("active")) {
        close()
      }
    })
  }

  // Ripple effect
  const buttonElements = document.querySelectorAll(".btn")
  buttonElements.forEach((button) => {
    button.addEventListener("click", (event) => {
      const circle = document.createElement("span")
      circle.classList.add("ripple")
      const diameter = Math.max(button.clientWidth, button.clientHeight)
      const radius = diameter / 2
      circle.style.width = circle.style.height = `${diameter}px`
      circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`
      circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`
      button.appendChild(circle)
      setTimeout(() => {
        circle.remove()
      }, 600)
    })
  })
})
