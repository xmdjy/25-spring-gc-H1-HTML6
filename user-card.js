class UserCard extends HTMLElement {
  static get observedAttributes(){
    return ['name', 'age', 'gender'];
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        :host {
          display: block;
          margin: 15px;
        }

        .card {
          display:block;
          border: 2px solid #add8e6;
          border-radius: 10px;
          background: white;
          padding: 20px;
          width: 250px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          font-family: Arial, sans-serif;
          transition: transform 0.2s;
        }

        .card:hover {
          transform: translateY(-3px);
        }

        .name {
          font-size: 20px;
          color: #333;
          margin: 0 0 15px 0;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }

        .age, .gender {
          font-size: 16px;
          color: #666;
          margin: 8px 0;
          display: flex;
          justify-content: space-between;
        }

        .label {
          font-weight: bold;
          margin-right: 15px;
        }
      </style>

      <div class="card">
        <h3 class="name"><slot name="name">未命名</slot></h3>
        <p class="age">
          <span class="label">年龄:</span>
          <span class="value"><slot name="age">未知</slot></span>
        </p>
        <p class="gender">
          <span class="label">性别:</span>
          <span class="value"><slot name="gender">未知</slot></span>
        </p>
      </div>
    `;

    shadow.appendChild(template.content.cloneNode(true));
    this.dom = {
      name: shadow.querySelector('.name'),
      age: shadow.querySelector('.age .value'),
      gender: shadow.querySelector('.gender .value')
    };
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    this.updateContent();
  }

  connectedCallback() {
    this.updateContent();
  }

  updateContent() {
    if (!this.hasSlot('name')) {
      this.dom.name.textContent = this.getAttribute('name') || '未命名';
    }
    if (!this.hasSlot('age')) {
      this.dom.age.textContent = this.getAttribute('age') || '未知';
    }
    if (!this.hasSlot('gender')) {
      this.dom.gender.textContent = this.getAttribute('gender') || '未知';
    }
  }

  hasSlot(slotName) {
    return this.querySelector(`[slot="${slotName}"]`) !== null;
  }
}

customElements.define('user-card', UserCard);