--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: episoden; Type: TABLE; Schema: public; Owner: webphimhoathinh_owner
--

CREATE TABLE public.episoden (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    tiltle character varying NOT NULL,
    description character varying DEFAULT ''::character varying NOT NULL,
    episoden character varying NOT NULL,
    "thumbImg" character varying DEFAULT ''::character varying NOT NULL,
    "urlVideo" character varying DEFAULT ''::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone,
    "topicIdId" uuid,
    slug character varying NOT NULL
);


ALTER TABLE public.episoden OWNER TO webphimhoathinh_owner;

--
-- Data for Name: episoden; Type: TABLE DATA; Schema: public; Owner: webphimhoathinh_owner
--

COPY public.episoden (id, tiltle, description, episoden, "thumbImg", "urlVideo", created_at, updated_at, deleted_at, "topicIdId", slug) FROM stdin;
\.


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

