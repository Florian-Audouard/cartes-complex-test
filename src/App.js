import "./App.css";
import Carte from "./Carte";

function App() {
	let url_add = "";
	if (process.env.NODE_ENV === "development") url_add = "http://localhost:80";
	fetch(url_add + "/test")
		.then((res) => res.json())
		.then((data) => {
			console.log(data.test);
		});
	return (
		<div className="App">
			<Carte></Carte>
		</div>
	);
}

export default App;
