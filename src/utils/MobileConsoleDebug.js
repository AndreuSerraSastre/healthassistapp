import React from 'react';
import { useLayoutEffect, useRef } from 'react';

const MobileConsoleDebug = ({ active }) => {

    const debugRef = useRef();
    const initDebbuger = () => {
        import('eruda').then(
            module => module.default.init({
                container: debugRef.current,
                tool: ['console', 'elements']
            })
        )
    }

    useLayoutEffect(() => {
        active &&
            initDebbuger();
    }, [active]);

    if (!active) { return null };

    return (<div ref={debugRef} />)
};

export default MobileConsoleDebug;