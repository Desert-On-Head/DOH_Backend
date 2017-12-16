# Desert_On_Head
* Desert_On_Head Backend Server

* 요청은 POST(FormUrlEncoded)로 처리하였습니다.

* 기본 URL은 http://soylatte.kr:3000 입니다.

## Server Code
### 200

    Success Processing Request

### 400

    Bad Request

### 401

    Unauthorized (Login Error)

### 403

    Forbidden -> 권한 오류

### 404

    URL Not Founded

### 409

    Conflict -> 데이터 충돌 (회원가입시 아이디 중복 등)

### 500

    Server Error


## API DOCUMENT

### Auth

#### /auth/login (로그인)
>Requiring Params

    id : ID
    password : PW

>Return Values
>>Success

    HTTP : 200, JSONObject

>>Data Incorrect

    HTTP : 403

>>Not Founded

    HTTP : 403
    
#### /auth/register (회원가입)
>Requiring Params

    username , id, password, email
    
>Return Values
>>Success

    HTTP : 200, Register Success
    
>>Already In Database

    HTTP : 401, Already In Database
    
#### /auth/findpassword (비밀번호 찾기)
>Requiring Params

    username, email
    
>Return Values
>>Success

    HTTP : 200, Mail Send Success
    
    