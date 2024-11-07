import {useEffect, useState} from "react";
import ManySlot from "./ManySlot";
import "./ManySlot.css"

const ManySlotsMachine = () => {
    const [spinning, setSpinning] = useState(false);

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

    }, []);

    const startSpin = () => {
        setSpinning(true);

        setTimeout(() => {
            setSpinning(false);
        }, maxTime);

    };

    return (<div className="many-slot-machine">
        <div className="many-slots">
            <ManySlot items={items1} spinning={spinning} timeSpinning={maxTime / 3}/>
            <ManySlot items={items2} spinning={spinning} timeSpinning={maxTime / 2}/>
            <ManySlot items={items3} spinning={spinning} timeSpinning={maxTime / 1}/>
        </div>

        <div>
            <button onClick={startSpin} disabled={spinning}>
                {spinning ? "Spinning..." : "Spin"}
            </button>
        </div>
    </div>);
}

export default ManySlotsMachine;