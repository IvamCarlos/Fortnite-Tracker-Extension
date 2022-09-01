const url = "https://api.fortnitetracker.com/v1/profile/"
const url_power_ranking = "https://api.fortnitetracker.com/v1/powerrankings/"
const formStats = document.querySelector('.form-stats')
const formPowerRanking = document.querySelector('.form-power-ranking')
const resultStats = document.querySelector("#result_stats");
const resultPowerRanking = document.querySelector("#power_ranking");

const estatisticasJogador = async () => {
    try {
        const epic_id = await document.getElementById("id").value
        const plataforma = await document.getElementById("plataforma").value
        const response = await fetch(`${url}${plataforma}/${epic_id}`, {
                method: 'GET',
                headers: {
                    'TRN-Api-Key': '52845922-81da-485d-88f2-4515ecc6630d',
                    'Content-Type': 'application/json',
                }
            } 
        ).then(function(response){
            if(response.status === 503){
                $('#result_stats').html('<h3>Página temporariamente desativada devido a manutenção na API, Desculpe!</h3>');
            }
        }
        )
        .then(data => console.log(data))
        .catch(error => console.log(error));
    }catch (error) {
        console.log("erro: ", error.message)
    }
};

const showData = (result) => {
    $('#result_power_ranking').html(
        `<div class="card">
            <div class="card-body">
                <h5 class="card-title">Power Ranking</h5>
                <p class="card-text"><b>Ganhos(Earnings):</b> ${result.cashPrize} </p>
                <p class="card-text"><b>Eventos:</b> ${result.events} </p>
                <p class="card-text"><b>Percentual:</b> ${result.percentile} </p>
                <p class="card-text"><b>Power Ranking Points (pontos):</b> ${result.points} </p>
                <p class="card-text"><b>Rank:</b> ${result.rank} </p>
                <p class="card-text"><b>Região:</b> ${result.region} </p>
            </div>
        </div>`
    )
}

const powerRankings = async () => {
    try {
        const epic_id = await document.getElementById("id_power_ranking").value;
        const region = await document.getElementById("region").value;
        const plataforma = await document.getElementById("plataforma_power_ranking").value;
        console.log(epic_id);
        console.log(region);
        console.log(plataforma);
        const response = await fetch(`${url_power_ranking}${plataforma}/${region}/${epic_id}`, {
                method: 'GET',
                headers: {
                    'TRN-Api-Key': '52845922-81da-485d-88f2-4515ecc6630d',
                    'Content-Type': 'application/json',
                }
            }
        ).then((response) => {
            if(response.status === 202)
                $('#result_power_ranking').html('<h3>Tente novamente em alguns minutos. PR está atualizando!</h3>')
            if(response.status === 404)
                $('#result_power_ranking').html('<h3>Jogador não encontrado!</h3>')
            if(response.status === 200)
                return response.json()
        })
        .then(data => showData(data))
        .catch(error => console.log(error.message));
    }catch (error) {
        console.log("erro: ", error.message)
    }
};

$('.nav-tabs > li > button').on("click", function(e){
    e.preventDefault();
    $('#result_stats').html("");
    $('#result_power_ranking').html("");
});

const estatisticasSubmit = async e => {
    e.preventDefault()
    estatisticasJogador()
};

const PowerRankingSubmit = async e => {
    e.preventDefault()
    powerRankings()
};

formStats.addEventListener("submit", e => estatisticasSubmit(e));
formPowerRanking.addEventListener("submit", e => PowerRankingSubmit(e));
