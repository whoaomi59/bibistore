export const Columns = [
  { key: "id", label: "id" },
  { key: "img", label: "img" },
  { key: "empresa_id", label: "Nombre" },
];


export const fields = [
  { 
    name: "empresa_id", 
    label: "Empresa",
    type: "dinamiselect",
    url:'/api/empresas/controller.php',
    value:'id', 
    text:'nombre', 
  },
  { name: "img", label: "img", type: "file" },
  { name: "id", label: "ID", type: "number",disable:true },
];

