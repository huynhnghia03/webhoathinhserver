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
-- Name: episoden; Type: TABLE; Schema: public; Owner: postgres
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


ALTER TABLE public.episoden OWNER TO postgres;

--
-- Name: topic; Type: TABLE; Schema: public; Owner: postgres
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
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    deleted_at timestamp without time zone,
    schedule character varying DEFAULT ''::character varying NOT NULL,
    "moreInteres" boolean DEFAULT false NOT NULL
);


ALTER TABLE public.topic OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
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


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: episoden; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.episoden (id, tiltle, description, episoden, "thumbImg", "urlVideo", created_at, updated_at, deleted_at, "topicIdId", slug) FROM stdin;
c76af68e-49c6-48c7-a8fd-45689c32e606	Tập 69	Tập 69	69		https://www.dailymotion.com/embed/video/x93pfjm?autoplay=1&quality=1080&queue-autoplay-next=false&queue-enable=false&sharing-enable=false&ui-logo=false&ui-start-screen-info=false	2024-08-12 16:12:54.863534	2024-08-12 16:12:54.863534	\N	1b8daf63-d130-4c1e-a9e8-dc8f1b860d78	tap-69
60604974-b673-4003-8cae-6c143f9473ee	Tập 70	Tập 70	70		https://www.dailymotion.com/embed/video/x93pfjm?autoplay=1&quality=1080&queue-autoplay-next=false&queue-enable=false&sharing-enable=false&ui-logo=false&ui-start-screen-info=false	2024-08-13 09:12:52.333285	2024-08-13 09:12:52.333285	\N	1b8daf63-d130-4c1e-a9e8-dc8f1b860d78	tap-70
4d977227-d6d7-4874-8fcb-c1348b5eeccd	Tập 108	 Đấu Phá Thương Khung Phần 5 Tập 108 Vietsub	108		https://www.dailymotion.com/embed/video/x9468m8?autoplay=1&quality=1080&queue-autoplay-next=false&queue-enable=false&sharing-enable=false&ui-logo=false&ui-start-screen-info=false	2024-08-18 16:16:45.964803	2024-08-18 16:16:45.964803	\N	b93fe675-c698-4b34-8f1e-a3196abb0fc1	tap-108.html
\.


--
-- Data for Name: topic; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.topic (id, name, description, image, slug, finish, category, "newEpiso", "time", "totalEpiso", created_at, updated_at, deleted_at, schedule, "moreInteres") FROM stdin;
af625b3d-0fc2-48c8-8385-9c2101418326	Nguyên Tôn	Nguyên Tôn	upload/movie/1723965162185-Nguyen-Ton-300x449.jpg	nguyen-ton	f	Luyện Cấp		20 phút	0	2024-08-18 14:12:42.239169	2024-08-19 15:33:07.378196	\N	TH	f
2d627dfd-633e-4826-b894-aeaab9d49b15	Tru Tiên Phần 2	Tru Tiên Phần 2	upload/movie/1723965238902-Tru-Tien-2-300x449.jpg	tru-tien-phan-2	t	Luyện Cấp		20 phút	0	2024-08-18 14:13:58.960084	2024-08-18 14:15:48.970042	\N	S	t
b7fdf8e3-3c33-4b9c-a7da-9b19e47c95f9	Vĩnh Sinh	Vĩnh Sinh	upload/movie/1723955839100-Vinh-Sinh-3-300x449.jpg	vinh-sinh	f	Kiếm Hiệp, Luyện Cấp		20 phút	0	2024-08-18 11:37:19.163015	2024-08-19 15:34:58.584723	\N	F	f
b1730db4-35a1-4d2a-a08c-0c5cd6e9e002	Tiên Nghịch	Tiên Nghịch	upload/movie/1723964993753-Tien-Nghich-2-300x449.jpg	tien-nghich	t	Luyện Cấp, Trùng Sinh		20	0	2024-08-18 14:09:53.822948	2024-08-19 15:38:18.924344	\N	M	t
4aa6654d-7bc9-48c6-814a-8d4372004062	Sư Huynh A Sư Huynh	Sư Huynh A Sư Huynh	upload/movie/1723965126734-Su-Huynh-A-Su-Huynh-300x449.jpg	su-huynh-a-su-huynh	f	Luyện Cấp		20 phút	0	2024-08-18 14:12:06.789124	2024-08-19 15:40:03.614848	\N	TH	f
7504f6d9-573b-483c-a1f6-1b3afd40633c	Thôn Phệ Tinh Không	Thôn Phệ Tinh Không	upload/movie/1723965060872-Thon-Phe-Tinh-Khong-3-300x449.jpg	thon-phe-tinh-khong	f	Luyện Cấp		20 phút	0	2024-08-18 14:11:00.941381	2024-08-19 16:31:22.244062	\N	T	f
1b8daf63-d130-4c1e-a9e8-dc8f1b860d78	Già Thiên	Già Thiên	upload/movie/1723945417942-Gia-Thien2-300x449.jpg	gia-thien	t	Luyện cấp	70	20 phut	2	2024-08-11 11:10:00.242164	2024-08-18 09:20:50.035249	\N	W	t
53c0b8c5-23ad-49e3-9390-ae3fb0856951	Đấu La Đại Lục 2 – Tuyệt Thế Đường Môn	Đấu La Đại Lục 2 – Tuyệt Thế Đường Môn	upload/movie/1723879142133-Dau-La-Dai-Luc-II-300x449.jpg	djau-la-djai-luc-2-tuyet-the-djuong-mon	t	Luyện cấp		20 phut	0	2024-08-11 11:03:14.174999	2024-08-18 09:24:27.664204	\N	S	t
96dd9106-9434-4f04-a3e0-308a799565ef	Nhất Niệm Vĩnh Hằng	Nhất Niệm Vĩnh Hằng	upload/movie/1723947929342-NNVH.jpg	nhat-niem-vinh-hang	t	Luyện cấp		20 phut	0	2024-08-11 11:09:05.071708	2024-08-18 09:25:29.451722	\N		t
96ff8672-d394-4351-974e-6170c94f0e25	Thế Giới Hoàn Mỹ	Thế Giới Hoàn Mỹ	upload/movie/1723947957782-The-Gioi-Hoan-My-300x449.jpg	the-gioi-hoan-my	t	Luyện cấp		20 phut	0	2024-08-11 11:04:11.372585	2024-08-18 09:25:57.843255	\N		t
eae109ee-e734-4005-9d0b-d1550922567a	Phàm Nhân Tu Tiên	Phàm Nhân Tu Tiên	upload/movie/1723947979467-Pham-Nhan-Tu-Tien-4-300x449.jpg	pham-nhan-tu-tien	t	Luyện cấp		20 phut	0	2024-08-11 11:00:04.168637	2024-08-18 09:26:19.546008	\N		t
b93fe675-c698-4b34-8f1e-a3196abb0fc1	Đấu Phá Thương Khung Phần 5	Đấu Phá Thương Khung Phần 5	upload/movie/1723948011803-Dau-Pha-Thuong-Khung-5-300x449.jpg	djau-pha-thuong-khung-phan-5	t	Luyện cấp	108	24 phut	1	2024-08-11 11:00:46.231008	2024-08-19 11:13:56.053188	\N	SU	t
1bb1c789-c3c4-4069-bc4b-f4dec588e5fc	Thần Ấn Vương Tọa	Thần Ấn Vương Tọa	upload/movie/1723948045706-Than-An-Vuong-Toa-2-300x449.jpg	than-an-vuong-toa	t	Luyện cấp		20 phut	0	2024-08-11 11:12:51.118179	2024-08-19 15:17:39.021526	\N	TH	f
451e8190-1036-4006-a340-9058e6129c5e	Thần Mộ	Thần Mộ	upload/movie/1723955753475-Than-Mo-300x449.jpg	than-mo	f	Luyện Cấp, Trùng Sinh		19 phút	0	2024-08-18 11:35:53.555648	2024-08-18 11:35:53.555648	\N		f
6c70d80b-3263-4235-ac7d-159537ea56c8	Niệm Vô Song	Niệm Vô Song	upload/movie/1723956078489-Niem-Vo-Song-300x449.jpg	niem-vo-song	f	Kiếm Hiệp, Luyện Cấp		20 phút	0	2024-08-18 11:41:18.577313	2024-08-18 11:41:18.577313	\N		f
0c4da3f6-c41a-4003-a694-0dc35d6af917	Thần Võ Thiên Tôn	Thần Võ Thiên Tôn	upload/movie/1723955955653-Than-Vo-Thien-Ton-300x449.jpg	than-vo-thien-ton	t	Luyện Cấp, Trùng Sinh		20	0	2024-08-18 11:39:15.818748	2024-08-19 15:18:56.015802	\N	S	f
04c10f1d-5674-4cf2-a56d-ea62a908bd5b	Quyến Tư Lượng	Quyến Tư Lượng	upload/movie/1723946717069-Quyen-Tu-Luong-300x449.jpg	quyen-tu-luong	t	Luyện cấp		20 phut	0	2024-08-11 11:10:58.220573	2024-08-19 15:19:31.511537	\N	W	f
7bd9ecdb-7fd5-4e09-a8ad-bd7520a286e4	Kiếm Lai	Kiếm Lai	upload/movie/1723800591673-Kiem-Lai-300x449.jpg	kiem-lai	t	Kiếm Hiệp, Luyện Cấp		25 phút	0	2024-08-16 16:29:51.793036	2024-08-19 15:19:46.847227	\N	TH	f
acd13d7d-e1ac-4392-8f91-29dee0a703cd	Trảm Thần	Trảm Thần	upload/movie/1723956130363-Tram-Than-300x449.jpg	tram-than	t	 Luyện Cấp		25 phút	0	2024-08-18 11:42:10.413962	2024-08-19 15:30:26.185493	\N	W	f
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, role, "refreshToken", "expiryDate", "createdAt", "updatedAt", "deletedAt") FROM stdin;
01813e19-9f1f-4ed8-b897-eee953b96a05	nghiatbag8888@gmail.com	$2b$10$QH0sspxf50DI8kVwltjps.FJG0QlDqQS18GUZ4u8IyWMRSeiS15KS	admin	\N	\N	2024-08-15 11:48:59.617465	2024-08-15 11:48:59.617465	\N
14918bf3-12fe-41d0-837d-bc1957e223af	nghiatbag888@gmail.com	$2b$10$mWIxhXpsSL2mun8zYXbdc.cF2CQv5l2nOomXPhPJziJxlY/lT6vla	admin	\N	\N	2024-08-15 12:23:11.752756	2024-08-15 12:23:11.752756	\N
\.


--
-- Name: topic PK_33aa4ecb4e4f20aa0157ea7ef61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topic
    ADD CONSTRAINT "PK_33aa4ecb4e4f20aa0157ea7ef61" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: episoden PK_d5749c4f5d8c2fcd109eb6e1ecb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.episoden
    ADD CONSTRAINT "PK_d5749c4f5d8c2fcd109eb6e1ecb" PRIMARY KEY (id);


--
-- Name: topic UQ_b4f72509919eef20d3f54eedc34; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topic
    ADD CONSTRAINT "UQ_b4f72509919eef20d3f54eedc34" UNIQUE (slug);


--
-- Name: episoden FK_9e53c81a0031304b08fb2ff53a6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.episoden
    ADD CONSTRAINT "FK_9e53c81a0031304b08fb2ff53a6" FOREIGN KEY ("topicIdId") REFERENCES public.topic(id);


--
-- PostgreSQL database dump complete
--

