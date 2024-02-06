import { TRoom, TUser } from "./declarations";

export class AppDiscordStore {
    #userLogged:Pick<TUser, "username">| null = null;
    #room: Array<TRoom> = [];
    #users: Array<TUser> = [];
    #onlineUsers: Array<TUser["id"]> = [];

    #checkUserExists(username: TUser["username"]) {
        const isAlreadySignup = this.#users.some(user => user.username === username);
        return isAlreadySignup
    }
signup({username, password}: {username: TUser["username"], password: TUser["password"]}) {
    if(!!this.#userLogged) throw new Error("User already logged");  
  if (this.#checkUserExists(username)) {
    throw new Error("User already exists");
  } else {
   const newUser: TUser = {id: Math.random().toString(), username,password }
   this.#users= [...this.#users, newUser];
   console.log(`User ${newUser.username} created`)
   return {id:newUser.id, username:newUser.username}   
  }
    
}
login({username, password}: {username: TUser["username"], password: TUser["password"]}) {
    if(!!this.#userLogged) throw new Error("User already logged");
    const user = this.#users.find(user => user.username === username && user.password === password);
    if (!user) {
        throw new Error("User not found");
    } else {
        this.#userLogged = user;
        this.#onlineUsers = [...this.#onlineUsers, user.id];
        return user
    }
}
getUserLogged() {
    return this.#userLogged
}
getOnlineUsers() {
    return this.#onlineUsers
}
    }
