
class AccountInfo extends HTMLElement {
  static get observedAttributes() { return ['id', 'name', 'password']; }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = `
      .info-box {
        background-color: #ffffe0;
        border: 2px solid #000;
        padding: 15px;
        margin: 10px;
        width: fit-content;
      }
      .name {
        font-family: "楷体", "KaiTi", cursive;
        color: #000;
        margin-bottom: 5px;
      }
      .id {
        color: #000;
        margin-bottom: 5px;
      }
      .password {
        color: #000;
        -webkit-text-security: disc;
        text-security: disc;
      }
    `;

    const container = document.createElement('div');
    container.className = 'info-box';

    this.nameElement = document.createElement('div');
    this.nameElement.className = 'name';
    
    this.idElement = document.createElement('div');
    this.idElement.className = 'id';
    
    this.pwdElement = document.createElement('div');
    this.pwdElement.className = 'password';

    container.appendChild(this.nameElement);
    container.appendChild(this.idElement);
    container.appendChild(this.pwdElement);
    
    shadow.appendChild(style);
    shadow.appendChild(container);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'name') {
      this.nameElement.textContent = newValue;
    } else if (name === 'id') {
      this.idElement.textContent = `ID: ${newValue}`;
    } else if (name === 'password') {
      this.pwdElement.textContent = newValue; 
    }
  }
}

customElements.define('account-info', AccountInfo);