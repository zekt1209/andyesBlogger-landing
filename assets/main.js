//import fetch from 'node-fetch';

// Elementos HTML donde vamos a insertar nuestro pedazo de codigo con los videos
const videosContainer = null || document.getElementById('videosContainer');

const url = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCPZ7r0Dedq4Hp_r95MNYt-Q&part=snippet%2Cid&order=date&maxResults=9';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6e82598b1dmsh0d96d26664bbf54p1476fcjsnb106245c9ade',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

const fetchData = async (urlApi) => {

    const response = await fetch(urlApi, options);
    const data = await response.json();
    console.log(data);
    return data;
    
}
// Funcion que se ejecuta automaticamente al cargar el archivo JS en el navegador
(async () => {

    try {
        // Llamar a la funcion fetchdata para llamar a laAPI y que nos traiga todos los videos
        const videos = await fetchData(url);
        // Iterar cada uno de los videos que nos trajo e insertar un HTML por cada uno de ellos con su informacion de cada video
        let view = `
            ${videos.items.map(video => `

                    <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
                        <div class="group relative">
                            <div
                            class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                            <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.description}" class="w-full">
                            </div>
                            <div class="mt-4 flex justify-between">
                            <h3 class="text-sm text-gray-700">
                                <span aria-hidden="true" class="absolute inset-0"></span>
                                ${video.snippet.title}
                            </h3>
                            </div>
                        </div>
                    </a>`).slice(0, 4).join('')}`;

        videosContainer.innerHTML = view;
        console.log("View: " + view);

        //fetchData(url);
        
    } catch (error) {
        console.error(error);
    }


})();

