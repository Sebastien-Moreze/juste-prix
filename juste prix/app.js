document.addEventListener("DOMContentLoaded", () => {
	const prixjuste = Math.floor(Math.random() * 1001);
	let essais = 0;
	const propositions = [];

	const verifierproposition = (event) => {
		event.preventDefault();

		const proposition = Number.parseInt(document.getElementById("prix").value);
		const instructions = document.getElementById("instructions");

		if (!instructions) {
			console.error("L'élément avec l'ID 'instructions' n'a pas été trouvé.");
			return;
		}

		instructions.classList.remove("text-success", "text-danger");

		if (Number.isNaN(proposition)) {
			instructions.textContent = "Veuillez entrer un nombre.";
			instructions.classList.add("text-danger");
		} else {
			essais++;
			propositions.push(proposition);

			let message = `Tentative #${essais} (${proposition}): `;
			if (proposition < prixjuste) {
				message += "C'est plus !";
				instructions.classList.add("text-danger");
			} else if (proposition > prixjuste) {
				message += "C'est moins !";
				instructions.classList.add("text-danger");
			} else {
				message += "C'est le Juste Prix !!!";
				instructions.classList.add("text-success");
			}

			const nouveauParagraphe = document.createElement("p");
			nouveauParagraphe.textContent = message;
			instructions.appendChild(nouveauParagraphe);
		}
	}

	document
		.getElementById("formulaire")
		.addEventListener("submit", verifierproposition);
});
