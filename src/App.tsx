import Home from './pages/Home/Home';
import CustomizedBadges from './components/ShoppingCart/ShppingCartBadge';
// import Player from './components/CustomBaseMUI/Slider/Player';

// import Button from '@mui/material/Button';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';

function App() {
  return (
    <>
      <div className=" flex items-center justify-between mb-4 p-6 w-full h-[60px] bg-green-500 rounded-sm">
        <p className="text-gray-100 font-bold">Batch44 Shopping Cart</p>
        <div className='flex justify-end ml-auto'>
          <CustomizedBadges></CustomizedBadges>
        </div>
      </div>
      <Home></Home>
      {/** MUI does not have 'className' prop*/}
      
      {/* <Container className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <Typography variant="h1" className="text-4xl font-bold mb-4">
          Hello TailwindCSS with Material-UI
        </Typography>
        <Button variant="contained" color="primary" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Hello Material-UI
        </Button>
      </Container> */}
      {/* To fixing this problem
      B1: install base MUI: npm install @mui/base */}
      {/* <Player></Player> */}
    </>
  );
}

export default App;
