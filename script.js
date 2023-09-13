const API_KEY="1b243304874042648bd5d05e43af3ba3";
const url="https://newsapi.org/v2/everything?q=";
window.addEventListener("load",()=>fetchNews("india"));
window.addEventListener("load",()=>fetchNews("tesla"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    // console.log(data);
    bindData(data.articles);
}
function bindData(articles)
{
    const cardcontainer = document.getElementById('cards-container');
    const newscardtemplate= document.getElementById('template-news-card');
    cardcontainer.innerHTML= "";
    articles?.forEach((article) => {
        if(!article.urlToImage) return ;
        const cardclone = newscardtemplate.content.cloneNode(true);
        fillDataincard(cardclone,article);
        cardcontainer.appendChild(cardclone);
    });
}
function fillDataincard(cardclone,article)
{
    const newsImg = cardclone.querySelector('#news-image');
    const newsTitle = cardclone.querySelector('#news-title');
    const newssource = cardclone.querySelector('#news-source');
    const newsdesc = cardclone.querySelector('#news-desc');

    newsImg.src= article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsdesc.innerHTML = article.description;
    newssource.innerHTML = `${article.source.name}`;

    cardclone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url, "_blank");
    });
}
function onnavitemclick(id) {
    fetchNews(id);
}
const searchbutton = document.getElementById('search-button');
const searchtext = document.getElementById('serach-text');


function searchfuncn() {
    const query = document.getElementById("search-text").value;
    if(!query) return ;
    fetchNews(query);
}
function reload() {
    window.location.reload();
}