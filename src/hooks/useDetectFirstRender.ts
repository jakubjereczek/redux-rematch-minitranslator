import { useEffect, useRef } from "react";

export function useDetectFirstRender() {
    const first = useRef(true);

    useEffect(() => {
        first.current = false;
    }, [])

    return first.current;
}