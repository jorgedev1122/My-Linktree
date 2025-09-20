document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement
  const btn = document.querySelector("#switch button")
  const avatar = document.getElementById("avatar")

  function applyTheme(theme) {
    if (theme === "light") {
      html.classList.add("light")
      avatar.src = "./assets/avatar-light.png"
      btn.setAttribute("aria-pressed", "true")
    } else {
      html.classList.remove("light")
      avatar.src = "./assets/avatar.png"
      btn.setAttribute("aria-pressed", "false")
    }
    localStorage.setItem("theme", theme)
  }

  // Definir tema inicial (dark por padrão na primeira visita)
  let savedTheme = localStorage.getItem("theme")
  if (!savedTheme) {
    savedTheme = "dark"
    localStorage.setItem("theme", "dark")
  }
  applyTheme(savedTheme)

  // Alternar tema no clique
  btn.addEventListener("click", () => {
    const newTheme = html.classList.contains("light") ? "dark" : "light"
    applyTheme(newTheme)
  })
})
