document.querySelectorAll('a[href$="_URL"]').forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    alert('Este é um link de exemplo. Coloque aqui o endereço real do download.');
  });
});
