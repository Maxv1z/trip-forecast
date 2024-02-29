import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
const queryClient = new QueryClient();

import {AuthContextProvider} from "./context/AuthContext";
import {ActiveCityContextProvider} from "./context/ActiveCityContext";

console.log("env vars", import.meta.env.VITE_apiKey);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                <ActiveCityContextProvider>
                    <App />
                </ActiveCityContextProvider>
            </AuthContextProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
