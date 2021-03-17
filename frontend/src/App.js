import {BrowserRouter,Route,Switch} from 'react-router-dom'
import HomeView from './views/HomeView'
import AddView from './views/AddView'
import UpdateView from './views/UpdateView'

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomeView} />
          <Route exact path='/add' component={AddView} />
          <Route exact path='/edit' component={UpdateView} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
