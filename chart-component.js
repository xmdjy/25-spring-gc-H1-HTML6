
class ChartComponent extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'data', 'dataid'];
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this._container = document.createElement('div');
    shadow.appendChild(this._container);
    this._initStyles(shadow);
  }

  _initStyles(shadow) {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        margin: 2rem 0;
        font-family: system-ui, sans-serif;
        --primary-color: #4CAF50;
        --bg-color: #f8f9fa;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      }

      caption {
        padding: 1rem;
        font-size: 1.25rem;
        font-weight: 600;
        text-align: left;
        background: var(--bg-color);
      }

      tr {
        border-bottom: 1px solid #eee;
      }

      td {
        padding: 1rem;
        vertical-align: top;
      }

      .data-name {
        font-weight: 500;
        color: #333;
        margin-bottom: 0.5rem;
        display: block;
      }

      .data-value {
        color: #666;
        font-size: 0.9em;
        display: block;
        margin-bottom: 0.75rem;
      }

      .bar-container {
        height: 20px;
        background: #f1f3f5;
        border-radius: 4px;
        overflow: hidden;
      }

      .data-bar {
        height: 100%;
        background: var(--primary-color);
        transition: width 0.4s ease-out;
      }
    `;
    shadow.appendChild(style);
  }

  _generateTable() {
    const name = this.getAttribute('name') || 'Data Chart';
    const dataValues = (this.getAttribute('data') || '')
      .split(',')
      .map(Number)
      .filter(n => !isNaN(n));
    const columns = (this.getAttribute('dataid') || '')
      .split(',')
      .filter(Boolean);

    const maxValue = Math.max(...dataValues, 1);

    const table = document.createElement('table');
    const caption = document.createElement('caption');
    caption.textContent = name;

    const tbody = document.createElement('tbody');

    dataValues.forEach((value, index) => {
      const tr = document.createElement('tr');
      const td = document.createElement('td');

      const nameElem = document.createElement('span');
      nameElem.className = 'data-name';
      nameElem.textContent = columns[index] || `Item ${index + 1}`;

      const valueElem = document.createElement('span');
      valueElem.className = 'data-value';
      valueElem.textContent = value.toLocaleString();

      const barContainer = document.createElement('div');
      barContainer.className = 'bar-container';
      
      const bar = document.createElement('div');
      bar.className = 'data-bar';
      bar.style.width = `${(value / maxValue) * 100}%`;

      barContainer.appendChild(bar);
      td.append(nameElem, valueElem, barContainer);
      tr.appendChild(td);
      tbody.appendChild(tr);
    });

    table.append(caption, tbody);
    return table;
  }

  attributeChangedCallback() {
    this._updateContent();
  }

  _updateContent() {
    this._container.innerHTML = '';
    this._container.appendChild(this._generateTable());
  }

  connectedCallback() {
    if (!this.isConnected) return;
    this._updateContent();
  }
}

customElements.define('chart-component', ChartComponent);