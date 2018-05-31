const Storage = 'todos-vuejs';
export default {
  fetch (){
    return JSON.parse(window.localStorage.getItem(Storage) || '[]')
  },
  save (items){
    window.localStorage.setItem(Storage,JSON.stringify(items))
  }
}
