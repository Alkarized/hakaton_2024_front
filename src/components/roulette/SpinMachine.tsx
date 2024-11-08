import {useEffect, useRef, useState} from 'react'
import {Wheel} from 'react-custom-roulette'
import {PointerProps, WheelData} from "react-custom-roulette/dist/components/Wheel/types";
import BetSelector from "./BetSelector";
import {wheelData, wheelSeqData} from "./WheelData";
import {useParams} from "react-router-dom";

const bgColor = [
    "red",
    "black",
    "green"
]

const pointer: PointerProps = {
    src: "/src/assets/pointer.png",
}

function generateList(max: number) {
    /*let list = [];
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

    return list*/


    return wheelSeqData;

}


const sortData = (tmpData) => {
    return [...tmpData].sort((a, b) => a.option - b.option);
}

const data2 = generateList(37);
const data3 = sortData(data2)


const SpinMachine = () => {
    const audioRef = useRef(new Audio('/src/assets/wheel.mp3'));
    const winRef = useRef(new Audio('/src/assets/winWheel.mp3'));
    const loseRef = useRef(new Audio('/src/assets/loseWheel.mp3'));
    const [selectedBet, setSelectedBet] = useState(0)
    const isWin = useRef(false);

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(Math.floor(Math.random() * data2.length));

    const handleSpinClick = () => {
        console.log(selectedBet)
        if (!mustSpin) {
            audioRef.current.play();
            isWin.current = checkPrizeWin(prizeNumber, selectedBet)

            setMustSpin(true);
            setPrizeNumber(Math.floor(Math.random() * data2.length))

        }

    }

    const checkPrizeWin = (prizeRes, set) => {
        console.log(prizeRes + " " + set + " " + data2[prizeRes].option )
        if (set === "red" && data2[prizeRes].style.backgroundColor === "red") {
            return true
        } else if (set === "black" && data2[prizeRes].style.backgroundColor === "black") {
            return true
        } else if (set === "odd" && Number(data2[prizeRes].option) % 2 !== 0) {
            return true;
        } else if (set === "even" && Number(data2[prizeRes].option) % 2 === 0) {
            return true;
        } else if (String(data2[prizeRes].option) === String(set)) {
            return true;
        }

        return false;

    }

    const handleStop = () => {
        setMustSpin(false)
        audioRef.current.pause()
        if (isWin.current){
            winRef.current.play()
        } else {
            loseRef.current.play()
        }
        isWin.current = false;
    }

    return (
        <>
            <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                outerBorderColor={"black"}
                outerBorderWidth={5}
                data={data2}
                //fontFamily={"Rubik Wet Paint"}
                radiusLineWidth={2}
                innerRadius={35}
                innerBorderColor="black"
                radiusLineColor="white"
                innerBorderWidth={6}
                spinDuration={0.1}
                perpendicularText={true}
                onStopSpinning={handleStop}
                textDistance={80}
                backgroundColors={bgColor}
                textColors={["white"]}
                fontSize={15}
                pointerProps={pointer}
            />
            <BetSelector data={data3} selectedBet={selectedBet} setSelectedBet={setSelectedBet}/>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    justifySelf: "center"
                }}>
                <button onClick={handleSpinClick} disabled={mustSpin}>
                    {mustSpin ? "Spinning..." : "Spin"}
                </button>
            </div>

        </>
    )
}
export default SpinMachine;