export const ModelsUsuarios = [
  { key: "id_pedido", label: "id" },
  { key: "logo_pedido", label: "logo" },
  { key: "nombre_negocio", label: "Negocio" },
  { key: "usuario_pedido", label: "usuario_pedido" },  
  { key: "estado", label: "Estado" },  
  { key: "total", label: "total" },
];

export const fields = [
  { name: "nombre", label: "Nombre", type: "text" },
  { name: "Empresa", label: "Nombre", type: "text" },
  { name: "email", label: "Correo", type: "email" },
  { name: "telefono", label: "Telefono", type: "number" },
  {
    name: "rol",
    label: "Rol",
    type: "select",
    options: [
      { value: "admin", label: "admin" },
      { value: "negocio", label: "negocio" },
      { value: "cliente", label: "cliente" },
      { value: "domiciliario", label: "domiciliario" },
    ],
  },
  { name: "password", label: "Password", type: "text" },
];
