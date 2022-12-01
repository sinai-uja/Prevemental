import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import PwaInstallPopupIOS from 'react-pwa-install-ios';
import logo from './logo192.png'

const root = ReactDOM.createRoot(document.getElementById('root'));

const MyComponent = () => {
    return (
        <PwaInstallPopupIOS 
            delay={2}
            lang="en"
            appIcon={logo}>
        </PwaInstallPopupIOS>
    );
};

root.render(
    <App />,
);

serviceWorkerRegistration.register();