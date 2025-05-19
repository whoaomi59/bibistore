export const Columns = [
  { key: "negocios_id", label: "negocios_id" },
  { key: "img", label: "img" },
  { key: "negocios_id", label: "negocio" },
];


export const fields = [
  { 
    name: "negocios_id", 
    label: "Negocios",
    type: "dinamiselect",
    url:'/api/negocios/controller.php',
    value:'idnegocio', 
    text:'Negocio', 
  },
  { name: "img", label: "img", type: "file" },
  { name: "negocios_id", label: "ID", type: "number",disable:true },
];

