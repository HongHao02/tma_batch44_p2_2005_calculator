import * as React from 'react';
import {
    Slider as BaseSlider,
    SliderThumbSlotProps,
    SliderProps,
} from '@mui/base/Slider';

const Thumb = React.forwardRef(function Thumb(
    props: SliderThumbSlotProps,
    ref: React.ForwardedRef<HTMLSpanElement>,
) {
    // const { ownerState, className = '', children, ...other } = props;
    const { className = '', children, ...other } = props;
    return (<span className={`${className} ring-cyan-500 dark:ring-cyan-400 ring-2 w-4 h-4 -mt-1 -ml-2 flex items-center justify-center bg-white rounded-full shadow absolute`} {...other} ref={ref}>
        <span className="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full ring-1 ring-inset ring-slate-900/5"></span>
        {children}
    </span>);
});


const Slider = React.forwardRef(function Slider(
    props: SliderProps,
    ref: React.ForwardedRef<HTMLSpanElement>,
) {
    return (
        <BaseSlider
            {...props}
            ref={ref}
            slots={{
                thumb: Thumb,
            }}
            slotProps={{
                // thumb: {
                //     className:
                //         'ring-cyan-500 dark:ring-cyan-400 ring-2 w-4 h-4 -mt-1 -ml-2 flex items-center justify-center bg-white rounded-full shadow absolute',
                // },
                root: { className: 'w-full relative inline-block h-2 cursor-pointer' },
                rail: {
                    className:
                        'bg-slate-100 dark:bg-slate-700 h-2 w-full rounded-full block absolute',
                },
                track: {
                    className: 'bg-cyan-500 dark:bg-cyan-400 h-2 absolute rounded-full',
                },
            }}
        />
    );
});

export default Slider;
