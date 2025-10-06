-- Table: prepper.aws_certified_architect_associate_questions

-- DROP TABLE IF EXISTS prepper.aws_certified_architect_associate_questions;

CREATE TABLE IF NOT EXISTS prepper.aws_certified_architect_associate_questions
(
    id integer NOT NULL,
    question_id integer NOT NULL,
    question_number integer NOT NULL,
    category text COLLATE pg_catalog."default",
    difficulty text COLLATE pg_catalog."default",
    domain text COLLATE pg_catalog."default",
    question_text text COLLATE pg_catalog."default" NOT NULL,
    options jsonb NOT NULL,
    correct_answer text COLLATE pg_catalog."default" NOT NULL,
    explanation text COLLATE pg_catalog."default",
    explanation_details jsonb,
    multiple_answers boolean,
    CONSTRAINT aws_certified_architect_associate_questions_pkey PRIMARY KEY (id),
    CONSTRAINT aws_certified_architect_associate_questions_question_id_key UNIQUE (question_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS prepper.aws_certified_architect_associate_questions
    OWNER to ericbo;

GRANT ALL ON TABLE prepper.aws_certified_architect_associate_questions TO ericbo;