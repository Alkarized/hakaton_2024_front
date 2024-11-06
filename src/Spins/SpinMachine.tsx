import {useEffect, useState} from 'react'
import {Wheel} from 'react-custom-roulette'
import {PointerProps, WheelData} from "react-custom-roulette/dist/components/Wheel/types";
import Chessboard from "./BetSelector";
import BetSelector from "./BetSelector";

const bgColor = [
    "red",
    "black",
    "green"
]

const pointer: PointerProps = {
    src: "https://i.pinimg.com/originals/2f/63/55/2f63552d366500eefbbdf843e8fbe851.png",
}

function generateList(max: number) {
    let list = [];
    let toUse: number[] = [];
    let count = 0;

    for (let i = 0; i <= max; i++) {
        toUse.push(i)
    }

    while (toUse.length > 0) {
        let index = Math.floor(Math.random() * toUse.length);
        let option: number = toUse[index];
        count = option === 0 ? count : count + 1;
        let item = {
            option: "" + option,
            optionSize: option === 0 ? 1 : 2,
            style: {
                backgroundColor: option === 0 ? "green" : (count % 2 === 0 ? "red" : "black"),
            }
        };

        list.push(item);
        toUse.splice(index, 1); // Удаляем использованный элемент
    }

    return list

}

const data2 = generateList(36);

const SpinMachine = () => {


    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [bet, setBet] = useState('');
    const [betType, setBetType] = useState('number'); // 'number', 'color', 'odd/even'

    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * data2.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
        }

    }

    const handleBetChange = (e) => {
        setBet(e.target.value);
    };

    const handleBetTypeChange = (e) => {
        setBetType(e.target.value);
        setBet(''); // Сбросить ставку при смене типа
    };


    return (
        <>
            <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                outerBorderColor={"black"}
                outerBorderWidth={20}
                data={data2}
                //fontFamily={"Rubik Wet Paint"}
                radiusLineWidth={4}
                innerRadius={35}
                innerBorderColor="black"
                radiusLineColor="yellow"
                innerBorderWidth={20}
                spinDuration={2}
                perpendicularText={true}
                onStopSpinning={() => {
                    setMustSpin(false);
                }}
                textDistance={80}
                backgroundColors={bgColor}
                textColors={["white"]}
                fontSize={15}
                pointerProps={pointer}
            />
            <BetSelector/>
            <button onClick={handleSpinClick}>SPIN</button>
        </>
    )
}
export default SpinMachine;