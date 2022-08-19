import "./App.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadData } from "./reducers/customSettings";
import { loadUser } from "./reducers/auth";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Slider from "./components/Slider";
import Grid from "./components/Grid";
import Reviews from "./components/Reviews";
import Model from "./components/Model";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Promotions from "./components/Promotions";

function App() {
	const dispatch = useDispatch();
	const sliderImages = useSelector(
		(state) => state?.settings?.data?.sliderpictures
	);
	const gridImages = useSelector(
		(state) => state?.settings?.data?.gridpictures
	);
	const pictureStyle = useSelector(
		(state) => state?.settings?.data?.picturestyle
	);

	useEffect(() => {
		dispatch(loadData());
		dispatch(loadUser());
	}, []);
	return (
		<div className="App">
			<Model />
			<Navbar />
			<Promotions />
			<Hero />
			<Features />
			{pictureStyle === "grid" ? (
				gridImages && gridImages.length > 0 ? (
					<Grid images={gridImages} />
				) : (
					<></>
				)
			) : pictureStyle === "slider" ? (
				sliderImages && sliderImages.length > 0 ? (
					<Slider images={sliderImages} />
				) : (
					<></>
				)
			) : (
				<></>
			)}
			{sliderImages && sliderImages.length > 0 ? (
				<Slider images={sliderImages} />
			) : (
				<></>
			)}
			{/* Reviews */}
			<div id="reviews" className="review-main-conatiner">
				<div className="review-left">
					<span>Check</span> <span>Our</span>
					<span>Reviews.</span>
				</div>
				<div className="review-right">
					<Reviews />
				</div>
			</div>
			{/* Contact Us */}
			<div id="contact" className="contact-main-conatiner">
			<div className="contact-right">
					<Contact />
				</div>
				<div className="contact-left">
					<span>Contact</span> <span> Us</span> 
				</div>
				
			</div>
			{/* Footer */}
			<Footer />
		</div>
	);
}

export default App;
