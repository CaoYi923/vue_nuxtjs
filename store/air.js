export const state = ()=>({
    searchHistory:[],
    setAllMoney : 0,
    population:"1"
})

export const mutations =  {
       setAllMoney(state,data){
             state.setAllMoney = data.money
             state.population = data.population
            console.log(data)
       },
       searchHistory(state,data){
            state.searchHistory.unshift(data)
       }
}

export const actions = () => {

}