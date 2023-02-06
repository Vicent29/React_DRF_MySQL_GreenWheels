const JWTService = {
    getToken(){
        return localStorage.getItem("token")
    },
    saveToken(token, rftoken){
        localStorage.setItem("token", token)
        localStorage.setItem("rftoken", rftoken)
    },
    destroyToken(){
        localStorage.removeItem("token")
    },
    destroyAllTokens() {
        localStorage.removeItem("token")
        localStorage.removeItem("rftoken")
    }
}

export default JWTService;