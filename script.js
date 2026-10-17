const playerPool = [
    // --- STRIKERS (ST) ---
    { name: "Kylian Mbappé", position: "ST", rating: 92, club: "Real Madrid", flag: "🇫🇷" },
    { name: "Erling Haaland", position: "ST", rating: 92, club: "Manchester City", flag: "🇳🇴" },
    { name: "Alexander Isak", position: "ST", rating: 89, club: "Liverpool", flag: "🇸🇪" },
    { name: "Viktor Gyökeres", position: "ST", rating: 88, club: "Arsenal", flag: "🇸🇪" },
    { name: "Harry Kane", position: "ST", rating: 90, club: "Bayern Munich", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { name: "Lautaro Martínez", position: "ST", rating: 89, club: "Inter Milan", flag: "🇦🇷" },

    // --- LEFT WINGERS (LW) ---
    { name: "Vinícius Jr.", position: "LW", rating: 91, club: "Real Madrid", flag: "🇧🇷" },
    { name: "Bradley Barcola", position: "LW", rating: 86, club: "Liverpool", flag: "🇫🇷" },
    { name: "Eberechi Eze", position: "LW", rating: 86, club: "Arsenal", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { name: "Rafael Leão", position: "LW", rating: 87, club: "AC Milan", flag: "🇵🇹" },

    // --- RIGHT WINGERS (RW) ---
    { name: "Bukayo Saka", position: "RW", rating: 89, club: "Arsenal", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { name: "Mohamed Salah", position: "RW", rating: 88, club: "Trabonzpor", flag: "🇪🇬" },
    { name: "Rodrygo", position: "RW", rating: 87, club: "Real Madrid", flag: "🇧🇷" },
    { name: "Lamine Yamal", position: "RW", rating: 90, club: "Barcelona", flag: "🇪🇸" },

    // --- CENTRAL MIDFIELDERS (CM) ---
    { name: "Jude Bellingham", position: "CM", rating: 91, club: "Real Madrid", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { name: "Florian Wirtz", position: "CM", rating: 90, club: "Liverpool", flag: "🇩🇪" },
    { name: "Martin Ødegaard", position: "CM", rating: 89, club: "Arsenal", flag: "🇳🇴" },
    { name: "Pedri", position: "CM", rating: 88, club: "Barcelona", flag: "🇪🇸" },
    { name: "Federico Valverde", position: "CM", rating: 89, club: "Real Madrid", flag: "🇺🇾" },

    // --- DEFENSIVE MIDFIELDERS (CDM) ---
    { name: "Rodri", position: "CDM", rating: 91, club: "Barcelona", flag: "🇪🇸" },
    { name: "Declan Rice", position: "CDM", rating: 88, club: "Arsenal", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { name: "Martín Zubimendi", position: "CDM", rating: 86, club: "Arsenal", flag: "🇪🇸" },
    { name: "Bruno Guimarães", position: "CDM", rating: 87, club: "Arsenal", flag: "🇧🇷" },

    // --- CENTRE BACKS (CB) ---
    { name: "William Saliba", position: "CB", rating: 89, club: "Arsenal", flag: "🇫🇷" },
    { name: "Gabriel Magalhães", position: "CB", rating: 88, club: "Arsenal", flag: "🇧🇷" },
    { name: "Virgil van Dijk", position: "CB", rating: 89, club: "Liverpool", flag: "🇳🇱" },
    { name: "Ibrahima Konaté", position: "CB", rating: 86, club: "Real Madrid", flag: "🇫🇷" },
    { name: "Ronald Araújo", position: "CB", rating: 87, club: "Liverpool", flag: "🇺🇾" },
    { name: "Rúben Dias", position: "CB", rating: 88, club: "Manchester City", flag: "🇵🇹" },

    // --- FULLBACKS (LB / RB) ---
    { name: "Trent Alexander-Arnold", position: "RB", rating: 88, club: "Real Madrid", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { name: "Jeremie Frimpong", position: "RB", rating: 86, club: "Liverpool", flag: "🇳🇱" },
    { name: "Myles Lewis-Skelly", position: "LB", rating: 83, club: "Arsenal", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { name: "Milos Kerkez", position: "LB", rating: 84, club: "Liverpool", flag: "🇭🇺" },
    { name: "Achraf Hakimi", position: "RB", rating: 86, club: "PSG", flag: "🇲🇦" },

    // --- GOALKEEPERS (GK) ---
    { name: "Gianluigi Donnarumma", position: "GK", rating: 89, club: "Manchester City", flag: "🇮🇹" },
    { name: "David Raya", position: "GK", rating: 88, club: "Arsenal", flag: "🇪🇸" },
    { name: "Thibaut Courtois", position: "GK", rating: 90, club: "Real Madrid", flag: "🇧🇪" },
    { name: "Alisson Becker", position: "GK", rating: 89, club: "Liverpool", flag: "🇧🇷" }
];

let squad = {};
let selectedPlayer = null;
let draftedCount = 0;

const playersArea = document.getElementById("players");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const roundInfo = document.getElementById("round-info");
const choiceTitle = document.getElementById("choice-title");
const teamRatingEl = document.getElementById("team-rating");

function getCardTierClass(rating) {
    if (rating >= 90) return "tier-90";
    if (rating >= 85) return "tier-85";
    return "tier-silver";
}

function calculateAverageRating() {
    const players = Object.values(squad);
    if (players.length === 0) return 0;
    const sum = players.reduce((total, player) => total + player.rating, 0);
    return Math.round(sum / players.length);
}

function findAvailableSlot(position) {
    if (position === "ST" && !squad["ST"]) return "ST";
    if (position === "LW" && !squad["LW"]) return "LW";
    if (position === "RW" && !squad["RW"]) return "RW";
    if (position === "CDM" && !squad["CDM"]) return "CDM";
    if (position === "LB" && !squad["LB"]) return "LB";
    if (position === "RB" && !squad["RB"]) return "RB";
    if (position === "GK" && !squad["GK"]) return "GK";

    if (position === "CM") {
        if (!squad["LCM"]) return "LCM";
        if (!squad["RCM"]) return "RCM";
    }

    if (position === "CB") {
        if (!squad["CB1"]) return "CB1";
        if (!squad["CB2"]) return "CB2";
    }

    const allSlots = ["LW", "ST", "RW", "LCM", "CDM", "RCM", "LB", "CB1", "CB2", "RB", "GK"];
    return allSlots.find(slotKey => !squad[slotKey]);
}

function showDraftChoices() {
    playersArea.innerHTML = "";
    selectedPlayer = null;
    nextBtn.style.display = "none";

    const filledPositions = Object.keys(squad);
    if (filledPositions.length >= 11) {
        const finalRating = calculateAverageRating();
        choiceTitle.innerHTML = `🎉 Draft Complete! Final Team Rating: ⭐ ${finalRating} OVR`;
        roundInfo.innerHTML = "Your 4-3-3 formation is fully drafted.";
        restartBtn.style.display = "inline-block";
        return;
    }

    const availablePool = playerPool.filter(p => {
        const inSquad = Object.values(squad).includes(p);
        if (inSquad) return false;

        if (p.position === "ST" && squad["ST"]) return false;
        if (p.position === "LW" && squad["LW"]) return false;
        if (p.position === "RW" && squad["RW"]) return false;
        if (p.position === "CDM" && squad["CDM"]) return false;
        if (p.position === "LB" && squad["LB"]) return false;
        if (p.position === "RB" && squad["RB"]) return false;
        if (p.position === "GK" && squad["GK"]) return false;
        
        if (p.position === "CM" && squad["LCM"] && squad["RCM"]) return false;
        if (p.position === "CB" && squad["CB1"] && squad["CB2"]) return false;

        return true;
    });
    
    const currentChoices = [];
    while (currentChoices.length < 3 && currentChoices.length < availablePool.length) {
        const randomPlayer = availablePool[Math.floor(Math.random() * availablePool.length)];
        if (!currentChoices.includes(randomPlayer)) {
            currentChoices.push(randomPlayer);
        }
    }

    currentChoices.forEach(player => {
        const card = document.createElement("div");
        const tierClass = getCardTierClass(player.rating);
        card.className = `player-card ${tierClass}`;
        
        card.innerHTML = `
            <div style="font-size: 18px; margin-bottom: 2px;">⭐ ${player.rating}</div>
            <div style="font-size: 12px; margin-bottom: 2px;">${player.position}</div>
            <div style="font-size: 11px; font-weight: bold; text-align: center; padding: 0 4px;">${player.name}</div>
            <div style="font-size: 9px; opacity: 0.85; margin-top: 2px;">${player.club}</div>
            <div style="font-size: 14px; margin-top: 2px;">${player.flag}</div>
        `;

        card.addEventListener("click", () => {
            document.querySelectorAll(".player-card").forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");
            selectedPlayer = player;
            nextBtn.style.display = "inline-block";
        });

        playersArea.appendChild(card);
    });
}

nextBtn.addEventListener("click", () => {
    if (!selectedPlayer) return;

    let slotKey = findAvailableSlot(selectedPlayer.position);

    if (slotKey) {
        squad[slotKey] = selectedPlayer;

        const slotEl = document.getElementById(`slot-${slotKey}`);
        if (slotEl) {
            const tierClass = getCardTierClass(selectedPlayer.rating);
            slotEl.className = `pitch-slot filled ${tierClass}`;
            slotEl.innerHTML = `
                <div style="font-size: 10px;">⭐ ${selectedPlayer.rating}</div>
                <div style="font-size: 9px; font-weight: bold; margin: 1px 0; text-align: center;">${selectedPlayer.name}</div>
                <div style="font-size: 8px; opacity: 0.9;">${selectedPlayer.club}</div>
                <div style="font-size: 11px;">${selectedPlayer.flag}</div>
            `;
        }

        draftedCount++;
        roundInfo.innerHTML = `Squad Progress: ${draftedCount}/11 players drafted`;

        const currentAvg = calculateAverageRating();
        if (teamRatingEl) {
            teamRatingEl.innerHTML = `Team Rating: ⭐ ${currentAvg} OVR`;
        }

        showDraftChoices();
    }
});

restartBtn.addEventListener("click", () => {
    squad = {};
    draftedCount = 0;
    restartBtn.style.display = "none";
    roundInfo.innerHTML = "Pick a player for your squad!";
    choiceTitle.innerHTML = "Choose 1 Player";
    if (teamRatingEl) teamRatingEl.innerHTML = "Team Rating: ⭐ 0 OVR";

    document.querySelectorAll(".pitch-slot").forEach(slot => {
        slot.className = "pitch-slot";
        slot.innerHTML = slot.id.replace("slot-", "");
    });

    showDraftChoices();
});

showDraftChoices();
