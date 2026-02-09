import { CalendarDays,MapPin } from 'lucide-react';


export const Promotion = () => {
    return (
        <div className="flex flex-col items-center w-full bg-black h-[100dvh] text-white overflow-hidden">
            <main className="flex flex-col items-center text-center max-w-[960px] space-y-10 overflow-y-auto scrollbar">

                <img src="/assets/images/og_image.png" alt="og_image" className="w-full"/>

                <div className="flex flex-col gap-6">
                    <h1>해당 사이트는 <br/> AWE 2026 LG Booth 경험을 위한 사이트 입니다.</h1>
                    <h1>경험을 위해서는 오프라인 방문을 부탁드립니다.</h1>
                </div>

                <div className="w-full max-w-[680px] rounded-2xl bg-white/12 py-12 px-6 space-y-10 mb-30">
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-center gap-2">
                            <CalendarDays />
                            <h1>행사 일정</h1>
                        </div>
                        <h1>2025년 9월 5일(금) ~ 9월 9일(화)</h1>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-center gap-2">
                            <MapPin/>
                            <h1>행사 장소</h1>
                        </div>
                        <h1>IFA 2025 (Internationale Funkausstellung Berlin)<br/>
                            LG전자 부스 B18-101</h1>
                    </div>
                </div>
            </main>
        </div>
    )
}