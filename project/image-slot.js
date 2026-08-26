class ImageSlot extends HTMLElement {
  connectedCallback() {
    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
    this.setAttribute('aria-label', this.getAttribute('placeholder') || 'Cargar imagen');
    this.renderPlaceholder();
    this.addEventListener('dragover', event => {
      event.preventDefault();
      this.classList.add('is-dragging');
    });
    this.addEventListener('dragleave', () => this.classList.remove('is-dragging'));
    this.addEventListener('drop', event => {
      event.preventDefault();
      this.classList.remove('is-dragging');
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) this.showFile(file);
    });
    this.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.openPicker();
      }
    });
    this.addEventListener('click', () => this.openPicker());
  }

  renderPlaceholder() {
    this.innerHTML = '';
    const label = document.createElement('span');
    label.textContent = this.getAttribute('placeholder') || 'Arrastra una imagen';
    this.appendChild(label);
  }

  openPicker() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', () => {
      if (input.files[0]) this.showFile(input.files[0]);
    });
    input.click();
  }

  showFile(file) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.innerHTML = '';
      const image = document.createElement('img');
      image.src = reader.result;
      image.alt = this.getAttribute('placeholder') || 'Imagen del equipo';
      this.appendChild(image);
    });
    reader.readAsDataURL(file);
  }
}

customElements.define('image-slot', ImageSlot);
