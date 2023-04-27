import './App.css';
import Table from './components/Table/Table'
import { items } from './fakeData/itemslist';

function App() {
  return (
    <div className="App">
          <h1>items: {items.length}</h1>
        <Table rows={items}/>
    </div>
  );
}

export default App;
