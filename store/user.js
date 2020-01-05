export const state =()=> ({
    userInfo:{}
})
export const mutations = {
    setuserInfo(state,data){
        state.userInfo = data
        console.log(state.userInfo)
    }
}

export const actions = {
  login(store,data){
    return this.$axios({
        method:'post',
        url:'/accounts/login',
        data:data
    }).then(res=>{
        console.log(res.data)
        this.$router.back()
        store.commit('setuserInfo',res.data)
        return true
    })
  },
  registered(store,data){
      return this.$axios({
          method:'POST',
          url:'/accounts/register',
          data:data
      }).then(res=>{
          console.log(res.data)
          this.$router.back()
        store.commit('setuserInfo',res.data)
          return true
      })
  },
  handleSendCaptcha(store,data){
       return this.$axios({
            method:'post',
            url:'/captchas',
            data:{tel:data}
        })
    
},
}
