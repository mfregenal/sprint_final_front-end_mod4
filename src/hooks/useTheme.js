import { useState, useEffect } from "react"

function useTheme() {
  const key = 'theme'

  const [isDark, setIsDark] = useState(false)

  const isCurrentThemeDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  useEffect(() => {
    let currentTheme = localStorage.getItem(key)

    if (!currentTheme) {
      currentTheme = isCurrentThemeDark ? "dark" : "light"
    }

    const isDarkTheme = (currentTheme === "dark")
    setIsDark(isDarkTheme)

    if (isDarkTheme) {
      document.documentElement.classList.add("dark")
      currentTheme = "dark"
    } else {
      document.documentElement.classList.remove("dark")
      currentTheme = "light"
    }
  
    localStorage.setItem(key, currentTheme)
  }, [isCurrentThemeDark])



  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem(key, "light")
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem(key, "dark")
    }
    setIsDark(!isDark)
  }

  return {
    isDark,
    toggleTheme
  }
}

export default useTheme