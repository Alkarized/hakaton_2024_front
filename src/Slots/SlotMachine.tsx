import {useEffect, useRef, useState} from 'react';
import './SlotMachine.css';
import Slot from './Slot';
// @ts-ignore
import gif from '../assets/b.gif';

const SlotMachine = () => {
    const [spinning, setSpinning] = useState(false);
    const [pressed, setPressed] = useState(false);

    const maxTime = 5000;
    const symbols = ["🍒", "🍋", "🍊", "🍉", "⭐️", "💎"];

    const [items1, setItems1] = useState({
        items: [],
        last: "",
        count: 0
    });
    const [items2, setItems2] = useState({
        items: [],
        last: "",
        count: 0
    });
    const [items3, setItems3] = useState({
        items: [],
        last: "",
        count: 0
    });
    const [items4, setItems4] = useState({
        items: [],
        last: "",
        count: 0
    });

    const generateItems = (setItems, count, last) => {
        let tmpItems = []

        for (let i = 0; i < count; i++) {
            tmpItems[i] = symbols[Math.floor(Math.random() * symbols.length)];
        }

        tmpItems[count] = last

        setItems({
            items: tmpItems,
            last: last,
            count: count,
        })

        console.log(tmpItems)
    }

    useEffect(() => {

        generateItems(setItems1, 25, symbols[0])
        generateItems(setItems2, 50, symbols[1])
        generateItems(setItems3, 100, symbols[2])
        generateItems(setItems4, 75, symbols[3])

    }, []);

    const startSpin = () => {
        setSpinning(true);
        setPressed(true);

        setTimeout(() => {
            setSpinning(false);
        }, maxTime);

    };

    return (
        <div className="slot-machine">
            <div className="slots">
                <Slot items={items1} spinning={spinning} timeSpinning={maxTime / 3}/>
                <Slot items={items2} spinning={spinning} timeSpinning={maxTime / 2}/>
                <Slot items={items3} spinning={spinning} timeSpinning={maxTime}/>
                <Slot items={items4} spinning={spinning} timeSpinning={maxTime / 1.5}/>
            </div>
            <button onClick={startSpin} disabled={spinning}>
                {spinning ? "Spinning..." : "Spin"}
            </button>
            <img src={gif} alt="sd" style={{
                display: `${!spinning && pressed ? 'flex' : 'none'}`,
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                top: "-300px"
            }}/>
        </div>

    );
};

export default SlotMachine;