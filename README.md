# My Work Process
**Instruction** : ให้สร้าง API ของเว็บไซต์คล้ายๆ กับ [Quora](https://www.quora.com/) ด้วย Express ตาม Software Requirement ที่กำหนดให้ ไม่ต้องออกแบบ API เอง สามารถดู API Document ด้านล่าง 👇🏻
| Method | Endpoint                         | Description                        | Query Params     | Body                                                      | Success Code | Success Response                              | Fail Code(s)            | Fail Response(s)                                           |
|--------|----------------------------------|------------------------------------|------------------|------------------------------------------------------------|--------------|------------------------------------------------|--------------------------|-------------------------------------------------------------|
| POST   | /questions                       | Create a new question              | -                | `title`, `description`, `category`                         | 201 Created  | `{"message": "Question created successfully."}` | 400, 500                | `{"message": "Invalid request data."}`, `{"message": "Unable to create question."}` |
| GET    | /questions                       | Get all questions                  | -                | -                                                          | 200 OK       | `{"data": [...]}`                                | 500                      | `{"message": "Unable to fetch questions."}`               |
| GET    | /questions/:questionId          | Get a question by ID               | -                | -                                                          | 200 OK       | `{"data": {...}}`                                | 404, 500                | `{"message": "Question not found."}`, `{"message": "Unable to fetch questions."}` |
| PUT    | /questions/:questionId          | Update a question by ID            | -                | `title`, `description`, `category`                         | 200 OK       | `{"message": "Question updated successfully."}` | 400, 404, 500           | `{"message": "..."} (ตามกรณี)`                            |
| DELETE | /questions/:questionId          | Delete a question by ID            | -                | -                                                          | 200 OK       | `{"message": "Question post has been deleted successfully."}` | 404, 500        | `{"message": "..."} (ตามกรณี)`                            |
| GET    | /questions/search               | Search questions by title/category | `title`, `category` | -                                                       | 200 OK       | `{"data": [...]}`                                | 400, 500                | `{"message": "..."} (ตามกรณี)`                            |
| POST   | /questions/:questionId/answers  | Create an answer                   | -                | `content`                                                 | 201 Created  | `{"message": "Answer created successfully."}`   | 400, 404, 500           | `{"message": "..."} (ตามกรณี)`                            |
| GET    | /questions/:questionId/answers  | Get answers for a question         | -                | -                                                          | 200 OK       | `{"data": [...]}`                                | 404, 500                | `{"message": "..."} (ตามกรณี)`                            |
| DELETE | /questions/:questionId/answers  | Delete all answers of a question   | -                | -                                                          | 200 OK       | `{"message": "All answers for the question have been deleted successfully."}` | 404, 500 | `{"message": "..."} (ตามกรณี)`                            |
| POST   | /questions/:questionId/vote     | Vote on a question                 | -                | `{"vote": 1 or -1}`                                       | 200 OK       | `{"message": "Vote on the question has been recorded successfully."}` | 400, 404, 500 | `{"message": "..."} (ตามกรณี)`                            |
| POST   | /answers/:answerId/vote         | Vote on an answer                  | -                | `{"vote": 1 or -1}`                                       | 200 OK       | `{"message": "Vote on the answer has been recorded successfully."}` | 400, 404, 500 | `{"message": "..."} (ตามกรณี)`                            |

- ให้ใช้ฐานข้อมูลเป็น PostgreSQL โดยใช้ SQL Script จาก [ลิ้งก์นี้](https://gist.github.com/napatwongchr/811ef7071003602b94482b3d8c0f32e0) ในการสร้างตาราง และสร้างข้อมูลเบื้องต้นในฐานข้อมูล
- เข้าไป Fork Repository ได้จาก [ที่นี่](https://github.com/techupth/backend-skill-checkpoint-express-server)
- ให้ดักจับ Error ที่จะเกิดขึ้นในแต่ละ API
- ให้ Group ตัว API ด้วย Express Router
- ให้ทดสอบ API ทุกอันด้วย Postman หลังจากสร้าง API เสร็จแล้ว เมื่อให้มั่นใจว่า API สามารถใช้งานได้จริง

<br/><br/>

## Setting Up Project ⚙
- [x]  `git clone` 
- [x]  `npm init -y`
- [x]  `npm install nodemon express pg` : เพราะ เช็คแล้วมีการเขียนโค้ดเบื้องต้น ได้แก่ connectionPool (utils/db.mjs), API test(app.mjs), .gitignore, script “start”: “nodemon app.mjs” ในไฟล์ package.json  มาแล้ว
- [x]  สร้าง database
- [x]  แก้ connectionString 
- [x]  ลองรันโปรเจคดูก่อนเริ่มทำ : `npm run start`
      
<br/><br/>

## Start Implementing the following requirements 🚀
จากตาราง API Document จะเห็นว่า require มาให้เขียน API 11 เส้น ดังนี้
<br/><br/>

### ▶ Software Requirements 
- [x]  API เส้นที่ 1 : ผู้ใช้งานสามารถสร้างคำถามได้ (Create a new question) : `app.post(“/questions”, controller function)`
    - [x]  คำถามจะมีหัวข้อ(title) และคำอธิบาย(description)
    - [x]  คำถามจะมีหมวดหมู่กำกับ(category) เช่น Software, Food, Travel, Science, Etc.
    - [x]  ใช้ postman เช็คผ่านแล้ว

- [x]  API เส้นที่ 2 : ผู้ใช้งานสามารถที่จะดูคำถามทั้งหมดได้(Get all questions) : `app.get(“/questions”, controller function)`
    - [x]  ใช้ postman เช็คผ่านแล้ว

- [x]  API เส้นที่ 3 :  ผู้ใช้งานสามารถที่จะดูคำถามแต่ละอันได้ ด้วย Id ของคำถามได้ (Get a question by ID) : `app.get(“/questions/:questionId”, controller function)`
    - [x]  ใช้ postman เช็คผ่านแล้ว

- [x]  API เส้นที่ 4 : ผู้ใช้งานสามารถที่จะแก้ไขหัวข้อ หรือคำอธิบายของคำถามได้ (Update a question by ID) : `app.put(“/questions/:questionId”, controller function)`
    - [x]  ใช้ postman เช็คผ่านแล้ว

- [x] API เส้นที่ 5 : ผู้ใช้งานสามารถที่จะลบคำถามได้ (Delete a question by ID) : `app.delete(“/questions/:questionId”, controller function)`
    - [x]  ใช้ postman เช็คผ่านแล้ว
          
<br/><br/>

### ▶ Optional Software Requirements
- [ ]  API เส้นที่ 6 : ผู้ใช้งานสามารถที่จะค้นหาคำถามจากหัวข้อ หรือหมวดหมู่ได้ (Search questions by title or category) : `app.get(“/questions/search”, controller function)`
    - [ ]  ใช้ postman เช็คผ่านแล้ว	

- [x]  API เส้นที่ 7 : ผู้ใช้งานสามารถสร้างคำตอบของคำถามนั้นได้ (Create an answer for a question) : `app.post(“/questions/:questionId/answers”, controller function)`
    - [ ]  คำตอบจะเป็นข้อความยาวๆ ไม่เกิน 300 ตัวอักษร
    - [x]  ใช้ postman เช็คผ่านแล้ว

- [x] API เส้นที่ 8 : ผู้ใช้งานสามารถที่จะดูคำตอบของคำถามแต่ละอันได้ (Get answers for a question) : `app.get(“/questions/:questionId/answers”, controller function)`
    - [x]  ใช้ postman เช็คผ่านแล้ว

- [x] API เส้นที่ 9 : ผู้ใช้งานสามารถที่จะลบคำถามได้ (Delete answers for a question) : `app.delete(“/questions/:questionId/answers”, controller function)`

    - [x]  ใช้ postman เช็คผ่านแล้ว

- [ ]  API เส้นที่ 10 : ผู้ใช้งานสามารถกดปุ่มเห็นด้วย หรือไม่เห็นด้วยกับคำตอบได้
    - [ ]  จำนวนคนที่เห็นด้วยสามารถเป็น + และเป็น - ได้

- [ ]  API เส้นที่ 11 : ผู้ใช้งานสามารถกดเห็นด้วยหรือไม่เห็นด้วยกับคำถามได้ด้วยเช่นกัน

- [x]  ใช้ Router แบ่งกลุ่มโค้ด API

- [x]  แตก branch: `dev` > `feat/API_CRUD` เพื่อ Deliver High Quality Codebase
    - [x]  commit โดยเขียน commit message ตามหลัก conventional message
          
<br/><br/>

### ▶ Write Documentation
- [ ]  สร้าง API Documentation ด้วย Swagger ([ดูตัวอย่างการใช้งาน Swagger](https://www.youtube.com/watch?v=apouPYPh_as))
    - [ ]  [Swagger Package บน NPM](https://github.com/scottie1984/swagger-ui-express)

- [x]  เขียนอธิบายผลงานใน README.md ([ดูวิธีการเขียน README](https://www.freecodecamp.org/news/how-to-write-a-good-readme-file/))

<br/><br/>

### ▶ Send Project !
- [x]  หลังจากแน่ใจแล้วว่าจะไม่มี Commit ใหม่ ให้ส่ง Commit Message ทั้งหมดให้ DF ประจำ Squad ทางดิสคอร์ดส่วนตัว โดยทำตามขั้นตอนด้านล่างนี้
  - [x]  1. รันคำสั่งด้านล่างใน Terminal ของ VScode `git log --pretty=format:"%h - %an - %s" > commit_history.txt`
  - [x]  2. คัดลอกข้อความทั้งหมดที่อยู่ในไฟล์ commit_history.txt ส่ง

