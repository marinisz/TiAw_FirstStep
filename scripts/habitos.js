function inserecard() {


    let divTela = document.getElementById('tela');
    let texto = '';

    // Montar texto HTML das noticias
    let dados = JSON.parse(this.responseText);
    for (i = 0; i < dados.articles.length; i++) {
        let noticia = dados.articles[i];
        let data = new Date(noticia.publishedAt);

        texto = texto + `
        <div class="col-lg-12 mb-2">
            <div class="box-noticia">
                <img src="${noticia.urlToImage}" alt="">
                <span class="titulo">${noticia.title}</span><br>
                <span class="creditos">${data.toLocaleDateString ()} -
                    ${noticia.source.name} -
                    ${noticia.author}</span><br>
                <span class="text">
                ${noticia.content} <a href="${noticia.url}" target="_blank" >Leia mais ...</a>
                </span>
            </div>
            </div>
        `;
    }

    // Preencher a DIV com o texto HTML
    divTela.innerHTML = texto;
}
var dados = [];
if (localStorage.getItem('data') != null) dados = JSON.parse(localStorage.getItem('data'));

function pegaDados() {
    JSON.parse(dados.push({ title: titulo.value, content: conteudo.value }));
    localStorage.setItem('data', JSON.stringify(dados));

}



var txt = localStorage.getItem('data');


window.onload = function() {
    //Homepage();
    //insereCard();

    function salvarImagens() {
        let inputImg = document.getElementById("inputImage");

        if (localStorage.getItem('data') != null) dados = JSON.parse(localStorage.getItem('data'));


        if (inputImg.files && inputImg.files[0]) {
            //Verificar se tem imagem selecionada
            var readerImg = new FileReader();

            readerImg.onload = function(e) {
                //Apos ler imagem, salvar o codigo DataURI no e
                //alert("Leu a imagem: \n" + e.target.result);

                let imagens = [];

                //Tentar carregar o array de imagens do localstorage
                let db_imgs = localStorage.getItem("db_imgs"); //Ler essa string do localstorage

                if (db_imgs) {
                    //Fazer isso só SE exisir algo
                    imagens = JSON.parse(db_imgs);
                }

                //Insere a imagem no array
                let novaImagem = { imagem: e.target.result };
                imagens.push(novaImagem);

                //Salvar o array de imagens no LocalStorage
                localStorage.setItem("db_imgs", JSON.stringify(imagens));
            };
            readerImg.readAsDataURL(inputImg.files[0]);
        }

    }




    function exibirImagens() {
        let tela = document.getElementById("tela");
        let textoHTML = "";

        // Fazer alguma coisa montando o textoHTML

        let imagens = [];
        let db_imgs = localStorage.getItem("db_imgs"); //Ler essa string do localstorage
        if (db_imgs) { //Fazer isso só SE exisir algo
            imagens = JSON.parse(db_imgs);
        };

        for (i = 0; i < imagens.length; i++) {
            if (i % 2 == 0 || i == 0) {
                textoHTML += `
                <div class="card-deck">

            <div class="card col-sm-12 col-lg-6 mb-3">
    <img class="card-img-top"  width="250" height="250" src="${imagens[i].imagem}" alt="Card image cap" id="imgCard">
    <div class="card-body">
      <h5 class="card-title">${JSON.parse(txt)[i].title}</h5>
      <p class="card-text">${JSON.parse(txt)[i].content}</p>
    </div>
    </div>
  

        
            `;

            } else {
                textoHTML += `
            <div class="card col-sm-12 col-lg-6  mb-3">
    <img class="card-img-top"  width="250" height="250" src="${imagens[i].imagem}" alt="Card image cap" id="imgCard">
    <div class="card-body">
      <h5 class="card-title">${JSON.parse(txt)[i].title}</h5>
      <p class="card-text">${JSON.parse(txt)[i].content}</p>
    </div>
  </div>
  </div>

            `;
            }

        }

        // Mostrar o código na div tela
        tela.innerHTML = textoHTML;
    }


    botaoSalvar = document.getElementById("btnSalvarImagens");
    botaoSalvar.addEventListener("click", salvarImagens);

    botaoSalvar = document.getElementById("btnSalvarImagens");
    botaoSalvar.addEventListener("click", pegaDados);

    botaoSalvar = document.getElementById("exibe");
    botaoSalvar.addEventListener("click", exibirImagens);



}