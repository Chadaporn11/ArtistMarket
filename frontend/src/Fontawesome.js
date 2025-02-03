import { useEffect } from 'react';

const FontAwesome = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://kit.fontawesome.com/ebd4002eaa.js";
        script.crossOrigin = "anonymous";
        script.async = true;
        document.body.appendChild(script);
      }, []);
    
      return null;
}
export default FontAwesome