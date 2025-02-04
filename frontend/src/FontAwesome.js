import { useEffect } from "react";

function FontAwesome() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://kit.fontawesome.com/0cc975790d.js";
    script.crossOrigin = "anonymous";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return null;
}

export default FontAwesome;
