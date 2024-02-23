import { useEffect, useState } from "react";

const useDebounce = (text ="", delay) => {
    const [debouncedValue, setDebouncedValue] = useState(text)
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setDebouncedValue(text) 
        }, delay = 100)
        return () => clearTimeout(debounceTimer);
    }, [text, delay])

    return debouncedValue
}

export default useDebounce;