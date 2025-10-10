-- SEQUENCE: prepper.comptia_question_number_seq

-- DROP SEQUENCE IF EXISTS prepper.comptia_question_number_seq;

CREATE SEQUENCE IF NOT EXISTS prepper.comptia_question_number_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE prepper.comptia_question_number_seq
    OWNED BY prepper.comptia_cloud_plus_questions.question_number;


ALTER SEQUENCE prepper.comptia_question_number_seq
    OWNER TO ericbo;

GRANT ALL ON SEQUENCE prepper.comptia_question_number_seq TO ericbo WITH GRANT OPTION;

CREATE SEQUENCE IF NOT EXISTS prepper.comptia_cloud_plus_questions_question_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE prepper.comptia_cloud_plus_questions_question_id_seq
    OWNER TO ericbo;


CREATE SEQUENCE IF NOT EXISTS prepper.comptia_cloud_plus_questions_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE prepper.comptia_cloud_plus_questions_id_seq
    OWNER TO ericbo;

