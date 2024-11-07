import {useEffect, useState} from 'react';
import styled, {keyframes} from 'styled-components';

const imgPath = "/imgs/";
const gifPath = "/gifs/";

const ManySlot = ({items, spinning, timeSpinning}) => {
    const spinAnimation = () => keyframes`
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-${70 * (items.count-2)}px);
        }
        75% {
            transform: translateY(-${90 * (items.count-2)}px);
        }
        90% {
            transform: translateY(-${99 * (items.count-2)}px);
        }
        100% {
            transform: translateY(-${100 * (items.count-2)}px);
        }
    `;

    const ManySlotItems = styled.div`
        transition: transform ${timeSpinning / 1000}s ease-out;

        &.spinning {
            animation: ${() => spinAnimation()} ${timeSpinning / 1000}s linear;
        }
    `;

    const ManySlotItem = styled.div`
        &.shaking {
            animation: tilt-n-move-shaking 0.5s ease infinite;
            transform: translateY(-${(items.count-2) * 100}px)
        }
    `

    const [position, setPosition] = useState(0);
    const [animationClass, setAnimationClass] = useState('');
    const [shaking, setShaking] = useState("");

    useEffect(() => {
        if (spinning) {
            setAnimationClass('spinning');
            setShaking('')

            setTimeout(() => {
                setAnimationClass('');
                setPosition(items.count-2);
                setShaking('shaking')
            }, timeSpinning);
        }
    }, [spinning]);

    return (
        <div className="many-slot">
            <ManySlotItems
                className={animationClass}
                itemsCount={items.items.length}
                style={{
                    transform: `translateY(-${position * 100}px)`,
                }}
            >
                {items.items.map((item, index) => (
                    <ManySlotItem key={index} className={`many-slot-item`}>
                        {item}
                    </ManySlotItem>
                ))}
            </ManySlotItems>
        </div>
    );
};

export default ManySlot;