import connectLocalPostgres from './postgres';

let connection = null;

async function getComptiaQuestions() {
  if (!connection) {
    connection = await connectLocalPostgres();
  }
  const sql = 'SELECT * FROM prepper.comptia_cloud_plus_questions';

  try {
    const comptia = connection.query(sql);
    return comptia;
  } catch(error) {
    console.log(error);
    throw error;
  }
}

async function getAwsQuestions() {
  if (!connection) {
    connection = await connectLocalPostgres();
  }
  const sql = 'SELECT * FROM prepper.comptia_cloud_plus_questions';

  try {
    const aws = connection.query(sql);
    return aws;
  } catch(error) {
    console.log(error);
    throw error;
  }
}

export {getComptiaQuestions, getAwsQuestions};
