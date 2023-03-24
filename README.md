# 클라우드펀딩 사이트 리빌딩(백엔드)

## Main Category: 
  * Authenticating
  * Roll based Access Controll
  * Implementing Pagination & Search
  * ThirdParty Funciton 
  * Implementing In-Memory Cache
  * HealthCheck with Termunus
  * Server-Monitoring with Grafana & Prometheus
  * Dockerizing NestJS
  * LoadBalancer with Nginx
  * MSA(Monolithic Architecture)

### Sub Category:
  * Authenticating
  - bcrypt, passport, JWT(AccessToken, RefreshToken) & Cookies
    1. bcrypt 적용 : Create User, Verify Password, Compare and Update RefreshToken
  ```
  //user.entity.ts
  @BeforeInsert()
  async hashPassword(){
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException()
    }
  }
  ```
    2. passport 적용: 
    ```
      sample code
    ```

### Backend Tools: 
  * NestJs, PostgreSQL, AWS, Docker, Redis






