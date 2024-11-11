import React, { useState, ChangeEvent } from 'react';
import { darken } from 'polished';
import './colorPick.css';

type ColorPickerProps = {
  value?: string;  // Optional value for pre-selecting a color
  onChange?: (color: string) => void;  // Callback to handle color change
};

const colorNames: string[] = [
  'AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue',
  'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk',
  'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGreen', 'DarkKhaki', 'DarkMagenta',
  'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray',
  'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DodgerBlue', 'FireBrick', 'FloralWhite',
  'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Green', 'GreenYellow', 'HoneyDew',
  'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue',
  'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray', 'LightGreen', 'LightPink', 'LightSalmon', 'LightSeaGreen',
  'LightSkyBlue', 'LightSlateGray', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon',
  'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen',
  'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy',
  'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise',
  'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'RebeccaPurple', 'Red',
  'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue',
  'SlateBlue', 'SlateGray', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet',
  'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'
];

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
    const [selectedColor, setSelectedColor] = useState<string>(value || 'AliceBlue');
  
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
          <select id="colorSelect" name="colors" value={selectedColor} onChange={handleChange} style={{background: selectedColor}}>
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