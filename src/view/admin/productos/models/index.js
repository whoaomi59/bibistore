export const Columns = [
  { key: "id", label: "id" },
  { key: "estado_formater", label: "estado" },
  { key: "img", label: "img" },
  { key: "nombre", label: "Nombre" },
  { key: "Tipo", label: "Tipo Producto" },
  { key: "Negocio", label: "Negocio" },
  { key: "negocio_id", label: "idNegocio" },
  { key: "descripcion", label: "Descripcion" },
  { key: "precio", label: "Precio" },
  { key: "fecha_producto", label: "Fecha" },
  { key: "tipo_id", label: "tipo_id" },
  { key: "estado", label: "keyestado" },
];


export const fields = [
  { name: "nombre", label: "nombre", type: "text" ,required:true},
  { 
    name: "negocio_id", 
    label: "Negocio Asignar",
    type: "dinamiselect",
    url:'/api/negocios/controller.php',
    value:'idnegocio', 
    text:'Negocio'
    ,required:true
  },
  { 
    name: "tipo_id", 
    label: "Tipo Producto",
    type: "dinamiselect",
    url:'/api/tipos_productos/controller.php',
    value:'id', 
    text:'nombre'
    ,required:true
  },
  { name: "descripcion", label: "descripcion", type: "text" ,required:true},
  { name: "precio", label: "precio", type: "number" ,required:true},
  { name: "img", label: "img", type: "file"},
  { name: "id", label: "ID", type: "number",disable:true },
];

export const FielsEstado =[
  { name: "estado", label: "estado", type: "select",options:[
    {
      value:0,
      label:'Activo'
    },
    {
      value:1,
      label:'Inactivo'
    }
  ] },
  { name: "id", label: "ID", type: "number",disable:true },
]