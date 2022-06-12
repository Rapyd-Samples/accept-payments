const loadScript = (id: string, src: string) => {
    const existingScript = document.getElementById(id);
    if (!existingScript) {
        const script = document.createElement('script');
        script.src = src;
        script.id =id;
        document.body.appendChild(script);
    }
};
export default loadScript;