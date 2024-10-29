import "./entry.css";
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { darken } from 'polished';

interface EntryProps {
    date: string;
    month: string;
    model: string;
    location: string;
    time: string;
    licensePlate: string;
    status: string;
    color: string;
}


const Entry: React.FC<EntryProps> = ({ date, month, model, location, time, licensePlate, status, color }) => {
    return (
        <div className="card">
            <div className="date-container">
                <h2>{date}</h2>
                <p>{month}</p>
            </div>
            <div className="info-container">
                <div>   
                    <h3>{model}</h3>
                    <div className="location-info">
                        <span>
                            <FaMapMarkerAlt />
                            {location}
                        </span>
                        <span>
                            <FaClock />
                            {time}
                        </span>
                    </div>
                </div>
                <span className="license-plate" style={{ backgroundColor: darken(-0.2, color), color: color === "white" ? "black" : "white", border: "1px solid black" }}>{licensePlate}</span>
                <span className="status">{status}</span>
            </div>
            <button className="button primary">Registrar Saída</button>
            <button className="button">Editar</button>
        </div>
    );
}

export default Entry;
