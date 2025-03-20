class DivideLine extends HTMLElement {
  static get observedAttributes() {
    return ['state'];
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.container = document.createElement('div');
    shadow.appendChild(this.container);
    this._initStyles(shadow);
  }

  _initStyles(shadow) {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        width: 100%;
        padding: 20px 0;
        overflow-x: auto;
      }

      .dots-container {
        display: flex;
        justify-content: center;
        gap: 10px;
        min-width: min-content;
        padding: 5px 0;
      }

      .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        flex-shrink: 0;
        animation: none; 
      }

      .color-0 { background-color: #FF4444; }
      .color-1 { background-color: #FFA500; }
      .color-2 { background-color: #FFD700; }
      .color-3 { background-color: #4285F4; }
      .color-4 { background-color: #34A853; }

      @keyframes flash {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.2; } /* 增加对比度 */
      }

      .flash {
        animation: flash 1s infinite both !important;
      }
    `;
    shadow.appendChild(style);
  }

  _createDots() {
    const tempFrag = document.createDocumentFragment();
    
    for(let i = 0; i < 55; i++) {
      const dot = document.createElement('div');
      dot.className = `dot color-${i % 5}`;
      tempFrag.appendChild(dot);
    }
    
    this.container.className = 'dots-container';
    this.container.replaceChildren(tempFrag); 
  }

  _updateState() {
    const isFlash = this.hasAttribute('state'); 
    
    this.container.childNodes.forEach(dot => {
      if (isFlash) {
        dot.classList.add('flash');
        void dot.offsetWidth;
      } else {
        dot.classList.remove('flash');
      }
    });
  }

  attributeChangedCallback(name) {
    if (name === 'state') {
      this._updateState();
    }
  }

  connectedCallback() {
    this._createDots();
    const ro = new ResizeObserver(entries => {
      if (entries[0].contentRect.width !== this._lastWidth) {
        this._createDots();
        this._updateState(); 
        this._lastWidth = entries[0].contentRect.width;
      }
    });
    ro.observe(this);
  }
}

customElements.define('divide-line', DivideLine);