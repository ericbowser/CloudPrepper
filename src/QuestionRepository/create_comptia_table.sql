-- Table: prepper.comptia_cloud_plus_questions

-- DROP TABLE IF EXISTS prepper.comptia_cloud_plus_questions;

CREATE TABLE IF NOT EXISTS prepper.comptia_cloud_plus_questions
(
    id integer NOT NULL DEFAULT nextval('prepper.comptia_id_seq'::regclass),
    question_id integer NOT NULL DEFAULT nextval('prepper.comptia_question_id_seq'::regclass),
    question_number integer NOT NULL DEFAULT nextval('prepper.comptia_question_number_seq'::regclass),
    category text COLLATE pg_catalog."default",
    difficulty text COLLATE pg_catalog."default",
    domain text COLLATE pg_catalog."default",
    question_text text COLLATE pg_catalog."default" NOT NULL,
    options jsonb NOT NULL,
    correct_answer text COLLATE pg_catalog."default" NOT NULL,
    explanation text COLLATE pg_catalog."default",
    explanation_details jsonb,
    multiple_answers bit(1),
    correct_answers text[] COLLATE pg_catalog."default",
    CONSTRAINT comptia_cloud_plus_questions_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS prepper.comptia_cloud_plus_questions
    OWNER to ericbo;
-- Index: question_id

-- DROP INDEX IF EXISTS prepper.question_id;

CREATE INDEX IF NOT EXISTS question_id
    ON prepper.comptia_cloud_plus_questions USING btree
    (question_id ASC NULLS LAST)
    INCLUDE(question_id)
    WITH (deduplicate_items=True)
    TABLESPACE pg_default;