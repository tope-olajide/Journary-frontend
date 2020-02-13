import {useState} from 'react'
const useTheme = () => {
    const [theme, setTheme] = useState('red')
    const changeTheme = (themeColor) => {
        setTheme(themeColor);
        document.documentElement.setAttribute('data-theme', themeColor);
        localStorage.setItem("theme-color", themeColor);
        console.log(theme)
    }
    return {
        changeTheme
    }
}
export default useTheme