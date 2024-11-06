import SlotMachine from './Slots/SlotMachine';
import SpinMachine from "./Spins/SpinMachine";

const App = () => {
    return (
        <div>
            <h1>React Slot Machine</h1>
            {/*<SlotMachine />*/}
            <SpinMachine/>
        </div>
    );
};

export default App;