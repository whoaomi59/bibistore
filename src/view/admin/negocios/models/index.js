export const Columns = [
  { key: "id", label: "id" },
  { key: "estado", label: "estado" },
  { key: "logo_negocio", label: "logo" },
  { key: "nombre", label: "Negocio" },
  { key: "categoria", label: "Categoria" },
  { key: "categoria_id", label: "idcategoria" },
  { key: "Usuario", label: "Usuario" },
  { key: "usuario_id", label: "idUsuario" },
  { key: "direccion", label: "direccion" },
  { key: "telefono", label: "telefono" },
  { key: "ApiKey", label: "ApiKey" },
  { key: "email", label: "email" },

  { key: "Horario_inicial", label: "Horario_inicial" },
  { key: "Horario_final", label: "Horario_final" },
  { key: "created_at", label: "created_at" },
];
export const fields = [
  { name: "nombre", label: "Nombre Negocio", type: "text", required:true},
  { 
    name: "usuario_id", 
    label: "Administrador del negocio",
    type: "dinamiselect",
    url:'/api/usuarios/user_negocios.php',
    value:'id', 
    text:'nombre', required:true
  },
  { 
    name: "categoria_id", 
    label: "Categoria Negocio",
    type: "dinamiselect",
    url:'/api/categorias_negocios/controller.php',
    value:'id', 
    text:'nombre',required:true
  },
  { name: "direccion", label: "Ubicacion Negocio", type: "text",required:true },
  { name: "telefono", label: "Telefono", type: "number" ,required:true},
  { name: "ApiKey", label: "ApiKey", type: "number" },
  { name: "email", label: "Correo Electronico", type: "email" ,required:true},
  { name: "logo", label: "Logo Negocio", type: "file" },
  { name: "Horario_inicial", label: "Horario_inicial", type: "time",required:true },
  { name: "Horario_final", label: "Horario_final", type: "time" ,required:true},
  { name: "id", label: "ID", type: "number" ,disable:true},
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