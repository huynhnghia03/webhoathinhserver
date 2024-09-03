--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
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
c76af68e-49c6-48c7-a8fd-45689c32e606	Tập 69	Tập 69	69		tap-69	https://www.dailymotion.com/embed/video/x93pfjm?autoplay=1&quality=1080&queue-autoplay-next=false&queue-enable=false&sharing-enable=false&ui-logo=false&ui-start-screen-info=false	2024-08-12 16:12:54.863534	2024-08-12 16:12:54.863534	\N	1b8daf63-d130-4c1e-a9e8-dc8f1b860d78
60604974-b673-4003-8cae-6c143f9473ee	Tập 70	Tập 70	70		tap-70	https://www.dailymotion.com/embed/video/x93pfjm?autoplay=1&quality=1080&queue-autoplay-next=false&queue-enable=false&sharing-enable=false&ui-logo=false&ui-start-screen-info=false	2024-08-13 09:12:52.333285	2024-08-13 09:12:52.333285	\N	1b8daf63-d130-4c1e-a9e8-dc8f1b860d78
4d977227-d6d7-4874-8fcb-c1348b5eeccd	Tập 108	 Đấu Phá Thương Khung Phần 5 Tập 108 Vietsub	108		tap-108.html	https://www.dailymotion.com/embed/video/x9468m8?autoplay=1&quality=1080&queue-autoplay-next=false&queue-enable=false&sharing-enable=false&ui-logo=false&ui-start-screen-info=false	2024-08-18 16:16:45.964803	2024-08-18 16:16:45.964803	\N	b93fe675-c698-4b34-8f1e-a3196abb0fc1
9992af15-6951-423c-8161-ff36d25198c6	Tập 133	Tập 133	133		tap-133.html	https://www.dailymotion.com/embed/video/x949dr2?autoplay=1&quality=1080&queue-autoplay-next=false&queue-enable=false&sharing-enable=false&ui-logo=false&ui-start-screen-info=false	2024-08-20 07:51:07.451491	2024-08-20 07:51:07.451491	\N	7504f6d9-573b-483c-a1f6-1b3afd40633c
cda9ba0f-5ebe-41b4-8b0f-0f14d51b1aef	Tập 1	Kiếm Lai Tập 1 Vietsub	1		tap-1.html	https://viupload.net/embed-g5qnmbmhbk2o.html?auto=1	2024-08-21 11:23:35.602563	2024-08-21 11:23:35.602563	\N	7bd9ecdb-7fd5-4e09-a8ad-bd7520a286e4
1487c578-8910-4798-a75f-2a04216816f8	Tập 2	Kiếm Lai Tập 2 Vietsub	2		tap-2.html	https://viupload.net/embed-8wcvtxottfob.html?auto=1	2024-08-21 11:24:13.146589	2024-08-21 11:24:13.146589	\N	7bd9ecdb-7fd5-4e09-a8ad-bd7520a286e4
b7d57fe9-89c8-493d-8aef-effc7cb512a6	Tập 3	Kiếm Lai Tập 3 Vietsub	3		tap-3.html	https://viupload.net/embed-a9fnr2gjgftq.html?auto=1	2024-08-21 11:24:47.041153	2024-08-21 11:24:47.041153	\N	7bd9ecdb-7fd5-4e09-a8ad-bd7520a286e4
eb25e97d-2ac3-4ead-98ce-869c9d020a56	Tập 4	Kiếm Lai Tập 4 Vietsub	4		tap-4.html	https://www.dailymotion.com/embed/video/x94dbl6?autoplay=1&quality=1080&queue-autoplay-next=false&queue-enable=false&sharing-enable=false&ui-logo=false&ui-start-screen-info=false	2024-08-21 11:25:24.265637	2024-08-21 11:25:24.265637	\N	7bd9ecdb-7fd5-4e09-a8ad-bd7520a286e4
8a659291-e7bc-4758-bcf4-8a9aca0a6af1	Tập 5	Trảm Thần Tập 5 Vietsub	5		tap-5.html	https://www.dailymotion.com/embed/video/x94cmdg?autoplay=1&quality=1080&queue-autoplay-next=false&queue-enable=false&sharing-enable=false&ui-logo=false&ui-start-screen-info=false	2024-08-21 11:26:59.919099	2024-08-21 11:26:59.919099	\N	acd13d7d-e1ac-4392-8f91-29dee0a703cd
65c0b4e9-995c-458a-a752-ce7930b9fdb2	 Tập 5	Niệm Vô Song Tập 5 Vietsub	5		tap-5.html	https://www.dailymotion.com/embed/video/x94co0s?autoplay=1&quality=1080&queue-autoplay-next=false&queue-enable=false&sharing-enable=false&ui-logo=false&ui-start-screen-info=false	2024-08-21 11:28:30.048498	2024-08-21 11:28:30.048498	\N	6c70d80b-3263-4235-ac7d-159537ea56c8
c81fdcb0-b36f-4f83-824e-65be13c9f0eb	Tập 71	Già Thiên Tập 71 Vietsub	71		tap-71.html	https://www.dailymotion.com/embed/video/x94b7ro?autoplay=1&quality=1080&queue-autoplay-next=false&queue-enable=false&sharing-enable=false&ui-logo=false&ui-start-screen-info=false	2024-08-21 11:29:46.718188	2024-08-21 11:29:46.718188	\N	1b8daf63-d130-4c1e-a9e8-dc8f1b860d78
2b92aaeb-3742-4bc4-af51-2407fafa593d	Tập 117	Nhất Niệm Vĩnh Hằng Tập 117 Vietsub	117		tap-117.html	https://www.dailymotion.com/embed/video/x94b9wk?autoplay=1&quality=1080&queue-autoplay-next=false&queue-enable=false&sharing-enable=false&ui-logo=false&ui-start-screen-info=false	2024-08-21 11:31:04.989879	2024-08-21 11:31:04.989879	\N	96dd9106-9434-4f04-a3e0-308a799565ef
e1c275a0-b60b-4d8a-a8ce-7374a0539211	Tập 115	Phàm Nhân Tu Tiên Tập 115 Vietsub	115		tap-115.html	https://www.dailymotion.com/embed/video/x945sd0?autoplay=1&quality=1080&queue-autoplay-next=false&queue-enable=false&sharing-enable=false&ui-logo=false&ui-start-screen-info=false	2024-08-21 11:32:43.945311	2024-08-21 11:32:43.945311	\N	eae109ee-e734-4005-9d0b-d1550922567a
688e4dbe-72d8-43bc-b40a-4a5c1917e583	tap 120	Kiếm Lai Tập 4 Vietsub	120		tap-120.html		2024-08-22 03:43:43.771402	2024-08-22 03:43:43.771402	\N	eae109ee-e734-4005-9d0b-d1550922567a
1ee00c5e-d1f9-4575-b0cb-0a9cd3ba06d6	Tập 21	Thần Mộ Tập 21 Vietsub	21		tap-21.html	https://www.dailymotion.com/embed/video/x94w4po?autoplay=1&quality=1080&queue-autoplay-next=false&queue-enable=false&sharing-enable=false&ui-logo=false&ui-start-screen-info=false	2024-09-01 04:40:04.08493	2024-09-01 04:40:04.08493	\N	451e8190-1036-4006-a340-9058e6129c5e
\.


--
-- Data for Name: topic; Type: TABLE DATA; Schema: public; Owner: webphimhoathinh_owner
--

COPY public.topic (id, name, description, image, slug, finish, category, "newEpiso", "time", "totalEpiso", schedule, "moreInteres", created_at, updated_at, deleted_at) FROM stdin;
af625b3d-0fc2-48c8-8385-9c2101418326	Nguyên Tôn	Nguyên Tôn	upload/movie/1723965162185-Nguyen-Ton-300x449.jpg	nguyen-ton	f	Luyện Cấp		20 phút	0	TH	f	2024-08-18 14:12:42.239169	2024-08-19 15:33:07.378196	\N
2d627dfd-633e-4826-b894-aeaab9d49b15	Tru Tiên Phần 2	Tru Tiên Phần 2	upload/movie/1723965238902-Tru-Tien-2-300x449.jpg	tru-tien-phan-2	t	Luyện Cấp		20 phút	0	S	t	2024-08-18 14:13:58.960084	2024-08-18 14:15:48.970042	\N
b7fdf8e3-3c33-4b9c-a7da-9b19e47c95f9	Vĩnh Sinh	Vĩnh Sinh	upload/movie/1723955839100-Vinh-Sinh-3-300x449.jpg	vinh-sinh	f	Kiếm Hiệp, Luyện Cấp		20 phút	0	F	f	2024-08-18 11:37:19.163015	2024-08-19 15:34:58.584723	\N
4aa6654d-7bc9-48c6-814a-8d4372004062	Sư Huynh A Sư Huynh	Sư Huynh A Sư Huynh	upload/movie/1723965126734-Su-Huynh-A-Su-Huynh-300x449.jpg	su-huynh-a-su-huynh	f	Luyện Cấp		20 phút	0	TH	f	2024-08-18 14:12:06.789124	2024-08-19 15:40:03.614848	\N
53c0b8c5-23ad-49e3-9390-ae3fb0856951	Đấu La Đại Lục 2 – Tuyệt Thế Đường Môn	Đấu La Đại Lục 2 – Tuyệt Thế Đường Môn	upload/movie/1723879142133-Dau-La-Dai-Luc-II-300x449.jpg	djau-la-djai-luc-2-tuyet-the-djuong-mon	t	Luyện cấp		20 phut	0	S	t	2024-08-11 11:03:14.174999	2024-08-18 09:24:27.664204	\N
04c10f1d-5674-4cf2-a56d-ea62a908bd5b	Quyến Tư Lượng	Quyến Tư Lượng	upload/movie/1723946717069-Quyen-Tu-Luong-300x449.jpg	quyen-tu-luong	t	Luyện cấp		20 phut	0	W	f	2024-08-11 11:10:58.220573	2024-08-19 15:19:31.511537	\N
acd13d7d-e1ac-4392-8f91-29dee0a703cd	Trảm Thần	Trảm Thần	upload/movie/1723956130363-Tram-Than-300x449.jpg	tram-than	f	 Luyện Cấp	5	25 phút	1	W	f	2024-08-18 11:42:10.413962	2024-08-21 11:27:00.081424	\N
96ff8672-d394-4351-974e-6170c94f0e25	Thế Giới Hoàn Mỹ	Thế Giới Hoàn Mỹ	upload/movie/1723947957782-The-Gioi-Hoan-My-300x449.jpg	the-gioi-hoan-my	f	Luyện cấp		20 phut	0	F	t	2024-08-11 11:04:11.372585	2024-08-20 07:32:45.803512	\N
6c70d80b-3263-4235-ac7d-159537ea56c8	Niệm Vô Song	Niệm Vô Song	upload/movie/1723956078489-Niem-Vo-Song-300x449.jpg	niem-vo-song	f	Kiếm Hiệp, Luyện Cấp	5	20 phút	1	TH	f	2024-08-18 11:41:18.577313	2024-08-21 11:28:30.198311	\N
1bb1c789-c3c4-4069-bc4b-f4dec588e5fc	Thần Ấn Vương Tọa	Thần Ấn Vương Tọa	upload/movie/1723948045706-Than-An-Vuong-Toa-2-300x449.jpg	than-an-vuong-toa	f	Luyện cấp		20 phút	0	TH	f	2024-08-11 11:12:51.118179	2024-08-20 07:35:24.064419	\N
0c4da3f6-c41a-4003-a694-0dc35d6af917	Thần Võ Thiên Tôn	Thần Võ Thiên Tôn	upload/movie/1723955955653-Than-Vo-Thien-Ton-300x449.jpg	than-vo-thien-ton	f	Luyện Cấp, Trùng Sinh		20 phút	0	S	f	2024-08-18 11:39:15.818748	2024-08-20 07:36:18.529963	\N
b1730db4-35a1-4d2a-a08c-0c5cd6e9e002	Tiên Nghịch	Tiên Nghịch	upload/movie/1723964993753-Tien-Nghich-2-300x449.jpg	tien-nghich	t	Luyện Cấp, Trùng Sinh		20 phút	0	M	t	2024-08-18 14:09:53.822948	2024-08-20 07:36:37.773695	\N
7504f6d9-573b-483c-a1f6-1b3afd40633c	Thôn Phệ Tinh Không	Thôn Phệ Tinh Không	upload/movie/1723965060872-Thon-Phe-Tinh-Khong-3-300x449.jpg	thon-phe-tinh-khong	f	Luyện Cấp	133	20 phút	1	T	f	2024-08-18 14:11:00.941381	2024-08-20 07:51:08.535335	\N
1b8daf63-d130-4c1e-a9e8-dc8f1b860d78	Già Thiên	Già Thiên	upload/movie/1723945417942-Gia-Thien2-300x449.jpg	gia-thien	f	Luyện cấp	71	20 phút	3	W	t	2024-08-11 11:10:00.242164	2024-08-21 11:29:46.8253	\N
7bd9ecdb-7fd5-4e09-a8ad-bd7520a286e4	Kiếm Lai	Kiếm Lai	upload/movie/1723800591673-Kiem-Lai-300x449.jpg	kiem-lai	t	Kiếm Hiệp, Luyện Cấp	4	25 phút	4	TH	f	2024-08-16 16:29:51.793036	2024-08-21 11:25:24.412974	\N
eae109ee-e734-4005-9d0b-d1550922567a	Phàm Nhân Tu Tiên	Phàm Nhân Tu Tiên	upload/movie/1723947979467-Pham-Nhan-Tu-Tien-4-300x449.jpg	pham-nhan-tu-tien	f	Luyện cấp	120	20 phut	2	S	t	2024-08-11 11:00:04.168637	2024-08-22 03:43:44.836137	\N
96dd9106-9434-4f04-a3e0-308a799565ef	Nhất Niệm Vĩnh Hằng	Nhất Niệm Vĩnh Hằng	upload/movie/1723947929342-NNVH.jpg	nhat-niem-vinh-hang	f	Luyện cấp	117	20 phut	1	W	t	2024-08-11 11:09:05.071708	2024-09-01 03:55:20.715635	\N
451e8190-1036-4006-a340-9058e6129c5e	Thần Mộ	Thần Mộ	upload/movie/1723955753475-Than-Mo-300x449.jpg	than-mo	f	Luyện Cấp, Trùng Sinh	21	19 phút	1	S	f	2024-08-18 11:35:53.555648	2024-09-01 04:40:04.223913	\N
b93fe675-c698-4b34-8f1e-a3196abb0fc1	Đấu Phá Thương Khung Phần 5	Đấu Phá Thương Khung Phần 5	upload/movie/1723948011803-Dau-Pha-Thuong-Khung-5-300x449.jpg	djau-pha-thuong-khung-phan-5	f	Luyện cấp	108	24 phut	1	SU	t	2024-08-11 11:00:46.231008	2024-08-20 07:27:59.109275	\N
25ddb84f-5125-45cd-b31c-ea133df60142	Huyễn Sủng Sư	Huyễn Sủng Sư	upload/movie/1724139869447-Huyen-Sung-Su-300x449.jpg	huyen-sung-su	f	Luyện Cấp		20 phút	0	SU	f	2024-08-20 07:44:31.867225	2024-08-20 07:47:22.448225	\N
6e43c0f9-b56c-4d44-8b6b-0663d6a0c2e3	Doraemon	Các câu chuyện trong Doraemon thường có một công thức chung, đó là xoay quanh những rắc rối hay xảy ra với cậu bé Nobita học lớp bốn, nhân vật chính thứ nhì của bộ truyện. Doraemon có một chiếc túi thần kỳ trước bụng với đủ loại bảo bối của tương lai. Cốt truyện thường gặp nhất sẽ là Nobita trở về nhà khóc lóc với những rắc rối mà cậu gặp phải ở trường hoặc với bạn bè. Sau khi bị cậu bé van nài hoặc thúc giục, Doraemon sẽ đưa ra một bảo bối giúp Nobita giải quyết những rắc rối của mình, hoặc là để trả đũa hay khoe khoang với bạn bè của cậu. Nobita sẽ lại thường đi quá xa so với dự định ban đầu của Doraemon, thậm chí với những bảo bối mới cậu còn gặp rắc rối lớn hơn trước đó. Đôi khi những người bạn của Nobita, thường là Suneo (Xêkô) hoặc Jaian (Chaien) lại lấy trộm những bảo bối và sử dụng chúng không đúng mục đích. Tuy nhiên thường thì ở cuối mỗi câu chuyện, những ai sử dụng sai mục đích bảo bối sẽ phải chịu hậu quả do mình gây ra, và người đọc sẽ rút ra được bài học từ đó.	upload/movie/1724142863901-doraemon.jpg	doraemon	f	Bảo Bối		25 phút	0	M	t	2024-08-20 08:34:26.4521	2024-08-20 08:38:58.792618	\N
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: webphimhoathinh_owner
--

COPY public.users (id, email, password, role, "refreshToken", "expiryDate", "createdAt", "updatedAt", "deletedAt") FROM stdin;
01813e19-9f1f-4ed8-b897-eee953b96a05	nghiatbag8888@gmail.com	$2b$10$QH0sspxf50DI8kVwltjps.FJG0QlDqQS18GUZ4u8IyWMRSeiS15KS	admin	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5naGlhdGJhZzg4ODhAZ21haWwuY29tIiwiaWQiOiIwMTgxM2UxOS05ZjFmLTRlZDgtYjg5Ny1lZWU5NTNiOTZhMDUiLCJpYXQiOjE3MjUxNjQ1MjgsImV4cCI6MTcyNTE2ODEyOH0.YxQMTeSgf6re-kCzVfkWYkN_kTLp5AryDOCkhBD6ITg	2024-09-01 05:22:08.621	2024-08-15 11:48:59.617465	2024-09-01 04:22:08.693727	\N
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

