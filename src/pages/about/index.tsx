import { ABOUT } from "@/src/consts/strings";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 pb-16 animate-fade-in-up">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center pt-12 pb-6 text-neutral-900">About</h1>
      <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
        {/* Main Column */}
        <div className="w-full lg:basis-[73%] flex flex-col">
          {/* Card 1 */}
          <div className="bg-white border border-neutral-100 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.015)] p-6 md:p-10 mb-8">
            <div className="pb-6 flex justify-center border-b border-neutral-100 mb-6">
              <Image
                src="/textLogoB.png"
                alt="textLogo"
                width={121}
                height={40}
              />
            </div>
            <div className="space-y-4 text-neutral-600 leading-loose text-base md:text-lg">
              {Object.entries(ABOUT.CONTENT1.CONTENT).map(
                ([messageKey, messageValue]) => (
                  <p key={messageKey} className="py-1">
                    {messageValue}
                  </p>
                )
              )}
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-neutral-100 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.015)] p-6 md:p-10 mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold py-4 text-center text-neutral-800 mb-6 border-b border-neutral-100">
              {ABOUT.CONTENT2.TITLE}
            </h2>
            <div className="space-y-4 text-neutral-600 leading-loose text-base md:text-lg">
              {Object.entries(ABOUT.CONTENT2.CONTENT).map(
                ([messageKey, messageValue]) => (
                  <p key={messageKey} className="py-1">
                    {messageValue}
                  </p>
                )
              )}
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-neutral-100 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.015)] p-6 md:p-10 mb-8">
            <div className="pb-6 flex justify-center border-b border-neutral-100 mb-6">
              <Image
                src="/separateLogo_>.png"
                alt="Logo icon"
                width={24}
                height={36}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="space-y-4 text-neutral-600 leading-loose text-base md:text-lg">
              {Object.entries(ABOUT.CONTENT3.CONTENT).map(
                ([messageKey, messageValue]) => (
                  <p key={messageKey} className="py-1">
                    {messageValue}
                  </p>
                )
              )}
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-neutral-100 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.015)] p-6 md:p-10 mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold py-4 text-center text-neutral-800 mb-6 border-b border-neutral-100">
              {ABOUT.CONTENT4.TITLE}
            </h2>
            <div className="space-y-4 text-neutral-600 leading-loose text-base md:text-lg">
              {Object.entries(ABOUT.CONTENT4.CONTENT).map(
                ([messageKey, messageValue]) => (
                  <p key={messageKey} className="py-1">
                    {messageValue}
                  </p>
                )
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="w-full lg:basis-[27%] flex flex-col">
          <div className="bg-white border border-neutral-100 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.015)] p-6 md:p-8 w-full">
            {/* Avatar Placeholder */}
            <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 to-emerald-400 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold shadow-sm">
              N
            </div>
            <h3 className="text-xl font-extrabold pb-2 text-center text-neutral-800 border-b border-neutral-100 mb-4">
              {ABOUT.INTRODUCTION.TITLE}
            </h3>
            <div className="space-y-3">
              {Object.entries(ABOUT.INTRODUCTION.CONTENT).map(
                ([messageKey, messageValue]) => {
                  if (messageKey === "MESSAGE2" || (messageValue as string).includes("React")) {
                    return (
                      <div key={messageKey} className="flex flex-wrap gap-2 justify-center pt-2">
                        {(messageValue as string).split(" ").map((tech) => (
                          <span key={tech} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
                            {tech}
                          </span>
                        ))}
                      </div>
                    );
                  }
                  return (
                    <p key={messageKey} className="text-neutral-500 py-1 text-center text-sm md:text-base font-medium">
                      {messageValue}
                    </p>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
