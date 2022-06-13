import React, {useEffect, useRef} from 'react';

const Complete3DS = () => {
    const mounted = useRef(false);
    useEffect(() => {
        if (mounted.current === false) {
            mounted.current = true;
            window.parent.postMessage({ success: true}, "*");
        }
    }, []);
    return (
        <div/>
    );
};

export default Complete3DS;