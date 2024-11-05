import { Key, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const SlotMachine = ({ items, spinning, timeSpinning }) => {
    const spinAnimation = () => keyframes`
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-${70 * items.count}px); 
    }
    75% {
        transform: translateY(-${90 * items.count}px);
    }
    90% {
        transform: translateY(-${99 * items.count}px); 
    }
    100% {
        transform: translateY(-${100 * items.count}px); 
    }
`;

    const SlotItems = styled.div`
        transition: transform ${timeSpinning / 1000}s ease-out;

        &.spinning {
            animation: ${() => spinAnimation()} ${timeSpinning / 1000}s linear;
        }
    `;

    const SlotItem = styled.div`
        &.shaking {
            animation: tilt-n-move-shaking 0.5s ease infinite;
            transform: translateY(-${items.count * 100}px)
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
                setShaking('shaking')
                setPosition(items.count);
            }, timeSpinning);
        }
    }, [spinning]);

    return (
        <div className="slot">
            <SlotItems
                className={animationClass}
                itemsCount={items.items.length}
                style={{
                    transform: `translateY(-${position * 100}px)`,
                }}
            >
                {items.items.map((item, index) => (
                    <SlotItem key={index} className={`slot-item ${shaking}`} >
                        {item}
                    </SlotItem>
                ))}
            </SlotItems>
        </div>
    );
};

export default SlotMachine;