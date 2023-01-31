import decode from 'jwt-decode'

class AuthService{
    //Unpackage a token, and return its contents.
    getProfile(){
        return decode(this.getToken());
    }
    //Pulls the login token from local storage... if one exists.
    getToken(){
        return localStorage.getItem('id_token')
    }
    //Checks if the user is logged in or not.
    loggedIn(){
        //Pull the current token from localstorage.
        const token = this.getToken();
        //If one exists and isn't expired, return true. Otherwise, return false.
        return token && !this.isTokenExpired(token) ? true : false
    }
    //Check to see if a given token is expired.
    isTokenExpired(token){
        //Decodes the given token.
        const decoded = decode(token);
        //If the current time exceeds the token's expiration time, delete the token and return true.
        if (decoded.exp < Date.now()/1000){
            localStorage.removeItem('id_token')
            return true
        }
        //Otherwise, return 'false'.
        return false
    }
    //Accepts a packaged token, then sets it as the new login token.
    //Afterwards, put the user back to the home page.
    login(idToken){
        localStorage.setItem('id_token', idToken)
        window.location.assign('/')
    }
    //Remove a saved token, then refresh the page to log the user out.
    logout(){
        localStorage.removeItem('id_token')
        window.location.reload();
    }
}   

export default new AuthService();