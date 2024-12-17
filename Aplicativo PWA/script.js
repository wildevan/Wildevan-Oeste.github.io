if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('Service worker registrado com sucesso:', registration);
            })
            .catch((err) => {
                console.log('Erro ao registrar Service worker:', err);
            });
    });
}
