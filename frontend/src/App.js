import {BrowserRouter,Route,Switch} from 'react-router-dom'
import HomeView from './views/HomeView'
import AddView from './views/AddView'

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomeView} />
          <Route exact path='/add' component={AddView} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
