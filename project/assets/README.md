# Activos visuales

Todas las imágenes publicadas viven dentro de `assets/` y se agrupan por uso:

- `brand/`: logotipos y elementos de identidad.
- `carousels/hero/`: fotografías del carrusel principal de la portada.
- `carousels/gallery/`: fotografías del carrusel de galería.
- `carousels/banners/`: banners del carrusel comercial.
- `services/`: imagen principal de cada página de servicio. El nombre coincide con el slug HTML.
- `home/`: fotografías auxiliares usadas en la portada.
- `editorial/`: imágenes de Art Break y contenidos editoriales.

## Para reemplazar una imagen

1. Conserva la carpeta de la sección.
2. Usa minúsculas, guiones y un nombre descriptivo: `fachada-andamio.webp`.
3. Prefiere WebP para fotografías; conserva una dimensión suficiente para el tamaño máximo de uso.
4. Actualiza la ruta y el texto `alt` en el componente o página que la utiliza.
5. Comprueba que la ruta sea relativa al archivo HTML y que el archivo exista.

Los archivos originales o pendientes de clasificar se conservan temporalmente en `uploads/`. No se deben enlazar desde páginas públicas sin renombrarlos y ubicarlos en la sección correspondiente.
