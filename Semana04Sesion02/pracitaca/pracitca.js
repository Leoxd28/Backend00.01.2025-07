
let arrProductos = [
    {
        id: "cafe",
        opciones: ["Americano", "Expreso", "Latte", "Mocca"]
    },
    {
        id: "postres",
        opciones: ["Torta de Chocolate", "Croissant", "Triple"]
    }
];

let arrExtras = [
    {
        id: "Leche",
        opciones: ["Normal", "Leche de Almendras", "Leche de Soya"]
    },
    {
        id: "Azucar",
        opciones: ["Azucar Morena", "Azucar Blanca", "Stevia"]
    },
    {
        id: "Toppins",
        opciones: ["Crema", "Chocolate", "Vainilla"]
    }
];

function prueba1(list,id) {
return Findlist.id((obj)=>obj.id===id).opciones
}
 let strlistaproducots="escoge tu producto \n"
for (let index = 0; index < arrProductos.length; index++) {
    const element = arrProductos[index].id;
    let strlistaproducots += "${index} = ${arrProductos} \n";
    
}   
let tipoproducto;
let strproducto;
for (let index = 0; index < arrProductos.length; index++) {
    if (index== parseInt(opcion)) {
    tipoproducto=arrProductos[index].id
    strproducto=arrProductos[index].opciones
    }
    
}
listaproducto="";
for (let index = 0; index < tipoproducto.length; dex++) {
     const element =tipoproducto[index];
     tipoproducto +="${index} = ${element}\n"
    }

  opcion=prompt(listaproducto)
  
    
  for (let index = 0; index < tipoproducto.length; index++) {
     if (index== opcion) {
         const element = tipoproducto(index)
         objclientes[strproducto]= element
         break;

     }
    
  }

