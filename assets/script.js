//Controle de interface
let seuVotoPara = document.querySelector('.divisao-left-1 span');
let cargo = document.querySelector('.divisao-left-2');
let descricao = document.querySelector('.divisao-left-4');
let aviso = document.querySelector('.divisao-2');
let lateral = document.querySelector('.divisao-right');
let numeros = document.querySelector('.divisao-left-3');
/***********END************** */ 
/**Variaveis de controle de Ambiente */
let etapaAtual = 0;
let numeroPreenchido = '';
let votBranco = false;
let votos = [];
/***********END************** */ 

function comecarEtapa(){
    let etapa = etapas[etapaAtual];
    let numeroHtml = '';
    numeroPreenchido = '';
    votoBranco = false;
    for(let i =0 ;i < etapa.numero;i++){
        if(i === 0){
            numeroHtml += '<div class="numero pisca"></div>';    
        }else{
            numeroHtml += '<div class="numero"></div>';
        }
        
    }   

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML ='';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=> {
        if(item.numero === numeroPreenchido){
            return true;
        } else {
            return false;
        }
    })
    if(candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome : ${candidato.nome} <br/> Partido : ${candidato.partido}`;
        let fotosHtml = '';
        for(let i in candidato.fotos ){
            if(candidato.fotos[i].url.small){
                fotosHtml += `<div class="d-1-img small"> <img src="Urna-Eletronica---JS/imagens/${candidato.fotos[i].url}" alt=""> ${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHtml += `<div class="d-1-img"> <img src="Urna-Eletronica---JS/imagens/${candidato.fotos[i].url}" alt=""> ${candidato.fotos[i].legenda}</div>`; 
            }
            
        }
        lateral.innerHTML = fotosHtml;
        
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>'
    }
    
    
}

function clicou(n){
    let numeroPisca = document.querySelector('.numero.pisca');
    if(numeroPisca !== null){
        numeroPisca.innerHTML =n;
        numeroPreenchido = `${numeroPreenchido}${n}`;
        numeroPisca.classList.remove('pisca');
        if(numeroPisca.nextElementSibling !== null ){
            numeroPisca.nextElementSibling.classList.add('pisca');  
        }  else {
            atualizaInterface();
        }
        
    }

}

function branco () {
    numeroPreenchido = '';
    votoBranco = true;
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>';
    lateral.innerHTML = '';
}

function corrige () {
    comecarEtapa();
}

function confirma () {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if(votoBranco === true){
        votoConfirmado = true;
        votos.push({
            etapa : etapas[etapaAtual].titulo,
            voto : 'branco'
        });
    } else if (numeroPreenchido.length === etapa.numero){
        votos.push({
            etapa : etapas[etapaAtual].titulo,
            voto : numeroPreenchido
        });
        votoConfirmado = true;
    } 

    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso-grande-fim pisca">FIM</div>';
            console.log(votos);
        }
    }
}

comecarEtapa();