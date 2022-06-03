import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Coins from './Coins';
import Coin from './Coin';
import Chart from './Chart';
import Price from './Price';
function Router(){
    return <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>

        <Route path='/:coinId/*' element={<Coin />}/>
        <Route path='/' element={<Coins />}/>

    </Routes>
    </BrowserRouter>
}

export default Router;