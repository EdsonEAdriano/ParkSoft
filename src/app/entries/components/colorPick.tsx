import React, { useState, ChangeEvent } from 'react';
import { darken } from 'polished';
import './colorPick.css';

type ColorPickerProps = {
  value?: string;  // Optional value for pre-selecting a color
  onChange?: (color: string) => void;  // Callback to handle color change
  isDisable?: boolean;
};

const colorNames: string[] = [
  'Black', 'White', 'Gray', 'Blue', 'Red', 'Green', 'Yellow', 'Orange', 'Purple', 'Cyan', 'Magenta'
];


const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange, isDisable }) => {
    const [selectedColor, setSelectedColor] = useState<string>(value || 'Black');
  
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
      const newColor = event.target.value;
      setSelectedColor(newColor); 
      if (onChange) {
        onChange(newColor); 
      }
    };
  
    return (
        <div>
          <label id="labelSelect">Cor do Veículo:</label>
          <select id="colorSelect" name="colors" value={selectedColor} onChange={handleChange} disabled={isDisable} style={{background: selectedColor}}>
            {colorNames.map((color) => (
              <option
                key={color}
                value={color}
                style={{
                  backgroundColor: color,
                  color: color === 'Black' ? 'white' : 'black',
                  padding: '10px',  
                }}
              >
              </option>
            ))}
          </select> 
        </div>
      );
  };
  
  export default ColorPicker;