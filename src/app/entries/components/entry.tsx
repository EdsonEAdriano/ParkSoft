import "./entry.css";
import { FaMapMarkerAlt, FaClock, FaCheckCircle, FaLongArrowAltRight } from "react-icons/fa";
import { MdOutlineEdit, MdOutlinePriceCheck } from "react-icons/md";
import { darken, margin } from "polished";

interface EntryProps {
  date: string;
  month: string;
  model: string;
  brand: string;
  location: string;
  time: string;
  exit_time?: string;
  price?: string;
  licensePlate: string;
  status: string;
  color: string;
  onSetExit: () => void;
  onEdit: () => void;
}

const Entry: React.FC<EntryProps> = ({
  date,
  month,
  model,
  brand,
  location,
  time,
  exit_time,
  price,
  licensePlate,
  status,
  color,
  onSetExit,
  onEdit,
}) => {
  return (
    <div className="card">
      <div className="date-container">
        <h2>{date}</h2>
        <p>{month}</p>
      </div>
      <div className="info-container">
        <div>
          <p>
            <b>{brand}</b> {model}
          </p>
          <div className="location-info">
            <span>
              <FaMapMarkerAlt />
              {location}
            </span>
            <span>
              <FaClock />
              {time}

              {status == "Fechado" && (
                <>
                  <FaLongArrowAltRight style={{ marginLeft: "10px", marginRight: "10px" }} />

                  <FaClock />
                  {exit_time}

                  <MdOutlinePriceCheck style={{ marginLeft: "15px" }} />
                  {price}
                </>
              )}
            </span>
          </div>
        </div>
        <span
          className="license-plate"
          style={{
            backgroundColor: darken(-0.2, color),
            color: color === "White" ? "Black" : "White",
            border: "1px solid black",
          }}
        >
          {licensePlate}
        </span>
        <span className="status">{status}</span>
      </div>
      <div className="button-container">
        {status !== "Fechado" && (
          <>
            <button className="button primary" onClick={onSetExit}>
              <FaCheckCircle /> Registrar Saída
            </button>
            <button className="button" onClick={onEdit}>
              <MdOutlineEdit /> Editar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Entry;
