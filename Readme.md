## Task 1 ##
Implemented API Endpoints

1. Upload CSV/XLSX (POST /api/user/upload)
    Content-Type: multipart/form-data
    Form Field: file (File)

2. Search Policy by Username (GET /api/user/search-policy)

3. Aggregated Policy by User (GET /api/user/aggregated-policies)


src/
└── domain/
    └── user/
        ├── controller/
        │   └── user.controller.js      
        ├── middleware/
        │   └── user.middleware.js     
        ├── model/
        │   └── user.model.js           
        ├── routes/
        │   └── user.routes.js          
        └── service/
            ├── user.service.js         
            └── uploadWorker.js        


## Task 2 ##
##  1. Track real-time CPU utilization of the node server and on 70% usage restart the server.

# CPU Usage Monitor & Auto-Restart
Calculates average CPU load using Node's `os` module every 5 seconds. If load reaches **≥70%**, it triggers `process.exit(1)`, causing PM2/Nodemon to automatically restart the server.

### Why Use PM2?
Node.js cannot restart itself after `process.exit()`. PM2 acts as an external process manager that watches the application, captures crash/exit events instantly, and resurrects the server in a clean state.

### File Structure

src/
├── configuration/
│   └── cpuMonitor.js   # Measures CPU load & exits on 70% threshold
└── app.js              # Server entry point initializing startCpuMonitor()


## Task 2 ##
## 2. Create a post-service that takes the message, day, and time in body parameters and it inserts that message into DB at that particular day and time.
uses Agenda.js for scheduling and managing background jobs with MongoDB.

src/
├── configuration/
│   ├── database.js
│   └── agends.js
│
├── domain/
│   │
│   └── message/
│       ├── controller/
│       ├── jobs/
│       │   └── message.job.js
│       ├── middleware/
|       |    └── message.middleware.js
│       ├── model/
│       │   └── message.model.js
│       ├── routes/
│       │   └── message.routes.js
│       └── service/
│           └── message.service.js
│
├── app_routing.js
└── app.js
