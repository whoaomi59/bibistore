import { useEffect, useState } from "react";
import axios from "axios";

const DynamicSelect = ({
  url,
  name,
  value,
  onChange,
  valueKey,
  labelKey,
  required,
  placeholder,
  style,
}) => {
  const [options, setOptions] = useState([]);

  console.log(value);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await axios.get(url);
        setOptions(res.data);
      } catch (err) {
        console.error("Error al cargar opciones:", err);
        setOptions([]);
      }
    };

    fetchOptions();
  }, [url]);

  const currentValue =
    value !== undefined && value !== null ? String(value) : "";

  return (
    <select
      name={name}
      value={currentValue}
      onChange={onChange}
      required={required}
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ${style}`}
    >
      <option value="">{placeholder || "Seleccionar..."}</option>
      {options.map((opt) => (
        <option key={opt[valueKey]} value={String(opt[valueKey])}>
          {opt[labelKey]}
        </option>
      ))}
    </select>
  );
};

export default DynamicSelect;
