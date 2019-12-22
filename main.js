let roleList = document.getElementsByClassName('list')
let letter = document.getElementById('picked-warning')
let analyzeButton = document.getElementById('analyze')
let audio = document.getElementById('clicked')
let analyzing = document.getElementById('result')
let kesimpulan = document.getElementById('kesimpulan')
let result = document.getElementById('hasil-analisis')
var role = []


function addRoleToList(name) {
  let maxLength = roleList.length
  
  if(role.length < maxLength){
    role.push(name)
  }

  return role

}


function showRole(name, roleList){
  var pickedRole = addRoleToList(name)

  for(i = 0; i < roleList.length; i++){
    if(pickedRole[i] !== undefined){
      roleList[i].style.color = 'white'
      roleList[i].innerHTML = pickedRole[i]
    }else{
      roleList[i].style.color = 'red'
      roleList[i].innerHTML = 'Not Picked'
    }
  }

  if((roleList.length - pickedRole.length) === 0){
    letter.style.color = '#e49233'
    letter.innerHTML = 'Completed Draft, Go analyze the draft!'
    analyzeButton.removeAttribute('disabled')
    analyzeButton.style.backgroundColor = '#e49233'
  }else{
    letter.style.color = 'red'
    letter.innerHTML = (roleList.length - pickedRole.length) + ' empty draft again!'
  }
  audio.play()
  return roleList
}

function analyze(role){

  let combinationDrafPick = [
    {Tank: 2, Marksman: 1, Assasin: 1, Fighter: 1, Mage : 0,
    analysis: 'Kekuatan draft pick ini terdapat pada late game , karena dengan 2 tank yang dimiliki dapat untuk melindungi marksman pada late game, kelemahan draft pick ini tidak adanya mage yang mengakibatkan tidak ada yang memberi instant damage saat early game'},
    {Tank: 1, Marksman: 1, Assasin: 1, Fighter: 1, Mage : 1,
    analysis: 'Kekuatan draft pick ini terdapat pada saat mereka melakukan strategi pick up hero lawan dengan 4 role yang selalu berjalan bersama, dengan 1 fighter yang menjadi offliner, kelamahan pada late game jika melawan musuh dengan 2 tank maka akan kalah jika fighter tidak melakukan peranya dengan maksimal'},
    {Tank: 1, Marksman: 2, Assasin: 0, Fighter: 1, Mage : 1,
    analysis: 'Kekuatan draft pick ini jelas terdapat pada late game dengan 2 marksman yang dimiliki, kelemahan jika tidak bisa bertahan pada early game karena hero banyak yang ter pick up oleh musuh maka kemungkinan kalah sangat besar'},
    {Tank: 2, Marksman: 1, Assasin: 0, Fighter: 2, Mage : 1,
    analysis: 'Kekuatan draft pick ini jelas pada saat team fight, dan untuk marksman lebih leluasa dengan banyak initiator yang dimiliki, kelemahan dengan tidak adanya assasin yang memberi instant damage maka marksman harus dimaksimalkan'},
    {Tank: 1, Marksman: 1, Assasin: 2, Fighter: 1, Mage : 0,
    analysis: 'Kekuatan draft pick ini adalah saat early game dengan 2 assasin yang dimiliki yang dapat memberi instant damage, Kelemahan dari sisi durability sangat tipis, usahakan hindari team fight ketika masih 5 vs 5'},
  ]

  kesimpulan.style.display = 'block'
  analyzing.play()

  let grouping = {
    Tank: 0,
    Marksman: 0,
    Assasin: 0,
    Fighter: 0,
    Mage: 0
  }

  for(i = 0; i < role.length; i++){
    grouping[role[i]]++
  }

  //check kelengkapan role
  let notPickedRole = 0
  let rolePicked = ''
  let freq = 0
  for(let key in grouping){
    if(grouping[key] === 0){
      notPickedRole++
    }

    if(grouping[key] > freq){
      rolePicked = key
      freq = grouping[key]
    }

  }

  if(notPickedRole === 2){
    result.innerHTML = 'Role yang dipick kurang lengkap, minimal role yang di pilih 4,  silahkan coba lagi dengan refresh page ini'
  }else if(notPickedRole >= 3){
    result.innerHTML = `Role yang dipick kurang lengkap, terlalu banyak ${rolePicked}, minimal role yang di pilih 4,  silahkan coba lagi dengan refresh page ini`
  }else{
    let found = false
    for(i = 0; i < combinationDrafPick.length; i++){
      if(combinationDrafPick[i].Tank === grouping.Tank && combinationDrafPick[i].Marksman === grouping.Marksman && combinationDrafPick[i].Assasin === grouping.Assasin && combinationDrafPick[i].Fighter === grouping.Fighter && combinationDrafPick[i].Mage === grouping.Mage){
        result.innerHTML = combinationDrafPick[i].analysis
        found = true
      }
    }

    if(!found){
      result.innerHTML = 'Kombinasi draft pick tidak sesuai, silahkan coba kombinasi draft pick lain dengan refresh page ini'
    }
  }

}
