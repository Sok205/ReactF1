export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
  }
  
  export interface RegisterResponse {
    msg: string;
  }
  
  export interface LoginRequest {
    username: string;
    password: string;
  }
  
  export interface LoginResponse {
    access_token: string;
    token_type: string;
    user_id: number;
  }
  

  export interface DriverChangeRequest{
    user_id: number;
    fav_driver: string;
  }

  export interface DriverChangeResponse{
    msg: string;
  }
  
  export{};