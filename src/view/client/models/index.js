export const fields = [
  { name: "nombre", label: "Nombre Negocio", type: "text" },
  { 
    name: "categoria_id", 
    label: "Categoria Negocio",
    type: "dinamiselect",
    url:'/api/categorias_negocios/controller.php',
    value:'id', 
    text:'nombre',
  },
  { name: "direccion", label: "Ubicacion Negocio", type: "text" },
  { name: "telefono", label: "Telefono", type: "number" },
  { name: "email", label: "Correo Electronico", type: "email" },
  { name: "logo", label: "Logo Negocio", type: "file" },
  { name: "Horario_inicial", label: "Horario_inicial", type: "time" },
  { name: "Horario_final", label: "Horario_final", type: "time" },
];