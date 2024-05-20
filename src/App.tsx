import CalculatorPage from './pages/Calculator/CalculatorPage';

function App() {
  return (
    <>
      <div className=" flex items-center justify-between mb-4 p-6 w-full h-[60px] bg-green-500 rounded-sm">
        <p className="text-gray-100 font-bold">Batch44 Calculator</p>
      </div>
      <CalculatorPage className='flex justify-center my-auto'></CalculatorPage>
    </>
  );
}

export default App;
