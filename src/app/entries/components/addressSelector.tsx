import { useEffect, useState } from "react";
import styles from "./AddressSelector.module.css";
import axios from "axios";

type Address = {
  id: number;
  location_id: string;
  description?: string;
  status: string;
};

type AddressSelectorProps = {
  value?: string;
  onChange: (address: string) => void;
};

const AddressSelector: React.FC<AddressSelectorProps> = ({value, onChange}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [parkingLocations, setParkingLocations] = useState<Address[]>([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/parking");
        setParkingLocations(response.data.parking);
      } catch (error) {
        console.error("Erro ao fazer a requisição:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelect = (locationId: string) => {
    alert(`Endereço selecionado: ${locationId}`);
    onChange(locationId); 
    setIsOpen(false);
  };

  // Divide os endereços em grupos de 5 para exibição
  const groupedAddresses = parkingLocations.reduce((acc, curr, index) => {
    const groupIndex = Math.floor(index / 5);
    if (!acc[groupIndex]) {
      acc[groupIndex] = [];
    }
    acc[groupIndex].push(curr);
    return acc;
  }, [] as Address[][]);

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer} onClick={toggleDropdown}>
        <input
          type="text"
          value={value}
          placeholder="Clique para ver os endereços"
          readOnly
          className={styles.input}
        />
      </div>
      {isOpen && (
        <div className={styles.dropdown}>
          {groupedAddresses.map((group, groupIndex) => (
            <div key={groupIndex} className={styles.row}>
              {group.map((address) => (
                <button
                  key={address.id}
                  className={`${styles.dropdownItem} ${
                    address.status !== "A" ? styles.disabled : ""
                  }`}
                  onClick={() => handleSelect(address.location_id)}
                  disabled={address.status !== "A"}
                >
                  {address.location_id}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressSelector;
