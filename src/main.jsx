import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App.jsx";

//toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//store
import { Provider } from "react-redux";
import store from "./store.js";

//css
import "./index.css";

createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
			<ToastContainer position="bottom-right" />
		</Provider>
	</React.StrictMode>
);
