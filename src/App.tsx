import SlotMachine from './Slots/SlotMachine';
import SpinMachine from "./Spins/SpinMachine";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ManySlotsMachine from "./ManySlots/ManySlotsMachine";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="*" Component={SlotMachine}/>
                <Route path="/spin" Component={SpinMachine}/>
                <Route path="/slot" Component={SlotMachine} />
                <Route path="/slot2" Component={ManySlotsMachine} />
            </Routes>
        </Router>
    );
};

export default App;