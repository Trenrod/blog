import { useRef, useLayoutEffect, useState, useCallback } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const useResizeObserver = (): [((instance: HTMLDivElement | null) => void), number] => {
    const [width, setWidth] = useState<number>(0);
    const [node, setNode] = useState<Element | null>(null);
    const observer = useRef<any>();

    const disconnect = useCallback(() => observer.current?.disconnect(), []);

    const observe = useCallback(() => {
        observer.current = new ResizeObserver(
            ([entry]) => {
                if (width !== entry.contentRect.width) {
                    setWidth(entry.contentRect.width);
                }
            });
        if (node) {
            observer.current.observe(node);
        }
    }, [node]);

    useLayoutEffect(() => {
        observe();
        return () => disconnect();
    }, [disconnect, observe]);

    return [setNode, width];
};

export default useResizeObserver;