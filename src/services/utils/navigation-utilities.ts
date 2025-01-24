

export const goToSection = (section: string) => {
    setTimeout(() => {
        if(section && typeof(section) === 'string') {
            document.getElementById(section)?.scrollIntoView({behavior: 'smooth'});
        }
    }, 100);
}