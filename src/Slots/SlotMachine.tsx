import {useEffect, useRef, useState} from 'react';
import './SlotMachine.css';
import Slot from './Slot';
import gif from  '../assets/b.gif';
import styled, {keyframes} from "styled-components";
/*import gif0 from '../assets/slots/gifs/0.gif'
import gif1 from '../assets/slots/gifs/1.gif'
import gif2 from '../assets/slots/gifs/2.gif'
import gif3 from '../assets/slots/gifs/3.gif'
import gif4 from '../assets/slots/gifs/4.gif'
import gif5 from '../assets/slots/gifs/5.gif'*/

const SlotMachine = () => {
    const [spinning, setSpinning] = useState(false);
    const [pressed, setPressed] = useState(false);
    const [isPlaying, setPlaying] = useState(true);
    const [balance, setBalance] = useState(10000);
    const [bet, setBet] = useState(10);
    const [balanceClass, setBalanceClass] = useState('');

    const maxTime = 5000;
    const symbols = ["🍒", "🍋", "🍊", "🍉", "⭐️", "💎"];
    const symbols2 = [0, 1, 2, 3, 4, 5];

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
            tmpItems[i] = symbols2[Math.floor(Math.random() * symbols2.length)];
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

        generateItems(setItems1, 25, symbols2[0])
        generateItems(setItems2, 50, symbols2[1])
        generateItems(setItems3, 100, symbols2[2])

        setBet(bet => Math.min(bet, balance))

    }, []);

    const startSpin = () => {
        setSpinning(true);
        setPressed(true);

        setTimeout(() => {
            setSpinning(false);
            setBalanceClass("increase") //increase / decrease
            setBalance(balance => balance + Number(bet));

        }, maxTime);

    };

    useEffect(() => {
        console.log("TTTTTTTTTT")
        const timer = setTimeout(() => {
            setBalanceClass('');
        }, 1000);

        return () => clearTimeout(timer);
    }, [balance]);

    const handelChangeBet = (e) => {
        let value = e.target.value;
        const intV = value.replace(/^0+\d/, '');
        if (intV >= 0 && intV <= balance){
            setBet(intV);
        }

        if (value === ""){
            setBet(0);
        }
    }



    return (
        <div className="slot-machine">
            <div className="slots">
                <Slot items={items1} spinning={spinning} timeSpinning={maxTime / 3} isPlaying={isPlaying}/>
                <Slot items={items2} spinning={spinning} timeSpinning={maxTime / 2} isPlaying={isPlaying}/>
                <Slot items={items3} spinning={spinning} timeSpinning={maxTime / 1} isPlaying={isPlaying}/>
            </div>

            <div className={`bg-div balance-div`}>
                <div className={`balance ${balanceClass}`}>
                    {balance}🍬
                </div>
            </div>
            <div className={`bg-div bet-div`}>
                <input
                    type="number"
                    value={bet}
                    onChange={handelChangeBet}
                    style={{width: "80px"}}
                />
            </div>

            <div className={`bg-div spin-div`}>
                <button className={`spin-button ${spinning ? 'spinning' : ''}`} onClick={startSpin} disabled={spinning}>
                    {spinning ? "Spinning..." : "Spin"}
                </button>
            </div>
            {/*<div style={styles.container}>

            </div>*/}
            <img src={gif} alt="sd" style={{
                display: `${!spinning && pressed ? 'flex' : 'none'}`,
                flexDirection: "column",
                alignItems: "center",
                width: "400px",
                height: "400px",
                position: "relative",
                top: "-700px"
            }}/>
        </div>

    );
};

export default SlotMachine;