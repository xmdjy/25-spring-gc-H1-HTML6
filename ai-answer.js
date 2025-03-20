class AIAnswer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentQuestion = '';
    this._initStyles();
    this._initContainer();
    this._renderLoading();
  }

  static get observedAttributes() {
    return ['question'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'question' && newValue !== oldValue) {
      this.currentQuestion = newValue;
      this._renderLoading();
      this._fetchAnswer(newValue);
    }
  }

  _initStyles() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        padding: 16px 20px;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        margin: 16px 0;
        background: #fff;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      }

      .question {
        padding: 12px 16px;
        margin-bottom: 16px;
        background: #f8f9fa;
        border: 1px solid #e9ecef;
        border-radius: 8px;
        color: #212529;
        font-size: 15px;
        font-weight: 500;
      }

      .loading {
        display: flex;
        align-items: center;
        color: #6b7280;
        font-size: 14px;
      }

      .loading::after {
        content: "";
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 2px solid #ddd;
        border-radius: 50%;
        border-top-color: #3b82f6;
        margin-left: 8px;
        animation: spin 1s linear infinite;
      }

      .answer {
        line-height: 1.6;
        color: #374151;
        font-size: 15px;
      }

      .error {
        color: #ef4444;
        padding: 12px;
        background: #fef2f2;
        border-radius: 6px;
        border: 1px solid #fee2e2;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    this.shadowRoot.appendChild(style);
  }

  _initContainer() {
    this.container = document.createElement('div');
    this.container.classList.add('container');
    this.shadowRoot.appendChild(this.container);
  }

  _renderLoading() {
    this.container.innerHTML = `
      ${this.currentQuestion ? `<div class="question">${this._escapeHtml(this.currentQuestion)}</div>` : ''}
      <div class="loading">思考中...</div>
    `;
  }

  async _fetchAnswer(question) {
    try {
      const apiKey = '31a2ce8b-6526-43f2-a2f4-00886874de50';
      const response = await fetch('https://ark.cn-beijing.volces.com/api/v3/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "deepseek-v3-241226",
          messages: [
            { role: "system", content: "你是专业的人工智能助手。" },
            { role: "user", content: question }
          ]
        })
      });

      if (!response.ok) throw new Error(`请求失败: ${response.status}`);
      
      const data = await response.json();
      this._showAnswer(data.choices[0].message.content);
    } catch (error) {
      this._showError(error.message);
    }
  }

  _showAnswer(answer) {
    this.container.innerHTML = `
      ${this.currentQuestion ? `<div class="question">${this._escapeHtml(this.currentQuestion)}</div>` : ''}
      <div class="answer">${answer}</div>
    `;
  }

  _showError(error) {
    this.container.innerHTML = `
      ${this.currentQuestion ? `<div class="question">${this._escapeHtml(this.currentQuestion)}</div>` : ''}
      <div class="error">${this._escapeHtml(error)}</div>
    `;
  }

  _escapeHtml(unsafe) {
    return unsafe?.replace(/&/g, "&amp;")
                 .replace(/</g, "&lt;")
                 .replace(/>/g, "&gt;")
                 .replace(/"/g, "&quot;")
                 .replace(/'/g, "&#039;") || '';
  }
}

customElements.define('ai-answer', AIAnswer);
