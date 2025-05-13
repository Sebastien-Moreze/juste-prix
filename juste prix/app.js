document.addEventListener("DOMContentLoaded", () => {
	let prixjuste;
	let essais;
	let propositions;
	const meilleurScore = localStorage.getItem('meilleurScore') || '-';

	// Initialisation des éléments DOM
	const compteurTentatives = document.getElementById('compteur-tentatives');
	const meilleurScoreElement = document.getElementById('meilleur-score');
	const messageErreur = document.getElementById('message-erreur');
	const historique = document.getElementById('historique');
	const inputPrix = document.getElementById('prix');
	const instructions = document.getElementById('instructions');

	// Mise à jour de l'affichage du meilleur score
	meilleurScoreElement.textContent = meilleurScore;

	function initialiserPartie() {
		prixjuste = Math.floor(Math.random() * 1001);
		essais = 0;
		propositions = [];
		compteurTentatives.textContent = '0';
		instructions.innerHTML = '';
		historique.innerHTML = '';
		messageErreur.textContent = '';
		inputPrix.value = '';
		inputPrix.disabled = false;
		document.querySelector('button[type="submit"]').disabled = false;
	}

	function verifierProposition(event) {
		event.preventDefault();
		messageErreur.textContent = '';

		const proposition = Number.parseInt(inputPrix.value);

		if (Number.isNaN(proposition)) {
			messageErreur.textContent = "Veuillez entrer un nombre valide.";
			return;
		}

		if (proposition < 0 || proposition > 1000) {
			messageErreur.textContent = "Le nombre doit être entre 0 et 1000.";
			return;
		}

		// Réinitialisation du champ de saisie après la validation
		inputPrix.value = '';

		essais++;
		compteurTentatives.textContent = essais;
		propositions.push(proposition);

		const messageDiv = document.createElement("div");
		messageDiv.classList.add("message", "animate__animated", "animate__fadeIn");

		let message = `Tentative #${essais} (${proposition}): `;
		let classeCouleur;

		if (proposition < prixjuste) {
			message += "C'est plus !";
			classeCouleur = "text-warning";
		} else if (proposition > prixjuste) {
			message += "C'est moins !";
			classeCouleur = "text-danger";
		} else {
			message += "🎉 C'est le Juste Prix !!! 🎉";
			classeCouleur = "text-success";
			inputPrix.disabled = true;
			document.querySelector('button[type="submit"]').disabled = true;

			// Mise à jour du meilleur score
			if (meilleurScore === '-' || essais < meilleurScore) {
				meilleurScore = essais;
				localStorage.setItem('meilleurScore', meilleurScore);
				meilleurScoreElement.textContent = meilleurScore;
			}
		}

		messageDiv.textContent = message;
		messageDiv.classList.add(classeCouleur);
		instructions.appendChild(messageDiv);

		// Ajout à l'historique
		const historiqueItem = document.createElement("div");
		historiqueItem.classList.add("historique-item", "p-2", "mb-2", "rounded");
		historiqueItem.style.backgroundColor = proposition === prixjuste ? '#28a745' : 
											 proposition < prixjuste ? '#ffc107' : '#dc3545';
		historiqueItem.textContent = proposition;
		historique.appendChild(historiqueItem);

		// Scroll vers le bas
		instructions.scrollTop = instructions.scrollHeight;
	}

	// Initialisation de la première partie
	initialiserPartie();

	// Event listeners
	document.getElementById("formulaire").addEventListener("submit", verifierProposition);
	document.getElementById("nouvelle-partie").addEventListener("click", initialiserPartie);
});
