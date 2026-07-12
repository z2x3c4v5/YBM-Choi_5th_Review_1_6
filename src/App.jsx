import React, { useState, useEffect, useRef } from 'react';

// =================================================================
//  ✏️ 여기만 채우면 됩니다 — 단원별 표현 + 이미지
// -----------------------------------------------------------------
//  - 6개 단원(Unit 1~6)에 표현을 넣어주세요.
//  - 한 단원에 여러 문장을 넣어두면, 게임을 시작할 때마다
//    그 중 필요한 개수만큼을 "무작위로" 뽑아 보드에 배치합니다.
//  - image: /images/파일명 (public/images 에 커밋된 이미지)
//  - emoji: 그림(image)이 없거나 불러오지 못할 때 대신 보여줄 이모지입니다.
//  - question / answer: 학생이 말할 영어 질문과 대답입니다.
//  - ko: (선택) 한글 뜻. 원하면 화면에 자막처럼 보여줄 수 있습니다.
// =================================================================
const UNIT_POOLS = {
  // 1단원: 학년 묻고 답하기(What grade ~) + 교실 위치(Where is ~ / It's on the N floor).
  '1단원': [
    { emoji: '1️⃣', image: '/images/01_i_m_in_the_first_grade.png', question: 'What grade are you in?', answer: "I'm in the first grade.", ko: '너는 몇 학년이니? / 나는 1학년이야.' },
    { emoji: '2️⃣', image: '/images/02_i_m_in_the_second_grade.png', question: 'What grade are you in?', answer: "I'm in the second grade.", ko: '너는 몇 학년이니? / 나는 2학년이야.' },
    { emoji: '3️⃣', image: '/images/03_i_m_in_the_third_grade.png', question: 'What grade are you in?', answer: "I'm in the third grade.", ko: '너는 몇 학년이니? / 나는 3학년이야.' },
    { emoji: '4️⃣', image: '/images/04_i_m_in_the_fourth_grade.png', question: 'What grade are you in?', answer: "I'm in the fourth grade.", ko: '너는 몇 학년이니? / 나는 4학년이야.' },
    { emoji: '5️⃣', image: '/images/05_i_m_in_the_fifth_grade.png', question: 'What grade are you in?', answer: "I'm in the fifth grade.", ko: '너는 몇 학년이니? / 나는 5학년이야.' },
    { emoji: '6️⃣', image: '/images/06_i_m_in_the_sixth_grade.png', question: 'What grade are you in?', answer: "I'm in the sixth grade.", ko: '너는 몇 학년이니? / 나는 6학년이야.' },
    { emoji: '🏫', image: '/images/07_it_s_on_the_first_floor.png', question: 'Where is your classroom?', answer: "It's on the first floor.", ko: '너의 교실은 어디에 있니? / 1층에 있어.' },
    { emoji: '🎨', image: '/images/08_it_s_on_the_second_floor.png', question: 'Where is the art room?', answer: "It's on the second floor.", ko: '미술실은 어디에 있니? / 2층에 있어.' },
    { emoji: '💻', image: '/images/09_it_s_on_the_third_floor.png', question: 'Where is the computer room?', answer: "It's on the third floor.", ko: '컴퓨터실은 어디에 있니? / 3층에 있어.' },
    { emoji: '♻️', image: '/images/10_it_s_on_the_fifth_floor.png', question: 'Where is the eco room?', answer: "It's on the fifth floor.", ko: '에코실은 어디에 있니? / 5층에 있어.' },
    { emoji: '🔬', image: '/images/11_it_s_on_the_sixth_floor.png', question: 'Where is the science room?', answer: "It's on the sixth floor.", ko: '과학실은 어디에 있니? / 6층에 있어.' },
  ],
  // 2단원: 장래 희망 묻고 답하기(What do you want to be? / I want to be ~. I'm good at ~).
  '2단원': [
    { emoji: '🚗', image: '/images/01_i_want_to_be_a_car_designer_i_m_good_at_drawing_ca.png', question: 'What do you want to be?', answer: "I want to be a car designer. I'm good at drawing cars.", ko: '너는 무엇이 되고 싶니? / 나는 자동차 디자이너가 되고 싶어. 나는 자동차를 잘 그려.' },
    { emoji: '🎭', image: '/images/02_i_want_to_be_a_musical_actor_i_m_good_at_singing_a.png', question: 'What do you want to be?', answer: "I want to be a musical actor. I'm good at singing and acting.", ko: '너는 무엇이 되고 싶니? / 나는 뮤지컬 배우가 되고 싶어. 나는 노래와 연기를 잘해.' },
    { emoji: '⚽', image: '/images/03_i_want_to_be_a_soccer_player_i_m_good_at_running_a.png', question: 'What do you want to be?', answer: "I want to be a soccer player. I'm good at running and kicking.", ko: '너는 무엇이 되고 싶니? / 나는 축구 선수가 되고 싶어. 나는 달리기와 공차기를 잘해.' },
    { emoji: '🦁', image: '/images/04_i_want_to_be_a_zookeeper_i_m_good_at_taking_care_o.png', question: 'What do you want to be?', answer: "I want to be a zookeeper. I'm good at taking care of animals.", ko: '너는 무엇이 되고 싶니? / 나는 사육사가 되고 싶어. 나는 동물 돌보기를 잘해.' },
    { emoji: '🎹', image: '/images/05_i_want_to_be_a_pianist_i_m_good_at_playing_the_pia.png', question: 'What do you want to be?', answer: "I want to be a pianist. I'm good at playing the piano.", ko: '너는 무엇이 되고 싶니? / 나는 피아니스트가 되고 싶어. 나는 피아노 연주를 잘해.' },
    { emoji: '🧪', image: '/images/06_i_want_to_be_a_scientist_i_m_good_at_making_robots.png', question: 'What do you want to be?', answer: "I want to be a scientist. I'm good at making robots.", ko: '너는 무엇이 되고 싶니? / 나는 과학자가 되고 싶어. 나는 로봇 만들기를 잘해.' },
  ],
  // 3단원: 날짜 묻고 답하기(When is ~? / It's on 월+서수).
  '3단원': [
    { emoji: '📚', image: '/images/01_it_s_on_january_15th.png', question: 'When is the book festival?', answer: "It's on January 15th.", ko: '독서 축제는 언제니? / 1월 15일이야.' },
    { emoji: '🍕', image: '/images/02_it_s_on_february_1st.png', question: 'When is the pizza party?', answer: "It's on February 1st.", ko: '피자 파티는 언제니? / 2월 1일이야.' },
    { emoji: '🎭', image: '/images/03_it_s_on_march_21st.png', question: 'When is the class show?', answer: "It's on March 21st.", ko: '학급 발표회는 언제니? / 3월 21일이야.' },
    { emoji: '⚾', image: '/images/04_it_s_on_april_22nd.png', question: 'When is the T-ball game?', answer: "It's on April 22nd.", ko: '티볼 경기는 언제니? / 4월 22일이야.' },
    { emoji: '🎪', image: '/images/05_it_s_on_may_3rd.png', question: 'When is the school festival?', answer: "It's on May 3rd.", ko: '학교 축제는 언제니? / 5월 3일이야.' },
    { emoji: '🖼️', image: '/images/06_it_s_on_june_30th.png', question: 'When is the art show?', answer: "It's on June 30th.", ko: '미술 전시회는 언제니? / 6월 30일이야.' },
    { emoji: '📚', image: '/images/07_it_s_on_july_7th.png', question: 'When is the book festival?', answer: "It's on July 7th.", ko: '독서 축제는 언제니? / 7월 7일이야.' },
    { emoji: '🍕', image: '/images/08_it_s_on_august_12th.png', question: 'When is the pizza party?', answer: "It's on August 12th.", ko: '피자 파티는 언제니? / 8월 12일이야.' },
    { emoji: '🎭', image: '/images/09_it_s_on_september_9th.png', question: 'When is the class show?', answer: "It's on September 9th.", ko: '학급 발표회는 언제니? / 9월 9일이야.' },
    { emoji: '⚾', image: '/images/10_it_s_on_october_10th.png', question: 'When is the T-ball game?', answer: "It's on October 10th.", ko: '티볼 경기는 언제니? / 10월 10일이야.' },
    { emoji: '🎪', image: '/images/11_it_s_on_november_4th.png', question: 'When is the school festival?', answer: "It's on November 4th.", ko: '학교 축제는 언제니? / 11월 4일이야.' },
    { emoji: '🖼️', image: '/images/12_it_s_on_december_25th.png', question: 'When is the art show?', answer: "It's on December 25th.", ko: '미술 전시회는 언제니? / 12월 25일이야.' },
  ],
  // 4단원: 아픈 곳 묻고 답하기(What's wrong? / I have a ~).
  '4단원': [
    { emoji: '🤧', image: '/images/01_i_have_a_cold.png', question: "What's wrong?", answer: 'I have a cold.', ko: '어디가 아프니? / 나는 감기에 걸렸어.' },
    { emoji: '🤒', image: '/images/02_i_have_a_fever.png', question: "What's wrong?", answer: 'I have a fever.', ko: '어디가 아프니? / 나는 열이 나.' },
    { emoji: '🤕', image: '/images/03_i_have_a_headache.png', question: "What's wrong?", answer: 'I have a headache.', ko: '어디가 아프니? / 나는 머리가 아파.' },
    { emoji: '👃', image: '/images/04_i_have_a_runny_nose.png', question: "What's wrong?", answer: 'I have a runny nose.', ko: '어디가 아프니? / 나는 콧물이 나.' },
    { emoji: '🦷', image: '/images/05_i_have_a_toothache.png', question: "What's wrong?", answer: 'I have a toothache.', ko: '어디가 아프니? / 나는 이가 아파.' },
  ],
  // 5단원: 누가 했는지 묻고 답하기(Who made/painted/wrote/built ~? / 이름 + did.).
  '5단원': [
    { emoji: '🗺️', image: '/images/01_tom_did.png', question: 'Who made this map?', answer: 'Tom did.', ko: '누가 이 지도를 만들었니? / Tom이 만들었어.' },
    { emoji: '🖼️', image: '/images/02_sally_did.png', question: 'Who painted this picture?', answer: 'Sally did.', ko: '누가 이 그림을 그렸니? / Sally가 그렸어.' },
    { emoji: '✈️', image: '/images/03_mike_did.png', question: 'Who made this airplane?', answer: 'Mike did.', ko: '누가 이 비행기를 만들었니? / Mike가 만들었어.' },
    { emoji: '📖', image: '/images/04_jane_did.png', question: 'Who wrote this book?', answer: 'Jane did.', ko: '누가 이 책을 썼니? / Jane이 썼어.' },
    { emoji: '🏠', image: '/images/05_sam_did.png', question: 'Who built this house?', answer: 'Sam did.', ko: '누가 이 집을 지었니? / Sam이 지었어.' },
    { emoji: '✉️', image: '/images/06_lucy_did.png', question: 'Who wrote these letters?', answer: 'Lucy did.', ko: '누가 이 편지들을 썼니? / Lucy가 썼어.' },
  ],
  // 6단원: 미래 계획 묻고 답하기(What are you going to do? / I'm going to ~).
  '6단원': [
    { emoji: '🎨', image: '/images/01_i_m_going_to_do_face_painting.png', question: 'What are you going to do?', answer: "I'm going to do face painting.", ko: '너는 무엇을 할 거니? / 나는 페이스 페인팅을 할 거야.' },
    { emoji: '👜', image: '/images/02_i_m_going_to_make_an_eco_bag.png', question: 'What are you going to do?', answer: "I'm going to make an eco-bag.", ko: '너는 무엇을 할 거니? / 나는 에코백을 만들 거야.' },
    { emoji: '🎤', image: '/images/03_i_m_going_to_sing_a_song.png', question: 'What are you going to do?', answer: "I'm going to sing a song.", ko: '너는 무엇을 할 거니? / 나는 노래를 부를 거야.' },
    { emoji: '🎬', image: '/images/04_i_m_going_to_watch_a_movie.png', question: 'What are you going to do?', answer: "I'm going to watch a movie.", ko: '너는 무엇을 할 거니? / 나는 영화를 볼 거야.' },
    { emoji: '🔬', image: '/images/05_i_m_going_to_do_a_science_project.png', question: 'What are you going to do?', answer: "I'm going to do a science project.", ko: '너는 무엇을 할 거니? / 나는 과학 과제를 할 거야.' },
    { emoji: '🏠', image: '/images/06_i_m_going_to_stay_home.png', question: 'What are you going to do?', answer: "I'm going to stay home.", ko: '너는 무엇을 할 거니? / 나는 집에 있을 거야.' },
    { emoji: '🥋', image: '/images/07_i_m_going_to_do_taekwondo.png', question: 'What are you going to do?', answer: "I'm going to do taekwondo.", ko: '너는 무엇을 할 거니? / 나는 태권도를 할 거야.' },
    { emoji: '⚽', image: '/images/08_i_m_going_to_play_soccer.png', question: 'What are you going to do?', answer: "I'm going to play soccer.", ko: '너는 무엇을 할 거니? / 나는 축구를 할 거야.' },
    { emoji: '🏟️', image: '/images/09_i_m_going_to_see_a_soccer_game.png', question: 'What are you going to do?', answer: "I'm going to see a soccer game.", ko: '너는 무엇을 할 거니? / 나는 축구 경기를 볼 거야.' },
    { emoji: '👵', image: '/images/10_i_m_going_to_visit_my_grandmother.png', question: 'What are you going to do?', answer: "I'm going to visit my grandmother.", ko: '너는 무엇을 할 거니? / 나는 할머니를 방문할 거야.' },
    { emoji: '🚜', image: '/images/11_i_m_going_to_go_to_farm_camp.png', question: 'What are you going to do?', answer: "I'm going to go to farm camp.", ko: '너는 무엇을 할 거니? / 나는 농장 캠프에 갈 거야.' },
  ],
};

const ALL_UNITS = ['1단원', '2단원', '3단원', '4단원', '5단원', '6단원'];

// 별 스티커 전체 집계용: 모든 단원의 표현 개수 합계
const TOTAL_EXPRESSIONS = Object.values(UNIT_POOLS).reduce((s, p) => s + p.length, 0);

// 표현마다 고유 키(이미지 경로) — 별 스티커 저장/조회에 사용
const exprKey = (cell) => cell.image || `${cell.unit || ''}:${cell.answer}`;

// 보드 배치 틀: START + 일반칸 24 + 액션칸 3 + FINISH = 29칸
// (칸 번호·이동 로직은 그대로 — 화면 배치(뱀 모양)만 CSS grid로 바뀝니다)
const BOARD_LAYOUT = [
  { type: 'start', label: 'START' },
  ...Array(10).fill({ type: 'content' }),
  { type: 'action', action: 'forward2', label: '앞으로\n2칸 🚀' },
  ...Array(2).fill({ type: 'content' }),
  { type: 'action', action: 'rest', label: '한 번\n쉬기 💤' },
  ...Array(3).fill({ type: 'content' }),
  { type: 'action', action: 'back2', label: '뒤로\n2칸 🍌' },
  ...Array(9).fill({ type: 'content' }),
  { type: 'finish', label: 'FINISH' },
];

const CONTENT_SLOTS = BOARD_LAYOUT.filter((c) => c.type === 'content').length; // 24

// 단원별 배지(글자) 색 — 파스텔 계열
const UNIT_COLORS = {
  '1단원': 'text-rose-700 bg-rose-50 border-rose-300',
  '2단원': 'text-amber-700 bg-amber-50 border-amber-300',
  '3단원': 'text-emerald-700 bg-emerald-50 border-emerald-300',
  '4단원': 'text-violet-700 bg-violet-50 border-violet-300',
  '5단원': 'text-cyan-700 bg-cyan-50 border-cyan-300',
  '6단원': 'text-fuchsia-700 bg-fuchsia-50 border-fuchsia-300',
};

// 단원별 칸 배경(파스텔 채색)
const UNIT_CELL = {
  '1단원': 'bg-rose-100 border-rose-300 shadow-[0_6px_0_0_#fda4af]',
  '2단원': 'bg-amber-100 border-amber-300 shadow-[0_6px_0_0_#fcd34d]',
  '3단원': 'bg-emerald-100 border-emerald-300 shadow-[0_6px_0_0_#6ee7b7]',
  '4단원': 'bg-violet-100 border-violet-300 shadow-[0_6px_0_0_#c4b5fd]',
  '5단원': 'bg-cyan-100 border-cyan-300 shadow-[0_6px_0_0_#67e8f9]',
  '6단원': 'bg-fuchsia-100 border-fuchsia-300 shadow-[0_6px_0_0_#f0abfc]',
};

// 로비 단원 토글 버튼 색
const UNIT_TOGGLE_ON = {
  '1단원': 'bg-rose-500 border-rose-600 text-white',
  '2단원': 'bg-amber-500 border-amber-600 text-white',
  '3단원': 'bg-emerald-500 border-emerald-600 text-white',
  '4단원': 'bg-violet-500 border-violet-600 text-white',
  '5단원': 'bg-cyan-500 border-cyan-600 text-white',
  '6단원': 'bg-fuchsia-500 border-fuchsia-600 text-white',
};

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// 한 단원에서 n개를 뽑는다. 표현이 n개보다 많으면 무작위로 n개를 뽑고,
// 적으면 모든 표현을 한 번씩 쓴 뒤 무작위로 반복해 n개를 채운다(복습 반복 효과).
const pickForUnit = (pool, n) => {
  if (n <= 0 || pool.length === 0) return [];
  const result = shuffle(pool);
  while (result.length < n) {
    result.push(pool[Math.floor(Math.random() * pool.length)]);
  }
  return shuffle(result.slice(0, n));
};

// 선택한 단원들로 24개 일반칸을 자동 균등 배분해 보드를 생성
//  - 6개=단원당 4칸, 3개=8칸, 2개=12칸 (남는 칸은 앞쪽 단원에 1칸씩 더)
const buildBoard = (selectedUnits) => {
  const units = (selectedUnits && selectedUnits.length ? selectedUnits : ALL_UNITS).filter(
    (u) => UNIT_POOLS[u],
  );
  const n = units.length;
  const base = Math.floor(CONTENT_SLOTS / n);
  let remainder = CONTENT_SLOTS - base * n;

  const picked = [];
  units.forEach((unit) => {
    const count = base + (remainder > 0 ? 1 : 0);
    if (remainder > 0) remainder--;
    pickForUnit(UNIT_POOLS[unit], count).forEach((item) => picked.push({ ...item, unit }));
  });
  const contentQueue = shuffle(picked);

  let qi = 0;
  return BOARD_LAYOUT.map((layout, id) => {
    if (layout.type === 'content') {
      const c = contentQueue[qi++] || { unit: '', question: '', answer: '' };
      return { id, type: 'normal', ...c };
    }
    return { id, ...layout };
  });
};

const RPS_EMOJI = { rock: '✊', paper: '🖐️', scissors: '✌️' };

// --- 음성 정답 인식(너그러운 매칭) ---------------------------------
// 학생이 문장을 살짝 다르게 말해도 정답으로 인정합니다.
//  · 관사/대명사 등 기능어(the, a, I, my ...)는 무시
//  · 서수/날짜 표기를 숫자로 통일 (first/1st → 1, fifteenth/15th → 15)
//  · 핵심 단어가 모두 들어 있으면 정답 (단, 숫자는 정확히 일치해야 함)
const ORDINAL_WORDS = {
  first: '1', second: '2', third: '3', fourth: '4', fifth: '5', sixth: '6',
  seventh: '7', eighth: '8', ninth: '9', tenth: '10', eleventh: '11', twelfth: '12',
  thirteenth: '13', fourteenth: '14', fifteenth: '15', sixteenth: '16', seventeenth: '17',
  eighteenth: '18', nineteenth: '19', twentieth: '20', twentyfirst: '21', twentysecond: '22',
  twentythird: '23', thirtieth: '30', thirtyfirst: '31',
};

const STOPWORDS = new Set([
  'the', 'a', 'an', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'i', 'im', 'my', 'me',
  'mine', 'on', 'it', 'its', 'in', 'of', 'to', 'you', 'your', 'and', 'can', 'do', 'does',
  'did', 'go', 'goes', 'got', 'get', 'have', 'has', 'had', 'will', 'at', 'for', 'with',
  'because', 'this', 'that', 'so', 'very',
]);

const normWord = (w) => {
  const s = w.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!s) return '';
  const m = s.match(/^(\d+)(st|nd|rd|th)$/);
  if (m) return m[1];
  return ORDINAL_WORDS[s] || s;
};

const tokenize = (str) => str.replace(/['’`]/g, '').split(/[^a-zA-Z0-9]+/).map(normWord).filter(Boolean);

const contentTokens = (str) => [...new Set(tokenize(str).filter((t) => !STOPWORDS.has(t)))];

// 두 단어의 편집 거리(발음 오인식·오타 허용용)
const lev = (a, b) => {
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
    }
    prev = cur;
  }
  return prev[n];
};

// 정답의 핵심 단어 하나가 학생 발화에 (대략) 들어 있는지 판정
const tokenMatches = (tok, spokenToks, spokenConcat) => {
  if (/^\d+$/.test(tok)) return spokenToks.includes(tok); // 숫자(학년·날짜)는 정확히 일치
  if (spokenConcat.includes(tok)) return true;
  return spokenToks.some((st) => {
    if (st.length >= 3 && (tok.startsWith(st) || st.startsWith(tok))) return true;
    const thr = tok.length <= 5 ? 1 : 2; // 짧은 단어는 1글자, 긴 단어는 2글자까지 차이 허용
    return lev(st, tok) <= thr;
  });
};

// 여러 인식 후보를 모두 합쳐서 정답 핵심 단어가 충분히 들어 있으면 통과
//  · 숫자(학년·날짜)는 모두 정확히 일치해야 함
//  · 나머지 핵심 단어는 75% 이상 맞으면 통과(발음/오인식 한두 개는 허용)
//  · lenient=true(연습 팝업): 조금 더 너그럽게(핵심 단어 60% 이상). 숫자는 여전히 정확히.
const matchAggregate = (transcripts, required, lenient = false) => {
  let spokenToks = [];
  transcripts.forEach((t) => { spokenToks = spokenToks.concat(tokenize(t)); });
  const spokenConcat = spokenToks.join('');
  const nums = required.filter((t) => /^\d+$/.test(t));
  const words = required.filter((t) => !/^\d+$/.test(t));
  if (!nums.every((t) => tokenMatches(t, spokenToks, spokenConcat))) return false;
  if (words.length === 0) return true;
  const hit = words.filter((t) => tokenMatches(t, spokenToks, spokenConcat)).length;
  return hit >= Math.ceil(words.length * (lenient ? 0.6 : 0.75));
};

// 정확도(%) 계산 — 칸별 녹음의 막대/숫자 표시에 사용 (게임과 동일한 매칭 로직)
const computeAccuracy = (transcripts, required) => {
  if (!required.length) return 0;
  let spokenToks = [];
  transcripts.forEach((t) => { spokenToks = spokenToks.concat(tokenize(t)); });
  const spokenConcat = spokenToks.join('');
  const hit = required.filter((tok) => tokenMatches(tok, spokenToks, spokenConcat)).length;
  return Math.round((hit / required.length) * 100);
};

function CellImage({ src, alt, className, fallbackClass, fallbackEmoji = '💬' }) {
  const [err, setErr] = useState(false);
  if (!src || err) {
    return (
      <div className={`${fallbackClass} flex items-center justify-center`}>{fallbackEmoji}</div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setErr(true)} />;
}

// 문장을 단어 단위로 쪼개, 단어를 누르면 그 단어만 읽어주도록 렌더링
function ClickableWords({ text, onWord }) {
  return (
    <>
      {text.split(/(\s+)/).map((seg, i) => {
        if (seg === '' || /^\s+$/.test(seg)) return <span key={i}>{seg}</span>;
        const clean = seg.replace(/[^A-Za-z0-9'’]/g, '');
        return (
          <span
            key={i}
            onClick={(e) => { e.stopPropagation(); if (clean) onWord(clean); }}
            className="cursor-pointer rounded px-0.5 hover:bg-yellow-200 transition-colors"
            title="클릭하면 이 단어를 들려줘요"
          >
            {seg}
          </span>
        );
      })}
    </>
  );
}

// 대답 문장에서 핵심 단어(기능어 제외)를 빈칸으로 만들기 위한 분해
const parseForBlanks = (answer) => {
  const segs = [];
  let blankIdx = 0;
  answer.split(/(\s+)/).forEach((seg) => {
    if (seg === '') return;
    if (/^\s+$/.test(seg)) { segs.push({ type: 'space', text: seg }); return; }
    const m = seg.match(/^([^A-Za-z0-9'’]*)([A-Za-z0-9'’]*)([^A-Za-z0-9'’]*)$/);
    const pre = m ? m[1] : '';
    const core = m ? m[2] : seg;
    const post = m ? m[3] : '';
    const norm = normWord(core);
    if (core && norm && !STOPWORDS.has(norm)) {
      segs.push({ type: 'blank', pre, core, post, norm, idx: blankIdx });
      blankIdx++;
    } else {
      segs.push({ type: 'text', text: seg });
    }
  });
  return segs;
};

// 단어 클릭 시 보여줄 한글 뜻 사전 (소문자·구두점 제거 후 조회)
const WORD_MEANING = {
  // 공통/기능어
  i: '나', im: '나는 ~이다', "i'm": '나는 ~이다', my: '나의', me: '나를', mine: '나의 것',
  you: '너', your: '너의', is: '~이다', are: '~이다(복수)', am: '~이다',
  he: '그(남자)', she: '그녀(여자)', his: '그의', her: '그녀의', "he's": '그는 ~이다', "she's": '그녀는 ~이다',
  the: '그 (정관사)', a: '하나의', an: '하나의', in: '~에/안에', on: '~에/위에',
  to: '~로', and: '그리고', can: '~할 수 있다', do: '~하다', does: '~하다', go: '가다',
  see: '보다', eat: '먹다', get: '얻다/받다', have: '가지고 있다', has: '가지고 있다',
  its: '그것의', "it's": '그것은 ~이다', it: '그것', one: '하나', two: '둘',
  // 의문사
  what: '무엇/어떤', when: '언제', why: '왜', how: '어떻게', where: '어디', who: '누구', which: '어느 것',
  // 1단원 (학년 + 교실 위치)
  grade: '학년', first: '첫째 (1)', second: '둘째 (2)', third: '셋째 (3)',
  fourth: '넷째 (4)', fifth: '다섯째 (5)', sixth: '여섯째 (6)',
  floor: '층', classroom: '교실', art: '미술', computer: '컴퓨터',
  eco: '에코/환경', science: '과학', room: '방/교실',
  // 2단원 (장래 희망)
  want: '원하다', be: '되다', good: '잘하는/좋은', at: '~을/~에',
  designer: '디자이너', drawing: '그리기', car: '자동차', cars: '자동차들',
  musical: '뮤지컬', actor: '배우', singing: '노래하기', acting: '연기하기',
  player: '선수', running: '달리기', kicking: '공차기', soccer: '축구',
  zookeeper: '사육사', taking: '돌보기', care: '돌봄', animals: '동물들',
  pianist: '피아니스트', playing: '연주하기', piano: '피아노',
  scientist: '과학자', making: '만들기', robots: '로봇',
  // 3단원 (날짜)
  book: '책/독서', festival: '축제', pizza: '피자', party: '파티',
  class: '학급/반', show: '발표회/공연', tball: '티볼', 't-ball': '티볼',
  school: '학교', day: '날', game: '경기/게임',
  january: '1월', february: '2월', march: '3월', april: '4월', may: '5월', june: '6월',
  july: '7월', august: '8월', september: '9월', october: '10월', november: '11월', december: '12월',
  '1st': '1일', '3rd': '3일', '4th': '4일', '7th': '7일', '9th': '9일', '10th': '10일',
  '12th': '12일', '15th': '15일', '21st': '21일', '22nd': '22일', '25th': '25일', '30th': '30일',
  // 4단원 (아픈 곳)
  wrong: '잘못된/이상한', cold: '감기', fever: '열', headache: '두통',
  toothache: '치통', runny: '콧물이 흐르는', nose: '코', stomachache: '복통(배 아픔)',
  // 5단원 (누가 했는지 — 과거)
  made: '만들었다', painted: '(그림을) 그렸다', wrote: '썼다', built: '지었다',
  did: '했다', map: '지도', picture: '그림', airplane: '비행기',
  house: '집', letters: '편지들', letter: '편지', these: '이것들',
  tom: 'Tom(이름)', sally: 'Sally(이름)', mike: 'Mike(이름)',
  jane: 'Jane(이름)', sam: 'Sam(이름)', lucy: 'Lucy(이름)',
  // 6단원 (미래 계획)
  going: '~할 예정인', face: '얼굴', painting: '그리기(페인팅)',
  ecobag: '에코백', 'eco-bag': '에코백', bag: '가방', sing: '노래하다', song: '노래',
  watch: '보다', movie: '영화', project: '과제/프로젝트', stay: '머무르다', home: '집',
  taekwondo: '태권도', play: '(운동을) 하다', visit: '방문하다',
  grandmother: '할머니', farm: '농장', camp: '캠프', make: '만들다',
};

const lookupMeaning = (raw) => {
  if (!raw) return '';
  const key = raw.toLowerCase().replace(/[.,!?;:]/g, '');
  return WORD_MEANING[key] || '';
};

const shuffleArr = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const pickRandomBlanks = (segs, count) => {
  const idxs = segs.filter((s) => s.type === 'blank').map((s) => s.idx);
  if (idxs.length <= count) return new Set(idxs);
  return new Set(shuffleArr(idxs).slice(0, count));
};

// 보드에서 단원별로 쓰기 활동 칸을 2개씩 무작위로 뽑음
//  (6단원 모두 선택 시 2×6 = 총 12칸)
const WRITING_PER_UNIT = 2;
const pickWritingCells = (board, selectedUnits) => {
  const units = (selectedUnits && selectedUnits.length ? selectedUnits : ALL_UNITS);
  const out = new Set();
  units.forEach((u) => {
    const ids = board
      .filter((c) => c.type === 'normal' && c.unit === u)
      .map((c) => c.id);
    shuffleArr(ids).slice(0, WRITING_PER_UNIT).forEach((id) => out.add(id));
  });
  return out;
};

// --- 별 스티커 로컬 저장 --------------------------------------------
const STAR_KEY = 'boardgame_stars_v2';

const loadStars = () => {
  try {
    const raw = localStorage.getItem(STAR_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch (e) {
    return new Set();
  }
};

// --- 뱀 모양(지그재그) 보드 배치 계산 -------------------------------
const BOARD_COLS = 6;
const snakePos = (i) => {
  const row = Math.floor(i / BOARD_COLS);
  const inRow = i % BOARD_COLS;
  const col = row % 2 === 0 ? inRow : BOARD_COLS - 1 - inRow; // 줄마다 좌↔우로 꺾임
  return { row: row + 1, col: col + 1 };
};
const nextArrow = (i, total) => {
  if (i >= total - 1) return null;
  const row = Math.floor(i / BOARD_COLS);
  const inRow = i % BOARD_COLS;
  if (inRow === BOARD_COLS - 1) return 'down';
  return row % 2 === 0 ? 'right' : 'left';
};

export default function App() {
  const [selectedUnits, setSelectedUnits] = useState(ALL_UNITS);
  const [board, setBoard] = useState(() => buildBoard(ALL_UNITS));
  const [gameState, setGameState] = useState('lobby');
  const [turn, setTurn] = useState('player');
  const [gameMode, setGameMode] = useState('answerOnly');

  const [rpsState, setRpsState] = useState('idle');
  const [playerChoice, setPlayerChoice] = useState(null);
  const [aiChoice, setAiChoice] = useState(null);
  const [rpsResult, setRpsResult] = useState('');

  const [playerPos, setPlayerPos] = useState(0);
  const [aiPos, setAiPos] = useState(0);
  const [playerRest, setPlayerRest] = useState(false);
  const [aiRest, setAiRest] = useState(false);
  const [diceResult, setDiceResult] = useState(null);
  const [isMoving, setIsMoving] = useState(false);

  // 3D 주사위 상태
  const [isRollingDice, setIsRollingDice] = useState(false);
  const [showDicePopup, setShowDicePopup] = useState(false);
  const [diceDisplay, setDiceDisplay] = useState(1);
  const [diceTransform, setDiceTransform] = useState('rotateX(0deg) rotateY(0deg)');

  // 팝업 상태
  const [actionPopup, setActionPopup] = useState(null);
  const [catchEvent, setCatchEvent] = useState(null);
  const [previewCell, setPreviewCell] = useState(null); // 그림 클릭 시 문장 보여주기(연습용)
  const [wordHint, setWordHint] = useState(null); // 단어 클릭 시 영어·뜻 표시
  const [writeMode, setWriteMode] = useState(false); // 쓰기 활동(빈칸 채우기) 모드
  const [writeRevealed, setWriteRevealed] = useState(false); // 답 보기 눌렀는지
  const [blankSet, setBlankSet] = useState(null); // 쓰기 모드에서 실제 빈칸으로 만들 idx Set
  const [boardWritingMode, setBoardWritingMode] = useState(false); // 헤더 쓰기 활동(보드 칸 강조)
  const [writingCellIds, setWritingCellIds] = useState(() => new Set()); // 쓰기 활동 대상 칸 id 집합
  const [attemptCount, setAttemptCount] = useState(0); // 말하기 시도 횟수(3번 후 자동 통과)

  const [currentTask, setCurrentTask] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [feedback, setFeedback] = useState('');
  const [aiSpeechText, setAiSpeechText] = useState('');

  // 별 스티커 / 안내 / 토스트
  const [stars, setStars] = useState(loadStars);
  const [toast, setToast] = useState(null);
  const [showGuide, setShowGuide] = useState(true); // 접속할 때마다 항상 안내 팝업 표시

  // 칸별 마이크 녹음(연습 팝업) — 질문/대답을 각각 골라 채점
  const [practiceTarget, setPracticeTarget] = useState(null); // 'question' | 'answer' | null (현재 녹음 중)
  const [practiceResult, setPracticeResult] = useState(null); // { target, accuracy, passed, status }
  const previewRecRef = useRef(null);

  // --- 마이크 오류 방지 로직 ---
  const recognitionRef = useRef(null);
  const currentTaskRef = useRef(null);
  const isListeningRef = useRef(false);

  useEffect(() => {
    currentTaskRef.current = currentTask;
  }, [currentTask]);

  // 토스트 자동 사라짐
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const saveStars = (set) => {
    try { localStorage.setItem(STAR_KEY, JSON.stringify([...set])); } catch (e) { /* 무시 */ }
  };

  const awardStar = (cell) => {
    if (!cell) return;
    const key = exprKey(cell);
    setStars((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      saveStars(next);
      setToast('⭐ 새로운 별 스티커를 모았어요!');
      return next;
    });
  };

  const resetStars = () => {
    if (!window.confirm('모은 별 스티커를 모두 지울까요?')) return;
    setStars(new Set());
    saveStars(new Set());
    setToast('별 스티커를 초기화했어요');
  };

  const closeGuide = () => setShowGuide(false);

  const speakText = (text, rate = 0.8) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    }
  };

  // --- 로비: 단원 선택 토글 ---
  const toggleUnit = (u) => {
    if (gameState !== 'lobby') return;
    const has = selectedUnits.includes(u);
    if (has && selectedUnits.length <= 2) {
      setToast('⚠️ 최소 2개 단원을 선택해야 해요');
      return;
    }
    const next = ALL_UNITS.filter((x) =>
      has ? x !== u && selectedUnits.includes(x) : x === u || selectedUnits.includes(x),
    );
    setSelectedUnits(next);
    setBoard(buildBoard(next));
    if (boardWritingMode) {
      setBoardWritingMode(false);
      setWritingCellIds(new Set());
    }
  };

  // --- 가위바위보 시뮬레이션 ---
  const handleRPS = (choice) => {
    if (rpsState !== 'idle') return;
    setPlayerChoice(choice);
    setRpsState('animating');

    let counter = 0;
    const choices = ['rock', 'paper', 'scissors'];

    const interval = setInterval(() => {
      setAiChoice(choices[counter % 3]);
      counter++;
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const finalAiChoice = choices[Math.floor(Math.random() * 3)];
      setAiChoice(finalAiChoice);

      let result = '';
      if (choice === finalAiChoice) result = 'draw';
      else if (
        (choice === 'rock' && finalAiChoice === 'scissors') ||
        (choice === 'paper' && finalAiChoice === 'rock') ||
        (choice === 'scissors' && finalAiChoice === 'paper')
      ) {
        result = 'win';
      } else {
        result = 'lose';
      }

      setRpsResult(result);
      setRpsState('result');

      setTimeout(() => {
        if (result === 'draw') {
          setRpsState('idle');
          setPlayerChoice(null);
          setAiChoice(null);
          setRpsResult('');
        } else {
          setTurn(result === 'win' ? 'player' : 'ai');
          setGameState('playing');
        }
      }, 2000);
    }, 1500);
  };

  // AI 턴 자동 실행
  useEffect(() => {
    if (gameState === 'playing' && turn === 'ai' && !actionPopup && !catchEvent) {
      const timer = setTimeout(() => {
        executeAiTurn();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [gameState, turn, actionPopup, catchEvent]);

  const rollDice = () => Math.floor(Math.random() * 6) + 1;

  const getDiceTransform = (finalDice) => {
    const extraX = 360 * (Math.floor(Math.random() * 2) + 2);
    const extraY = 360 * (Math.floor(Math.random() * 2) + 2);
    let targetX = extraX;
    let targetY = extraY;

    switch (finalDice) {
      case 1: break;
      case 2: targetY -= 90; break;
      case 3: targetY += 180; break;
      case 4: targetY += 90; break;
      case 5: targetX -= 90; break;
      case 6: targetX += 90; break;
    }
    return `rotateX(${targetX}deg) rotateY(${targetY}deg)`;
  };

  const animateMove = (who, currentPos, targetPos) => {
    if (currentPos === targetPos) {
      processCellLanding(targetPos, who);
      return;
    }
    const nextPos = currentPos < targetPos ? currentPos + 1 : currentPos - 1;
    if (who === 'player') setPlayerPos(nextPos);
    else setAiPos(nextPos);

    setTimeout(() => animateMove(who, nextPos, targetPos), 350);
  };

  const startDiceRoll = (who, finalDice, newPos) => {
    setShowDicePopup(true);
    setDiceTransform('rotateX(0deg) rotateY(0deg)');

    setTimeout(() => {
      setIsRollingDice(true);
      setDiceDisplay(finalDice);
      setDiceTransform(getDiceTransform(finalDice));
    }, 50);

    setTimeout(() => {
      setIsRollingDice(false);
      setDiceResult(`🎲 ${who === 'player' ? '나온 숫자' : 'AI 숫자'}: ${finalDice}`);

      setTimeout(() => {
        setShowDicePopup(false);
        animateMove(who, who === 'player' ? playerPos : aiPos, newPos);
      }, 1500);
    }, 1550);
  };

  const handlePlayerTurn = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(''));
    }

    if (playerRest) {
      setPlayerRest(false);
      setTurn('ai');
      return;
    }
    setIsMoving(true);
    const dice = rollDice();
    const newPos = Math.min(playerPos + dice, board.length - 1);
    startDiceRoll('player', dice, newPos);
  };

  const executeAiTurn = () => {
    if (aiRest) {
      setDiceResult('🤖 AI 쉬는 턴 💤');
      setAiRest(false);
      setTurn('player');
      return;
    }
    setIsMoving(true);
    const dice = rollDice();
    const newPos = Math.min(aiPos + dice, board.length - 1);
    startDiceRoll('ai', dice, newPos);
  };

  const processCellLanding = (pos, who) => {
    if (pos !== 0 && pos !== board.length - 1) {
      if (who === 'player' && pos === aiPos) {
        setCatchEvent({ victim: 'ai', who, pos });
        return;
      } else if (who === 'ai' && pos === playerPos) {
        setCatchEvent({ victim: 'player', who, pos });
        return;
      }
    }
    continueCellLanding(pos, who);
  };

  const handleCatchClose = () => {
    const { victim, who, pos } = catchEvent;
    if (victim === 'ai') setAiPos(0);
    if (victim === 'player') setPlayerPos(0);

    setCatchEvent(null);
    continueCellLanding(pos, who);
  };

  const continueCellLanding = (pos, who) => {
    const cell = board[pos];

    if (cell.type === 'finish') {
      setIsMoving(false);
      setGameState('finished');
      return;
    }

    if (cell.type === 'action') {
      setActionPopup({ action: cell.action, who: who, pos: pos });
      return;
    }

    setIsMoving(false);
    if (who === 'player') {
      startSpeakingTask(cell);
    } else {
      startAiSpeakingTask(cell);
    }
  };

  const handleActionPopupClose = () => {
    const { action, who, pos } = actionPopup;
    setActionPopup(null);

    let finalPos = pos;
    if (action === 'forward2') {
      finalPos = Math.min(pos + 2, board.length - 1);
      animateMove(who, pos, finalPos);
    } else if (action === 'back2') {
      finalPos = Math.max(pos - 2, 0);
      animateMove(who, pos, finalPos);
    } else if (action === 'rest') {
      if (who === 'player') setPlayerRest(true);
      else setAiRest(true);
      setIsMoving(false);
      setTurn(who === 'player' ? 'ai' : 'player');
    }
  };

  const getActionMessage = () => {
    if (!actionPopup) return null;
    const { action, who } = actionPopup;
    const isMe = who === 'player';

    if (action === 'forward2') {
      return {
        title: isMe ? '우와 신난다! 🚀' : '앗, AI가 빨라요! 🚀',
        desc: isMe ? '앞으로 2칸 더 전진합니다!' : 'AI가 앞으로 2칸 더 이동합니다!',
        color: 'text-green-600 bg-green-50 border-green-400',
      };
    } else if (action === 'back2') {
      return {
        title: isMe ? '앗, 미끄러졌어요! 🍌' : '휴, 다행이에요! 🍌',
        desc: isMe ? '뒤로 2칸 돌아갑니다 ㅠㅠ' : 'AI가 뒤로 2칸 미끄러집니다!',
        color: 'text-red-500 bg-red-50 border-red-400',
      };
    } else if (action === 'rest') {
      return {
        title: isMe ? '조금 쉬어갈까요? 💤' : 'AI도 피곤해요 💤',
        desc: isMe ? '다음 차례에는 한 번 쉬게 됩니다.' : 'AI가 다음 차례에 한 번 쉽니다.',
        color: 'text-blue-500 bg-blue-50 border-blue-400',
      };
    }
  };

  const startSpeakingTask = (cell) => {
    setGameState('speaking');
    setSpokenText('');
    setFeedback('');
    setAttemptCount(0);

    setCurrentTask({
      cell,
      question: cell.question,
      answer: cell.answer,
      mode: gameMode,
    });

    // qna 모드는 학생이 스스로 질문/대답을 만들어야 하므로 자동 음성을 재생하지 않음.
    // say:'q'(학생이 question을 말해야 하는 표현)도 정답을 미리 들려주지 않도록 자동 음성 생략.
    if (gameMode !== 'qna' && cell.say !== 'q') {
      setTimeout(() => speakText(cell.question), 500);
    }
  };

  const startListening = () => {
    if (isListeningRef.current) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('이 브라우저는 음성 인식을 지원하지 않습니다. Chrome을 사용해주세요.');
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {
        // 무시
      }
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 5; // 여러 인식 후보를 받아 통과율을 높임

    recognition.onstart = () => {
      isListeningRef.current = true;
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const result = event.results[0];
      const transcripts = [];
      for (let i = 0; i < result.length; i++) transcripts.push(result[i].transcript);
      // 학생 혼란 방지: 인식된 글자는 화면에 표시하지 않고 판정에만 사용
      checkAnswerRef(transcripts, currentTaskRef.current);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      isListeningRef.current = false;
      setIsListening(false);
      if (event.error !== 'no-speech' && event.error !== 'aborted') {
        setFeedback('마이크 연결이 불안정합니다. 다시 버튼을 눌러주세요! 🎤');
      }
    };

    recognition.onend = () => {
      isListeningRef.current = false;
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    try {
      setSpokenText('');
      setFeedback('');
      isListeningRef.current = true;
      setIsListening(true);
      recognition.start();
    } catch (e) {
      console.warn('마이크 시작 오류 방어:', e);
      isListeningRef.current = false;
      setIsListening(false);
    }
  };

  const checkAnswerRef = (transcripts, task) => {
    if (!task) return;
    const list = Array.isArray(transcripts) ? transcripts : [transcripts];

    // say:'q' 인 표현은 학생이 question(예: 제안하는 말)을 말해야 정답. 기본은 answer.
    const studentLine = task.cell?.say === 'q' ? task.question : task.answer;
    const partnerLine = task.cell?.say === 'q' ? task.answer : task.question;
    const required = contentTokens(studentLine);
    if (task.mode === 'qna') {
      contentTokens(partnerLine).forEach((t) => {
        if (!required.includes(t)) required.push(t);
      });
    }

    const isCorrect = required.length > 0 && matchAggregate(list, required);

    if (isCorrect) {
      awardStar(task.cell); // ⭐ 정확히 말하고 통과하면 별 획득
      setFeedback('Excellent! 정답입니다! 🎉 ⭐ (AI 턴으로 넘어갑니다)');
      speakText('Excellent!');
      setTimeout(() => {
        setGameState('playing');
        setTurn('ai');
      }, 2500);
      return;
    }

    // 오답: 3번 시도하면 격려하고 자동으로 다음 차례로 넘김
    setAttemptCount((c) => {
      const next = c + 1;
      if (next >= 3) {
        setFeedback('정말 잘했어요! 다음 차례로 넘어갈게요 🌟');
        speakText('Great job!');
        setTimeout(() => {
          setGameState('playing');
          setTurn('ai');
        }, 2500);
      } else {
        setFeedback(`다시 한 번 해볼까요? (${next}/3번째 시도)`);
      }
      return next;
    });
  };

  const startAiSpeakingTask = (cell) => {
    setGameState('aiSpeaking');
    setAiSpeechText('음... 🤔');

    const question = cell.question;
    const answer = cell.answer;

    setCurrentTask({ cell, question, answer });

    const endAI = () => {
      setAiSpeechText('AI 차례 끝! 이제 네가 주사위를 굴려서 정답을 말해봐!');
      setTimeout(() => {
        setGameState('playing');
        setTurn('player');
      }, 4000);
    };

    setTimeout(() => {
      if (gameMode === 'qna') {
        setAiSpeechText(`"${question}"`);
        speakText(question);
        setTimeout(() => {
          setAiSpeechText(`"${answer}"`);
          speakText(answer);
          setTimeout(endAI, 2500);
        }, 2500);
      } else {
        // 대답만 하기 모드: AI가 학생이 말할 문장을 시범 (say:'q'면 제안하는 질문)
        const modelLine = cell.say === 'q' ? question : answer;
        setAiSpeechText(`"${modelLine}"`);
        speakText(modelLine);
        setTimeout(endAI, 2500);
      }
    }, 1000);
  };

  const skipSpeaking = () => {
    setGameState('playing');
    setTurn('ai');
  };

  const stopPreviewRec = () => {
    if (previewRecRef.current) {
      try { previewRecRef.current.abort(); } catch (e) { /* 무시 */ }
      previewRecRef.current = null;
    }
  };

  // 상황별 격려 메시지 (연습 팝업 결과 카드)
  const practiceMessage = (r) => {
    if (!r) return '';
    if (r.status === 'nospeech') return '목소리가 안 들렸어요. 크게 말해보세요! 🔊';
    if (r.status === 'error') return '마이크 연결이 불안정해요. 다시 눌러주세요! 🎤';
    if (r.passed) return 'Excellent! 🎉';
    if (r.accuracy >= 50) return '아깝다, 조금만 더! 💪';
    return '다시 듣고 도전해봐요! 🌱';
  };

  // 칸별 마이크 녹음: 질문 또는 대답을 골라 말하면 정확도(%)를 알려주고, 통과하면 별 획득
  //  · which: 'question' | 'answer' — 채점할 문장을 인자로 받음
  //  · 채점은 게임과 완전히 동일한 로직 재사용(contentTokens + matchAggregate)
  const startPracticeListening = (which) => {
    if (!previewCell || practiceTarget) return; // 이미 녹음 중이면 무시(동시 녹음 방지)
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('이 브라우저는 음성 인식을 지원하지 않습니다. Chrome을 사용해주세요.');
      return;
    }
    stopPreviewRec();

    const cell = previewCell;
    const text = which === 'question' ? cell.question : cell.answer;
    const required = contentTokens(text);

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 5; // 후보 5개를 받아 통과율↑

    recognition.onstart = () => {
      setPracticeTarget(which);
      setPracticeResult(null);
    };
    recognition.onresult = (event) => {
      const result = event.results[0];
      const transcripts = [];
      for (let i = 0; i < result.length; i++) transcripts.push(result[i].transcript);
      const accuracy = computeAccuracy(transcripts, required);
      const passed = matchAggregate(transcripts, required, true); // 연습은 약간 허용적으로
      setPracticeTarget(null);
      setPracticeResult({ target: which, accuracy, passed, status: 'ok' });
      if (passed) {
        speakText('Excellent!');
        awardStar(cell); // ⭐ 통과 시 그 문장 단위로 별 획득
      }
    };
    recognition.onerror = (event) => {
      setPracticeTarget(null);
      if (event.error === 'aborted') return;
      setPracticeResult({ target: which, status: event.error === 'no-speech' ? 'nospeech' : 'error' });
    };
    recognition.onend = () => setPracticeTarget((t) => (t === which ? null : t));

    previewRecRef.current = recognition;
    try {
      setPracticeTarget(which);
      setPracticeResult(null);
      recognition.start();
    } catch (e) {
      setPracticeTarget(null);
    }
  };

  const handleCellClick = (cell) => {
    if (
      cell.type !== 'normal' ||
      (gameState !== 'playing' && gameState !== 'lobby') ||
      isMoving ||
      showDicePopup ||
      actionPopup ||
      catchEvent
    )
      return;

    setWordHint(null);
    setWriteRevealed(false);
    setPracticeTarget(null);
    setPracticeResult(null);
    setPreviewCell(cell);

    if (boardWritingMode && writingCellIds.has(cell.id)) {
      // 헤더 쓰기 활동 모드 + 쓰기 대상 칸: 바로 빈칸 채우기로 열기 (자동 음성 X)
      const segs = parseForBlanks(cell.answer);
      setBlankSet(pickRandomBlanks(segs, 2));
      setWriteMode(true);
    } else {
      // 쓰기 모드여도 쓰기 대상 칸이 아니면 평소처럼 듣기/연습 팝업
      setWriteMode(false);
      setBlankSet(null);
      speakText(`${cell.question} ... ${cell.answer}`);
    }
  };

  const closePreview = () => {
    stopPreviewRec(); // 팝업 닫으면 녹음 자동 중단
    setPreviewCell(null);
    setPracticeTarget(null);
    setPracticeResult(null);
    setWordHint(null);
    setWriteMode(false);
    setWriteRevealed(false);
    setBlankSet(null);
  };

  const reshuffleBlanks = () => {
    if (!previewCell) return;
    const segs = parseForBlanks(previewCell.answer);
    setBlankSet(pickRandomBlanks(segs, 2));
    setWriteRevealed(false);
  };

  const revealWriting = () => {
    setWriteRevealed(true);
  };

  const hideRevealed = () => {
    setWriteRevealed(false);
  };

  const resetGame = () => {
    setBoard(buildBoard(selectedUnits));
    setPlayerPos(0);
    setAiPos(0);
    setPlayerRest(false);
    setAiRest(false);
    setRpsState('idle');
    setPlayerChoice(null);
    setAiChoice(null);
    setGameState('lobby');
    setTurn('player');
    setDiceResult(null);
    setShowDicePopup(false);
    setActionPopup(null);
    setCatchEvent(null);
    setPreviewCell(null);
    setWordHint(null);
    setWriteMode(false);
    setWriteRevealed(false);
    setBlankSet(null);
    setBoardWritingMode(false);
    setWritingCellIds(new Set());
    setAttemptCount(0);
  };

  const toggleBoardWriting = () => {
    if (boardWritingMode) {
      setBoardWritingMode(false);
      setWritingCellIds(new Set());
    } else {
      setWritingCellIds(pickWritingCells(board, selectedUnits));
      setBoardWritingMode(true);
    }
  };

  const handleModeChange = (mode) => {
    // 모드만 바꾸고 보드 순서/진행 상태는 유지(원치 않는 재배치 방지)
    setGameMode(mode);
  };

  const renderDots = (num) => {
    const dot = 'w-6 h-6 bg-slate-700 rounded-full shadow-inner';
    const redDot = 'w-8 h-8 bg-red-600 rounded-full shadow-inner';
    switch (num) {
      case 1:
        return <div className={redDot}></div>;
      case 2:
        return (
          <div className="w-full h-full p-4 flex flex-col justify-between">
            <div className={`${dot} self-start`}></div>
            <div className={`${dot} self-end`}></div>
          </div>
        );
      case 3:
        return (
          <div className="w-full h-full p-4 flex flex-col justify-between items-center">
            <div className={`${dot} self-start`}></div>
            <div className={dot}></div>
            <div className={`${dot} self-end`}></div>
          </div>
        );
      case 4:
        return (
          <div className="w-full h-full p-4 grid grid-cols-2 grid-rows-2 gap-4 place-items-center">
            <div className={dot}></div>
            <div className={dot}></div>
            <div className={dot}></div>
            <div className={dot}></div>
          </div>
        );
      case 5:
        return (
          <div className="w-full h-full p-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <div className={dot}></div>
              <div className={dot}></div>
            </div>
            <div className="flex justify-center">
              <div className={dot}></div>
            </div>
            <div className="flex justify-between">
              <div className={dot}></div>
              <div className={dot}></div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="w-full h-full p-4 grid grid-cols-2 grid-rows-3 gap-2 place-items-center">
            <div className={dot}></div>
            <div className={dot}></div>
            <div className={dot}></div>
            <div className={dot}></div>
            <div className={dot}></div>
            <div className={dot}></div>
          </div>
        );
      default:
        return null;
    }
  };

  const appStyle = {
    fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'Comic Neue', 'NanumSquareRound', 'Nanum Gothic', sans-serif",
  };

  const unitCount = selectedUnits.length;
  const perUnitCells = Math.floor(CONTENT_SLOTS / Math.max(1, unitCount));

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-sky-300 via-cyan-400 to-blue-600 text-gray-800 p-4 flex flex-col items-center relative overflow-hidden"
      style={appStyle}
    >
      <style>{`
        @import url('https://hangeul.pstatic.net/hangeul_static/css/nanum-square-round.css');

        .eng-paper {
          background-color: #ffffff;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' viewBox='0 0 100 50'%3E%3Cline x1='0' y1='13' x2='100' y2='13' stroke='%23475569' stroke-opacity='0.65' stroke-width='1'/%3E%3Cline x1='0' y1='22' x2='100' y2='22' stroke='%2364748b' stroke-opacity='0.55' stroke-width='1' stroke-dasharray='4 3'/%3E%3Cline x1='0' y1='34' x2='100' y2='34' stroke='%23dc2626' stroke-opacity='0.9' stroke-width='2'/%3E%3Cline x1='0' y1='40' x2='100' y2='40' stroke='%23475569' stroke-opacity='0.4' stroke-width='1'/%3E%3C/svg%3E");
          background-size: 100% 50px;
          background-repeat: repeat-y;
          line-height: 50px;
          padding: 0 10px 8px;
        }
        .eng-paper p { margin: 0; }

        @keyframes writing-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(167,139,250,0.6); }
          50%       { box-shadow: 0 0 0 8px rgba(167,139,250,0); }
        }
        .writing-glow { animation: writing-glow 1.4s ease-out infinite; }

        @keyframes float-emoji {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          50%       { transform: translateY(-18px) rotate(6deg); }
        }
        .float-emoji { animation: float-emoji 5s ease-in-out infinite; }

        @keyframes toast-in {
          0% { transform: translate(-50%, -20px) scale(0.8); opacity: 0; }
          100% { transform: translate(-50%, 0) scale(1); opacity: 1; }
        }
        .toast-in { animation: toast-in 0.35s ease-out; }

        .perspective-1000 { perspective: 1000px; }
        .cube-container {
          transform-style: preserve-3d;
          width: 100%;
          height: 100%;
          position: absolute;
        }
        .dice-face {
          position: absolute;
          width: 128px;
          height: 128px;
          background: #f8fafc;
          border: 4px solid #cbd5e1;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 0 20px rgba(0,0,0,0.05);
        }
        .face-front  { transform: rotateY(0deg) translateZ(64px); }
        .face-right  { transform: rotateY(90deg) translateZ(64px); }
        .face-back   { transform: rotateY(180deg) translateZ(64px); }
        .face-left   { transform: rotateY(-90deg) translateZ(64px); }
        .face-top    { transform: rotateX(90deg) translateZ(64px); }
        .face-bottom { transform: rotateX(-90deg) translateZ(64px); }
      `}</style>

      {/* 바다·여름 장식 이모지 (배경) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-6 left-4 text-5xl md:text-6xl opacity-80 float-emoji">☀️</div>
        <div className="absolute top-24 right-8 text-4xl md:text-5xl opacity-70 float-emoji" style={{ animationDelay: '1.2s' }}>⛱️</div>
        <div className="absolute bottom-24 left-10 text-4xl md:text-5xl opacity-70 float-emoji" style={{ animationDelay: '0.6s' }}>🏄</div>
        <div className="absolute bottom-10 right-12 text-4xl md:text-5xl opacity-70 float-emoji" style={{ animationDelay: '2s' }}>🍉</div>
        <div className="absolute top-1/2 left-2 text-4xl md:text-5xl opacity-50 float-emoji" style={{ animationDelay: '1.6s' }}>🌊</div>
        <div className="absolute top-1/3 right-2 text-4xl md:text-5xl opacity-50 float-emoji" style={{ animationDelay: '2.4s' }}>🌊</div>
      </div>

      {/* 별 스티커 획득 토스트 */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[95] toast-in">
          <div className="bg-white/95 border-4 border-amber-400 text-amber-800 font-black text-lg md:text-xl px-6 py-3 rounded-full shadow-[0_8px_0_0_rgba(251,191,36,0.6)] whitespace-nowrap">
            {toast}
          </div>
        </div>
      )}

      <header className="w-full max-w-6xl mb-4 z-10 rounded-3xl overflow-hidden shadow-[0_6px_0_0_rgba(0,0,0,0.15)] border-4 border-white/80">
        {/* 제목 띠 (바다 그라데이션) */}
        <div className="relative bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 px-4 py-4 md:py-5 text-center overflow-hidden">
          <div className="absolute top-1 left-3 text-2xl md:text-3xl opacity-70 select-none pointer-events-none">🌊</div>
          <div className="absolute bottom-1 right-3 text-2xl md:text-3xl opacity-70 select-none pointer-events-none">⛱️</div>
          <h1 className="relative text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight break-keep drop-shadow-[0_2px_0_rgba(2,132,199,0.9)]">
            🏖️ 6학년 1-6단원 주요표현 보드게임{' '}
            <span className="text-yellow-200">with Writing</span> 🏄
          </h1>
        </div>

        {/* 버튼 툴바 */}
        <div className="bg-white/95 backdrop-blur-sm px-3 py-3 flex flex-wrap gap-2 justify-center items-center">
          <button
            onClick={() => setShowGuide(true)}
            className="px-4 py-2 rounded-xl font-bold whitespace-nowrap bg-sky-100 hover:bg-sky-200 text-sky-800 border-2 border-sky-300 transition-all"
          >
            📖 활동 방법
          </button>

          <div className="flex bg-gray-200 p-1 rounded-xl shadow-inner">
            <button
              onClick={() => handleModeChange('answerOnly')}
              className={`px-3 py-2 rounded-lg font-bold transition-all text-sm md:text-base whitespace-nowrap ${gameMode === 'answerOnly' ? 'bg-white shadow-sm text-sky-800 border border-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
            >
              대답만 하기
            </button>
            <button
              onClick={() => handleModeChange('qna')}
              className={`px-3 py-2 rounded-lg font-bold transition-all text-sm md:text-base whitespace-nowrap ${gameMode === 'qna' ? 'bg-white shadow-sm text-sky-800 border border-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
            >
              질문&대답 같이
            </button>
          </div>

          <button
            onClick={toggleBoardWriting}
            className={`px-5 py-2 rounded-xl font-bold transition-all whitespace-nowrap shadow-[0_4px_0_0_rgba(124,58,237,1)] active:shadow-[0_0px_0_0_rgba(124,58,237,1)] active:translate-y-1 ${boardWritingMode ? 'bg-violet-600 text-white' : 'bg-violet-500 hover:bg-violet-400 text-white'}`}
          >
            {boardWritingMode ? '✏️ 쓰기 활동 끄기' : '✏️ 쓰기 활동'}
          </button>

          <button
            onClick={resetGame}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-amber-950 rounded-xl font-bold transition-all shadow-[0_4px_0_0_rgba(180,83,9,1)] active:shadow-[0_0px_0_0_rgba(180,83,9,1)] active:translate-y-1 whitespace-nowrap"
          >
            🔄 처음부터 다시 하기
          </button>
        </div>
      </header>

      {/* 별 스티커 진행 막대 */}
      <div className="w-full max-w-6xl bg-white/95 p-3 md:p-4 rounded-2xl shadow-md mb-4 z-10 border-2 border-amber-300">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 font-black text-amber-700 text-base md:text-lg whitespace-nowrap">
            ⭐ 내 별 스티커 <span className="text-amber-900">{stars.size}</span> / {TOTAL_EXPRESSIONS}
          </div>
          <div className="flex-1 min-w-[140px] h-4 bg-amber-100 rounded-full overflow-hidden border border-amber-300">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-500"
              style={{ width: `${Math.round((stars.size / TOTAL_EXPRESSIONS) * 100)}%` }}
            />
          </div>
          <button
            onClick={resetStars}
            className="text-xs md:text-sm text-slate-400 hover:text-rose-500 font-bold underline whitespace-nowrap"
          >
            별 초기화
          </button>
        </div>
      </div>

      {boardWritingMode && (
        <div className="w-full max-w-6xl bg-violet-100 border-4 border-violet-400 p-3 rounded-2xl mb-4 text-center z-10 animate-pulse">
          <p className="text-base md:text-lg font-black text-violet-800">
            ✏️ 쓰기 활동 — 단원별 2개씩, 총 <span className="text-violet-900">{writingCellIds.size}개 칸</span>에 표시된 ✏️ 쓰기 칸을 눌러보세요
          </p>
        </div>
      )}

      {gameState === 'lobby' && (
        <div className="w-full max-w-6xl bg-white/95 p-4 md:p-5 rounded-2xl shadow-md mb-4 z-10 border-4 border-cyan-400">
          <h2 className="text-lg md:text-2xl font-black text-cyan-700 text-center mb-4">
            💡 그림을 클릭하면 질문과 대답이 나와요. 듣고 · 따라 말하고 · 🎤 녹음하고 · 공책에 써봅시다!
          </h2>

          <p className="text-center text-sm md:text-base font-black text-slate-600 mb-2">
            🎯 복습할 단원을 골라보세요 (켠 단원으로만 보드가 만들어져요)
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-3">
            {ALL_UNITS.map((u) => {
              const on = selectedUnits.includes(u);
              return (
                <button
                  key={u}
                  onClick={() => toggleUnit(u)}
                  className={`px-4 py-2 rounded-full font-black text-sm md:text-base border-2 transition-all shadow-[0_3px_0_0_rgba(0,0,0,0.15)] active:translate-y-0.5 active:shadow-none ${
                    on ? UNIT_TOGGLE_ON[u] : 'bg-white text-slate-400 border-slate-300 opacity-70'
                  }`}
                >
                  {on ? '✅ ' : ''}{u}
                </button>
              );
            })}
          </div>

          <p className="text-center text-base md:text-lg font-black text-cyan-800">
            선택 <span className="text-cyan-600">{unitCount}개</span> 단원 · 단원당 약{' '}
            <span className="text-cyan-600">{perUnitCells}칸</span>
          </p>
          <p className="text-center text-xs md:text-sm font-bold text-rose-500 mt-1">
            ※ 최소 2개 단원을 선택해야 게임을 시작할 수 있어요
          </p>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="w-full max-w-6xl bg-white/95 p-4 rounded-2xl shadow-[0_4px_0_0_rgba(0,0,0,0.2)] mb-4 flex justify-between items-center border-l-8 border-cyan-500 z-10">
          <div className="text-xl font-bold w-1/3 flex items-center gap-2">
            {turn === 'player' ? (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg border-2 border-blue-300 shadow-sm flex items-center gap-2">
                👦 내 차례
              </span>
            ) : (
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-lg border-2 border-red-300 shadow-sm flex items-center gap-2 animate-pulse">
                🤖 AI 차례...
              </span>
            )}
          </div>

          <div className="w-1/3 flex justify-center">
            {diceResult && !showDicePopup && (
              <div className="text-lg bg-cyan-100 text-cyan-900 border-2 border-cyan-300 px-6 py-2 rounded-xl font-black shadow-sm transition-all">
                {diceResult}
              </div>
            )}
          </div>

          <div className="w-1/3 flex justify-end relative">
            {turn === 'player' && !isMoving && !showDicePopup && !actionPopup && !catchEvent && !playerRest && (
              <div className="absolute -top-10 right-0 md:-top-12 whitespace-nowrap text-xs md:text-sm font-bold text-amber-700 animate-bounce bg-amber-100 px-3 py-1 rounded-full border border-amber-300 shadow-sm z-20">
                내가 주사위 굴리기 버튼을 눌러서 시작해봅시다! 👇
              </div>
            )}
            <button
              onClick={handlePlayerTurn}
              disabled={(turn !== 'player' && !playerRest) || isMoving || showDicePopup || actionPopup || catchEvent}
              className={`px-8 py-3 rounded-2xl font-black text-white text-lg transition-all
                ${
                  playerRest && turn === 'player'
                    ? 'bg-purple-500 hover:bg-purple-400 border-2 border-purple-600 shadow-[0_5px_0_0_rgba(147,51,234,1)] active:shadow-none active:translate-y-1 cursor-pointer animate-pulse'
                    : turn === 'player' && !isMoving && !showDicePopup && !actionPopup && !catchEvent
                      ? 'bg-amber-500 hover:bg-amber-400 border-2 border-amber-600 shadow-[0_5px_0_0_rgba(180,83,9,1)] active:shadow-none active:translate-y-1 cursor-pointer'
                      : 'bg-gray-400 border-2 border-gray-500 shadow-[0_5px_0_0_rgba(107,114,128,1)] cursor-not-allowed opacity-80'
                }`}
            >
              {playerRest && turn === 'player'
                ? '쿨쿨.. 한 번 쉬기 (턴 넘기기) 💤'
                : isMoving || showDicePopup || actionPopup || catchEvent
                  ? '기다려주세요...'
                  : '주사위 굴리기'}
            </button>
          </div>
        </div>
      )}

      <div
        className={`w-full max-w-6xl p-6 md:p-12 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] grid gap-3 md:gap-5 relative z-10 border-[14px] border-[#1e5a8a] bg-gradient-to-br from-sky-100 to-cyan-200 overflow-visible ${gameState === 'lobby' ? 'mb-24' : ''}`}
        style={{ gridTemplateColumns: `repeat(${BOARD_COLS}, minmax(0, 1fr))` }}
      >
        {/* 판 모서리 바다 장식 */}
        <div className="absolute -top-5 -left-4 text-4xl md:text-5xl select-none pointer-events-none rotate-[-12deg] z-20">🐚</div>
        <div className="absolute -top-5 -right-4 text-4xl md:text-5xl select-none pointer-events-none rotate-[12deg] z-20">⭐</div>
        <div className="absolute -bottom-5 -left-4 text-4xl md:text-5xl select-none pointer-events-none z-20">🦀</div>
        <div className="absolute -bottom-5 -right-4 text-4xl md:text-5xl select-none pointer-events-none z-20">🐠</div>

        {board.map((cell, idx) => {
          const isPlayerHere = playerPos === idx;
          const isAiHere = aiPos === idx;
          const { row, col } = snakePos(idx);
          const arrow = nextArrow(idx, board.length);
          const collected = cell.type === 'normal' && stars.has(exprKey(cell));

          let baseStyle =
            'w-full h-32 md:h-44 rounded-2xl flex flex-col items-center justify-center relative transform transition-all duration-300 hover:-translate-y-1 z-10 group';
          let cellStyle = '';

          if (cell.type === 'normal') {
            const unitCell = UNIT_CELL[cell.unit] || 'bg-white border-slate-300 shadow-[0_6px_0_0_#cbd5e1]';
            const writingHi =
              boardWritingMode && writingCellIds.has(idx)
                ? ' writing-glow ring-2 ring-violet-300'
                : '';
            cellStyle = `${baseStyle} ${unitCell} border-[3px] cursor-pointer hover:brightness-105${writingHi}`;
          } else if (cell.type === 'start') {
            cellStyle = `${baseStyle} bg-gradient-to-b from-amber-200 to-amber-400 border-[3px] border-amber-500 shadow-[0_6px_0_0_#b45309]`;
          } else if (cell.type === 'finish') {
            cellStyle = `${baseStyle} bg-gradient-to-b from-rose-400 to-rose-600 border-[3px] border-rose-700 shadow-[0_6px_0_0_#9f1239]`;
          } else if (cell.type === 'action') {
            // 찬스 칸: 점선 테두리로 구분
            let actionColor =
              cell.action === 'rest'
                ? 'bg-blue-100 border-blue-400'
                : cell.action === 'forward2'
                  ? 'bg-green-100 border-green-400'
                  : 'bg-red-100 border-red-400';
            cellStyle = `${baseStyle} ${actionColor} border-[3px] border-dashed`;
          }

          return (
            <div
              key={idx}
              className={cellStyle}
              style={{ gridColumnStart: col, gridRowStart: row }}
              onClick={() => handleCellClick(cell)}
            >
              {/* 진행 방향 화살표 */}
              {arrow === 'right' && (
                <div className="absolute top-1/2 -right-3 md:-right-4 -translate-y-1/2 text-sky-700 text-xl md:text-2xl font-black z-20 drop-shadow-sm">▶</div>
              )}
              {arrow === 'left' && (
                <div className="absolute top-1/2 -left-3 md:-left-4 -translate-y-1/2 text-sky-700 text-xl md:text-2xl font-black z-20 drop-shadow-sm">◀</div>
              )}
              {arrow === 'down' && (
                <div className="absolute left-1/2 -bottom-3 md:-bottom-4 -translate-x-1/2 text-sky-700 text-xl md:text-2xl font-black z-20 drop-shadow-sm">▼</div>
              )}

              <div className="absolute -top-4 -left-2 md:-top-5 md:-left-3 flex gap-1 z-30 w-full px-1">
                {isPlayerHere && (
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-400 to-blue-700 rounded-full border-[3px] border-white shadow-[0_6px_8px_rgba(0,0,0,0.5),inset_0_4px_4px_rgba(255,255,255,0.4)] flex items-center justify-center text-xl md:text-2xl animate-bounce z-40">
                    👦
                  </div>
                )}
                {isAiHere && (
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-red-400 to-red-700 rounded-full border-[3px] border-white shadow-[0_6px_8px_rgba(0,0,0,0.5),inset_0_4px_4px_rgba(255,255,255,0.4)] flex items-center justify-center text-xl md:text-2xl transition-transform duration-300 z-30">
                    🤖
                  </div>
                )}
              </div>

              {cell.type === 'normal' && (
                <>
                  {collected && (
                    <div className="absolute -top-2 right-1 text-lg md:text-2xl z-30 drop-shadow-sm" title="별 스티커를 모은 표현이에요">⭐</div>
                  )}
                  {boardWritingMode && writingCellIds.has(idx) && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 bg-violet-600 text-white text-[10px] md:text-xs font-black px-2 py-0.5 rounded-full shadow-[0_3px_0_0_rgba(76,29,149,1)] border-2 border-white whitespace-nowrap animate-bounce">
                      ✏️ 쓰기
                    </div>
                  )}
                  <div className="absolute top-1 right-1 text-xs bg-white/50 rounded-full w-5 h-5 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-all">
                    🔊
                  </div>
                  <CellImage
                    src={cell.image}
                    alt={cell.answer}
                    fallbackEmoji={cell.emoji}
                    className="w-[76px] h-[76px] md:w-28 md:h-28 object-contain mb-1 drop-shadow-md transform transition-transform group-hover:scale-110"
                    fallbackClass="text-5xl md:text-7xl mb-1 drop-shadow-md transform transition-transform group-hover:scale-110"
                  />
                  <div
                    className={`text-[9px] md:text-xs font-black border-2 px-2 py-0.5 rounded-full shadow-inner ${UNIT_COLORS[cell.unit] || 'text-slate-600 bg-white border-slate-300'}`}
                  >
                    {cell.unit}
                  </div>
                </>
              )}

              {cell.type === 'action' && (
                <div className="text-[10px] md:text-sm font-black text-center whitespace-pre-line p-1 text-slate-700 drop-shadow-sm leading-tight">
                  {cell.label}
                </div>
              )}

              {cell.type === 'start' && (
                <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-4xl leading-none drop-shadow">🚩</span>
                  <span className="font-black text-sm md:text-lg text-white tracking-wider drop-shadow-md">START</span>
                </div>
              )}
              {cell.type === 'finish' && (
                <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-4xl leading-none drop-shadow">🏁</span>
                  <span className="font-black text-sm md:text-lg text-white tracking-wider drop-shadow-md">FINISH</span>
                </div>
              )}

              <div className="absolute -bottom-2 right-1 md:right-2 w-5 h-5 md:w-7 md:h-7 bg-[#1e5a8a] text-white rounded-full flex items-center justify-center text-[9px] md:text-sm font-black shadow-[0_3px_0_0_rgba(0,0,0,0.3)] border-2 border-white z-20">
                {idx}
              </div>
            </div>
          );
        })}
      </div>

      {gameState === 'lobby' && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
          <button
            onClick={() => {
              if ('speechSynthesis' in window) {
                window.speechSynthesis.speak(new SpeechSynthesisUtterance(''));
              }
              setGameState('rps');
            }}
            className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-white rounded-full font-black text-2xl md:text-3xl shadow-[0_8px_0_0_rgba(180,83,9,1)] active:shadow-none active:translate-y-2 transition-all flex items-center gap-3 border-4 border-white animate-bounce"
          >
            🚀 게임 시작하기!
          </button>
        </div>
      )}

      {/* 활동 방법 안내 팝업 */}
      {showGuide && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[90] p-4 backdrop-blur-sm" onClick={closeGuide}>
          <div
            className="bg-white rounded-[2rem] p-6 md:p-8 max-w-lg w-full shadow-2xl border-8 border-cyan-400 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeGuide}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-black text-xl flex items-center justify-center z-10"
            >
              ✕
            </button>
            <h2 className="text-2xl md:text-3xl font-black text-cyan-700 text-center mb-1">📖 활동 방법</h2>
            <p className="text-center text-sm font-bold text-slate-500 mb-5">🏖️ 이렇게 놀며 공부해요!</p>

            <div className="space-y-3 text-left">
              {[
                { n: '1', c: 'bg-sky-100 border-sky-300 text-sky-800', t: '그림 칸을 눌러 질문·대답을 듣고 따라 말해요.' },
                { n: '2', c: 'bg-cyan-100 border-cyan-300 text-cyan-800', t: '🎤 질문·대답을 직접 녹음하면 정확도(%)를 알려줘요.' },
                { n: '3', c: 'bg-teal-100 border-teal-300 text-teal-800', t: '게임 시작! 주사위를 굴려 도착한 칸의 문장을 말해요.' },
                { n: '4', c: 'bg-amber-100 border-amber-300 text-amber-800', t: '정확히 말하고 통과하면 ⭐ 별 스티커를 모아요.' },
                { n: '5', c: 'bg-violet-100 border-violet-300 text-violet-800', t: "✏️ '쓰기 활동' 버튼을 누르고, ✏️ 쓰기 표시가 있는 칸을 골라 공책에 질문과 대답을 다 적어보세요!" },
              ].map((s) => (
                <div key={s.n} className={`flex items-start gap-3 p-3 rounded-2xl border-2 ${s.c}`}>
                  <span className="w-8 h-8 shrink-0 rounded-full bg-white border-2 border-current flex items-center justify-center font-black">{s.n}</span>
                  <p className="font-bold text-base md:text-lg leading-snug pt-1">{s.t}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 bg-amber-50 border-2 border-amber-200 rounded-2xl p-3 text-center">
              <p className="font-black text-amber-700 text-sm md:text-base">
                ⭐ 별 스티커는 이 기기에 저장돼요. 로그인 없이 다시 접속해도 남아 있어요!
              </p>
            </div>

            <button
              onClick={closeGuide}
              className="mt-5 w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-white rounded-2xl font-black text-xl transition-all border-b-8 border-cyan-700 active:border-b-0 active:translate-y-2"
            >
              시작할게요! 🏄
            </button>
          </div>
        </div>
      )}

      {previewCell && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[80] p-4 backdrop-blur-sm"
          onClick={closePreview}
        >
          <div
            className="bg-white rounded-[2rem] p-6 md:p-10 max-w-lg w-full text-center shadow-2xl border-8 border-cyan-400 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePreview}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-black text-xl flex items-center justify-center z-10"
            >
              ✕
            </button>

            <div className="flex flex-col items-center mb-5">
              <CellImage
                src={previewCell.image}
                alt={previewCell.answer}
                fallbackEmoji={previewCell.emoji}
                className="w-44 h-44 md:w-52 md:h-52 object-contain drop-shadow-md mb-3"
                fallbackClass="text-8xl drop-shadow-md mb-3"
              />
              <div className="flex items-center gap-2">
                <span
                  className={`inline-block text-sm font-black px-3 py-1 rounded-xl shadow-sm border-2 ${UNIT_COLORS[previewCell.unit] || 'text-cyan-700 bg-cyan-50 border-cyan-300'}`}
                >
                  {previewCell.unit}
                </span>
                {stars.has(exprKey(previewCell)) && (
                  <span className="text-sm font-black px-3 py-1 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-700">⭐ 모음</span>
                )}
              </div>
            </div>

            {!writeMode ? (
              <>
                <div className="space-y-3 text-left">
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="text-xs font-black text-blue-500 uppercase tracking-wide">Question · 질문</p>
                      <button
                        onClick={() => speakText(previewCell.question)}
                        className="shrink-0 text-xs md:text-sm font-black text-blue-700 bg-blue-100 hover:bg-blue-200 border border-blue-300 px-3 py-1 rounded-full transition-colors shadow-sm"
                      >
                        🔊 질문 듣기
                      </button>
                    </div>
                    <p className="text-2xl md:text-3xl font-black text-slate-800 leading-snug">
                      <ClickableWords text={previewCell.question} onWord={(w) => { speakText(w); setWordHint({ word: w, meaning: lookupMeaning(w) }); }} />
                    </p>
                  </div>
                  <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="text-xs font-black text-amber-600 uppercase tracking-wide">Answer · 대답</p>
                      <button
                        onClick={() => speakText(previewCell.answer)}
                        className="shrink-0 text-xs md:text-sm font-black text-amber-700 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-3 py-1 rounded-full transition-colors shadow-sm"
                      >
                        🔊 대답 듣기
                      </button>
                    </div>
                    <p className="text-2xl md:text-3xl font-black text-slate-800 leading-snug">
                      <ClickableWords text={previewCell.answer} onWord={(w) => { speakText(w); setWordHint({ word: w, meaning: lookupMeaning(w) }); }} />
                    </p>
                  </div>
                </div>

                <p className="text-sm font-bold text-slate-500 mt-3">💡 단어를 누르면 그 단어만 들려주고 한글 뜻이 나와요</p>

                {wordHint && (
                  <div className="mt-2 bg-cyan-50 border-2 border-cyan-200 rounded-xl px-4 py-2 text-left flex items-baseline gap-2">
                    <span className="text-base md:text-lg font-black text-cyan-800">🔤 {wordHint.word}</span>
                    <span className="text-sm font-bold text-cyan-700">{wordHint.meaning ? `· ${wordHint.meaning}` : '· (발음만)'}</span>
                  </div>
                )}

                <div className="mt-5 flex justify-center">
                  <button
                    onClick={() => speakText(`${previewCell.question} ... ${previewCell.answer}`)}
                    className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-white rounded-full font-black text-lg shadow-[0_5px_0_0_rgba(8,145,178,1)] active:shadow-none active:translate-y-1 transition-all"
                  >
                    🔊 다시 듣기
                  </button>
                </div>

                {/* 칸별 마이크 녹음 — 질문/대답 각각 채점 */}
                <div className="mt-4 bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
                  <p className="text-sm md:text-base font-black text-blue-700 mb-3">🎤 직접 말해보고 정확도를 확인해봐요!</p>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => startPracticeListening('question')}
                      disabled={practiceTarget && practiceTarget !== 'question'}
                      className={`flex-1 max-w-[46%] px-3 py-3 rounded-2xl font-black text-white text-base md:text-lg transition-all shadow-[0_5px_0_0_rgba(0,0,0,0.15)] active:shadow-none active:translate-y-1
                        ${practiceTarget === 'question'
                          ? 'bg-red-500 animate-pulse'
                          : practiceTarget === 'answer'
                            ? 'bg-blue-300 opacity-40 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-400'}`}
                    >
                      {practiceTarget === 'question' ? '🎙️ 듣는 중...' : '🎤 질문 말하기'}
                    </button>
                    <button
                      onClick={() => startPracticeListening('answer')}
                      disabled={practiceTarget && practiceTarget !== 'answer'}
                      className={`flex-1 max-w-[46%] px-3 py-3 rounded-2xl font-black text-white text-base md:text-lg transition-all shadow-[0_5px_0_0_rgba(0,0,0,0.15)] active:shadow-none active:translate-y-1
                        ${practiceTarget === 'answer'
                          ? 'bg-red-500 animate-pulse'
                          : practiceTarget === 'question'
                            ? 'bg-orange-300 opacity-40 cursor-not-allowed'
                            : 'bg-orange-500 hover:bg-orange-400'}`}
                    >
                      {practiceTarget === 'answer' ? '🎙️ 듣는 중...' : '🎤 대답 말하기'}
                    </button>
                  </div>

                  {practiceTarget && (
                    <p className="text-red-500 font-bold mt-3 animate-pulse">듣고 있어요... 큰 소리로 말해보세요! 🗣️</p>
                  )}

                  {practiceResult && !practiceTarget && (
                    practiceResult.status !== 'ok' ? (
                      <div className="mt-3 bg-white border-2 border-rose-200 rounded-xl p-3 font-black text-rose-500">
                        {practiceMessage(practiceResult)}
                      </div>
                    ) : (
                      <div className={`mt-3 bg-white border-2 rounded-xl p-3 ${practiceResult.passed ? 'border-green-300' : 'border-amber-300'}`}>
                        <p className={`font-black text-base md:text-lg mb-2 ${practiceResult.passed ? 'text-green-600' : 'text-amber-600'}`}>
                          {practiceResult.target === 'question' ? '질문' : '대답'} 정확도 {practiceResult.accuracy}% · {practiceMessage(practiceResult)}
                        </p>
                        <div className="h-4 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
                          <div
                            className={`h-full transition-all duration-500 ${practiceResult.passed ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-amber-300 to-orange-400'}`}
                            style={{ width: `${practiceResult.accuracy}%` }}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </>
            ) : (
              (() => {
                const answerSegs = parseForBlanks(previewCell.answer);
                const useSet =
                  blankSet ?? new Set(answerSegs.filter((s) => s.type === 'blank').map((s) => s.idx));
                const renderBlank = (s, i, revealedColor = false) => {
                  const width = `${Math.max(s.core.length + 1, 4)}ch`;
                  if (revealedColor) {
                    return (
                      <span key={i}>
                        {s.pre}
                        <span className="text-green-700 underline decoration-green-400 decoration-4">{s.core}</span>
                        {s.post}
                      </span>
                    );
                  }
                  return (
                    <span key={i} className="inline-flex items-baseline">
                      {s.pre}
                      <span
                        className="inline-block mx-1 border-b-4 border-violet-400 align-baseline"
                        style={{ width, height: '1.1em' }}
                      />
                      {s.post}
                    </span>
                  );
                };
                const renderSeg = (s, i, revealed = false) => {
                  if (s.type !== 'blank') return <span key={i}>{s.text}</span>;
                  if (!useSet.has(s.idx)) return <span key={i}>{`${s.pre}${s.core}${s.post}`}</span>;
                  return renderBlank(s, i, revealed);
                };
                return (
                  <>
                    <p className="text-base font-bold text-violet-700 mb-2">
                      ✏️ 공책에 두 문장을 따라 써보세요 (빈칸은 알맞은 단어로 채우기)
                    </p>

                    <div className="bg-white border-2 border-violet-200 rounded-2xl text-left text-3xl font-black text-slate-800 eng-paper">
                      <p>
                        <ClickableWords
                          text={previewCell.question}
                          onWord={(w) => { speakText(w); setWordHint({ word: w, meaning: lookupMeaning(w) }); }}
                        />
                      </p>
                      <p>
                        {answerSegs.map((s, i) => renderSeg(s, i, false))}
                      </p>
                    </div>

                    {writeRevealed && (
                      <div className="mt-4 bg-green-50 border-2 border-green-300 rounded-2xl p-3 text-left">
                        <p className="text-xs font-black text-green-600 uppercase tracking-wide mb-2">정답</p>
                        <div className="bg-white border border-green-200 rounded-xl text-3xl font-black text-slate-800 eng-paper">
                          <p>{previewCell.question}</p>
                          <p>{answerSegs.map((s, i) => renderSeg(s, i, true))}</p>
                        </div>
                      </div>
                    )}

                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                      <button
                        onClick={() => speakText(`${previewCell.question} ... ${previewCell.answer}`)}
                        className="px-4 py-2 text-sm md:text-base bg-cyan-500 hover:bg-cyan-400 text-white rounded-full font-black shadow-[0_4px_0_0_rgba(8,145,178,1)] active:shadow-none active:translate-y-1 transition-all"
                      >
                        🔊 듣기
                      </button>
                      {writeRevealed ? (
                        <button
                          onClick={hideRevealed}
                          className="px-4 py-2 text-sm md:text-base bg-orange-500 hover:bg-orange-400 text-white rounded-full font-black shadow-[0_4px_0_0_rgba(194,65,12,1)] active:shadow-none active:translate-y-1 transition-all"
                        >
                          🙈 가리기
                        </button>
                      ) : (
                        <button
                          onClick={revealWriting}
                          className="px-4 py-2 text-sm md:text-base bg-amber-500 hover:bg-amber-400 text-white rounded-full font-black shadow-[0_4px_0_0_rgba(180,83,9,1)] active:shadow-none active:translate-y-1 transition-all"
                        >
                          👀 답 보기
                        </button>
                      )}
                      <button
                        onClick={reshuffleBlanks}
                        className="px-4 py-2 text-sm md:text-base bg-sky-500 hover:bg-sky-400 text-white rounded-full font-black shadow-[0_4px_0_0_rgba(2,132,199,1)] active:shadow-none active:translate-y-1 transition-all"
                      >
                        🔀 새로 섞기
                      </button>
                      <button
                        onClick={() => setWriteMode(false)}
                        className="px-4 py-2 text-sm md:text-base bg-white border-2 border-slate-300 text-slate-600 hover:bg-slate-50 rounded-full font-black transition-all"
                      >
                        ← 읽기로
                      </button>
                    </div>

                    {wordHint && (
                      <div className="mt-3 bg-cyan-50 border-2 border-cyan-200 rounded-xl px-3 py-2 text-left flex items-baseline gap-2">
                        <span className="text-base font-black text-cyan-800">🔤 {wordHint.word}</span>
                        <span className="text-sm font-bold text-cyan-700">{wordHint.meaning ? `· ${wordHint.meaning}` : '· (발음만)'}</span>
                      </div>
                    )}
                  </>
                );
              })()
            )}
          </div>
        </div>
      )}

      {catchEvent && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[70] p-4 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-white rounded-[2rem] p-10 max-w-md w-full text-center shadow-2xl border-8 border-orange-400 transform transition-all scale-100">
            <div className="text-7xl mb-6 animate-bounce">{catchEvent.victim === 'ai' ? '😆' : '😱'}</div>
            <h2 className="text-3xl font-black mb-4 drop-shadow-sm text-orange-600">
              {catchEvent.victim === 'ai' ? '잡았다!' : '앗, 잡혔다!'}
            </h2>
            <p className="text-xl font-bold text-gray-700 mb-8 whitespace-pre-line">
              {catchEvent.victim === 'ai'
                ? '내가 AI를 잡았어요!\nAI는 출발선으로 돌아갑니다.'
                : 'AI에게 잡히고 말았어요!\n출발선으로 돌아갑니다.'}
            </p>
            <button
              onClick={handleCatchClose}
              className="w-full py-4 text-white bg-orange-500 hover:bg-orange-400 rounded-2xl font-black text-2xl transition-transform active:translate-y-2 border-b-8 border-orange-700"
            >
              알겠어요! 👍
            </button>
          </div>
        </div>
      )}

      {actionPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[70] p-4 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div
            className={`bg-white rounded-[2rem] p-10 max-w-md w-full text-center shadow-2xl border-8 ${getActionMessage()?.color} transform transition-all scale-100`}
          >
            <div className="text-7xl mb-6 animate-bounce">
              {getActionMessage()?.title.includes('🚀')
                ? '🚀'
                : getActionMessage()?.title.includes('🍌')
                  ? '🍌'
                  : '💤'}
            </div>
            <h2 className="text-3xl font-black mb-4 drop-shadow-sm">{getActionMessage()?.title}</h2>
            <p className="text-xl font-bold text-gray-700 mb-8">{getActionMessage()?.desc}</p>
            <button
              onClick={handleActionPopupClose}
              className={`w-full py-4 text-white rounded-2xl font-black text-2xl transition-transform active:translate-y-2
                ${
                  actionPopup.action === 'rest'
                    ? 'bg-blue-500 border-b-8 border-blue-700'
                    : actionPopup.action === 'forward2'
                      ? 'bg-green-500 border-b-8 border-green-700'
                      : 'bg-red-500 border-b-8 border-red-700'
                }`}
            >
              알겠어요! 👍
            </button>
          </div>
        </div>
      )}

      {gameState === 'rps' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full text-center shadow-2xl border-8 border-cyan-500 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>

            {rpsState === 'idle' && (
              <div className="relative z-10">
                <h2 className="text-3xl font-black mb-4 text-cyan-800">누가 먼저 할까요?</h2>
                <p className="text-cyan-600 font-bold mb-8">가위바위보로 먼저 시작할 사람을 정해요!</p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleRPS('scissors')}
                    className="text-5xl hover:scale-110 transition-transform bg-white p-5 rounded-2xl border-4 border-cyan-200 shadow-[0_8px_0_0_rgba(165,243,252,1)] active:shadow-none active:translate-y-2"
                  >
                    ✌️
                  </button>
                  <button
                    onClick={() => handleRPS('rock')}
                    className="text-5xl hover:scale-110 transition-transform bg-white p-5 rounded-2xl border-4 border-cyan-200 shadow-[0_8px_0_0_rgba(165,243,252,1)] active:shadow-none active:translate-y-2"
                  >
                    ✊
                  </button>
                  <button
                    onClick={() => handleRPS('paper')}
                    className="text-5xl hover:scale-110 transition-transform bg-white p-5 rounded-2xl border-4 border-cyan-200 shadow-[0_8px_0_0_rgba(165,243,252,1)] active:shadow-none active:translate-y-2"
                  >
                    🖐️
                  </button>
                </div>
              </div>
            )}

            {(rpsState === 'animating' || rpsState === 'result') && (
              <div className="flex flex-col items-center relative z-10">
                <h2 className="text-3xl font-black mb-8 text-amber-500 animate-pulse">가위~ 바위~ 보!</h2>

                <div className="flex justify-center items-center gap-6 mb-8 w-full px-4">
                  <div className="flex flex-col items-center flex-1">
                    <span className="text-slate-500 mb-2 font-bold text-lg">👦 나</span>
                    <div className="text-6xl bg-blue-50 w-full py-6 rounded-3xl border-4 border-blue-200 shadow-inner">
                      {RPS_EMOJI[playerChoice]}
                    </div>
                  </div>
                  <div className="text-3xl font-black text-slate-300 italic">VS</div>
                  <div className="flex flex-col items-center flex-1">
                    <span className="text-slate-500 mb-2 font-bold text-lg">🤖 AI</span>
                    <div className="text-6xl bg-red-50 w-full py-6 rounded-3xl border-4 border-red-200 shadow-inner">
                      {aiChoice ? RPS_EMOJI[aiChoice] : '❓'}
                    </div>
                  </div>
                </div>

                {rpsState === 'result' && (
                  <div className="text-2xl font-black mt-4 animate-bounce bg-amber-100 py-3 px-6 rounded-full text-amber-800 border-2 border-amber-300 shadow-lg">
                    {rpsResult === 'draw'
                      ? '앗, 비겼다! 다시! 😅'
                      : rpsResult === 'win'
                        ? '🎉 내가 이겼다! 먼저 시작! 🎉'
                        : '😭 AI 승리! AI가 먼저 시작! 😭'}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {showDicePopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] p-10 max-w-sm w-full text-center shadow-2xl border-8 border-amber-400 transform transition-all scale-110">
            <h2 className="text-3xl font-black mb-12 text-amber-600 drop-shadow-sm">
              {turn === 'player' ? '👦 내 차례!' : '🤖 AI 차례!'}
            </h2>

            <div className="w-32 h-32 relative perspective-1000 mb-12 mx-auto">
              <div
                className="cube-container"
                style={{
                  transform: diceTransform,
                  transition: isRollingDice ? 'transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none',
                }}
              >
                <div className="dice-face face-front">{renderDots(1)}</div>
                <div className="dice-face face-right">{renderDots(2)}</div>
                <div className="dice-face face-back">{renderDots(3)}</div>
                <div className="dice-face face-left">{renderDots(4)}</div>
                <div className="dice-face face-top">{renderDots(5)}</div>
                <div className="dice-face face-bottom">{renderDots(6)}</div>
              </div>
            </div>

            <div className="h-12 flex items-center justify-center">
              {!isRollingDice && (
                <div className="text-3xl font-black text-cyan-600 animate-pulse bg-cyan-50 px-6 py-2 rounded-full border-2 border-cyan-200 shadow-md">
                  {diceDisplay}칸 이동!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {gameState === 'speaking' && currentTask && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] p-6 md:p-10 max-w-lg w-full text-center shadow-2xl border-8 border-blue-400">
            {currentTask.mode === 'qna' ? (
              <div className="mb-6 bg-blue-50 p-6 rounded-3xl border-2 border-blue-100 relative">
                <div className="flex justify-center items-center gap-4 mb-4">
                  <CellImage
                    src={currentTask.cell.image}
                    alt={currentTask.answer}
                    fallbackEmoji={currentTask.cell.emoji}
                    className="w-40 h-40 md:w-44 md:h-44 object-contain drop-shadow-md"
                    fallbackClass="text-8xl drop-shadow-md"
                  />
                  <span className={`text-sm font-black px-3 py-1 rounded-xl shadow-sm border-2 ${UNIT_COLORS[currentTask.cell.unit] || 'text-blue-600 bg-white border-blue-200'}`}>
                    {currentTask.cell.unit}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-800 leading-snug">
                  그림에 맞는 <span className="text-blue-600 border-b-4 border-blue-300">질문</span>과{' '}
                  <span className="text-blue-600 border-b-4 border-blue-300">대답</span>을<br />
                  모두 말해보세요!
                </h3>
                <button
                  onClick={() => speakText(`${currentTask.question} ... ${currentTask.answer}`)}
                  className="mt-4 text-sm text-blue-600 bg-white border border-blue-200 hover:bg-blue-100 px-4 py-2 rounded-full transition-colors font-bold shadow-sm"
                >
                  🔊 들어보며 연습하기
                </button>
              </div>
            ) : (
              <div className="mb-6 bg-blue-50 p-6 rounded-3xl border-2 border-blue-100 relative">
                <div className="flex justify-center items-center gap-4 mb-4">
                  <CellImage
                    src={currentTask.cell.image}
                    alt={currentTask.answer}
                    fallbackEmoji={currentTask.cell.emoji}
                    className="w-40 h-40 md:w-44 md:h-44 object-contain drop-shadow-md"
                    fallbackClass="text-8xl drop-shadow-md"
                  />
                  <span className={`text-sm font-black px-3 py-1 rounded-xl shadow-sm border-2 ${UNIT_COLORS[currentTask.cell.unit] || 'text-blue-600 bg-white border-blue-200'}`}>
                    {currentTask.cell.unit}
                  </span>
                </div>
                {currentTask.cell.say === 'q' ? (
                  <>
                    <p className="text-blue-500 font-bold mb-2 uppercase tracking-wide">🙋 그림을 보고 제안해 보세요!</p>
                    <h3 className="text-3xl font-black text-slate-800">"How about ~ing?"</h3>
                  </>
                ) : (
                  <>
                    <p className="text-blue-500 font-bold mb-2 uppercase tracking-wide">🤖 AI 친구의 질문:</p>
                    <h3 className="text-3xl font-black text-slate-800">"{currentTask.question}"</h3>
                    <button
                      onClick={() => speakText(currentTask.question)}
                      className="mt-4 text-sm text-blue-600 bg-white border border-blue-200 hover:bg-blue-100 px-4 py-2 rounded-full transition-colors font-bold shadow-sm"
                    >
                      🔊 질문 다시 듣기
                    </button>
                  </>
                )}
              </div>
            )}

            <div className="mb-8">
              <p className="text-lg font-bold text-slate-600 mb-4">
                {currentTask.mode === 'qna'
                  ? '마이크를 누르고 질문과 대답을 모두 말해보세요!'
                  : currentTask.cell.say === 'q'
                    ? '마이크를 누르고 영어로 제안해 보세요!'
                    : '마이크를 누르고 영어로 대답하세요!'}
              </p>
              <button
                onClick={startListening}
                disabled={isListening || feedback.includes('Excellent') || feedback.includes('잘했어요')}
                className={`w-24 h-24 rounded-full text-4xl shadow-[0_8px_0_0_rgba(0,0,0,0.15)] flex items-center justify-center mx-auto transition-all
                  ${isListening ? 'bg-red-500 text-white animate-pulse shadow-none translate-y-2' : 'bg-green-500 text-white hover:bg-green-400 active:shadow-none active:translate-y-2'}`}
              >
                {isListening ? '🎙️' : '🎤'}
              </button>

              {isListening && <p className="text-red-500 font-bold mt-6 animate-pulse">듣고 있어요... 🗣️</p>}

              <div className="mt-5 flex justify-center">
                <button
                  onClick={() => speakText(currentTask.cell.say === 'q' ? currentTask.question : currentTask.answer)}
                  className="text-sm text-amber-700 bg-amber-50 border border-amber-200 hover:bg-amber-100 px-4 py-2 rounded-full transition-colors font-bold shadow-sm"
                >
                  🔊 정답 미리 듣기
                </button>
              </div>

              {feedback && (
                <div
                  className={`mt-4 text-xl font-black py-3 px-4 rounded-xl border-2 ${feedback.includes('정답') || feedback.includes('잘했어요') ? 'text-green-700 bg-green-100 border-green-300' : 'text-rose-600 bg-rose-50 border-rose-200'}`}
                >
                  {feedback}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={skipSpeaking}
                className="text-slate-400 text-sm font-bold hover:text-slate-600 bg-slate-100 px-3 py-1 rounded-lg"
              >
                PASS (선생님용)
              </button>
            </div>
          </div>
        </div>
      )}

      {gameState === 'aiSpeaking' && currentTask && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] p-6 md:p-10 max-w-lg w-full text-center shadow-2xl border-8 border-red-400">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-red-100 rounded-full border-4 border-red-500 flex items-center justify-center text-6xl mb-4 shadow-lg animate-bounce">
                🤖
              </div>
              <h2 className="text-2xl font-black text-red-600 uppercase tracking-widest">🤖 AI의 차례입니다!</h2>
            </div>

            <div className="mb-6 bg-slate-50 p-6 rounded-3xl border-2 border-slate-200 relative">
              <div className="flex justify-center items-center gap-4 mb-6 opacity-60">
                <CellImage
                  src={currentTask.cell.image}
                  alt={currentTask.answer}
                  fallbackEmoji={currentTask.cell.emoji}
                  className="w-28 h-28 object-contain"
                  fallbackClass="text-7xl"
                />
                <span className="text-sm font-black text-slate-500 border-2 border-slate-300 px-3 py-1 rounded-xl">
                  {currentTask.cell.unit}
                </span>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-red-200 shadow-md relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-t-2 border-l-2 border-red-200 rotate-45"></div>
                <p className="text-3xl font-black text-slate-800 transition-all duration-300">{aiSpeechText}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {gameState === 'finished' && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] p-10 max-w-md w-full text-center shadow-2xl border-8 border-amber-400">
            <div className="text-8xl mb-6 animate-bounce">🏆</div>
            <h2 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
              {playerPos >= board.length - 1 ? '나의 승리!' : 'AI의 승리!'}
            </h2>
            <p className="text-lg font-bold text-slate-500 mb-8">정말 멋진 게임이었어요!</p>
            <button
              onClick={resetGame}
              className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-white rounded-2xl font-black text-2xl transition-transform border-b-8 border-amber-600 active:border-b-0 active:translate-y-2"
            >
              다시 게임하기 🔄
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
