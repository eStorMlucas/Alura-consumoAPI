// const consultaCep = fetch('https://viacep.com.br/ws/01001000/json')
// .then(r => r.json())
// .then(r => { 
//     if (r.erro) {
//       throw Error('ERRO: Cep inválido')
//     } 
//     
//  console.log(r)
//     
//   })
// .catch(erro => console.error(erro))
// .finally(console.log('Promisse concluida'))

async function buscaEndereco(cep) {
  const $mensagemErro = document.getElementById('erro')
  $mensagemErro.innerHTML = ''

  try {
    const consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json`)
    const consultaConvertida = await consultaCep.json()

    if (consultaConvertida.erro) {
      throw Error('ERRO: CEP inválido. Tente novamente')
    }
    
    modificaDom(consultaConvertida)
  } catch(erro) {
    $mensagemErro.innerHTML = 
    `
    <p> ERRO: CEP inválido </p>
    `
  }
}

function modificaDom(resultadoJSON) { 
  console.log(resultadoJSON)

  const $cidade = document.getElementById('cidade')
  const $logradouro = document.getElementById('endereco')
  const $estado = document.getElementById('estado')


  $cidade.value = resultadoJSON.localidade
  $logradouro.value = resultadoJSON.logradouro
  $estado.value = resultadoJSON.uf
}

const $cep = document.getElementById('cep')
$cep.addEventListener("focusout", () => buscaEndereco($cep.value))
