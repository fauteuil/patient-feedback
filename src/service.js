import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

// import { connect } from 'mongoose';
import cors from 'cors';

// import ActivityRouter from './routes/activity.route';
// import AuthRouter from './routes/auth.route';

const app = express();

/* Loading the environment variables from the .env file. */
// require('dotenv').config();

// const PORT = process.env.PORT || 5000;
const PORT = 5000;
// // const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/todoapiDB';
// const MONGODB_URI = process.env.ATLAS_URI || 'mongodb://localhost/todoapiDB';

// console.log('MONGODB_URI', MONGODB_URI);

/* Allowing the frontend to access the backend. */
app.use(cors());

/* Telling the application to use the express.json() middleware. This middleware will parse the body of
any request that has a Content-Type of application/json. */
// app.use(json());
app.use(bodyParser.json());


/* This is a route handler. It is listening for a GET request to the root route of the application.
When it receives a request, it will send back a response with the string "Hello World!". */
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/form-context', (req, res) =>
  res.send({
    "resourceType": "Bundle",
    "id": "0c3151bd-1cbf-4d64-b04d-cd9187a4c6e0",
    "timestamp": "2021-04-02T12:12:21Z",
    "entry": [
      {
        "resource": {
          "resourceType": "Patient",
          "id": "6739ec3e-93bd-11eb-a8b3-0242ac130003",
          "active": true,
          "name": [
            {
              "text": "Tendo Tenderson",
              "family": "Tenderson",
              "given": ["Tendo"]
            }
          ],
          "contact": [
            {
              "system": "phone",
              "value": "555-555-2021",
              "use": "mobile"
            },
            {
              "system": "email",
              "value": "tendo@tendoco.com",
              "use": "work"
            }
          ],
          "gender": "female",
          "birthDate": "1955-01-06",
          "address": [
            {
              "use": "home",
              "line": ["2222 Home Street"]
            }
          ]
        }
      },
      {
        "resource": {
          "resourceType": "Doctor",
          "id": "9bf9e532-93bd-11eb-a8b3-0242ac130003",
          "name": [
            {
              "family": "Careful",
              "given": ["Adam"]
            }
          ]
        }
      },
      {
        "resource": {
          "resourceType": "Appointment",
          "id": "be142dc6-93bd-11eb-a8b3-0242ac130003",
          "status": "finished",
          "type": [
            {
              "text": "Endocrinologist visit"
            }
          ],
          "subject": {
            "reference": "Patient/6739ec3e-93bd-11eb-a8b3-0242ac130003"
          },
          "actor": {
            "reference": "Doctor/9bf9e532-93bd-11eb-a8b3-0242ac130003"
          },
          "period": {
            "start": "2021-04-02T11:30:00Z",
            "end": "2021-04-02T12:00:00Z"
          }
        }
      },
      {
        "resource": {
          "resourceType": "Diagnosis",
          "id": "541a72a8-df75-4484-ac89-ac4923f03b81",
          "meta": {
            "lastUpdated": "2021-04-02T11:51:03Z"
          },
          "status": "final",
          "code": {
            "coding": [
              {
                "system": "http://hl7.org/fhir/sid/icd-10",
                "code": "E10-E14.9",
                "name": "Diabetes without complications"
              }
            ]
          },
          "appointment": {
            "reference": "Appointment/be142dc6-93bd-11eb-a8b3-0242ac130003"
          }
        }
      },
      {
        "resource": {
          "resourceType": "PatientFeedback",
          "id": "",
          "meta": {
            "lastUpdated": "2021-04-02T11:51:03Z"
          },
          "status": "",
          "questions": [
            {
              "id": "blah-8ygvb-blah",
              "name": "recommendDoctor",
              "value": 0,
              "valueType": "int"
            },
            {
              "id": "blah-8yg3edcvb-blah",
              "name": "diagnosisExplanationSatisfaction",
              "value": "",
              "valueType": "string"
            },
            {
              "id": "blah-8ygvb-bl2wsah",
              "name": "diagnosisExplanationComment",
              "value": "",
              "valueType": "string"
            },
            {
              "id": "blah-8y2wsd-gvb-blah",
              "name": "diagnosisResponse",
              "value": "",
              "valueType": "string"
            }
          ]
        },
        "diagnosis": {
          "reference": "Diagnosis/be142dc6-93bd-11eb-a8b3-0242ac-1309iujhbv"
        }
      }
    ]
  }
    ,
  )
);

// Define a route for handling POST requests
app.post('/feedback', (req, res) => {
  const data = req.body;

  // Write the data to a local JSON file
  fs.writeFile('feedback.json', JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Error writing data to file:', err);
      res.status(500).json({ error: 'An error occurred while saving the data' });
    } else {
      console.log('Data saved successfully');
      res.status(200).json({ message: 'Data received and saved successfully' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/* Telling the application to use the ActivityRouter for any requests that start with "/api". */
// app.use('/api', ActivityRouter);

/* Telling the application to use the AuthRouter for any requests that start with "/api/auth". */
// app.use('/api/auth', AuthRouter);

/* Connecting to the database and then starting the server. */
// connect(MONGODB_URI, { useNewUrlParser: true })
//   .then(() => {
//     app.listen(
//       PORT,
//       console.log('MongoDB connected, server started on port 5000')
//     );
//   })
//   .catch((err) => {
//     console.log(err);
//   });
