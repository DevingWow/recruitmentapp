# Recruitment App

This is a repository for a backend microservice application that I created as a part of my bachelors thesis work. 

The application is a simple mock application using mock data. The application is a for a hypothetical amusement park where job seekers can send in their job-application with their relevant credentials, and recruiters and can view these job-applications. Job seekers must register, then login and create a job-application to send in. Recruiter accounts can only be created through administrators who have root access to the databases. Recruiters must login before they can view job-applications. Recruiters can view job-application one-by-one or retrieve a list of a certain number of job-applications. 

below is a simple use-case diagram: 

<img style="float: right;" src="readmefiles/usecase.drawio.png">

## Microservices

The application consists of four microservices: a NGINX gateway, an authentication server, an 
