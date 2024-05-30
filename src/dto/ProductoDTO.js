class ProductoDTO {
  
    constructor(id, title, price, image, category, cantidad, nombreProveedor, precioAdquirido, fechaAdquirido, ganancia) {
      this.id = id;
      this.title = title;
      this.price = price;
      this.image = image;
      this.category = category;
      this.cantidad = cantidad;
      this.nombreProveedor = nombreProveedor;
      this.precioAdquirido = precioAdquirido;
      this.fechaAdquirido = fechaAdquirido;
      this.ganancia = ganancia;
    }
  }
  
  export default ProductoDTO;