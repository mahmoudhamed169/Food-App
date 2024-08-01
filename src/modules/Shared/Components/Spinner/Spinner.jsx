import { HashLoader } from 'react-spinners';

export default function Spinner() {
    return (
        <div className="spinner-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: "#009247" }}>
            <HashLoader size={170} color="#fff" />
        </div>
    );
}
