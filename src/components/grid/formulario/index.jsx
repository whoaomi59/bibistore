import React, { useEffect, useState } from "react";
import DynamicSelect from "./DynamicSelect ";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Form = ({ isOpen, onClose, fields, onSubmit, title, initialValues }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const initial = fields.reduce((acc, field) => {
      let value = initialValues?.[field.name] || "";
      if (field.type === "dinamiselect") {
        value = String(value); // Aseguramos que sea string
      }
      acc[field.name] = value;
      return acc;
    }, {});
    setFormData(initial);
  }, [initialValues, fields]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0000007a] bg-opacity-50 z-200 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl z-50 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-end">
          <button type="button" onClick={onClose}>
            <XMarkIcon className="w-5 hover:text-green-600" />
          </button>
        </div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">{title}</h2>

        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label
                className={`block text-gray-600 text-sm font-medium mb-1 ${
                  field.disable && "bg-white border-white text-white"
                }`}
              >
                {field.label}{" "}
                {field.required && <span className="text-red-600">*</span>}
              </label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg border-gray-300"
                >
                  <option value="">Seleccione...</option>
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "file" ? (
                <input
                  type="file"
                  name={field.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg border-gray-300"
                  required={field.required}
                />
              ) : field.type === "dinamiselect" ? (
                <DynamicSelect
                  url={field.url}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  valueKey={field.value}
                  labelKey={field.text}
                  required={field.required}
                  placeholder={field.placeholder}
                  style={field.style}
                />
              ) : (
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg border-gray-300 ${
                    field.disable && "bg-white border-white text-white"
                  } ${field.gray && "bg-gray-300"}`}
                  disabled={field.disable || field.gray}
                  required={field.required}
                />
              )}
            </div>
          ))}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 rounded-lg text-white hover:bg-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 rounded-lg text-white hover:bg-green-600"
            >
              {initialValues ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
