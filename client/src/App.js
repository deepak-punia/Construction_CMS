import "./App.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadData } from "./reducers/customSettings";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Slider from "./components/Slider";
import Grid from "./components/Grid";

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
	}, []);
	return (
		<div className="App">
			<Navbar />
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
      {sliderImages && sliderImages.length > 0 ? <Slider images={sliderImages} />: <></>}
		</div>
	);
}

export default App;
