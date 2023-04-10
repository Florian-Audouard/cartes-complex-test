import { useState, useEffect } from "react";
import "./Carte.css";
import Card from "./class/Card";

function Carte() {
	const [ex, setEx] = useState();
	const [currentEx, setCurrentEx] = useState();

	useEffect(() => {
		let tmpEx = [];
		fetch("json/ex24.json")
			.then((response) => response.text())
			.then((data) => {
				tmpEx = JSON.parse(data);
				setEx(tmpEx);
				const tmp = toClass(tmpEx[0][1], 0);
				console.log(tmp.toString());
				setCurrentEx(tmp);
			});
	}, []);

	const toClass = (obj, i) => {
		// Si c'est une carte complexe
		if (obj.color === undefined)
			return new Card(
				i,
				null,
				false,
				obj.link,
				toClass(obj.left, 0),
				toClass(obj.right, 1)
			);
		// Si c'est une carte simple
		else return new Card(i, obj.color, false, "", null, null);
	};
	const matToString = (mat) => {
		let tmp = "";
		let res = "";
		for (let e of mat) {
			tmp = "";
			for (let y of e) {
				tmp += y + " ";
			}
			res += `"${tmp}" \n`;
		}
		return res;
	};

	const recurciveRender = (currentCard, count) => {
		if (currentCard.color !== null) {
			return (
				<span
					className="card_simple"
					style={{ backgroundColor: currentCard.color }}
				></span>
			);
		}
		let className = "carte_container_horizon";
		let link = "link_horizon";
		className = "carte_container_vertical";
		link = "link_vertical";

		if (count % 2 === 0) {
			className = "carte_container_horizon";
			link = "link_horizon";
		}
		return (
			<span className={className}>
				{[
					recurciveRender(currentCard.left, count - 1),
					<div className={link}>{currentCard.link}</div>,
					recurciveRender(currentCard.right, count - 1),
				]}
			</span>
		);
	};

	function RenderCard(props) {
		const currentCard = props.currentCard;
		if (currentCard === undefined) {
			return <span></span>;
		}
		return recurciveRender(currentCard, currentCard.getProfondeur());
	}

	function calcSizeCard(card) {
		if (card === undefined) {
			return {
				minWidth: 0,
				minHeight: 0,
			};
		}
		let width = 170;
		let height = 250;
		let save_deep = card.getProfondeur();
		if (save_deep % 2 === 0) {
			width = 270;
		}
		if (save_deep > 3) {
			width *= 2;
			height *= 2;
		}
		let tmp = {
			width: width,
			height: height,
		};
		return tmp;
	}

	return (
		<div className="deck">
			<div className="carte_size" style={calcSizeCard(currentEx)}>
				<RenderCard currentCard={currentEx}></RenderCard>
			</div>
		</div>
	);
}

export default Carte;
