# React Template — 기능 가이드

## 목차

1. [레이아웃 시스템](#1-레이아웃-시스템)
2. [공통 UI 컴포넌트](#2-공통-ui-컴포넌트)
3. [Toast](#3-toast)
4. [Modal](#4-modal)
5. [API 연동 (React Query + axios)](#5-api-연동)
6. [다국어 지원 (i18n)](#6-다국어-지원-i18n)
7. [커스텀 훅](#7-커스텀-훅)
8. [개발 도구 (DevTools Panel)](#8-개발-도구-devtools-panel)
9. [프로젝트 구조](#9-프로젝트-구조)

---

## 1. 레이아웃 시스템

웹뷰와 모바일뷰를 환경변수 또는 기기 자동 감지로 전환합니다.

### 모드 종류

| 모드 | 동작 |
|------|------|
| `auto` (기본) | userAgent + `pointer: coarse`로 기기 자동 감지 |
| `web` | 항상 웹 레이아웃 (사이드바 + 헤더) |
| `mobile` | 항상 모바일 레이아웃 (TopBar + 하단 탭) |

### 실행 명령어

```bash
npm run dev           # auto 모드 (기기 자동 감지)
npm run dev:web       # 웹 레이아웃 강제
npm run dev:mobile    # 모바일 레이아웃 강제
```

### 설정 파일

```
.env              → VITE_VIEW_MODE=auto
.env.web          → VITE_VIEW_MODE=web
.env.mobile       → VITE_VIEW_MODE=mobile
```

### 코드에서 현재 모드 확인

```tsx
import { VIEW_MODE, isWebMode, isMobileMode } from '@/shared/config/app.config';

if (isWebMode()) { ... }
```

---

## 2. 공통 UI 컴포넌트

모든 컴포넌트는 배럴 export로 한 번에 import 가능합니다.

```tsx
import { Button, Input, Switch, Select, Checkbox, Badge, Spinner, Modal, Avatar } from '@/shared/ui';
```

### Button

```tsx
<Button variant="primary" size="md" loading={false} disabled={false}>
  저장
</Button>

// variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
// size: 'sm' | 'md' | 'lg'
```

### Input

```tsx
<Input
  label="이메일"
  placeholder="example@email.com"
  error="유효하지 않은 이메일입니다"
  helperText="로그인에 사용됩니다"
  leftIcon={<IconComponent />}
/>
```

### Switch

```tsx
const [enabled, setEnabled] = useState(false);

<Switch
  label="알림 수신"
  checked={enabled}
  onChange={setEnabled}
  disabled={false}
/>
```

### Select

```tsx
const options = [
  { value: 'kr', label: '한국' },
  { value: 'us', label: '미국' },
];

<Select
  label="국가"
  options={options}
  value={value}
  onChange={setValue}
  placeholder="선택하세요"
  error="필수 항목입니다"
/>
```

### Checkbox

```tsx
<Checkbox
  label="전체 동의"
  checked={checked}
  indeterminate={isPartial}
  onChange={setChecked}
/>
```

### Badge

```tsx
<Badge variant="success" size="sm">완료</Badge>

// variant: 'default' | 'success' | 'warning' | 'error' | 'info'
// size: 'sm' | 'md'
```

### Spinner

```tsx
<Spinner size="md" />

// size: 'sm' | 'md' | 'lg'
```

### Avatar

```tsx
// 이미지
<Avatar src="/avatar.png" alt="홍길동" size="md" online />

// 이미지 없으면 이름 이니셜 자동 표시
<Avatar name="홍길동" size="lg" />

// size: 'sm' | 'md' | 'lg' | 'xl'
```

---

## 3. Toast

어디서든 명령형으로 호출 가능합니다. 자동으로 사라지며 전역에서 관리됩니다.

```tsx
import { toast } from '@/shared/store/toastStore';

toast.success('저장되었습니다');
toast.error('오류가 발생했습니다');
toast.warning('주의가 필요합니다');
toast.info('새 메시지가 있습니다');
```

`App.tsx`에 `<ToastContainer />`가 마운트되어 있어 별도 설정 불필요합니다.

---

## 4. Modal

Zustand 기반 컨텍스트 모달로, 컴포넌트 트리 밖에서도 호출 가능합니다.

### 기본 사용

```tsx
import { modal } from '@/shared/store/modalStore';

modal.open({
  title: '확인',
  content: <p>정말 삭제하시겠습니까?</p>,
  footer: (
    <>
      <Button variant="outline" onClick={() => modal.close()}>취소</Button>
      <Button variant="danger" onClick={handleDelete}>삭제</Button>
    </>
  ),
});
```

### 옵션

| 옵션 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `title` | `string` | - | 모달 헤더 제목 |
| `content` | `ReactNode` | 필수 | 본문 내용 |
| `footer` | `ReactNode` | - | 하단 버튼 영역 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 모달 너비 |
| `closeOnBackdrop` | `boolean` | `true` | 백드롭 클릭 시 닫기 |

### 제어 함수

```tsx
const id = modal.open({ ... });  // 열기 (id 반환)
modal.close();                    // 가장 위 모달 닫기
modal.close(id);                  // 특정 모달만 닫기
modal.closeAll();                 // 전체 닫기
```

### 중첩 모달

`modal.open()`을 여러 번 호출하면 z-index가 자동으로 올라가며 모달이 쌓입니다.

```tsx
modal.open({
  content: (
    <Button onClick={() => modal.open({ content: '중첩 모달' })}>
      중첩 열기
    </Button>
  ),
});
```

### 훅으로 사용

```tsx
import { useModalStore } from '@/shared/store/modalStore';

const { open, close, stack } = useModalStore();
```

---

## 5. API 연동

React Query + axios 기반의 레이어드 구조입니다.

### axios 인스턴스

`src/lib/axios.ts`에서 설정합니다.

- `VITE_API_BASE_URL` 환경변수로 baseURL 지정
- `appStore`의 `token`을 읽어 `Authorization: Bearer` 헤더 자동 주입
- 401 응답 시 토큰 초기화 + toast 처리

### 새 API 추가 패턴

**① API 함수** `src/api/{도메인}/{도메인}.api.ts`

```ts
import { apiClient } from '@/shared/lib/axios';
import type { ApiResponse } from '@/shared/api/types';

export interface Post {
  id: number;
  title: string;
  body: string;
}

export const getPosts = () =>
  apiClient.get<ApiResponse<Post[]>>('/posts').then(r => r.data);

export const createPost = (data: Omit<Post, 'id'>) =>
  apiClient.post<ApiResponse<Post>>('/posts', data).then(r => r.data);
```

**② React Query 훅** `src/api/{도메인}/{도메인}.queries.ts`

```ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/shared/store/toastStore';
import { getPosts, createPost } from './post.api';

const postKeys = {
  all: ['posts'] as const,
  detail: (id: number) => ['posts', id] as const,
};

export function usePosts() {
  return useQuery({ queryKey: postKeys.all, queryFn: getPosts });
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast.success('게시글이 등록되었습니다');
      qc.invalidateQueries({ queryKey: postKeys.all });
    },
  });
}
```

**③ 컴포넌트에서 사용**

```tsx
const { data, isLoading, error } = usePosts();
const { mutate: create, isPending } = useCreatePost();

create({ title: '제목', body: '내용' });
```

### 공통 응답 타입

```ts
// src/api/types.ts
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
```

### 인증 토큰 설정

```tsx
import { useAppStore } from '@/shared/store/appStore';

const { setToken } = useAppStore();
setToken('your-jwt-token');  // 이후 모든 요청에 자동으로 헤더 포함
```

---

## 6. 다국어 지원 (i18n)

외부 라이브러리 없이 구현된 타입 안전 i18n입니다.
번역 파일은 `public/locales/`에 JSON으로 관리되며 런타임에 fetch합니다.

### 기본 사용

```tsx
import { useTranslation } from '@/shared/hooks/useTranslation';

function MyComponent() {
  const { t, locale, setLocale } = useTranslation();

  return (
    <div>
      <p>{t('common.save')}</p>                              {/* '저장' */}
      <p>{t('greeting', { name: '홍길동' })}</p>             {/* 보간 */}
      <button onClick={() => setLocale('en')}>English</button>
    </div>
  );
}
```

### 컴포넌트 외부에서 사용

```ts
import { getT } from '@/shared/store/localeStore';

const t = getT();
t('common.error');
```

### 번역 키 추가 방법

**① `src/i18n/types.ts`에 타입 추가 (기준)**

```ts
export interface Translations {
  common: {
    newKey: string;  // 추가
  };
}
```

**② JSON 파일에 값 추가**

```json
// public/locales/ko.json
{ "common": { "newKey": "새 값" } }

// public/locales/en.json
{ "common": { "newKey": "New value" } }
```

잘못된 키를 `t()`에 넣으면 TypeScript 컴파일 오류가 발생합니다.

### 새 언어 추가 방법

1. `src/i18n/types.ts`의 `Locale` 타입에 추가: `'ko' | 'en' | 'ja'`
2. `src/i18n/index.ts`의 `LOCALES`에 표시명 추가: `ja: '日本語'`
3. `public/locales/ja.json` 파일 생성

### 초기 언어 결정 순서

`localStorage` → 브라우저 언어 → 기본값 `ko`

---

## 7. 커스텀 훅

### `useTranslation`

```tsx
const { t, locale, setLocale, locales } = useTranslation();
```

### `useDeviceDetection`

현재 기기가 모바일인지 감지합니다 (userAgent + pointer 미디어 쿼리).

```tsx
import { useDeviceDetection } from '@/shared/hooks/useDeviceDetection';

const { isMobile } = useDeviceDetection();
```

### `useTimer` — 스톱워치

```tsx
import { useTimer } from '@/shared/hooks/useTimer';

const { time, elapsed, isRunning, start, pause, reset, toggle } = useTimer({
  autoStart: false,
  interval: 1000,
  onTick: (elapsed) => console.log(elapsed),
});

// 표시 예시
`${String(time.hours).padStart(2,'0')}:${String(time.minutes).padStart(2,'0')}:${String(time.seconds).padStart(2,'0')}`
```

| 반환값 | 타입 | 설명 |
|--------|------|------|
| `elapsed` | `number` | 경과 시간 (ms) |
| `time` | `{ hours, minutes, seconds, ms }` | 분해된 시간 |
| `isRunning` | `boolean` | 실행 중 여부 |
| `start / pause / reset / toggle` | `() => void` | 제어 함수 |

### `useCountdown` — 카운트다운

```tsx
import { useCountdown } from '@/shared/hooks/useCountdown';

const { time, progress, isCompleted, start, pause, reset, restart } = useCountdown({
  duration: 60_000,    // 60초 (ms 단위)
  autoStart: false,
  onComplete: () => toast.info('시간 종료!'),
  onTick: (remaining) => console.log(remaining),
});

// 원형 프로그레스바 (0=완료, 1=시작)
<circle style={{ strokeDashoffset: (1 - progress) * circumference }} />

// 새 duration으로 즉시 재시작
restart(30_000);
```

| 반환값 | 타입 | 설명 |
|--------|------|------|
| `remaining` | `number` | 남은 시간 (ms) |
| `time` | `{ hours, minutes, seconds, ms }` | 분해된 시간 |
| `progress` | `number` | 진행률 (1→0) |
| `isCompleted` | `boolean` | 완료 여부 |
| `restart(duration?)` | `(ms?) => void` | 새 duration으로 즉시 재시작 |

### `useApi` — 다중 쿼리 상태 통

여러 쿼리/뮤테이션의 상태를 하나로 합산할 때 사용합니다.

```tsx
import { getQueryStatus, getMutationStatus } from '@/shared/hooks/useApi';

const status = getQueryStatus(useUsers(), usePosts());
// { isLoading, isError, isSuccess }
```

---

## 8. 개발 도구 (DevTools Panel)

개발 모드(`npm run dev`)에서만 표시됩니다. 프로덕션 빌드에서는 완전히 제거됩니다.

화면 우하단의 🛠 버튼을 탭하면 패널이 열립니다.

| 탭 | 내용 |
|----|------|
| **Logs** | `console.log/info/warn/error` 인터셉트, 타임스탬프 표시, Clear 버튼 |
| **Query** | React Query 캐시 목록 + 상태(success/error/pending), 탭하면 데이터 펼침 |
| **Store** | Zustand `appStore` 현재 상태 실시간 표시 |

버튼 뱃지: 에러 발생 시 `🔴 1E`, 경고 시 `🟡 2W`로 표시됩니다.

---

## 9. 프로젝트 구조 (FSD)

레이어 의존성 규칙: `app → pages → widgets → entities → shared` (위 레이어만 아래 레이어를 import 가능)

```
src/
├── app/                          # 앱 초기화, 전역 설정
│   ├── layouts/                  # LayoutProvider, WebLayout, MobileLayout
│   ├── providers/                # QueryClientProvider 래퍼
│   ├── router/                   # AppRouter
│   ├── App.tsx
│   └── index.css
│
├── pages/                        # 라우트 레벨 페이지
│   ├── Home/HomePage.tsx
│   ├── About/AboutPage.tsx
│   └── Test/TestPage.tsx
│
├── widgets/                      # 독립적 복합 UI 블록
│   ├── web-sidebar/WebSidebar.tsx
│   ├── web-header/WebHeader.tsx
│   ├── mobile-topbar/MobileTopBar.tsx
│   └── mobile-bottom-nav/MobileBottomNav.tsx
│
├── entities/                     # 비즈니스 엔티티
│   └── user/
│       ├── api.ts                # axios 호출 함수
│       ├── queries.ts            # useQuery / useMutation 훅
│       └── index.ts
│
└── shared/                       # 재사용 가능한 공통 모듈
    ├── ui/                       # 공통 UI 컴포넌트 (11종)
    ├── api/
    │   └── types.ts              # ApiResponse, PaginatedResponse 타입
    ├── config/
    │   └── app.config.ts         # VIEW_MODE 설정
    ├── dev/
    │   └── DevToolsPanel/        # 개발 전용 패널
    ├── hooks/                    # 커스텀 훅 (useTimer, useCountdown 등)
    ├── i18n/
    │   ├── types.ts              # Translations 인터페이스
    │   └── index.ts              # fetchTranslations, createT
    ├── lib/
    │   ├── axios.ts              # axios 인스턴스
    │   └── queryClient.ts        # QueryClient 설정
    └── store/                    # Zustand 스토어
        ├── appStore.ts           # 앱 전역 상태 (viewMode, token, sidebar)
        ├── toastStore.ts         # Toast 전역 관리
        ├── modalStore.ts         # Modal 전역 관리
        ├── localeStore.ts        # 현재 언어 + t() 함수
        └── devStore.ts           # DevTools 로그 관리

public/
└── locales/
    ├── ko.json                   # 한국어 번역
    ├── en.json                   # 영어 번역
    └── {locale}.json             # 추가 언어
```

### 새 기능 추가 시 위치 결정 기준

| 추가할 것 | 위치 |
|-----------|------|
| 페이지 | `pages/{name}/` |
| 레이아웃에 속한 복잡한 UI | `widgets/{name}/` |
| 비즈니스 엔티티 + API | `entities/{domain}/` |
| 재사용 UI 컴포넌트 | `shared/ui/{Name}/` |
| 전역 상태 (스토어) | `shared/store/` |
| 커스텀 훅 | `shared/hooks/` |
| 특정 기능 단위 | `features/{name}/` (필요 시 레이어 추가) |
