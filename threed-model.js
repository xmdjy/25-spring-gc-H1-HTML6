// three-d-model.js
class ThreeDModel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 400px;
                    height: 400px;
                }
                div {
                    width: 100%;
                    height: 100%;
                    position: relative;
                }
                .loading {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                canvas {
                    width: 100%;
                    height: 100%;
                }
            </style>
            <div>
                <div class="loading">Loading model...</div>
            </div>
        `;

        this.container = this.shadowRoot.querySelector('div');
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        this.model = null;
        this.axisVector = new THREE.Vector3(1, 0, 0);
        this.speedValue = 0;
        this.clock = new THREE.Clock();
    }

    connectedCallback() {
        this.initScene();
        this.loadModel();
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    disconnectedCallback() {
        window.removeEventListener('resize', this.onWindowResize.bind(this));
        this.stopAnimation();
    }

    static get observedAttributes() {
        return ['axis', 'speed'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'axis') {
            this.updateRotationAxis(newValue);
        } else if (name === 'speed') {
            this.speedValue = parseFloat(newValue || 10) * (Math.PI / 180);
        }
    }

    initScene() {
        this.container.appendChild(this.renderer.domElement);
        this.camera.position.z = 5;
        this.scene.background = new THREE.Color(0xeeeeee);
        this.onWindowResize();
    }

    async loadModel() {
        const modelPath = `models/${this.getAttribute('name')}`;
        try {
            const loader = this.detectLoader(modelPath);
            const gltf = await this.loadWithLoader(loader, modelPath);
            this.model = gltf.scene;
            this.scene.add(this.model);
            this.container.querySelector('.loading').style.display = 'none';
            this.startAnimation();
        } catch (error) {
            console.error('Error loading model:', error);
            this.container.querySelector('.loading').textContent = 'Error loading model';
        }
    }

    detectLoader(path) {
        if (path.endsWith('.glb') || path.endsWith('.gltf')) {
            return new THREE.GLTFLoader();
        }
        throw new Error('Unsupported model format');
    }

    loadWithLoader(loader, path) {
        return new Promise((resolve, reject) => {
            loader.load(path, resolve, undefined, reject);
        });
    }

    updateRotationAxis(axis) {
        const normalizedAxis = (axis || 'x').toLowerCase();
        switch (normalizedAxis) {
            case 'x': this.axisVector.set(1, 0, 0); break;
            case 'y': this.axisVector.set(0, 1, 0); break;
            case 'z': this.axisVector.set(0, 0, 1); break;
            default: console.warn('Invalid axis, using default x-axis');
        }
    }

    startAnimation() {
        this.speedValue = parseFloat(this.getAttribute('speed') || 10) * (Math.PI / 180);
        this.updateRotationAxis(this.getAttribute('axis'));
        this.animate();
    }

    animate() {
        if (!this.model) return;
        
        const deltaTime = this.clock.getDelta();
        this.model.rotateOnWorldAxis(this.axisVector, this.speedValue * deltaTime);
        this.renderer.render(this.scene, this.camera);
        this.animationId = requestAnimationFrame(this.animate.bind(this));
    }

    stopAnimation() {
        cancelAnimationFrame(this.animationId);
    }

    onWindowResize() {
        const width = this.offsetWidth;
        const height = this.offsetHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
}

customElements.define('threed-model', ThreeDModel);