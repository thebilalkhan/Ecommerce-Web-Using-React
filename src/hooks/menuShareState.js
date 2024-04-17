
import { useState } from "react";

const useMenuShareState=()=>{
    const [isMenuOpen, setIsMenuOpen] = useState(false);

 return {isMenuOpen, setIsMenuOpen}

}

export default useMenuShareState;