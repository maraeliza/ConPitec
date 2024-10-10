$(document).ready(()=>{
    var expandido = false;
    $("#data").datepicker({
      dateFormat: "dd/mm/yy"
    })

    $("#btnExp").on('click',()=>{
        
        if(expandido){
            expandido = false;
            $("#navbarNav").hide()
        }else{
            $("#navbarNav").show()
            expandido = true;
        }
       
    })
    var tabela = $("#corpoTabela")

    var indiceLinha = 0;
    for(var i in trabalhosSIN){
        var linha = trabalhosSIN[i]
        tabela.append("<tr id='l"+indiceLinha+"'>")
        
        for(coluna in linha){
            var item = linha[coluna]

            if(coluna == 'horario'){
                var horario = item.split("-")
                $("#l"+indiceLinha).append("<td>"+horario[0]+"</td>")
                $("#l"+indiceLinha).append("<td>"+horario[1]+"</td>")
            }else{
                $("#l"+indiceLinha).append("<td>"+item+"</td>")
            }
            
      
        }
        tabela.append("</tr>")
        indiceLinha++;
    }

    $(".btnSearch").click(()=>{
        pesquisar();
    })



})

function pesquisar(){
    var nroInput = $("#nroInput").val();

    var sessaoInput = $("#sessaoInput").val();
    var dataInput = $("#data").val();
    var estudanteInput = $("#estInput").val();
    var orientadorInput = $("#orienInput").val();

    var listaConsultas = {
       "nro": nroInput, 
       "sessao":sessaoInput,
       "dia":dataInput, 
       "aluno":estudanteInput, 
       "orientador":orientadorInput 
    };
    var listaValores = trabalhosSIN;
    
    var dadosFinal = []
    
    for(var indice in listaValores){
        var linha = listaValores[indice];
        var atendeCriterio = true;

        for(var prop in listaConsultas){
            var consulta = listaConsultas[prop];

            if(consulta && linha[prop] != consulta){
                atendeCriterio = false;
                break;
            }
        }
        if(atendeCriterio){
            dadosFinal.push(linha);
        }
    }
    
    console.log(dadosFinal)

    montarTabela(dadosFinal);
  
}


function montarTabela(dados){

    if(dados.length > 0){
        $("#corpoTabela").empty();
        for (var i in dados) {
       
            console.log(dados[i]);
          
            var linha = dados[i];
            var indiceLinha = i;

            // Limpa o conteúdo da tabela
            var novaLinha = $("<tr id='l" + indiceLinha + "'>");

            for (var coluna in linha) {
                var item = linha[coluna];

                if (coluna === 'horario') {
                    var horario = item.split("-");
                    novaLinha.append("<td>" + horario[0] + "</td>");
                    novaLinha.append("<td>" + horario[1] + "</td>");
                } else {
                    novaLinha.append("<td>" + item + "</td>");
                }
            }
            novaLinha.append("</tr>");
            $("#corpoTabela").append(novaLinha); // Adiciona a nova linha à tabela
            achou = true;
           
        
    }
    }else{
        $("#corpoTabela").empty();
        alert("item não encontrado!")
    }
    
    
}