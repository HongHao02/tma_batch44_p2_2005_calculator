import Calculator from '../../components/Calculator/Calculator';

interface CalculatorProps {
    children?: Node;
    className?: string;
}
function CalculatorPage({ className }: CalculatorProps) {
    return (
        <div className={className}>
            <Calculator></Calculator>
        </div>
    );
}

export default CalculatorPage;
