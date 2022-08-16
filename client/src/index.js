import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/user/Dashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import setAuthToken from "./utils/setAuthToken";
import Allusers from "./components/admin/Allusers";
import Allappointments from "./components/admin/Allappointments";
import Settings from "./components/admin/Settings";
import Gridsettings from "./components/admin/Gridsettings";
import Slidersettings from "./components/admin/Slidersettings";
import Dashboards from "./components/admin/Dashboards";
import EditReviews from "./components/admin/EditReviews";

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="admin" element={<AdminDashboard />}>
          <Route index element={<Dashboards />} />
					<Route path="users" element={<Allusers />} />
					<Route path="reviews" element={<EditReviews />} />
					<Route path="appointments" element={<Allappointments />} />
					<Route path="settings" element={<Settings />} />
					<Route path="gridsettings" element={<Gridsettings />} />
					<Route path="slidersettings" element={<Slidersettings />} />
				</Route>
				<Route path="dashboard" element={<Dashboard />} />
			</Routes>
		</BrowserRouter>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log)).ok
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
