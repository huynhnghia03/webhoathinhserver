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
    slug character varying NOT NULL,
    "urlVideo" character varying DEFAULT ''::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone,
    "topicIdId" uuid
);


ALTER TABLE public.episoden OWNER TO webphimhoathinh_owner;

--
-- Name: topic; Type: TABLE; Schema: public; Owner: webphimhoathinh_owner
--

CREATE TABLE public.topic (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying DEFAULT ''::character varying NOT NULL,
    description character varying DEFAULT ''::character varying NOT NULL,
    image character varying DEFAULT ''::character varying NOT NULL,
    slug character varying NOT NULL,
    finish boolean DEFAULT false NOT NULL,
    category character varying DEFAULT ''::character varying NOT NULL,
    "newEpiso" character varying DEFAULT ''::character varying NOT NULL,
    "time" character varying DEFAULT ''::character varying NOT NULL,
    "totalEpiso" character varying DEFAULT '0'::character varying NOT NULL,
    schedule character varying DEFAULT ''::character varying NOT NULL,
    "moreInteres" boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone
);


ALTER TABLE public.topic OWNER TO webphimhoathinh_owner;

--
-- Name: users; Type: TABLE; Schema: public; Owner: webphimhoathinh_owner
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    role character varying DEFAULT 'admin'::character varying NOT NULL,
    "refreshToken" character varying,
    "expiryDate" timestamp without time zone,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "deletedAt" timestamp without time zone
);


ALTER TABLE public.users OWNER TO webphimhoathinh_owner;

--
-- Data for Name: episoden; Type: TABLE DATA; Schema: public; Owner: webphimhoathinh_owner
--

COPY public.episoden (id, tiltle, description, episoden, "thumbImg", slug, "urlVideo", created_at, updated_at, deleted_at, "topicIdId") FROM stdin;
\.


--
-- Data for Name: topic; Type: TABLE DATA; Schema: public; Owner: webphimhoathinh_owner
--

COPY public.topic (id, name, description, image, slug, finish, category, "newEpiso", "time", "totalEpiso", schedule, "moreInteres", created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: webphimhoathinh_owner
--

COPY public.users (id, email, password, role, "refreshToken", "expiryDate", "createdAt", "updatedAt", "deletedAt") FROM stdin;
\.


--
-- Name: topic PK_33aa4ecb4e4f20aa0157ea7ef61; Type: CONSTRAINT; Schema: public; Owner: webphimhoathinh_owner
--

ALTER TABLE ONLY public.topic
    ADD CONSTRAINT "PK_33aa4ecb4e4f20aa0157ea7ef61" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: webphimhoathinh_owner
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: episoden PK_d5749c4f5d8c2fcd109eb6e1ecb; Type: CONSTRAINT; Schema: public; Owner: webphimhoathinh_owner
--

ALTER TABLE ONLY public.episoden
    ADD CONSTRAINT "PK_d5749c4f5d8c2fcd109eb6e1ecb" PRIMARY KEY (id);


--
-- Name: topic UQ_b4f72509919eef20d3f54eedc34; Type: CONSTRAINT; Schema: public; Owner: webphimhoathinh_owner
--

ALTER TABLE ONLY public.topic
    ADD CONSTRAINT "UQ_b4f72509919eef20d3f54eedc34" UNIQUE (slug);


--
-- Name: episoden FK_9e53c81a0031304b08fb2ff53a6; Type: FK CONSTRAINT; Schema: public; Owner: webphimhoathinh_owner
--

ALTER TABLE ONLY public.episoden
    ADD CONSTRAINT "FK_9e53c81a0031304b08fb2ff53a6" FOREIGN KEY ("topicIdId") REFERENCES public.topic(id);


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

