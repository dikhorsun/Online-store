import Page from '../../templates/page';

export const enum ErrorTypes {
    Error_404 = 404,
}

class ErrorPage extends Page {
    constructor(id: string, errorType: ErrorTypes | string) {
        super(id);
    }

    render() {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = 'PAGE NOT FOUND (404)';
        this.container.append(errorDiv);
        return this.container;
    }
}

export default ErrorPage;
