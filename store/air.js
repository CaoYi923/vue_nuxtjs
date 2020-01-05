export const state = ()=>({
    setAllMoney : 0,
    population:"1"
})

export const mutations =  {
       setAllMoney(state,data){
             state.setAllMoney = data.money
             state.population = data.population
            console.log(data)
       }
}

export const actions = () => {

}