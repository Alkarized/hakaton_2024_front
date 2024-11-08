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

const data2 = generateList(37);

const sortData = (tmpData) => {
   return [...tmpData].sort((a, b) => a.option - b.option);
}

const SpinMachine = () => {
    const {user_id} = useParams();
    const audioRef = useRef(null);
    const winRef = useRef(null);
    const loseRef = useRef(null);

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const handleSpinClick = () => {
        if (!mustSpin) {
            audioRef.current.play();
            const newPrizeNumber = Math.floor(Math.random() * data2.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
        }

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
                spinDuration={2}
                perpendicularText={true}
                onStopSpinning={() => {
                    setMustSpin(false);
                    audioRef.current.pause();
                    if (Math.random() > 0.5) {
                        loseRef.current.play()
                    } else {
                        winRef.current.play();
                    }
                }}
                textDistance={80}
                backgroundColors={bgColor}
                textColors={["white"]}
                fontSize={15}
                pointerProps={pointer}
            />
            <BetSelector data={sortData(data2)}/>
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

            <audio ref={audioRef}>
                <source src="/src/assets/wheel.mp3" type="audio/mpeg"/>
                Ваш браузер не поддерживает аудио.
            </audio>
            <audio ref={loseRef}>
                <source src="/src/assets/loseWheel.mp3" type="audio/mpeg"/>
                Ваш браузер не поддерживает аудио.
            </audio>
            <audio ref={winRef}>
                <source src="/src/assets/winWheel.mp3" type="audio/mpeg"/>
                Ваш браузер не поддерживает аудио.
            </audio>
        </>
    )
}
export default SpinMachine;