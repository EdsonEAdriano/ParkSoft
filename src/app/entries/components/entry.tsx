import "./entry.css";
import { FaMapMarkerAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import { darken } from 'polished';

interface EntryProps {
    date: string;
    month: string;
    model: string;
    brand: string;
    location: string;
    time: string;
    licensePlate: string;
    status: string;
    color: string;
    onEdit: () => void;
}


const Entry: React.FC<EntryProps> = ({ date, month, model, brand, location, time, licensePlate, status, color, onEdit }) => {
    return (
        <div className="card">
            <div className="date-container">
                <h2>{date}</h2>
                <p>{month}</p>
            </div>
            <div className="info-container">
                <div>       
                    <p><b>{brand}</b> {model}</p>
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
            <div className="button-container">
                <button className="button primary" onClick={onEdit}>
                    <FaCheckCircle /> Registrar Saída
                </button>
                <button className="button" onClick={onEdit}>
                    <MdOutlineEdit /> Editar
                </button>
            </div>
        </div>
    );
}

export default Entry;
