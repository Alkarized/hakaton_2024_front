import SlotMachine from './Slots/SlotMachine';
import SpinMachine from "./Spins/SpinMachine";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="*" Component={SlotMachine}/>
                <Route path="/spin/:user_id" Component={SpinMachine}/>
                <Route path="/slot" Component={SlotMachine} />
                <Route path="/slot2" Component={SlotMachine} />
            </Routes>
        </Router>
    );
};

export default App;