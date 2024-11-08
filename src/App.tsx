import SlotMachine from './Bandit/SlotMachine';
import SpinMachine from "./components/roulette/SpinMachine";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ManySlotsMachine from "./components/slots/ManySlotsMachine";
import NotFound from "./components/NotFound";


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/roulette/:tgId/:startBalance" Component={SpinMachine}/>
                <Route path="/bandit/:tgId/:startBalance" Component={SlotMachine} />
                <Route path="/slots/:tgId/:startBalance" Component={ManySlotsMachine} />
                <Route path="*" Component={NotFound} />
            </Routes>
        </Router>
    );
};

export default App;