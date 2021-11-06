## Introduction
Node.js + Express to implement RealWrold API.

## How to use
nodemon app.js，app.js is the entry file

## tutorial
https://www.bilibili.com/video/BV1mQ4y1C7Cn

## Framework used
Express is for handling request and send response.  
express-validator is for data validation.  
Mongoose is for CRUD.

## How to construct
app.js -> 查看挂载的router -> 路由处理函数controller-> 使用Model和Schema存入MongoDB数据 -> express-validator数据验证 -> Auth封装 -> Model层面md5加密

## API Specification
https://gothinkster.github.io/realworld/docs/specs/backend-specs/endpoints
