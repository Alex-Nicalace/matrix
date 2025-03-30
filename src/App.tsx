import Header from './components/Header';
import './App.scss';
import AssetsData from './components/AssetsData';
import Dialog from './components/Dialog';

function App() {
  return (
    <div className="app">
      <Dialog>
        <Header />
        <AssetsData />
      </Dialog>
    </div>
  );
}

export default App;
